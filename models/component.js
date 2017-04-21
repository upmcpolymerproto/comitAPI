'use strict';

const BaseModel = require('./basemodel');

class Component extends BaseModel {

    constructor(id, name, type, tags) {
        super(id, name);
        this.type = type;
        this.tags = tags || [];
    }

};

module.exports = Component;