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
            promises = [];
            for (let tag of tags) {
                promises.push(getComitTagPermissions(groupId, tag.id));
            }
            return [tags, Promise.all(promises)];
        })
        .then(results => {
            let tags = results[0];
            let tagPermissions = results[1];
            let componentTagPermissions = [];
            for (let i = 0; i < tags.length; i++) {
                componentTagPermissions.push(new ComponentTagPermission(tag[i], tagPermissions[i]));
            }
            return componentTagPermissions;
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
                .query('[uspComitGetComponentsByTagId]'))
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
            if (rows[0]) {
                return new Group(row.Id, type, row.Name, row.IsSystemAdmin);
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
                        group.componenetTagPermissions = results[1];
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
                .input('groupdId', groupdId)
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
            return Promise.all(promises);
        })

/**
 * Executes the uspComitGetSystemPermissionsByGroupId stored procedure of galaxyDB,
 * which fetches all System Permissions belonging to the given Group Id.
 * @param {uuid} groupId The Group Id used as input to the stored procedure.
 * @return {Promise} A promise that will either resolve to an array of System Permissions, or reject with an error.
 */
const getComitSystemPermissionsByGroupId = (groupdId) =>
    connect()
        .then(pool =>
            pool.request()
                .input('groupdId', groupdId)
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

module.exports = {
    getComitGroupByName: getComitGroupByName,
    getComitTagsByGroupId: getComitTagsByGroupId,
    getComitTagsByContains: getComitTagsByContains,
    getComitComponentsByTagId: getComitComponentsByTagId,
    getComitTagPermissions: getComitTagPermissions,
    getComitSystemPermissionsByGroupId: getComitSystemPermissionsByGroupId,
    getComitComponentTagPermissionsByGroupId: getComitComponentTagPermissionsByGroupId
}