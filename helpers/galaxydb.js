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
    getComitComponentsByTagId: getComitComponentsByTagId,
    getComitTagPermissions: getComitTagPermissions,
    getComitSystemPermissionsByGroupId: getComitSystemPermissionsByGroupId,
    getComitComponentTagPermissionsByGroupId: getComitComponentTagPermissionsByGroupId
}