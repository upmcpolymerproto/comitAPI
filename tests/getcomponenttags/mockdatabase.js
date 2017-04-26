'use strict';

// SQL Server configuration
const config = require('../../config/config.json').sql;
const sql = require('mssql');
const componentTags = require('./componenttags.json');

// create temporary TagType
const tagTypeId = '3ECE8042-34D6-482A-9537-85CEF24DBC70';

module.exports.connect = () => sql.connect(config);

module.exports.close = () => sql.close();

module.exports.create = () =>
    new sql.Request()
        .input('Id', tagTypeId)
        .input('Name', 'not_a_real_tag')
        .input('SystemName', 'not_a_real_system')
        .query('INSERT INTO TagType (Id, Name, SystemName) VALUES (@Id, @Name, @SystemName)')
        .then(() => {
            let promises = [];
            for (let i = 0; i < componentTags.length; i++) {
                promises.push(
                    new sql.Request()
                        .input('Name', componentTags[i].name)
                        .input('Description', "")
                        .input('TagTypeId', tagTypeId)
                        .query('INSERT INTO Tag (Name, Description, TagTypeId) VALUES (@Name, @Description, @TagTypeId)'));
            }
            return Promise.all(promises);
        })

module.exports.destroy = () => {
    let promises = [];
    for (let i = 0; i < componentTags.length; i++) {
        promises.push(
            new sql.Request()
                .input('Name', componentTags[i].name)
                .query('DELETE FROM Tag WHERE Name = @Name'));
    }
    return Promise.all(promises)
        .then(() =>
            new sql.Request()
                .input('Id', tagTypeId)
                .query('DELETE FROM TagType WHERE Id = @Id')
        );
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