'use strict';

const Token = require('../models/token.js');

module.exports = (request, response, next) => {
    let user = request.user;
    let jwtToken;
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
            console.log(error);
            response.status(500).send(error.message);
        });
}