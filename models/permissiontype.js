'use strict';

const BaseModel = require('./basemodel');

const types = {
    SYSTEM: 'System',
    COMPONENT: 'Component'
};

class PermissionType extends BaseModel {

    constructor(id, name, code, isSystemType) {
        super(id, name);
        this.code = code;

        if (isSystemType) {
            this.type = types.SYSTEM
        } else {
            this.type = types.COMPONENT
        }
    }

};

module.exports = PermissionType;