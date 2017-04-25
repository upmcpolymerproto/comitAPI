'use strict';

// SQL Server configuration
const config = require('../../config/config.json').sql;
const sql = require('mssql');
const permissions = require('./permissiontypes.json');

module.exports.connect = () => sql.connect(config);

module.exports.close = () => sql.close();

module.exports.create = () => {
    let promises = [];
    for (let i = 0; i < permissions.length; i++) {
        promises.push(
            new sql.Request()
                .input('Id', permissions[i].Id)
                .input('Name', permissions[i].Name)
                .input('Code', permissions[i].Name)
                .input('SystemName', permissions[i].SystemName)
                .input('IsSystemPermission', permissions[i].IsSystemPermission)
                .query('INSERT INTO [PermissionType] ([Id], [Name], [Code], [SystemName], [IsSystemPermission]) ' +
                'VALUES (@Id, @Name, @Code, @SystemName, @IsSystemPermission)'
                ));
    }
    return Promise.all(promises);
}

module.exports.destroy = () => {
    let promises = [];
    for (let i = 0; i < permissions.length; i++) {
        promises.push(
            new sql.Request()
                .input('Id', permissions[i].Id)
                .query('DELETE FROM [PermissionType] WHERE [Id] = @Id'));
    }
    return Promise.all(promises)
}

if (String(process.argv[2]).toLowerCase() === 'create') {
    module.exports.connect()
        .then(() => module.exports.destroy())
        .then(() => module.exports.create())
        .then(() => sql.close())
        .then(() => console.log('created'))
        .catch(err => console.log(err));
} else if (String(process.argv[2]).toLowerCase() === 'destroy') {
    module.exports.connect()
        .then(() => module.exports.destroy())
        .then(() => sql.close())
        .then(() => console.log('destroyed'))
        .catch(err => console.log(err));
}