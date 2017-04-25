'use strict';

const context = require('../helpers/context');
const log4galaxy = require('../helpers/galaxylog');
const jwt = require('../helpers/jwt');
const Token = require('../models/token');
const GalaxyReturn = require('../models/galaxyreturn');
const GalaxyError = require('../models/galaxyerror');

module.exports = (request, response, next) => {
    let token;
    let user = request.user;
    let context = request.body.context;

    // context service to get user.components & user.permissions
    context(user, context)
        .then(userWithPermissions => jwt.encode(user = userWithPermissions))
        .then(jwtToken => jwt.decode(token = jwtToken))
        .then(obj => {
            let data = {
                user: user,
                token: new Token(obj.iat, obj.exp, token)
            };
            response.status(200).json(new GalaxyReturn(data, null));
        })
        .catch(error => {
            log4galaxy.logMessage(error);
            let friendly = 'An error occurred while obtaining permissions for the user.';
            response.status(500).send(new GalaxyReturn(null, new GalaxyError(friendly, error.stack)));
        });
}