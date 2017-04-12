'use strict';

class User {

    constructor(id, firstName, lastName, email, groups, roles, permissions) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.groups = groups || [];
        this.roles = roles || [];
        this.permissions = permissions || [];
    }

};

module.exports = User;