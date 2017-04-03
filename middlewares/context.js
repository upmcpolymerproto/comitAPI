'use strict';

const sql = require('mssql');
const config = require('../config/config.json');
const Component = require('../models/component');
const Permission = require('../models/permission');
const ComponentPermission = require('../models/componentpermission');

const coalesce = (permissions, newPermissions) => {
    for (let i = 0; i < permissions.length; i++) {
        // supersede if new permission is true
        if (newPermissions[i].hasPermission) {
            permissions[i] = newPermissions[i];
        }
    }
    return permissions;
}

const getGroupIdsBySystem = (system, groups) =>
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

const getComponentsByGroupId = (id) =>
    new sql.Request()
        .input('id', id)
        .query(
        "SELECT * FROM [Group] " +
        "INNER JOIN [Tag] on [Group].[Id] = [Tag].[Groupid] " +
        "INNER JOIN [ComponentTag] on [Tag].[Id] = [ComponentTag].[TagId]" +
        "INNER JOIN [Component] on [ComponentTag].[ComponentId] = [Component].[Id]" +
        "INNER JOIN [Permission] on [Tag].[PermissionId] = [Permission].[Id]" +
        "WHERE [Group].[Id] = @id")
        .then(rows => {
            let permissions = [];
            let components = [];
            rows.forEach(row => {
                // coalesce system permissions throughout the group
                let newPermissions = []
                newPermissions.push(new Permission(row.PermissionId, "View_Data", row.View_Data));
                newPermissions.push(new Permission(row.PermissionId, "View_Messages", row.View_Messages));
                newPermissions.push(new Permission(row.PermissionId, "Delete_Messages", row.Delete_Messages));
                newPermissions.push(new Permission(row.PermissionId, "Replay_Messages", row.Replay_Messages));
                if (permissions.length > 0) {
                    permissions = coalesce(permissions, newPermissions);
                } else {
                    permissions = newPermissions;
                }

                // store each component and its permission throughout the group
                let component = new Component(row.ComponentId, row.Name[2]);
                let componentPermissions = [];
                componentPermissions.push(new Permission(row.PermissionId, "Read", row.Read));
                componentPermissions.push(new Permission(row.PermissionId, "Write", row.Write));
                componentPermissions.push(new Permission(row.PermissionId, "Start", row.Start));
                componentPermissions.push(new Permission(row.PermissionId, "Clear", row.Clear));
                componentPermissions.push(new Permission(row.PermissionId, "View", row.View));
                components.push(new ComponentPermission(component, componentPermissions));
            });
            return {
                components: components,
                permissions: permissions
            }
        });

const getComponentsByGroupIds = (ids) => {
    let promises = [];
    for (let i = 0; i < ids.length; i++) {
        promises.push(getComponentsByGroupId(ids[i]));
    }
    return Promise.all(promises);
}

const coalescePermissions = (groups) =>
    new Promise((resolve, reject) => {
        let components = {};
        let permissions = [];
        groups.forEach(group => {
            // coalesce system permissions for each group
            if (permissions.length > 0) {
                permissions = coalesce(permissions, group.permissions);
            } else {
                permissions = group.permissions
            }

            // coalesce component permissions for each group
            group.components.forEach(componentPermission => {
                let name = componentPermission.component.name
                if (name in components) {
                    components[name].permissions = coalesce(components[name].permissions, componentPermission.permissions);
                } else {
                    components[name] = componentPermission;
                }
            });
        });
        // convert components from a map to an array
        components = Object.keys(components).map(key => components[key])
        resolve({
            components: components,
            permissions: permissions
        });
    });


const comit = (user, system) =>
    sql.connect(config.sql)
        .then(() => getGroupIdsBySystem(system, user.groups))
        .then(ids => getComponentsByGroupIds(ids))
        .then(groups => coalescePermissions(groups))
        .then(results => {
            user.components = results.components;
            user.permissions = results.permissions;
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
                    .catch((error) => reject(error));
            } else {
                reject(new Error('Context is invalid'));
            }
        }
    });
