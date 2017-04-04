'use strict';

const Token = require('../models/token.js');
const context = require('../middlewares/context');

module.exports = (request, response, next) => {
    let user = request.user;
    let system = request.body.context;
    let jwtToken;
    // context service to get user.components & user.permissions

    /* Enable this once the database is available
    context(user, system)
        .then(userWithPermissions => {
            user = userWithPermissions;
            Token.encode(user);
        })
    */
    Token.encode(user)
        .then(token => {
            jwtToken = token;
            return Token.decode(token);
        })
        .then(obj => {
            let result = {
                user: user,
                token: {
                    "iat": obj.iat,
                    "exp": obj.exp,
                    "jwt": jwtToken
                }
            };
            response.status(200).json(result);
        })
        .catch(error => {
            response.status(500).send(error.message);
        });
}