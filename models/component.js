'use strict';

class Component {

    constructor(id, name, tags) {
        this.id = id;
        this.name = name;
        this.tags = tags || [];
    }

};

module.exports = Component;