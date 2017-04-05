'use strict';

// SQL Server configuration
const config = require('../../config/config.json').sql;
const sql = require('mssql');
const dummy = require('./data.json');

module.exports.connect = () => sql.connect(config);

module.exports.close = () => sql.close();

module.exports.create = () =>
    new Promise((resolve, reject) => {
        let promises = [];
        for (let i = 0; i < dummy.System.length; i++) {
            promises.push(new sql.Request()
                .input('Id', dummy.System[i].Id)
                .input('Name', dummy.System[i].Name)
                .input('Description', dummy.System[i].Description)
                .query('INSERT INTO [System] (Id, Name, Description) VALUES (@Id, @Name, @Description)'));
        }
        for (let i = 0; i < dummy.Group.length; i++) {
            promises.push(new sql.Request()
                .input('Id', dummy.Group[i].Id)
                .input('Name', dummy.Group[i].Name)
                .input('SystemId', dummy.Group[i].SystemId)
                .query('INSERT INTO [Group] (Id, Name, SystemId) VALUES (@Id, @Name, @SystemId)'));
        }
        for (let i = 0; i < dummy.Role.length; i++) {
            promises.push(new sql.Request()
                .input('Id', dummy.Role[i].Id)
                .input('Name', dummy.Role[i].Name)
                .input('Description', dummy.Role[i].Description)
                .input('GroupId', dummy.Role[i].GroupId)
                .query('INSERT INTO [Role] (Id, Name, Description, GroupId) VALUES (@Id, @Name, @Description, @GroupId)'));
        }
        for (let i = 0; i < dummy.Tag.length; i++) {
            promises.push(new sql.Request()
                .input('Id', dummy.Tag[i].Id)
                .input('Name', dummy.Tag[i].Name)
                .input('Description', dummy.Tag[i].Description)
                .input('GroupId', dummy.Tag[i].GroupId)
                .query('INSERT INTO [Tag] (Id, Name, Description, GroupId) VALUES (@Id, @Name, @Description, @GroupId)'));
        }
        for (let i = 0; i < dummy.ComponentTag.length; i++) {
            promises.push(new sql.Request()
                .input('Id', dummy.ComponentTag[i].Id)
                .input('ComponentId', dummy.ComponentTag[i].ComponentId)
                .input('TagId', dummy.ComponentTag[i].TagId)
                .query('INSERT INTO [ComponentTag] (Id, ComponentId, TagId) VALUES (@Id, @ComponentId, @TagId)'));
        }
        for (let i = 0; i < dummy.Component.length; i++) {
            promises.push(new sql.Request()
                .input('Id', dummy.Component[i].Id)
                .input('Name', dummy.Component[i].Name)
                .input('Description', dummy.Component[i].Description)
                .input('SystemId', dummy.Component[i].SystemId)
                .input('TypeId', dummy.Component[i].TypeId)
                .query('INSERT INTO [Component] (Id, Name, Description, SystemId, TypeId) VALUES (@Id, @Name, @Description, @SystemId, @TypeId)'));
        }
        for (let i = 0; i < dummy.TagPermission.length; i++) {
            promises.push(new sql.Request()
                .input('Id', dummy.TagPermission[i].Id)
                .input('TagId', dummy.TagPermission[i].TagId)
                .input('PermissionId', dummy.TagPermission[i].PermissionId)
                .query('INSERT INTO [TagPermission] (Id, TagId, PermissionId) VALUES (@Id, @TagId, @PermissionId)'));
        }
        for (let i = 0; i < dummy.GroupPermission.length; i++) {
            promises.push(new sql.Request()
                .input('Id', dummy.GroupPermission[i].Id)
                .input('GroupId', dummy.GroupPermission[i].GroupId)
                .input('PermissionId', dummy.GroupPermission[i].PermissionId)
                .query('INSERT INTO [GroupPermission] (Id, GroupId, PermissionId) VALUES (@Id, @GroupId, @PermissionId)'));
        }
        for (let i = 0; i < dummy.Permission.length; i++) {
            promises.push(new sql.Request()
                .input('Id', dummy.Permission[i].Id)
                .input('PermissionTypeId', dummy.Permission[i].PermissionTypeId)
                .input('Value', dummy.Permission[i].Value)
                .query('INSERT INTO [Permission] (Id, PermissionTypeId, [Value]) VALUES (@Id, @PermissionTypeId, @Value)'));
        }
        for (let i = 0; i < dummy.PermissionType.length; i++) {
            promises.push(new sql.Request()
                .input('Id', dummy.PermissionType[i].Id)
                .input('Code', dummy.PermissionType[i].Code)
                .input('Name', dummy.PermissionType[i].Name)
                .input('isSystemPermission', dummy.PermissionType[i].isSystemPermission)
                .query('INSERT INTO [PermissionType] (Id, Code, Name, isSystemPermission) VALUES (@Id, @Code, @Name, @isSystemPermission)'));
        }
        for (let i = 0; i < dummy.Type.length; i++) {
            promises.push(new sql.Request()
                .input('Id', dummy.Type[i].Id)
                .input('Name', dummy.Type[i].Name)
                .input('Description', dummy.Type[i].Description)
                .query('INSERT INTO [Type] (Id, Name, Description) VALUES (@Id, @Name, @Description)'));
        }
        Promise.all(promises)
            .then(() => resolve())
            .catch((error) => reject(error));
    });

module.exports.destroy = () =>
    new sql.Request()
        .query(
        'DELETE FROM [System] ' +
        'DELETE FROM [Group] ' +
        'DELETE FROM [Tag] ' +
        'DELETE FROM [ComponentTag] ' +
        'DELETE FROM [Component]' +
        'DELETE FROM [Permission]' +
        'DELETE FROM [TagPermission]' +
        'DELETE FROM [GroupPermission]' +
        'DELETE FROM [PermissionType]' +
        'DELETE FROM [Role]' +
        'DELETE FROM [Type]'
        );

if (String(process.argv[2]).toLowerCase() === 'debug') {
    module.exports.connect()
        .then(() => module.exports.destroy())
        .then(() => module.exports.create())
        .then(() => sql.close())
        .then(() => console.log('done'))
        .catch(err => console.log(err));
}