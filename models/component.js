'use strict';

class Component {

    constructor(id, name, description, tags) {
        this.id = id;
        this.name = name;
        this.description = description || '';
        this.tags = tags || [];
    }

};

module.exports = Component;