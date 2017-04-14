'use strict';

class User {

    constructor(id, firstName, lastName, email, groups, itemPermissions, systemPermissions, isAdmin) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.groups = groups || [];
        this.itemPermissions = itemPermissions || [];
        this.systemPermissions = systemPermissions || [];
        this.isAdmin = isAdmin || false;
    }

};

module.exports = User;