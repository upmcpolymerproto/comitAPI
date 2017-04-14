'use strict';

const sql = require('mssql');
const config = require('../config/config.json');

// import models
const System = require('../models/system');
const Group = require('../models/group');
const Role = require('../models/role');
const Permission = require('../models/permission');
const PermissionType = require('../models/permissiontype');
const Item = require('../models/item');
const ItemType = require('../models/itemtype');
const ItemPermission = require('../models/itempermission');

const getAllPermissionsForRole = (role) => {
    let promises = [
        getSystemPermissionsByRoleId(role.id),
        getItemPermissionsByRoleId(role.id),
        getItemsByRoleId(role.id)
    ];
    return Promise.all(promises)
        .then(results => {
            let items = result[2];
            let permissionsForItem = result[1]
            role.systemPermissions = result[0];
            role.itemPermissions = [];
            for (let item of items) {
                itemPermissions.push(new ItemPermission(item, permissionsForItem))
            }
            return role;
        })
}

const getItemsByRoleId = (roleId) =>
    sql.connect(config.sql)
        .then(() =>
            new sql.Request()
                .input('roleId', roleId)
                .query('[uspGetItemsByRoleId]'))
        .then(result => {
            sql.close();
            let items = [];
            let rows = result[0];
            if (rows) {
                for (let row of rows) {
                    let type = new ItemType(row.ItemTypeId, row.ItemTypeName)
                    items.push(new Item(row.Id, row.Name));
                }
            }
            return items;
        })
        .catch(error => {
            sql.close();
            return Promise.reject(error);
        });

const getGroupsBySystemId = (systemId) =>
    sql.connect(config.sql)
        .then(() =>
            new sql.Request()
                .input('systemId', systemId)
                .execute('[uspGetGroupsBySystemId]'))
        .then(result => {
            sql.close();
            let groups = [];
            let rows = result[0];
            if (rows) {
                for (let row of rows) {
                    groups.push(new Group(row.Id, row.Name));
                }
            }
            return groups;
        })
        .then(groups => {
            let promises = [];
            for (let group of groups) {
                promises.push(getRolesByGroupId(group.id));
            }
            return Promise.all(promises)
                .then(roles => {
                    for (let i = 0; i < groups.length; i++) {
                        groups[i].roles = roles[i];
                    }
                    return groups;
                });
        })
        .catch(error => {
            sql.close();
            return Promise.reject(error);
        });

const getRolesByGroupId = (groupId) =>
    sql.connect(config.sql)
        .then(() =>
            new sql.Request()
                .input('groupId', groupId)
                .query(
                'SELECT [Role].[Id], [Role].[Name] FROM [Role]' +
                'WHERE [Role].[GroupId] = @groupId'
                ))
        .then(rows => {
            sql.close();
            let roles = [];
            for (let row of rows) {
                roles.push(new Role(row.Id, row.Name));
            }
            return roles;
        })
        .then(roles => {
            let promises = [];
            for (let role of roles) {
                promises.push(getAllPermissionsForRole(role));
            }
            return Promise.all(promises);
        })
        .catch(error => {
            sql.close();
            return Promise.reject(error);
        });

const getSystemPermissionsByRoleId = (roleId) =>
    sql.connect(config.sql)
        .then(() =>
            new sql.Request()
                .input('roleId', roleId)
                .execute('[uspGetSystemPermissionsByRoleId]'))
        .then(result => {
            sql.close();
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
        .catch(error => {
            sql.close();
            return Promise.reject(error);
        });

const getItemPermissionsByRoleId = (roleId) =>
    sql.connect(config.sql)
        .then(() =>
            new sql.Request()
                .input('roleId', roleId)
                .execute('[uspGetItemPermissionsByRoleId]'))
        .then(result => {
            sql.close();
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
        .catch(error => {
            sql.close();
            return Promise.reject(error);
        });

const getSystemByName = (systemName) =>
    sql.connect(config.sql)
        .then(() =>
            new sql.Request()
                .input('systemName', systemName)
                .query(
                'SELECT * FROM [System] ' +
                'WHERE [System].[Name] = @systemName')
        )
        .then(rows => {
            sql.close();
            let system = rows[0];
            if (system) {
                return new System(system.Id, system.Name, system.Description);
            } else {
                return new System();
            }
        })
        .catch(error => {
            sql.close();
            return Promise.reject(error);
        });

module.exports = {
    getSystemByName: getSystemByName,
    getGroupsBySystemId: getGroupsBySystemId,
    getRolesByGroupId: getRolesByGroupId,
    getItemsByRoleId: getItemsByRoleId,
    getItemPermissionsByRoleId: getItemPermissionsByRoleId,
    getSystemPermissionsByRoleId: getSystemPermissionsByRoleId
}