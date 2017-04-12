'use strict';

class ItemPermission {

    constructor(item, permissions) {
        this.item = item;
        this.permissions = permissions || [];
    }

};

module.exports = ItemPermission;