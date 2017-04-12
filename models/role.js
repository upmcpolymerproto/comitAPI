'use strict';

const BaseModel  = require('./basemodel');

class Role extends BaseModel {

    constructor(id, name, items, permissions) {
        super(id, name);
        this.items = items || [];
        this.permissions = permissions || [];
    }

};

module.exports = Role;