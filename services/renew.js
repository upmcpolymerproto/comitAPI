'use strict';

const Token = require('../models/token.js');

module.exports = (request, response, next) => {
    let user = request.user;
    Token.encode(user)
        .then(token => {
            let result = {
                user: user,
                token: token
            }
            response.status(200).json(result);
        })
        .catch(error => {
            console.log(error);
            response.status(500).send(error.message);
        });
}