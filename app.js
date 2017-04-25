'use strict';

const express = require('express');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;

// import middleware
const authentication = require('./middlewares/auth').authentication;
const authorization = require('./middlewares/auth').authorization;
const renewal = require('./middlewares/auth').renewal;

// import services
const login = require('./services/login');
const renew = require('./services/renew');
const getadgroups = require('./services/getadgroups');
const getcomponenttags = require('./services/getcomponenttags');
const getpermissiontypes = require('./services/getpermissiontypes');
const email = require('./services/email');

// create express
const app = express();

// define middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors());

// define passport middleware
passport.use('authentication', authentication);
passport.use('authorization', authorization);
passport.use('renewal', renewal);

// define routes
app.post('/login', passport.authenticate('authentication', { session: false }), login);
app.post('/renew', passport.authenticate('renewal', { session: false }), renew);
app.get('/getadgroups/:startsWith', passport.authenticate('authorization', { session: false }), getadgroups);
app.get('/getcomponenttags/:contains', passport.authenticate('authorization', { session: false }), getcomponenttags);
app.get('/getpermissiontypes/:systemName', passport.authenticate('authorization', { session: false }), getpermissiontypes);
app.post('/email', email);

app.listen(port, (error => {
    console.log('Galaxy API listening on port ' + port);
}));