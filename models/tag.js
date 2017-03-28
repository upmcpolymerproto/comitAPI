'use strict';

class Tag {

    constructor(id, name, components, permissions) {
        this.id = id;
        this.name = name;
        this.components = components || [];
        this.permissions = permissions || [];
    }

};

module.exports = Tag;