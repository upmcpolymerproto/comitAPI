'use strict';

const BaseModel  = require('./basemodel');

class Group extends BaseModel {

    constructor(id, name) {
        super(id, name);
    }

};

module.exports = Group;