'use strict';

class ComponentPermission {

    constructor(component, permissions) {
        this.component = component;
        this.permissions = permissions || [];
    }

};

module.exports = ComponentPermission;