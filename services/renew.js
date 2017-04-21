'use strict';

const log4galaxy = require('../helpers/galaxylog');
const jwt = require('../helpers/jwt');
const Token = require('../models/token');
const GalaxyReturn = require('../models/galaxyreturn');
const GalaxyError = require('../models/galaxyerror');

module.exports = (request, response, next) => {
    let token;
    jwt.encode(request.user)
        .then(jwtToken => {
            token = jwtToken;
            return jwt.decode(jwtToken);
        })
        .then(obj => {
            let data = {
                token: new Token(obj.iat, obj.exp, token)
            };
            response.status(200).json(new GalaxyReturn(data, null));
        })
        .catch(error => {
            log4galaxy.logMessage(error);
            response.status(500).send(
                new GalaxyReturn(null, new GalaxyError('An error while renewing the Users JWT token.', error.stack, error.type))
            );
        });
}