'use strict';

const BaseModel = require('./basemodel');
const ComponentTypes = require('./enums/componenttypes.json');

class Component extends BaseModel {

    constructor(id, name, type, tags) {
        super(id, name);
        this.type = ComponentTypes[type] || '';
        this.tags = tags || [];
    }

};

module.exports = Component;