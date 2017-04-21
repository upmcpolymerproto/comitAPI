'use strict';

class User {

    constructor(id, firstName, lastName, email, groups, componenetTagPermissions, systemPermissions, isAdmin) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.groups = groups || [];
        this.componenetTagPermissions = componenetTagPermissions || [];
        this.systemPermissions = systemPermissions || [];
        this.isAdmin = isAdmin || false;
    }

};

module.exports = User;