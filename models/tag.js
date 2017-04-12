'use strict';

const BaseModel = require('./basemodel');

class Tag extends BaseModel {

    constructor(id, name, items) {
        super(id, name);
        this.items = items || [];
    }

};

module.exports = Tag;