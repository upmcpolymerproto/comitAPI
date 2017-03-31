'use strict';

class Permission {

    constructor(id, name, hasPermission) {
        this.id = id;
        this.name = name;
        this.hasPermission = hasPermission || false;
    }

};

module.exports = Permission;