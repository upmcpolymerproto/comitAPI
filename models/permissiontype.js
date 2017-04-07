'use strict';

class PermissionType {

    constructor(id, code, name, isComponentType) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.isComponentType = isComponentType;
    }

};

module.exports = PermissionType;