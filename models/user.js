'use strict';

class User {

    constructor(upn, user, permissions) {
        this.upn = upn;
        this.user = user;
        this.permissions = permissions || [];
    }

};

module.exports = User;