'use strict';

const Token = require('../models/token.js');

module.exports = (request, response, next) => {
    let user = request.user;
    let context = request.body.context;

    //add call to context service to get user.permissions

    Token.encode(user)
        .then(token => {
            let result = {
                user: user,
                token: token
            }
            response.status(200).json(result);
        })
        .catch(error => {
            response.status(500).send(error.message);
        });
}