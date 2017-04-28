'use strict';

// SQL Server configuration
const config = require('../../config/config.json').sql;
const sql = require('mssql');

module.exports.connect = () => sql.connect(config);

module.exports.close = () => sql.close();

module.exports.create = (mock) =>
    new Promise((resolve, reject) => {
        let promises = [];
        Promise.all(promises)
            .then(() => {
                promises = [];
                if (mock.CoMIT_Group) {
                    for (let i = 0; i < mock.CoMIT_Group.length; i++) {
                        promises.push(new sql.Request()
                            .input('Id', mock.CoMIT_Group[i].Id)
                            .input('Name', mock.CoMIT_Group[i].Name)
                            .input('IsSystemAdmin', mock.CoMIT_Group[i].IsSystemAdmin)
                            .query('INSERT INTO [CoMIT_Group] (Id, Name, IsSystemAdmin) VALUES (@Id, @Name, @IsSystemAdmin)'));
                    }
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                if (mock.CoMIT_ComponentType) {
                    for (let i = 0; i < mock.CoMIT_ComponentType.length; i++) {
                        promises.push(new sql.Request()
                            .input('Id', mock.CoMIT_ComponentType[i].Id)
                            .input('Name', mock.CoMIT_ComponentType[i].Name)
                            .query('INSERT INTO [CoMIT_ComponentType] (Id, Name) VALUES (@Id, @Name)'));
                    }
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                if (mock.TagType) {
                    for (let i = 0; i < mock.TagType.length; i++) {
                        promises.push(new sql.Request()
                            .input('Id', mock.TagType[i].Id)
                            .input('Name', mock.TagType[i].Name)
                            .input('SystemName', mock.TagType[i].SystemName)
                            .query('INSERT INTO [TagType] (Id, Name, SystemName) VALUES (@Id, @Name, @SystemName)'));
                    }
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                if (mock.Tag) {
                    for (let i = 0; i < mock.Tag.length; i++) {
                        promises.push(new sql.Request()
                            .input('Id', mock.Tag[i].Id)
                            .input('Name', mock.Tag[i].Name)
                            .input('Description', mock.Tag[i].Description)
                            .input('TagTypeId', mock.Tag[i].TagTypeId)
                            .query('INSERT INTO [Tag] (Id, Name, Description, TagTypeId) VALUES (@Id, @Name, @Description, @TagTypeId)'));
                    }
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                if (mock.CoMIT_Component) {
                    for (let i = 0; i < mock.CoMIT_Component.length; i++) {
                        promises.push(new sql.Request()
                            .input('Id', mock.CoMIT_Component[i].Id)
                            .input('Name', mock.CoMIT_Component[i].Name)
                            .input('Description', mock.CoMIT_Component[i].Description)
                            .input('ComponentTypeId', mock.CoMIT_Component[i].ComponentTypeId)
                            .query('INSERT INTO [CoMIT_Component] (Id, Name, Description, ComponentTypeId) VALUES (@Id, @Name, @Description, @ComponentTypeId)'));
                    }
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                if (mock.PermissionType) {
                    for (let i = 0; i < mock.PermissionType.length; i++) {
                        promises.push(new sql.Request()
                            .input('Id', mock.PermissionType[i].Id)
                            .input('Code', mock.PermissionType[i].Code)
                            .input('Name', mock.PermissionType[i].Name)
                            .input('SystemName', mock.PermissionType[i].SystemName)
                            .input('IsSystemPermission', mock.PermissionType[i].IsSystemPermission)
                            .query('INSERT INTO [PermissionType] (Id, Code, Name, SystemName, IsSystemPermission) VALUES (@Id, @Code, @Name, @SystemName, @IsSystemPermission)'));
                    }
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                if (mock.Permission) {
                    for (let i = 0; i < mock.Permission.length; i++) {
                        promises.push(new sql.Request()
                            .input('Id', mock.Permission[i].Id)
                            .input('PermissionTypeId', mock.Permission[i].PermissionTypeId)
                            .input('Value', mock.Permission[i].Value)
                            .query('INSERT INTO [Permission] (Id, PermissionTypeId, [Value]) VALUES (@Id, @PermissionTypeId, @Value)'));
                    }
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                if (mock.CoMIT_GroupTagPermission) {
                    for (let i = 0; i < mock.CoMIT_GroupTagPermission.length; i++) {
                        promises.push(new sql.Request()
                            .input('Id', mock.CoMIT_GroupTagPermission[i].Id)
                            .input('GroupId', mock.CoMIT_GroupTagPermission[i].GroupId)
                            .input('TagId', mock.CoMIT_GroupTagPermission[i].TagId)
                            .input('PermissionId', mock.CoMIT_GroupTagPermission[i].PermissionId)
                            .query('INSERT INTO [CoMIT_GroupTagPermission] (Id, GroupId, TagId, PermissionId) VALUES (@Id, @GroupId, @TagId, @PermissionId)'));
                    }
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                if (mock.CoMIT_GroupSystemPermission) {
                    for (let i = 0; i < mock.CoMIT_GroupSystemPermission.length; i++) {
                        promises.push(new sql.Request()
                            .input('Id', mock.CoMIT_GroupSystemPermission[i].Id)
                            .input('GroupId', mock.CoMIT_GroupSystemPermission[i].GroupId)
                            .input('PermissionId', mock.CoMIT_GroupSystemPermission[i].PermissionId)
                            .query('INSERT INTO [CoMIT_GroupSystemPermission] (Id, GroupId, PermissionId) VALUES (@Id, @GroupId, @PermissionId)'));
                    }
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                if (mock.CoMIT_TagComponent) {
                    for (let i = 0; i < mock.CoMIT_TagComponent.length; i++) {
                        promises.push(new sql.Request()
                            .input('Id', mock.CoMIT_TagComponent[i].Id)
                            .input('ComponentId', mock.CoMIT_TagComponent[i].ComponentId)
                            .input('TagId', mock.CoMIT_TagComponent[i].TagId)
                            .query('INSERT INTO [CoMIT_TagComponent] (Id, ComponentId, TagId) VALUES (@Id, @ComponentId, @TagId)'));
                    }
                }
                return Promise.all(promises);
            })
            .then(() => resolve())
            .catch((error) => reject(error));
    });

module.exports.destroy = (mock) =>
    new Promise((resolve, reject) => {
        let promises = [];
        Promise.all(promises)
            .then(() => {
                promises = [];
                if (mock.CoMIT_TagComponent) {
                    for (let i = 0; i < mock.CoMIT_TagComponent.length; i++) {
                        promises.push(new sql.Request()
                            .input('Id', mock.CoMIT_TagComponent[i].Id)
                            .query('DELETE FROM [CoMIT_TagComponent] WHERE [Id] = @Id'));
                    }
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                if (mock.CoMIT_Component) {
                    for (let i = 0; i < mock.CoMIT_Component.length; i++) {
                        promises.push(new sql.Request()
                            .input('Id', mock.CoMIT_Component[i].Id)
                            .query('DELETE FROM [CoMIT_Component] WHERE [Id] = @Id'));
                    }
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                if (mock.CoMIT_ComponentType) {
                    for (let i = 0; i < mock.CoMIT_ComponentType.length; i++) {
                        promises.push(new sql.Request()
                            .input('Id', mock.CoMIT_ComponentType[i].Id)
                            .query('DELETE FROM [CoMIT_ComponentType] WHERE [Id] = @Id'));
                    }
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                if (mock.CoMIT_GroupTagPermission) {
                    for (let i = 0; i < mock.CoMIT_GroupTagPermission.length; i++) {
                        promises.push(new sql.Request()
                            .input('Id', mock.CoMIT_GroupTagPermission[i].Id)
                            .query('DELETE FROM [CoMIT_GroupTagPermission] WHERE [Id] = @Id'));
                    }
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                if (mock.CoMIT_GroupSystemPermission) {
                    for (let i = 0; i < mock.CoMIT_GroupSystemPermission.length; i++) {
                        promises.push(new sql.Request()
                            .input('Id', mock.CoMIT_GroupSystemPermission[i].Id)
                            .query('DELETE FROM [CoMIT_GroupSystemPermission] WHERE [Id] = @Id'));
                    }
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                if (mock.CoMIT_Group) {
                    for (let i = 0; i < mock.CoMIT_Group.length; i++) {
                        promises.push(new sql.Request()
                            .input('Id', mock.CoMIT_Group[i].Id)
                            .query('DELETE FROM [CoMIT_Group] WHERE [Id] = @Id'));
                    }
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                if (mock.Permission) {
                    for (let i = 0; i < mock.Permission.length; i++) {
                        promises.push(new sql.Request()
                            .input('Id', mock.Permission[i].Id)
                            .query('DELETE FROM [Permission] WHERE [Id] = @Id'));
                    }
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                if (mock.PermissionType) {
                    for (let i = 0; i < mock.PermissionType.length; i++) {
                        promises.push(new sql.Request()
                            .input('Id', mock.PermissionType[i].Id)
                            .query('DELETE FROM [PermissionType] WHERE [Id] = @Id'));
                    }
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                if (mock.Tag) {
                    for (let i = 0; i < mock.Tag.length; i++) {
                        promises.push(new sql.Request()
                            .input('Id', mock.Tag[i].Id)
                            .query('DELETE FROM [Tag] WHERE [Id] = @Id'));
                    }
                }
                return Promise.all(promises);
            })
            .then(() => {
                promises = [];
                if (mock.TagType) {
                    for (let i = 0; i < mock.TagType.length; i++) {
                        promises.push(new sql.Request()
                            .input('Id', mock.TagType[i].Id)
                            .query('DELETE FROM [TagType] WHERE [Id] = @Id'));
                    }
                }
                return Promise.all(promises);
            })
            .then(() => resolve())
            .catch((error) => reject(error));
    });