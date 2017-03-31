'use strict';

class User {

    constructor(id, firstName, lastName, email, user, components, permissions) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.user = user;
        this.components = components || [];
        this.permissions = permissions || [];
    }

};

module.exports = User;