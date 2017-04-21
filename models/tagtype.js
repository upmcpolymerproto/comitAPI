'use strict';

const BaseModel = require('./basemodel');

class TagType extends BaseModel {

    constructor(id, name) {
        super(id, name);
    }

};

module.exports = TagType;