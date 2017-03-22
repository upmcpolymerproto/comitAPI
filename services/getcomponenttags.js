'use strict';

const sql = require('mssql');
const config = require('../config/config.json');

/**
 * Queries the ComponentTags table of the Azure SQL database
 * for Component Tag names including or equal to the value of the given string.
 * @param {TableService} tableService The connection to the Azure Table database
 * @return {Promise} A promise that will either resolve to an array of Component Tags, or reject with an error.
 */
const fetchComponentTags = (contains) =>
  new sql.Request()
    .input('tag', '%' + contains + '%')
    .query('SELECT ComponentTag FROM ComponentTags WHERE ComponentTag LIKE @tag')
    .then(rows => {
      let filtered = []
      rows.forEach(row => filtered.push(row.ComponentTag));
      return filtered;
    });

module.exports = (request, response, next) => {
  var contains = request.params.contains;
  if (!contains) {
    let error = new Error('Please provide GetComponentTags with a valid parameter');
    console.log(error); //replace with call to log service
    response.status(400).send(error.message);
  } else {
    sql.connect(config.sql)
      .then(() => fetchComponentTags(contains))
      .then(filtered => response.status(200).json(filtered))
      .catch(error => {
        console.log(error); //replace with call to log service
        response.status(500).send(error.message);
      });
  }
}