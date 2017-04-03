"use strict";

const activedirectory = require("../helpers/activedirectory");
const config = require("../config/config.json");
const BearerStrategy = require("passport-azure-ad").BearerStrategy;
const Strategy = require("passport-http-bearer").Strategy;
const User = require("../models/user");
const Token = require("../models/token");

module.exports.authorization = new Strategy((token, done) => {
    Token.decode(token)
        .then(user => done(null, user))
        .catch(error => done(null, false, error.message));
});

module.exports.renewal = new Strategy((token, done) => {
    let currentUser;
    Token.decode(token, true)
        .then(user => {
            currentUser = user;
            return activedirectory.isUserActive(currentUser.id);
        })
        .then(isActive => {
            if (isActive) {
                return done(null, currentUser);
            } else {
                return Promise.reject(new Error('Error: User ' + currentUser.id + ' was not found in Active Directory'));
            }
        })
        .catch(error => done(null, false, error.message));
});

module.exports.authentication = new BearerStrategy(config.passport, (token, done) => {    
    let currentUser;
    activedirectory.findUser(token.upn)
        .then(user => {            
            if (user) {
                currentUser = new User(
                    token.upn,
                    token.given_name,
                    token.family_name,
                    user.mail,
                    user
                );
                return activedirectory.getGroupMembershipForUser(currentUser.id);
            } else {
                return Promise.reject(new Error('Error: User ' + currentUser.id + ' was not found in Active Directory'));
            }
        })
        .then(groups => {            
            if (groups) {
                currentUser.groups = [];
                groups.forEach((group) => currentUser.groups.push(group.cn));
            }
            return done(null, currentUser);
        }) // TODO this exception is not bubbling up to parent
        .catch(error => done(null, false, error.message));        
});