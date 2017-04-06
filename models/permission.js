'use strict';

class Permission {

    constructor(id, code, name, hasPermission) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.hasPermission = hasPermission || false;
    }

};

module.exports = Permission;