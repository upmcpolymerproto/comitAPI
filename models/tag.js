'use strict';

class Tag {

    constructor(id, name, description, components, permissions) {
        this.id = id;
        this.name = name;
        this.description = description || '';
        this.components = components || [];
        this.permissions = permissions || [];
    }

};

module.exports = Tag;