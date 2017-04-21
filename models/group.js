'use strict';

const BaseModel = require('./basemodel');

class Group extends BaseModel {

    constructor(id, name, componenetTagPermissions, systemPermissions) {
        super(id, name);
        this.componenetTagPermissions = componenetTagPermissions || [];
        this.systemPermissions = systemPermissions || [];
    }

};

module.exports = Group;