'use strict';

const db = require('../helpers/galaxydb');
const log4galaxy = require('../helpers/galaxylog');
const GalaxyReturn = require('../models/galaxyreturn');
const GalaxyError = require('../models/galaxyerror');

module.exports = (request, response, next) => {
  let contains = (request.params.contains != null) ? String(request.params.contains).trim() : '';
  if (contains === '') {
    let error = new Error('Please provide a valid parameter for the search');
    log4galaxy.logMessage(error);
    response.status(400).send(new GalaxyReturn(null, new GalaxyError(error.message, error.stack)));
  } else {
    db.getComitTagsByContains(contains)
      .then(tags => {
        let data = {
          tags: tags
        };
        response.status(200).json(new GalaxyReturn(data, null));
      })
      .catch(error => {
        log4galaxy.logMessage(error);
        let friendly = 'An error occurred while fetching Component Tags.';
        response.status(500).send(new GalaxyReturn(null, new GalaxyError(friendly, error.stack)));
      });
  }
}