'use strict';

// SQL Server configuration
const config = require('../../config/config.json').sql;
const sql = require('mssql');
const dummy = require('./mock');

module.exports.connect = () => sql.connect(config);

module.exports.close = () => sql.close();

module.exports.create = () =>
    new Promise((resolve, reject) => {
        let promises = [];
        Promise.all(promises)
            .then(() => {
                promises = [];
                for (let i = 0; i < dummy.CoMIT_Group.length; i++) {
                    promises.push(new sql.Request()
                        .input('Id', dummy.CoMIT_Group[i].Id)
                        .input('Name', dummy.CoMIT_Group[i].Name)
                        .input('IsSystemAdmin', dummy.CoMIT_Group[i].IsSystemAdmin)
                        .query('INSERT INTO [CoMIT_Group] (Id, Name, IsSystemAdmin) VALUES (@Id, @Name, @IsSystemAdmin)'));
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                for (let i = 0; i < dummy.CoMIT_ComponentType.length; i++) {
                    promises.push(new sql.Request()
                        .input('Id', dummy.CoMIT_ComponentType[i].Id)
                        .input('Name', dummy.CoMIT_ComponentType[i].Name)
                        .query('INSERT INTO [CoMIT_ComponentType] (Id, Name) VALUES (@Id, @Name)'));
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                for (let i = 0; i < dummy.TagType.length; i++) {
                    promises.push(new sql.Request()
                        .input('Id', dummy.TagType[i].Id)
                        .input('Name', dummy.TagType[i].Name)
                        .input('SystemName', dummy.TagType[i].SystemName)
                        .query('INSERT INTO [TagType] (Id, Name, SystemName) VALUES (@Id, @Name, @SystemName)'));
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                for (let i = 0; i < dummy.Tag.length; i++) {
                    promises.push(new sql.Request()
                        .input('Id', dummy.Tag[i].Id)
                        .input('Name', dummy.Tag[i].Name)
                        .input('Description', dummy.Tag[i].Description)
                        .input('TagTypeId', dummy.Tag[i].TagTypeId)
                        .query('INSERT INTO [Tag] (Id, Name, Description, TagTypeId) VALUES (@Id, @Name, @Description, @TagTypeId)'));
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                for (let i = 0; i < dummy.CoMIT_Component.length; i++) {
                    promises.push(new sql.Request()
                        .input('Id', dummy.CoMIT_Component[i].Id)
                        .input('Name', dummy.CoMIT_Component[i].Name)
                        .input('Description', dummy.CoMIT_Component[i].Description)
                        .input('ComponentTypeId', dummy.CoMIT_Component[i].ComponentTypeId)
                        .query('INSERT INTO [CoMIT_Component] (Id, Name, Description, ComponentTypeId) VALUES (@Id, @Name, @Description, @ComponentTypeId)'));
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                for (let i = 0; i < dummy.PermissionType.length; i++) {
                    promises.push(new sql.Request()
                        .input('Id', dummy.PermissionType[i].Id)
                        .input('Code', dummy.PermissionType[i].Code)
                        .input('Name', dummy.PermissionType[i].Name)
                        .input('SystemName', dummy.PermissionType[i].SystemName)
                        .input('IsSystemPermission', dummy.PermissionType[i].IsSystemPermission)
                        .query('INSERT INTO [PermissionType] (Id, Code, Name, SystemName, IsSystemPermission) VALUES (@Id, @Code, @Name, @SystemName, @IsSystemPermission)'));
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                for (let i = 0; i < dummy.Permission.length; i++) {
                    promises.push(new sql.Request()
                        .input('Id', dummy.Permission[i].Id)
                        .input('PermissionTypeId', dummy.Permission[i].PermissionTypeId)
                        .input('Value', dummy.Permission[i].Value)
                        .query('INSERT INTO [Permission] (Id, PermissionTypeId, [Value]) VALUES (@Id, @PermissionTypeId, @Value)'));
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                for (let i = 0; i < dummy.CoMIT_GroupTagPermission.length; i++) {
                    promises.push(new sql.Request()
                        .input('Id', dummy.CoMIT_GroupTagPermission[i].Id)
                        .input('GroupId', dummy.CoMIT_GroupTagPermission[i].GroupId)
                        .input('TagId', dummy.CoMIT_GroupTagPermission[i].TagId)
                        .input('PermissionId', dummy.CoMIT_GroupTagPermission[i].PermissionId)
                        .query('INSERT INTO [CoMIT_GroupTagPermission] (Id, GroupId, TagId, PermissionId) VALUES (@Id, @GroupId, @TagId, @PermissionId)'));
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                for (let i = 0; i < dummy.CoMIT_GroupSystemPermission.length; i++) {
                    promises.push(new sql.Request()
                        .input('Id', dummy.CoMIT_GroupSystemPermission[i].Id)
                        .input('GroupId', dummy.CoMIT_GroupSystemPermission[i].GroupId)
                        .input('PermissionId', dummy.CoMIT_GroupSystemPermission[i].PermissionId)
                        .query('INSERT INTO [CoMIT_GroupSystemPermission] (Id, GroupId, PermissionId) VALUES (@Id, @GroupId, @PermissionId)'));
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                for (let i = 0; i < dummy.CoMIT_TagComponent.length; i++) {
                    promises.push(new sql.Request()
                        .input('Id', dummy.CoMIT_TagComponent[i].Id)
                        .input('ComponentId', dummy.CoMIT_TagComponent[i].ComponentId)
                        .input('TagId', dummy.CoMIT_TagComponent[i].TagId)
                        .query('INSERT INTO [CoMIT_TagComponent] (Id, ComponentId, TagId) VALUES (@Id, @ComponentId, @TagId)'));
                }
                return Promise.all(promises);
            })
            .then(() => resolve())
            .catch((error) => reject(error));
    });

module.exports.destroy = () =>
    new sql.Request()
        .query(
        'DELETE FROM [CoMIT_TagComponent] ' +
        'DBCC CHECKIDENT ([CoMIT_TagComponent], RESEED, 0)' +
        'DELETE FROM [CoMIT_Component] ' +
        'DBCC CHECKIDENT ([CoMIT_Component], RESEED, 0)' +
        'DELETE FROM [CoMIT_ComponentType] ' +
        'DBCC CHECKIDENT ([CoMIT_ComponentType], RESEED, 0)' +
        'DBCC CHECKIDENT ([TagType], RESEED, 0)' +
        'DELETE FROM [CoMIT_GroupTagPermission] ' +
        'DBCC CHECKIDENT ([CoMIT_GroupTagPermission], RESEED, 0)' +
        'DELETE FROM [CoMIT_GroupSystemPermission] ' +
        'DBCC CHECKIDENT ([CoMIT_GroupSystemPermission], RESEED, 0)' +
        'DELETE FROM [CoMIT_Group] ' +
        'DBCC CHECKIDENT ([CoMIT_Group], RESEED, 0)' +
        'DELETE FROM [Permission] ' +
        'DBCC CHECKIDENT ([Permission], RESEED, 0)' +
        'DELETE FROM [PermissionType] ' +
        'DBCC CHECKIDENT ([PermissionType], RESEED, 0)' +
        'DELETE FROM [Tag] ' +
        'DBCC CHECKIDENT ([Tag], RESEED, 0)' +
        'DELETE FROM [TagType] '
        );

if (String(process.argv[2]).toLowerCase() === 'debug') {
    module.exports.connect()
        .then(() => module.exports.destroy())
        .then(() => module.exports.create())
        .then(() => sql.close())
        .then(() => console.log('done'))
        .catch(err => console.log(err));
}