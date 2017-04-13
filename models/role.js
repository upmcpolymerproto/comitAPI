'use strict';

const BaseModel = require('./basemodel');

class Role extends BaseModel {

    constructor(id, name, itemPermissions, systemPermissions) {
        super(id, name);
        this.itemPermissions = itemPermissions || [];
        this.systemPermissions = systemPermissions || [];
    }

};

module.exports = Role;