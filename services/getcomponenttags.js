'use strict';

const sql = require('mssql');
const config = require('../config/config.json');
const Tag = require('../models/tag')

const escapeCharacter = '\\';

// temporary solution to return FAKE data
const FAKE = (contains) =>
  new Promise((resolve, reject) => {
    const randomWords = require('random-words');
    let n = 10000;
    let tags = [];
    for(let i = 0; i < n; i++){
      tags.push(new Tag(Math.floor(Math.random()*n), randomWords({ min: 1, max: 5, join: '_'})));
    }

    let filtered = [];
    for(let i = 0; i < tags.length; i++){
      if(tags[i].name.includes(contains)){
        filtered.push(tags[i]);
      }
    }
    resolve(filtered);
  });

/**
 * Escapes the following symbols in the given string: % _ [
 * @param {string} stringToEscape The string to be escaped.
 * @return {Promise} A promise that will either resolve to the escaped string, or reject with an error.
 */
const escape = (stringToEscape) =>
  new Promise((resolve, reject) => {
    let result = stringToEscape
      .replace('%', escapeCharacter + '%')
      .replace('_', escapeCharacter + '_')
      .replace('[', escapeCharacter + '[');
    resolve(result);
  })

/**
 * Queries the Tag table of the SQL Server database
 * for Tag names including or equal to the value of the given string.
 * @param {string} contains The string used to query the tag names.
 * @return {Promise} A promise that will either resolve to an array of Tags, or reject with an error.
 */
const fetchTags = (contains) =>
  new sql.Request()
    .input('tag', '%' + contains + '%')
    .input('escape', escapeCharacter)
    .query('SELECT Id, Name FROM Tag WHERE Name LIKE @tag ESCAPE @escape')
    .then(rows => {
      let filtered = [];
      rows.forEach(row => filtered.push(new Tag(row.Id, row.Name)));
      return filtered;
    });

module.exports = (request, response, next) => {
  let contains = (request.params.contains != null) ? String(request.params.contains).trim() : '';
  if (contains === '') {
    let error = new Error('Please provide a valid parameter');
    console.log(error); //replace with call to log service
    response.status(400).send(error.message);
  } else {
    sql.connect(config.sql)
      .then(() => escape(String(contains)))
      .then(escaped => FAKE(escaped))
      .then(filtered => response.status(200).json(filtered))
      .catch(error => {
        console.log(error); //replace with call to log service
        response.status(500).send(error.message);
      });
  }
}