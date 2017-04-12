'use strict';

const BaseModel = require('./basemodel');

const types = {
    SYSTEM: 'System',
    ITEM: 'Item'
};

class PermissionType extends BaseModel {

    constructor(id, name, code, isItemType) {
        super(id, name);
        this.code = code;

        if (isItemType) {
            this.type = types.ITEM
        } else {
            this.type = types.SYSTEM
        }
    }

};

module.exports = PermissionType;