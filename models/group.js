'use strict';

const BaseModel = require('./basemodel');

class Group extends BaseModel {

    constructor(id, name, roles) {
        super(id, name);
        this.roles = roles || [];
    }

};

module.exports = Group;