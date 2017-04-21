'use strict';

const BaseModel = require('./basemodel');

class Group extends BaseModel {

    constructor(id, name, isAdmin, componenetTagPermissions, systemPermissions) {
        super(id, name);
        this.isAdmin = isAdmin || false;
        this.componenetTagPermissions = componenetTagPermissions || [];
        this.systemPermissions = systemPermissions || [];
    }

};

module.exports = Group;