'use strict';

const ComponentTagPermission = require('../../models/componenttagpermission');
const Permission = require('../../models/permission');
const PermissionType = require('../../models/permissiontype');
const Tag = require('../../models/tag');
const mockDb = require('../mock/mockdatabase');
const mockData = require('./mock.json');
const chai = require('chai');
const sinon = require('sinon');

const should = require('chai').should();
chai.use(require('sinon-chai'));

const context = require('../../helpers/context');

describe('context', function () {

    // create mock data
    before(() =>
        mockDb.connect()
            .then(() => mockDb.destroy(mockData))
            .then(() => mockDb.create(mockData))
            .then(() => mockDb.close())
            .catch(err => console.log(err))
    );

    // destroy mock data
    after(() =>
        mockDb.connect()
            .then(() => mockDb.destroy(mockData))
            .then(() => mockDb.close())
            .catch(err => console.log(err))
    );

    describe('Invalid Context', function () {
        it('should return an error when called with " " (blank space)', function () {
            const system = ' ';
            const user = {
                groups: []
            };

            return context(user, system)
                .catch(error => {
                    should.exist(error);
                });
        });
        it('should return an error when called with "" (empty string)', function () {
            const system = '';
            const user = {
                groups: []
            };

            return context(user, system)
                .catch(error => {
                    should.exist(error);
                });
        });
        it('should return an error when called with undefined', function () {
            const system = undefined;
            const user = {
                groups: []
            };

            return context(user, system)
                .catch(error => {
                    should.exist(error);
                });
        });
        it('should return an error when called with null', function () {
            const system = null;
            const user = {
                groups: []
            };

            return context(user, system)
                .catch(error => {
                    should.exist(error);
                });
        });
        it('should return an error when called with 0', function () {
            const system = 0;
            const user = {
                groups: []
            };

            return context(user, system)
                .catch(error => {
                    should.exist(error);
                });
        });
        it('should return an error when called with 1', function () {
            const system = 1;
            const user = {
                groups: []
            };

            return context(user, system)
                .catch(error => {
                    should.exist(error);
                });
        });
        it('should return an error when called with false', function () {
            const system = false;
            const user = {
                groups: []
            };

            return context(user, system)
                .catch(error => {
                    should.exist(error);
                });
        });
        it('should return an error when called with true', function () {
            const system = true;
            const user = {
                groups: []
            };

            return context(user, system)
                .catch(error => {
                    should.exist(error);
                });
        });
        it('should return an error when called with an object', function () {
            const system = {
                system: "comit"
            };
            const user = {
                groups: []
            };

            return context(user, system)
                .catch(error => {
                    should.exist(error);
                });
        });
        it('should return an error when called with an array', function () {
            const system = ['comit', 'galaxy', 'mars'];
            const user = {
                groups: []
            };

            return context(user, system)
                .catch(error => {
                    should.exist(error);
                });
        });
        it('should return an error when called with an empty array', function () {
            const system = [];
            const user = {
                groups: []
            };

            return context(user, system)
                .catch(error => {
                    should.exist(error);
                });
        });
        it('should return an error when called with a string "galaxy" (context doesnt exist)', function () {
            const system = 'galaxy';
            const user = {
                groups: []
            };

            return context(user, system)
                .catch(error => {
                    should.exist(error);
                });
        });
    });
    describe('CoMIT', function () {

        describe('User belongs to an Administrative Group', function () {
            it('should return a User marked as an administrator with no Permissions when the given User belongs to one administrative group', function () {
                const system = 'comit';
                const user = {
                    groups: ['ADMIN1']
                };

                return context(user, system)
                    .then(user => {
                        should.exist(user);
                        should.exist(user.isAdmin);
                        user.isAdmin.should.be.a('boolean');
                        user.isAdmin.should.equal(true);

                        should.exist(user.systemPermissions);
                        user.systemPermissions.should.be.an('array');
                        user.systemPermissions.should.be.eql([]);
                        user.systemPermissions.length.should.be.equal(0);

                        should.exist(user.componentTagPermissions);
                        user.componentTagPermissions.should.be.an('array');
                        user.componentTagPermissions.should.be.eql([]);
                        user.componentTagPermissions.length.should.be.equal(0);
                    });
            });
            it('should return a User marked as an administrator with no Permissions when the given User belongs to multiple administrative groups', function () {
                const system = 'comit';
                const user = {
                    groups: ['ADMIN1', 'ADMIN2']
                };

                return context(user, system)
                    .then(user => {
                        should.exist(user);
                        should.exist(user.isAdmin);
                        user.isAdmin.should.be.a('boolean');
                        user.isAdmin.should.equal(true);

                        should.exist(user.systemPermissions);
                        user.systemPermissions.should.be.an('array');
                        user.systemPermissions.should.be.eql([]);
                        user.systemPermissions.length.should.be.equal(0);

                        should.exist(user.componentTagPermissions);
                        user.componentTagPermissions.should.be.an('array');
                        user.componentTagPermissions.should.be.eql([]);
                        user.componentTagPermissions.length.should.be.equal(0);
                    });
            });
        });
        describe('User does not belong to an Administrative Group and has neither System nor Component Tag Permissions', function () {
            it('should return a User with no Permissions when the given User belongs to no groups', function () {
                const system = 'comit';
                const user = {
                    groups: []
                };

                return context(user, system)
                    .then(user => {
                        should.exist(user);
                        should.exist(user.isAdmin);
                        user.isAdmin.should.be.a('boolean');
                        user.isAdmin.should.equal(false);

                        should.exist(user.systemPermissions);
                        user.systemPermissions.should.be.an('array');
                        user.systemPermissions.should.be.eql([]);
                        user.systemPermissions.length.should.be.equal(0);

                        should.exist(user.componentTagPermissions);
                        user.componentTagPermissions.should.be.an('array');
                        user.componentTagPermissions.should.be.eql([]);
                        user.componentTagPermissions.length.should.be.equal(0);
                    });
            });
            it('should return a User with no Permissions when the given User belongs to one group with no Permissions', function () {
                const system = 'comit';
                const user = {
                    groups: ['NONE1']
                };

                return context(user, system)
                    .then(user => {
                        should.exist(user);
                        should.exist(user.isAdmin);
                        user.isAdmin.should.be.a('boolean');
                        user.isAdmin.should.equal(false);

                        should.exist(user.systemPermissions);
                        user.systemPermissions.should.be.an('array');
                        user.systemPermissions.should.be.eql([]);
                        user.systemPermissions.length.should.be.equal(0);

                        should.exist(user.componentTagPermissions);
                        user.componentTagPermissions.should.be.an('array');
                        user.componentTagPermissions.should.be.eql([]);
                        user.componentTagPermissions.length.should.be.equal(0);
                    });
            });
            it('should return a User with no Permissions when the given User belongs to many groups with no Permissions', function () {
                const system = 'comit';
                const user = {
                    groups: ['NONE1', 'NONE2']
                };

                return context(user, system)
                    .then(user => {
                        should.exist(user);
                        should.exist(user.isAdmin);
                        user.isAdmin.should.be.a('boolean');
                        user.isAdmin.should.equal(false);

                        should.exist(user.systemPermissions);
                        user.systemPermissions.should.be.an('array');
                        user.systemPermissions.should.be.eql([]);
                        user.systemPermissions.length.should.be.equal(0);

                        should.exist(user.componentTagPermissions);
                        user.componentTagPermissions.should.be.an('array');
                        user.componentTagPermissions.should.be.eql([]);
                        user.componentTagPermissions.length.should.be.equal(0);
                    });
            });
        });
        describe('User only has System Permissions', function () {
            it('should return a User with System Permissions when the given User belongs to one group with System Permissions', function () {
                const system = 'comit';
                const user = {
                    groups: ['SYSTEM1']
                };

                return context(user, system)
                    .then(user => {
                        should.exist(user);
                        should.exist(user.isAdmin);
                        user.isAdmin.should.be.a('boolean');
                        user.isAdmin.should.equal(false);

                        should.exist(user.systemPermissions);
                        user.systemPermissions.should.be.an('array');
                        user.systemPermissions.length.should.be.above(0);

                        for (let permission of user.systemPermissions) {
                            permission.should.be.an.instanceOf(Permission);
                            should.exist(permission.id);
                            permission.id.should.be.a('string');
                            should.exist(permission.hasPermission);
                            permission.hasPermission.should.be.a('boolean');

                            should.exist(permission.type);
                            permission.type.should.be.an.instanceOf(PermissionType);
                            should.exist(permission.type.id);
                            permission.type.id.should.be.a('string');
                            should.exist(permission.type.name);
                            permission.type.name.should.be.a('string');
                            should.exist(permission.type.code);
                            permission.type.code.should.be.a('string');
                            should.exist(permission.type.type);
                            permission.type.type.should.be.a('string');
                            permission.type.type.should.eql('System');
                        }

                        should.exist(user.componentTagPermissions);
                        user.componentTagPermissions.should.be.an('array');
                        user.componentTagPermissions.should.be.eql([]);
                        user.componentTagPermissions.length.should.be.equal(0);
                    });
            });
            it('should return a User with System Permissions when the given User belongs to many groups with System Permissions', function () {
                const system = 'comit';
                const user = {
                    groups: ['SYSTEM1', 'SYSTEM2']
                };

                return context(user, system)
                    .then(user => {
                        should.exist(user);
                        should.exist(user.isAdmin);
                        user.isAdmin.should.be.a('boolean');
                        user.isAdmin.should.equal(false);

                        should.exist(user.systemPermissions);
                        user.systemPermissions.should.be.an('array');
                        user.systemPermissions.length.should.be.above(0);

                        for (let permission of user.systemPermissions) {
                            permission.should.be.an.instanceOf(Permission);
                            should.exist(permission.id);
                            permission.id.should.be.a('string');
                            should.exist(permission.hasPermission);
                            permission.hasPermission.should.be.a('boolean');

                            should.exist(permission.type);
                            permission.type.should.be.an.instanceOf(PermissionType);
                            should.exist(permission.type.id);
                            permission.type.id.should.be.a('string');
                            should.exist(permission.type.name);
                            permission.type.name.should.be.a('string');
                            should.exist(permission.type.code);
                            permission.type.code.should.be.a('string');
                            should.exist(permission.type.type);
                            permission.type.type.should.be.a('string');
                            permission.type.type.should.eql('System');
                        }

                        should.exist(user.componentTagPermissions);
                        user.componentTagPermissions.should.be.an('array');
                        user.componentTagPermissions.should.be.eql([]);
                        user.componentTagPermissions.length.should.be.equal(0);
                    });
            });
        });
        describe('User only has Component Tag Permissions', function () {
            it('should return a User with Component Tag Permissions when the given User belongs to one group with Component Tag Permissions', function () {
                const system = 'comit';
                const user = {
                    groups: ['TAG1']
                };

                return context(user, system)
                    .then(user => {
                        should.exist(user);
                        should.exist(user.isAdmin);
                        user.isAdmin.should.be.a('boolean');
                        user.isAdmin.should.equal(false);

                        should.exist(user.systemPermissions);
                        user.systemPermissions.should.be.an('array');
                        user.systemPermissions.should.be.eql([]);
                        user.systemPermissions.length.should.be.equal(0);

                        should.exist(user.componentTagPermissions);
                        user.componentTagPermissions.should.be.an('array');
                        user.componentTagPermissions.length.should.be.above(0);

                        for (let componentTagPermission of user.componentTagPermissions) {
                            componentTagPermission.should.be.an.instanceOf(ComponentTagPermission);

                            should.exist(componentTagPermission.tag);
                            componentTagPermission.tag.should.be.an.instanceOf(Tag);
                            should.exist(componentTagPermission.tag.id);
                            componentTagPermission.tag.id.should.be.a('string');
                            should.exist(componentTagPermission.tag.name);
                            componentTagPermission.tag.name.should.be.a('string');

                            should.exist(componentTagPermission.permissions);
                            componentTagPermission.permissions.should.be.an('array');
                            componentTagPermission.permissions.length.should.be.above(0);

                            for (let permission of componentTagPermission.permissions) {
                                should.exist(permission.id);
                                permission.id.should.be.a('string');
                                should.exist(permission.hasPermission);
                                permission.hasPermission.should.be.a('boolean');

                                should.exist(permission.type);
                                permission.type.should.be.an.instanceOf(PermissionType);
                                should.exist(permission.type.id);
                                permission.type.id.should.be.a('string');
                                should.exist(permission.type.name);
                                permission.type.name.should.be.a('string');
                                should.exist(permission.type.code);
                                permission.type.code.should.be.a('string');
                                should.exist(permission.type.type);
                                permission.type.type.should.be.a('string');
                                permission.type.type.should.eql('Component');
                            }
                        }
                    });
            });
            it('should return a User with Component Tag Permissions when the given User belongs to many groups with Component Tag Permissions', function () {
                const system = 'comit';
                const user = {
                    groups: ['TAG1', 'TAG2']
                };

                return context(user, system)
                    .then(user => {
                        should.exist(user);
                        should.exist(user.isAdmin);
                        user.isAdmin.should.be.a('boolean');
                        user.isAdmin.should.equal(false);

                        should.exist(user.systemPermissions);
                        user.systemPermissions.should.be.an('array');
                        user.systemPermissions.should.be.eql([]);
                        user.systemPermissions.length.should.be.equal(0);

                        should.exist(user.componentTagPermissions);
                        user.componentTagPermissions.should.be.an('array');
                        user.componentTagPermissions.length.should.be.above(0);

                        for (let componentTagPermission of user.componentTagPermissions) {
                            componentTagPermission.should.be.an.instanceOf(ComponentTagPermission);

                            should.exist(componentTagPermission.tag);
                            componentTagPermission.tag.should.be.an.instanceOf(Tag);
                            should.exist(componentTagPermission.tag.id);
                            componentTagPermission.tag.id.should.be.a('string');
                            should.exist(componentTagPermission.tag.name);
                            componentTagPermission.tag.name.should.be.a('string');

                            should.exist(componentTagPermission.permissions);
                            componentTagPermission.permissions.should.be.an('array');
                            componentTagPermission.permissions.length.should.be.above(0);

                            for (let permission of componentTagPermission.permissions) {
                                should.exist(permission.id);
                                permission.id.should.be.a('string');
                                should.exist(permission.hasPermission);
                                permission.hasPermission.should.be.a('boolean');

                                should.exist(permission.type);
                                permission.type.should.be.an.instanceOf(PermissionType);
                                should.exist(permission.type.id);
                                permission.type.id.should.be.a('string');
                                should.exist(permission.type.name);
                                permission.type.name.should.be.a('string');
                                should.exist(permission.type.code);
                                permission.type.code.should.be.a('string');
                                should.exist(permission.type.type);
                                permission.type.type.should.be.a('string');
                                permission.type.type.should.eql('Component');
                            }
                        }
                    });
            });
        });
        describe('User has both System and Component Tag Permissions', function () {
            it('should return a User with System and Component Tag Permissions when the given User belongs to one group with both System and Component Tag Permissions', function () {
                const system = 'comit';
                const user = {
                    groups: ['BOTH1']
                };

                return context(user, system)
                    .then(user => {
                        should.exist(user);
                        should.exist(user.isAdmin);
                        user.isAdmin.should.be.a('boolean');
                        user.isAdmin.should.equal(false);

                        should.exist(user.systemPermissions);
                        user.systemPermissions.should.be.an('array');
                        user.systemPermissions.length.should.be.above(0);

                        for (let permission of user.systemPermissions) {
                            permission.should.be.an.instanceOf(Permission);
                            should.exist(permission.id);
                            permission.id.should.be.a('string');
                            should.exist(permission.hasPermission);
                            permission.hasPermission.should.be.a('boolean');

                            should.exist(permission.type);
                            permission.type.should.be.an.instanceOf(PermissionType);
                            should.exist(permission.type.id);
                            permission.type.id.should.be.a('string');
                            should.exist(permission.type.name);
                            permission.type.name.should.be.a('string');
                            should.exist(permission.type.code);
                            permission.type.code.should.be.a('string');
                            should.exist(permission.type.type);
                            permission.type.type.should.be.a('string');
                            permission.type.type.should.eql('System');
                        }

                        should.exist(user.componentTagPermissions);
                        user.componentTagPermissions.should.be.an('array');
                        user.componentTagPermissions.length.should.be.above(0);

                        for (let componentTagPermission of user.componentTagPermissions) {
                            componentTagPermission.should.be.an.instanceOf(ComponentTagPermission);

                            should.exist(componentTagPermission.tag);
                            componentTagPermission.tag.should.be.an.instanceOf(Tag);
                            should.exist(componentTagPermission.tag.id);
                            componentTagPermission.tag.id.should.be.a('string');
                            should.exist(componentTagPermission.tag.name);
                            componentTagPermission.tag.name.should.be.a('string');

                            should.exist(componentTagPermission.permissions);
                            componentTagPermission.permissions.should.be.an('array');
                            componentTagPermission.permissions.length.should.be.above(0);

                            for (let permission of componentTagPermission.permissions) {
                                should.exist(permission.id);
                                permission.id.should.be.a('string');
                                should.exist(permission.hasPermission);
                                permission.hasPermission.should.be.a('boolean');

                                should.exist(permission.type);
                                permission.type.should.be.an.instanceOf(PermissionType);
                                should.exist(permission.type.id);
                                permission.type.id.should.be.a('string');
                                should.exist(permission.type.name);
                                permission.type.name.should.be.a('string');
                                should.exist(permission.type.code);
                                permission.type.code.should.be.a('string');
                                should.exist(permission.type.type);
                                permission.type.type.should.be.a('string');
                                permission.type.type.should.eql('Component');
                            }
                        }
                    });
            });
            it('should return a User with System and Component Tag Permissions when the given User belongs to one group with System Permissions and another group with Component Tag Permissions', function () {
                const system = 'comit';
                const user = {
                    groups: ['SYSTEM1', 'TAG1']
                };

                return context(user, system)
                    .then(user => {
                        should.exist(user);
                        should.exist(user.isAdmin);
                        user.isAdmin.should.be.a('boolean');
                        user.isAdmin.should.equal(false);

                        should.exist(user.systemPermissions);
                        user.systemPermissions.should.be.an('array');
                        user.systemPermissions.length.should.be.above(0);

                        for (let permission of user.systemPermissions) {
                            permission.should.be.an.instanceOf(Permission);
                            should.exist(permission.id);
                            permission.id.should.be.a('string');
                            should.exist(permission.hasPermission);
                            permission.hasPermission.should.be.a('boolean');

                            should.exist(permission.type);
                            permission.type.should.be.an.instanceOf(PermissionType);
                            should.exist(permission.type.id);
                            permission.type.id.should.be.a('string');
                            should.exist(permission.type.name);
                            permission.type.name.should.be.a('string');
                            should.exist(permission.type.code);
                            permission.type.code.should.be.a('string');
                            should.exist(permission.type.type);
                            permission.type.type.should.be.a('string');
                            permission.type.type.should.eql('System');
                        }

                        should.exist(user.componentTagPermissions);
                        user.componentTagPermissions.should.be.an('array');
                        user.componentTagPermissions.length.should.be.above(0);

                        for (let componentTagPermission of user.componentTagPermissions) {
                            componentTagPermission.should.be.an.instanceOf(ComponentTagPermission);

                            should.exist(componentTagPermission.tag);
                            componentTagPermission.tag.should.be.an.instanceOf(Tag);
                            should.exist(componentTagPermission.tag.id);
                            componentTagPermission.tag.id.should.be.a('string');
                            should.exist(componentTagPermission.tag.name);
                            componentTagPermission.tag.name.should.be.a('string');

                            should.exist(componentTagPermission.permissions);
                            componentTagPermission.permissions.should.be.an('array');
                            componentTagPermission.permissions.length.should.be.above(0);

                            for (let permission of componentTagPermission.permissions) {
                                should.exist(permission.id);
                                permission.id.should.be.a('string');
                                should.exist(permission.hasPermission);
                                permission.hasPermission.should.be.a('boolean');

                                should.exist(permission.type);
                                permission.type.should.be.an.instanceOf(PermissionType);
                                should.exist(permission.type.id);
                                permission.type.id.should.be.a('string');
                                should.exist(permission.type.name);
                                permission.type.name.should.be.a('string');
                                should.exist(permission.type.code);
                                permission.type.code.should.be.a('string');
                                should.exist(permission.type.type);
                                permission.type.type.should.be.a('string');
                                permission.type.type.should.eql('Component');
                            }
                        }
                    });
            });
            it('should return a User with System and Component Tag Permissions when the given User belongs to many groups with both System and Component Tag Permissions', function () {
                const system = 'comit';
                const user = {
                    groups: ['BOTH1', 'BOTH2']
                };

                return context(user, system)
                    .then(user => {
                        should.exist(user);
                        should.exist(user.isAdmin);
                        user.isAdmin.should.be.a('boolean');
                        user.isAdmin.should.equal(false);

                        should.exist(user.systemPermissions);
                        user.systemPermissions.should.be.an('array');
                        user.systemPermissions.length.should.be.above(0);

                        for (let permission of user.systemPermissions) {
                            permission.should.be.an.instanceOf(Permission);
                            should.exist(permission.id);
                            permission.id.should.be.a('string');
                            should.exist(permission.hasPermission);
                            permission.hasPermission.should.be.a('boolean');

                            should.exist(permission.type);
                            permission.type.should.be.an.instanceOf(PermissionType);
                            should.exist(permission.type.id);
                            permission.type.id.should.be.a('string');
                            should.exist(permission.type.name);
                            permission.type.name.should.be.a('string');
                            should.exist(permission.type.code);
                            permission.type.code.should.be.a('string');
                            should.exist(permission.type.type);
                            permission.type.type.should.be.a('string');
                            permission.type.type.should.eql('System');
                        }

                        should.exist(user.componentTagPermissions);
                        user.componentTagPermissions.should.be.an('array');
                        user.componentTagPermissions.length.should.be.above(0);

                        for (let componentTagPermission of user.componentTagPermissions) {
                            componentTagPermission.should.be.an.instanceOf(ComponentTagPermission);

                            should.exist(componentTagPermission.tag);
                            componentTagPermission.tag.should.be.an.instanceOf(Tag);
                            should.exist(componentTagPermission.tag.id);
                            componentTagPermission.tag.id.should.be.a('string');
                            should.exist(componentTagPermission.tag.name);
                            componentTagPermission.tag.name.should.be.a('string');

                            should.exist(componentTagPermission.permissions);
                            componentTagPermission.permissions.should.be.an('array');
                            componentTagPermission.permissions.length.should.be.above(0);

                            for (let permission of componentTagPermission.permissions) {
                                should.exist(permission.id);
                                permission.id.should.be.a('string');
                                should.exist(permission.hasPermission);
                                permission.hasPermission.should.be.a('boolean');

                                should.exist(permission.type);
                                permission.type.should.be.an.instanceOf(PermissionType);
                                should.exist(permission.type.id);
                                permission.type.id.should.be.a('string');
                                should.exist(permission.type.name);
                                permission.type.name.should.be.a('string');
                                should.exist(permission.type.code);
                                permission.type.code.should.be.a('string');
                                should.exist(permission.type.type);
                                permission.type.type.should.be.a('string');
                                permission.type.type.should.eql('Component');
                            }
                        }
                    });
            });
        });
    });
    describe('MARS', function () {
    });
});