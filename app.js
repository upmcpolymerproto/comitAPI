'use strict';

const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const port = 3000;

// import middleware
const authentication = require('./middlewares/auth').authentication;
const authorization = require('./middlewares/auth').authorization;
const renewal = require('./middlewares/auth').renewal;

// import services
const login = require('./services/login');
const renew = require('./services/renew');
const getcomponenttags = require('./services/getcomponenttags');

// create express
const app = express();

// define middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));
app.use((req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// define passport middleware
passport.use('authentication', authentication);
passport.use('authorization', authorization);
passport.use('renewal', renewal);

// define routes
app.post('/login', passport.authenticate('authentication', { session: false }), login);
app.post('/renew', passport.authenticate('renewal', { session: false }), renew);
app.get('/getcomponenttags/:contains', passport.authenticate('authorization', { session: false }), getcomponenttags);

app.listen(port, (error => {
    console.log('CoMIT API listening on port ' + port);
}));