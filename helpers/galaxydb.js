'use strict';

const sql = require('mssql');
const config = require('../config/config.json');

// import models
const Group = require('../models/group');
const Tag = require('../models/tag');
const Permission = require('../models/permission');
const PermissionType = require('../models/permissiontype');
const Component = require('../models/component');
const ComponentTagPermission = require('../models/componenttagpermission');

const connect = () => sql.connect(config.sql);

/**
 * Escapes the following symbols in the given wildcard string: % _ [
 * @param {string} stringToEscape The string to be escaped.
 * @param {string} escapeCharacter The character used to escape the symbols.
 * @return {string} The escaped string
 */
const escapeWildcard = (stringToEscape, escapeCharacter) => {
    let result = stringToEscape
        .replace('%', escapeCharacter + '%')
        .replace('_', escapeCharacter + '_')
        .replace('[', escapeCharacter + '[');
    return result;
}

/**
 * First it executes the uspComitGetTagsByGroupId stored procedure of galaxyDB, 
 * to get all of the Tags belonging the given Group Id.
 * Then for each tag it executes the uspComitGetTagPermissions stored procedure of galaxyDB, 
 * to get all Component Tag Permissions belonging the given Tag Id which are assoicated to the given Group Id.
 * @param {uuid} groupId The Group Id used as input to the stored procedure calls;
 * @return {Promise} A promise that will either resolve to an array of Componet Tag Permissions, or reject with an error.
 */
const getComitComponentTagPermissionsByGroupId = (groupId) =>
    getComitTagsByGroupId(groupId)
        .then(tags => {
            let promises = [];
            for (let tag of tags) {
                promises.push(getComitTagPermissions(groupId, tag.id));
            }
            return Promise.all(promises)
                .then(tagPermissions => {
                    let componentTagPermissions = [];
                    for (let i = 0; i < tags.length; i++) {
                        componentTagPermissions.push(new ComponentTagPermission(tags[i], tagPermissions[i]));
                    }
                    return componentTagPermissions;
                })
        })

/**
 * Executes the uspComitGetComponentsByTagId stored procedure of galaxyDB,
 * which fetches all Components belonging to the given Tag Id.
 * @param {uuid} tagId The Tag Id used as input to the stored procedure.
 * @return {Promise} A promise that will either resolve to an array of Components, or reject with an error.
 */
const getComitComponentsByTagId = (tagId) =>
    connect()
        .then(pool =>
            pool.request()
                .input('tagId', tagId)
                .execute('[uspComitGetComponentsByTagId]'))
        .then(result => {
            let components = [];
            let rows = result[0];
            if (rows) {
                for (let row of rows) {
                    components.push(new Component(row.Id, row.Name, row.Type));
                }
            }
            return components;
        })

/**
 * Queries the CoMIT_Group table of galaxyDB for a Group Id equal to the value of the given uuid.
 * @param {uuid} groupId The Group Id used as input to the query.
 * @return {Promise} A promise that will either resolve to a Group, or reject with an error.
 */
const getComitGroupById = (groupId) =>
    connect()
        .then(pool =>
            pool.request()
                .input('groupId', groupId)
                .query(
                'SELECT * FROM [CoMIT_Group] ' +
                'WHERE [Id] = @groupId'))
        .then(rows => {
            let group = rows[0];
            if (group) {
                return new Group(group.Id, group.Name, group.IsSystemAdmin);
            } else {
                return new Group();
            }
        })
        .then(group => {
            // skip permissions if group is adminstrative or group doesnt exist in db
            if (group.IsAdmin || !group.id) {
                return group;
            } else {
                let promises = [
                    getComitSystemPermissionsByGroupId(group.id),
                    getComitComponentTagPermissionsByGroupId(group.id)
                ];
                return Promise.all(promises)
                    .then(results => {
                        group.systemPermissions = results[0];
                        group.componentTagPermissions = results[1];
                        return group;
                    });
            }
        })

/**
 * Queries the CoMIT_Group table of galaxyDB for a Group name equal to the value of the given string.
 * @param {string} groupName The name of the group to fetch.
 * @return {Promise} A promise that will either resolve to a Group, or reject with an error.
 */
const getComitGroupByName = (groupName) =>
    connect()
        .then(pool =>
            pool.request()
                .input('groupName', groupName)
                .query(
                'SELECT * FROM [CoMIT_Group] ' +
                'WHERE [Name] = @groupName'))
        .then(rows => {
            let group = rows[0];
            if (group) {
                return new Group(group.Id, group.Name, group.IsSystemAdmin);
            } else {
                return new Group();
            }
        })
        .then(group => {
            // skip permissions if group is adminstrative or group doesnt exist in db
            if (group.IsAdmin || !group.id) {
                return group;
            } else {
                let promises = [
                    getComitSystemPermissionsByGroupId(group.id),
                    getComitComponentTagPermissionsByGroupId(group.id)
                ];
                return Promise.all(promises)
                    .then(results => {
                        group.systemPermissions = results[0];
                        group.componentTagPermissions = results[1];
                        return group;
                    });
            }
        })

