'use strict';

// SQL Server configuration
const config = require('../../config/config.json').sql;
const sql = require('mssql');
const states = require('./states.json');

module.exports.connect = () => sql.connect(config);

module.exports.close = () => sql.close();

module.exports.create = () =>
    new Promise((resolve, reject) => {
        for (let i = 0; i < states.length; i++) {
            new sql.Request()
                .input('Id', states[i].abbreviation)
                .input('Name', states[i].name)
                .input('Description', "")
                .input('GroupId', i)
                .input('PermissionId', i)
                .query('INSERT INTO Tag (Id, Name, Description, GroupId, PermissionId) VALUES (@Id, @Name, @Description, @GroupId, @PermissionId)')
                .catch(error => reject(error));
        }
        resolve();
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


// module.exports.connect()
//     .then(() => module.exports.destroy())
//     .then(() => module.exports.create())
//     .then(() => sql.close())
//     .then(() => console.log('done'))
//     .catch(err => console.log(err));