'use strict';

const BaseModel = require('./basemodel');

class ItemType extends BaseModel {

    constructor(id, name) {
        super(id, name);
    }

};

module.exports = ItemType;