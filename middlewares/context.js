'use strict';

const sql = require('mssql');
const config = require('../config/config.json');
const Component = require('../models/component');
const Permission = require('../models/permission');
const ComponentPermission = require('../models/componentpermission');

const combine = (arrays) => {
    let result = [];
    for (let i = 0; i < arrays.length; i++) {
        let set = arrays[i];
        for (let j = 0; j < set.length; j++) {
            if (!result.includes(set[j])) {
                result.push(set[j]);
            }
        }
    }
    return result;
}

const collapsePermissions = (permissionSets) => {
    let permissions = {};
    for (let i = 0; i < permissionSets.length; i++) {
        let permissionSet = permissionSets[i];
        for (let j = 0; j < permissionSet.length; j++) {
            let permission = permissionSet[j];
            // insert permission if it does not exist yet OR overwrite permission if new permission is true
            if (!permissions[permission.code] || permission.hasPermission) {
                permissions[permission.code] = permission;
            }
        }
    }
    //convert from object to an array
    permissions = Object.keys(permissions).map(key => permissions[key]);
    return permissions;
}

const collapseComponentPermissions = (componentPermissionSets) => {
    let componentPemissions = {};
    for (let i = 0; i < componentPermissionSets.length; i++) {
        let componentPermissionSet = componentPermissionSets[i];
        for (let j = 0; j < componentPermissionSet.length; j++) {
            let component = componentPermissionSet[j].component;            
            if (componentPemissions[component.id]) {
                // collapse the componet's permissions
                let permissionSets = [componentPemissions[component.id].permissions, componentPermissionSet[j].permissions];
                let permissions = collapsePermissions(permissionSets);
                componentPemissions[component.id].permissions = permissions;
            } else {
                // insert component permission if it does not exist yet 
                componentPemissions[component.id] = componentPermissionSet[j]
            }
        }
    }
    //convert from object to an array
    componentPemissions = Object.keys(componentPemissions).map(key => componentPemissions[key]);
    return componentPemissions;
}

const getGroupsBySystem = (system, groups) =>
    new sql.Request()
        .input('system', system)
        .query(
        'SELECT [Group].[Name], [Group].[Id] FROM [Group] ' +
        'JOIN [System] ON [Group].[SystemId] = [System].[Id] ' +
        'WHERE [System].[Name] = @system')
        .then(rows => {
            let ids = []
            rows.forEach(row => {
                if (groups.includes(row.Name)) {
                    ids.push(row.Id)
                }
            });
            return ids;
        });

const getSystemPermissionsByGroups = (groups) => {
    let promises = [];
    for (let i = 0; i < groups.length; i++) {
        promises.push(getSystemPermissionsByGroup(groups[i]));
    }
    return Promise.all(promises)
        .then(permissionSets => collapsePermissions(permissionSets));
}

const getSystemPermissionsByGroup = (group) =>
    new sql.Request()
        .input('groupId', group)
        .query(
        'SELECT [Permission].[Id], [Code], [Name], [Value] FROM [GroupPermission]' +
        'INNER JOIN [Permission] ON [GroupPermission].[PermissionId] = [Permission].[Id]' +
        'INNER JOIN [PermissionType] ON [Permission].[PermissionTypeId] = [PermissionType].[Id]' +
        'WHERE [GroupPermission].[GroupId] = @groupId')
        .then(rows => {
            let permissions = [];
            rows.forEach(row => {
                permissions.push(new Permission(row.Id, row.Code, row.Name, row.Value))
            });
            return permissions;
        });

const getTagsByGroups = (groups) => {
    let promises = [];
    for (let i = 0; i < groups.length; i++) {
        promises.push(getTagsByGroup(groups[i]));
    }
    return Promise.all(promises)
        .then(tagSets => combine(tagSets));
}

const getTagsByGroup = (group) =>
    new sql.Request()
        .input('group', group)
        .query('SELECT [Id] FROM [Tag] WHERE [GroupId] = @group')
        .then(rows => {
            let ids = []
            rows.forEach(row => {
                ids.push(row.Id)
            });
            return ids;
        });

const getComponentPermissionsByTags = (tags) => {
    let promises = [];
    for (let i = 0; i < tags.length; i++) {
        promises.push(getComponentPermissionsByTag(tags[i]));
    }
    return Promise.all(promises)
        .then(componentPermissionSets => collapseComponentPermissions(componentPermissionSets));
}

const getComponentPermissionsByTag = (tag) =>
    Promise.all([getComponentsByTag(tag), getPermissionsByTag(tag)])
        .then(results => {
            let components = results[0];
            let permissions = results[1];
            let componentPermissions = [];
            for (let i = 0; i < components.length; i++) {
                componentPermissions.push(new ComponentPermission(components[i], permissions))
            }
            return componentPermissions;
        });

const getComponentsByTag = (tag) =>
    new sql.Request()
        .input('tagId', tag)
        .query(
        'SELECT [Component].[Id], [Component].[Name] FROM [Tag]' +
        'INNER JOIN [ComponentTag] ON [Tag].[Id] = [ComponentTag].[TagId]' +
        'INNER JOIN [Component] ON [ComponentTag].[ComponentId] = [Component].[Id]' +
        'WHERE [Tag].[Id] = @tagId')
        .then(rows => {
            let components = [];
            rows.forEach(row => {
                components.push(new Component(row.Id, row.Name));
            });
            return components;
        });

const getPermissionsByTag = (tag) =>
    new sql.Request()
        .input('tagId', tag)
        .query(
        'SELECT [Permission].[Id], [Code], [Name], [Value] FROM [TagPermission]' +
        'INNER JOIN [Permission] ON [TagPermission].[PermissionId] = [Permission].[Id]' +
        'INNER JOIN [PermissionType] ON [Permission].[PermissionTypeId] = [PermissionType].[Id]' +
        'WHERE [TagPermission].[TagId] = @tagId')
        .then(rows => {
            let permissions = [];
            rows.forEach(row => {
                permissions.push(new Permission(row.Id, row.Code, row.Name, row.Value))
            });
            return permissions;
        });

const comit = (user, system) =>
    sql.connect(config.sql)
        .then(() => getGroupsBySystem(system, user.groups))
        .then(groups => Promise.all([getSystemPermissionsByGroups(groups), getTagsByGroups(groups)]))
        .then(results => {
            user.permissions = results[0];
            return getComponentPermissionsByTags(results[1]);
        })
        .then(componentPermissions => {
            user.components = componentPermissions;
            return user;
        });

const mars = (user) =>
    new Promise((resolve, reject) => {
    });


module.exports = (user, context) =>
    new Promise((resolve, reject) => {
        if (context == null || context.length === 0) {
            reject(new Error('Please provide a valid parameter'));
        } else {
            if (String(context).trim().toLowerCase() === 'comit') {
                comit(user, context)
                    .then(userWithPermissions => resolve(userWithPermissions))
                    .catch((error) => {
                        console.log(error); //replace with call to logging service
                        reject(error)
                    });
            } else if (String(context).trim().toLowerCase() === 'mars') {
                mars(user)
                    .then(() => resolve())
                    .catch((error) => {
                        console.log(error); //replace with call to logging service
                        reject(error)
                    });
            } else {
                reject(new Error('The context: ' + String(context) + ' is invalid'));
            }
        }
    });
