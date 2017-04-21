'use strict';

const BaseModel = require('./basemodel');

class Tag extends BaseModel {

    constructor(id, name, components) {
        super(id, name);
        this.components = components || [];
    }

};

module.exports = Tag;