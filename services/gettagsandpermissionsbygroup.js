'use strict';

const sql = require('mssql');
const validator = require('validator');
const config = require('../config/config.json');
const Tag = require('../models/tag');
const Permission = require('../models/permission');
const PermissionType = require('../models/permissiontype');

/**
 * Merge the given array of permissions with all permission types available in the database for that 
 * specific type (Component Tag or System). All permissions added will be defaulted to "false".
 * @param {array} permissions An array of permissions of a specific type (Component Tag or System).
 * @param {array} types An array of all permission types in the database.
 * @param {boolean} isComponentType If true, then the given permissions 
 * are of the type "Component Tag" else they are of the type "System".
 * @return {array} An array of all permissions for the given type that are currently in the database.
 */
const merge = (permissions, types, isComponentType) => {
    if (permissions.length > 0) {
        types.forEach(type => {
            if (isComponentType == type.isComponentType) {
                // if permission does not exist in the array, add it with default value of false        
                if (permissions.filter(perm => perm.code == type.code).length === 0) {
                    permissions.push(new Permission(null, type.code, type.name, false));
                }
            }
        });
    }
    return permissions;
}

/**
 * Queries the PermissionType table of the SQL Server database for all Permission Types.
 * @return {Promise} A promise that will either resolve to an array of Permission Types, or reject with an error.
 */
const getPermissionTypes = () =>
    new sql.Request()
        .query('SELECT * FROM [PermissionType]')
        .then(rows => {
            let permissionTypes = [];
            rows.forEach(row => {
                permissionTypes.push(new PermissionType(row.Id, row.Code, row.Name, row.IsComponentType));
            });
            return permissionTypes;
        });

/**
 * Queries the Tag table of the SQL Server database for all Tags matching the given groupId.
 * @param {uuid} group A uuid of a group from the Group table.
 * @return {Promise} A promise that will either resolve to an array of Tags, or reject with an error.
 */
const getTagsByGroup = (group) =>
    new sql.Request()
        .input('groupId', group)
        .query('SELECT [Id], [Name], [Description] FROM [Tag] WHERE [GroupId] = @groupId')
        .then(rows => {
            let tags = []
            rows.forEach(row => {
                tags.push(new Tag(row.Id, row.Name, row.Description))
            });
            return tags;
        });

/**
 * Executes the uspGetComponentTagPermissions stored procedure for each tag 
 * in the given array to get all Permissions belonging to that tag.
 * @param {array} tags An array of tags to fetch permissions for.
 * @return {Promise} A promise that will either resolve to an array of Tags (now with permissions), or reject with an error.
 */
const getPermissionsForTags = (tags) => {
    let promises = [];
    tags.forEach(tag => promises.push(getPermissionsForTag(tag)));
    return Promise.all(promises);
}

/**
 * Executes the uspGetComponentTagPermissions stored procedure to get all Permissions belonging to the given tagId.
 * @param {uuid} tag A uuid of a tag from the Tag table.
 * @return {Promise} A promise that will either resolve to a Tag (now with permissions), or reject with an error.
 */
const getPermissionsForTag = (tag) =>
    new sql.Request()
        .input('tagId', tag.id)
        .execute('uspGetComponentTagPermissions')
        .then(result => {
            tag.permissions = [];
            result[0].forEach(row => {
                tag.permissions.push(new Permission(row.Id, row.Code, row.Name, row.Value))
            });
            return tag;
        });

/**
 * Executes the uspGetGroupPermissions stored procedure to get all Permissions belonging to the given groupId.
 * @param {uuid} group A uuid of a group from the Group table.
 * @return {Promise} A promise that will either resolve to an array of Permissions, or reject with an error.
 */
const getSystemPermissionsByGroup = (group) =>
    new sql.Request()
        .input('groupId', group)
        .execute('uspGetGroupPermissions')
        .then(result => {
            let permissions = [];
            result[0].forEach(row => {
                permissions.push(new Permission(row.Id, row.Code, row.Name, row.Value))
            });
            return permissions;
        });

module.exports = (request, response, next) => {
    let group = request.body.group;
    if (group == null) {
        let error = new Error('Please provide a valid parameter');
        console.log(error); //replace with call to log service
        response.status(400).send(error.message);
    }
    else if (group.id == null) {
        let result = {
            groupComponentTags: [],
            permissions: []
        }
        response.status(200).send(result);
    } else if (!validator.isUUID(group.id)) {
        let error = new Error(String(group.id) + ' is not a valid UUID');
        console.log(error); //replace with call to log service
        response.status(400).send(error.message);
    } else {
        let types = [];
        let permissions = [];
        sql.connect(config.sql)
            .then(() => Promise.all([getPermissionTypes(), getSystemPermissionsByGroup(group.id)]))
            .then(results => {
                types = results[0];
                permissions = merge(results[1], types, false);
                return getTagsByGroup(group.id);
            })
            .then(tags => getPermissionsForTags(tags))
            .then(tagsWithPermissions => {
                tagsWithPermissions.forEach(tag => {
                    tag.permissions = merge(tag.permissions, types, true);
                });
                let result = {
                    groupComponentTags: tagsWithPermissions,
                    permissions: permissions
                }
                response.status(200).json(result);
            })
            .catch(error => {
                console.log(error); //replace with call to log service
                response.status(500).send(error.message);
            });
    }
}