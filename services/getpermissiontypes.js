'use strict';

const sql = require('mssql');
const config = require('../config/config.json');
const PermissionType = require('../models/permissiontype');

/**
 * Queries the PermissionType table of the SQL Server database for all Permission Types.
 * @return {Promise} A promise that will either resolve to an array of Permission Types, or reject with an error.
 */
const getPermissionTypes = () =>
    new sql.Request()
        .query('SELECT * FROM [PermissionType]')
        .then(rows => {
            let permissionTypes = [];
            rows.forEach(row => {
                permissionTypes.push(new PermissionType(row.Id, row.Code, row.Name, row.IsComponentType));
            });
            return permissionTypes;
        });

module.exports = (request, response, next) => {
    sql.connect(config.sql)
        .then(() => getPermissionTypes())
        .then(permissionTypes => {
            let result = {
                permissionTypes: permissionTypes
            };
            response.status(200).json(result)
        })
        .catch(error => {
            console.log(error); //replace with call to log service
            response.status(500).send(error.message);
        });
}