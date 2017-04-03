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
                .input('RoleId', dummy.Group[i].RoleId)
                .input('SystemId', dummy.Group[i].SystemId)
                .query('INSERT INTO [Group] (Id, Name, RoleId, SystemId) VALUES (@Id, @Name, @RoleId, @SystemId)'));
        }
        for (let i = 0; i < dummy.Role.length; i++) {
            promises.push(new sql.Request()
                .input('Id', dummy.Role[i].Id)
                .input('Name', dummy.Role[i].Name)
                .input('Description', dummy.Role[i].Description)
                .query('INSERT INTO [Role] (Id, Name, Description) VALUES (@Id, @Name, @Description)'));
        }
        for (let i = 0; i < dummy.Tag.length; i++) {
            promises.push(new sql.Request()
                .input('Id', dummy.Tag[i].Id)
                .input('Name', dummy.Tag[i].Name)
                .input('Description', dummy.Tag[i].Description)
                .input('GroupId', dummy.Tag[i].GroupId)
                .input('PermissionId', dummy.Tag[i].PermissionId)
                .query('INSERT INTO [Tag] (Id, Name, Description, GroupId, PermissionId) VALUES (@Id, @Name, @Description, @GroupId, @PermissionId)'));
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
        for (let i = 0; i < dummy.Permission.length; i++) {
            promises.push(new sql.Request()
                .input('Id', dummy.Permission[i].Id)
                .input('Read', dummy.Permission[i].Read)
                .input('Write', dummy.Permission[i].Write)
                .input('Start', dummy.Permission[i].Start)
                .input('Clear', dummy.Permission[i].Clear)
                .input('View', dummy.Permission[i].View)
                .input('View_Data', dummy.Permission[i].View_Data)
                .input('View_Messages', dummy.Permission[i].View_Messages)
                .input('Delete_Messages', dummy.Permission[i].Delete_Messages)
                .input('Replay_Messages', dummy.Permission[i].Replay_Messages)
                .query('INSERT INTO [Permission] (Id, [Read], Write, Start, Clear, [View], View_Data, View_Messages, Delete_Messages, Replay_Messages) VALUES (@Id, @Read, @Write, @Start, @Clear, @View, @View_Data, @View_Messages, @Delete_Messages, @Replay_Messages)'));
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