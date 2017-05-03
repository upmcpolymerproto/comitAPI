'use strict';

const BaseModel = require('./basemodel');

class Tag extends BaseModel {

    constructor(id, name, type, components) {
        super(id, name);
        this.type = type;
        this.components = components || [];
    }

};

module.exports = Tag;