/**
 * Queries the Tag table of galaxyDB for Tag names including or equal to the value of the given string.
 * @param {string} contains The value used to query the tag names.
 * @return {Promise} A promise that will either resolve to an array of Tags, or reject with an error.
 */
const getComitTagsByContains = (contains) => {
    const escapeCharacter = '\\';
    contains = escapeWildcard(contains, escapeCharacter);
    return connect()
        .then(pool =>
            pool.request()
                .input('tag', '%' + contains + '%')
                .input('escape', escapeCharacter)
                .query('SELECT [Id], [Name] FROM [Tag] WHERE [Name] LIKE @tag ESCAPE @escape'))
        .then(rows => {
            let tags = [];
            for (let row of rows) {
                tags.push(new Tag(row.Id, row.Name))
            }
            return tags;
        });
}

/**
 * Executes the uspComitGetTagsByGroupId stored procedure of galaxyDB,
 * which fetches all Tags belonging to the given Group Id.
 * @param {uuid} groupId The Group Id used as input to the stored procedure.
 * @return {Promise} A promise that will either resolve to an array of Tags, or reject with an error.
 */
const getComitTagsByGroupId = (groupId) =>
    connect()
        .then(pool =>
            pool.request()
                .input('groupId', groupId)
                .execute('[uspComitGetTagsByGroupId]'))
        .then(result => {
            let tags = [];
            let rows = result[0];
            if (rows) {
                for (let row of rows) {
                    tags.push(new Tag(row.Id, row.Name));
                }
            }
            return tags;
        })
        .then(tags => {
            let promises = [];
            for (let tag of tags) {
                promises.push(getComitComponentsByTagId(tag.id));
            }
            return Promise.all(promises)
                .then(components => {
                    for (let i = 0; i < tags.length; i++) {
                        tags[i].components = components[i];
                    }
                    return tags;
                })
        })


/**
 * Executes the uspComitGetSystemPermissionsByGroupId stored procedure of galaxyDB,
 * which fetches all System Permissions belonging to the given Group Id.
 * @param {uuid} groupId The Group Id used as input to the stored procedure.
 * @return {Promise} A promise that will either resolve to an array of System Permissions, or reject with an error.
 */
const getComitSystemPermissionsByGroupId = (groupId) =>
    connect()
        .then(pool =>
            pool.request()
                .input('groupId', groupId)
                .execute('[uspComitGetSystemPermissionsByGroupId]'))
        .then(result => {
            let permissions = [];
            let rows = result[0];
            if (rows) {
                for (let row of rows) {
                    let type = new PermissionType(row.PermissionTypeId, row.Name, row.Code, row.IsSystemPermission)
                    permissions.push(new Permission(row.Id, type, row.Value));
                }
            }
            return permissions;
        })

/**
 * Executes the uspComitGetTagPermissions stored procedure of galaxyDB,
 * which fetches all Tag Permissions belonging to the given Tag Id associated with the given Group Id.
 * @param {uuid} groupId The Group Id used as input to the stored procedure.
 * @param {uuid} tagId The Tag Id used as input to the stored procedure.
 * @return {Promise} A promise that will either resolve to an array of Tag Permissions, or reject with an error.
 */
const getComitTagPermissions = (groupId, tagId) =>
    connect()
        .then(pool =>
            pool.request()
                .input('groupId', groupId)
                .input('tagId', tagId)
                .execute('[uspComitGetTagPermissions]'))
        .then(result => {
            let permissions = [];
            let rows = result[0];
            if (rows) {
                for (let row of rows) {
                    let type = new PermissionType(row.PermissionTypeId, row.Name, row.Code, row.IsItemType)
                    permissions.push(new Permission(row.Id, type, row.Value));
                }
            }
            return permissions;
        })

/**
 * Queries the PermissionType table of the SQL Server database for all Permission Types belonging to the given System.
 * @param {string} systemName The name of the System used as input to the query.
 * @return {Promise} A promise that will either resolve to an array of Permission Types, or reject with an error.
 */
const getPermissionTypesBySystemName = (systemName) =>
    connect()
        .then(pool =>
            pool.request()
                .input('systemName', systemName)
                .query('SELECT * FROM [PermissionType] WHERE SystemName = @systemName'))
        .then(rows => {
            let permissionTypes = [];
            rows.forEach(row => {
                permissionTypes.push(new PermissionType(row.Id, row.Name, row.Code, row.IsSystemPermission));
            });
            return permissionTypes;
        });

module.exports = {
    getComitGroupById: getComitGroupById,
    getComitGroupByName: getComitGroupByName,
    getComitTagsByGroupId: getComitTagsByGroupId,
    getComitTagsByContains: getComitTagsByContains,
    getComitComponentsByTagId: getComitComponentsByTagId,
    getComitTagPermissions: getComitTagPermissions,
    getComitSystemPermissionsByGroupId: getComitSystemPermissionsByGroupId,
    getComitComponentTagPermissionsByGroupId: getComitComponentTagPermissionsByGroupId,
    getPermissionTypesBySystemName: getPermissionTypesBySystemName
}