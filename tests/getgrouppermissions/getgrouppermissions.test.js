'use strict';

const ComponentTagPermission = require('../../models/componenttagpermission');
const Permission = require('../../models/permission');
const PermissionType = require('../../models/permissiontype');
const Tag = require('../../models/tag');
const GalaxyReturn = require('../../models/galaxyreturn');
const GalaxyError = require('../../models/galaxyerror');
const mockDb = require('../mock/mockdatabase');
const mockData = require('./mock.json');
const chai = require('chai');
const sinon = require('sinon');

const should = require('chai').should();
chai.use(require('sinon-chai'));

const GetGroupPermissions = require('../../services/getgrouppermissions');

describe('GetGroupPermissions', function () {

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

    describe('Calling GetGroupPermissions with a valid parameter', function () {
        describe('Group is an Administrative Group', function () {
            it('should return 200 with a value of true for isAdmin and no Permissionswhen the given Group is an Administrative Group', function () {
                const request = {
                    params: {
                        groupName: "ADMIN1"
                    }
                };

                let getGroupPermissions = new Promise((resolve, reject) => {
                    let response = {};
                    response.json = sinon.stub().callsFake((d) => resolve(response));
                    response.status = sinon.stub().callsFake((n) => response);
                    GetGroupPermissions(request, response);
                });

                return getGroupPermissions.then(response => {
                    // status should be 200
                    response.status.should.have.been.calledWith(200);

                    // response should be a GalaxyReturn
                    response.json.should.have.been.calledOnce;
                    let calledWith = response.json.firstCall.args[0];
                    calledWith.should.be.an.instanceOf(GalaxyReturn);

                    // GalaxyReturn.data should exist and GalaxyReturn.error should not exist
                    let data = calledWith.data;
                    let error = calledWith.error;
                    should.exist(data);
                    should.not.exist(error);

                    // data.isAdmin should exist
                    should.exist(data.isAdmin);
                    data.isAdmin.should.be.a('boolean');
                    data.isAdmin.should.equal(true);

                    // data.systemPermissions should exist and be an empty array
                    should.exist(data.systemPermissions);
                    data.systemPermissions.should.be.an('array');
                    data.systemPermissions.should.eql([]);
                    data.systemPermissions.length.should.equal(0);

                    // data.systemPermissions should exist and be an empty array
                    should.exist(data.componentTagPermissions);
                    data.componentTagPermissions.should.be.an('array');
                    data.componentTagPermissions.should.eql([]);
                    data.componentTagPermissions.length.should.equal(0);
                });
            });
        });
        describe('Group is not an Administrative Group and has neither System nor Component Tag Permissions', function () {
            it('should return 200 with a value of false for isAdmin and no Permissions when the given Group is not in the database', function () {
                const request = {
                    params: {
                        groupName: "GROUPDOESNOTEXIST"
                    }
                };

                let getGroupPermissions = new Promise((resolve, reject) => {
                    let response = {};
                    response.json = sinon.stub().callsFake((d) => resolve(response));
                    response.status = sinon.stub().callsFake((n) => response);
                    GetGroupPermissions(request, response);
                });

                return getGroupPermissions.then(response => {
                    // status should be 200
                    response.status.should.have.been.calledWith(200);

                    // response should be a GalaxyReturn
                    response.json.should.have.been.calledOnce;
                    let calledWith = response.json.firstCall.args[0];
                    calledWith.should.be.an.instanceOf(GalaxyReturn);

                    // GalaxyReturn.data should exist and GalaxyReturn.error should not exist
                    let data = calledWith.data;
                    let error = calledWith.error;
                    should.exist(data);
                    should.not.exist(error);

                    // data.isAdmin should exist
                    should.exist(data.isAdmin);
                    data.isAdmin.should.be.a('boolean');
                    data.isAdmin.should.equal(false);

                    // data.systemPermissions should exist and be an empty array
                    should.exist(data.systemPermissions);
                    data.systemPermissions.should.be.an('array');
                    data.systemPermissions.should.eql([]);
                    data.systemPermissions.length.should.equal(0);

                    // data.systemPermissions should exist and be an empty array
                    should.exist(data.componentTagPermissions);
                    data.componentTagPermissions.should.be.an('array');
                    data.componentTagPermissions.should.eql([]);
                    data.componentTagPermissions.length.should.equal(0);
                });
            });
            it('should return 200 with a value of false for isAdmin and no Permissions when the given Group has no Permissions', function () {
                const request = {
                    params: {
                        groupName: "NONE1"
                    }
                };

                let getGroupPermissions = new Promise((resolve, reject) => {
                    let response = {};
                    response.json = sinon.stub().callsFake((d) => resolve(response));
                    response.status = sinon.stub().callsFake((n) => response);
                    GetGroupPermissions(request, response);
                });

                return getGroupPermissions.then(response => {
                    // status should be 200
                    response.status.should.have.been.calledWith(200);

                    // response should be a GalaxyReturn
                    response.json.should.have.been.calledOnce;
                    let calledWith = response.json.firstCall.args[0];
                    calledWith.should.be.an.instanceOf(GalaxyReturn);

                    // GalaxyReturn.data should exist and GalaxyReturn.error should not exist
                    let data = calledWith.data;
                    let error = calledWith.error;
                    should.exist(data);
                    should.not.exist(error);

                    // data.isAdmin should exist
                    should.exist(data.isAdmin);
                    data.isAdmin.should.be.a('boolean');
                    data.isAdmin.should.equal(false);

                    // data.systemPermissions should exist and be an empty array
                    should.exist(data.systemPermissions);
                    data.systemPermissions.should.be.an('array');
                    data.systemPermissions.should.eql([]);
                    data.systemPermissions.length.should.equal(0);

                    // data.systemPermissions should exist and be an empty array
                    should.exist(data.componentTagPermissions);
                    data.componentTagPermissions.should.be.an('array');
                    data.componentTagPermissions.should.eql([]);
                    data.componentTagPermissions.length.should.equal(0);
                });
            });
        });
        describe('Group only has System Permissions', function () {
            it('should return 200 with a value of false for isAdmin and System Permissions when the given Group has System Permissions', function () {
                const request = {
                    params: {
                        groupName: "SYSTEM1"
                    }
                };

                let getGroupPermissions = new Promise((resolve, reject) => {
                    let response = {};
                    response.json = sinon.stub().callsFake((d) => resolve(response));
                    response.status = sinon.stub().callsFake((n) => response);
                    GetGroupPermissions(request, response);
                });

                return getGroupPermissions.then(response => {
                    // status should be 200
                    response.status.should.have.been.calledWith(200);

                    // response should be a GalaxyReturn
                    response.json.should.have.been.calledOnce;
                    let calledWith = response.json.firstCall.args[0];
                    calledWith.should.be.an.instanceOf(GalaxyReturn);

                    // GalaxyReturn.data should exist and GalaxyReturn.error should not exist
                    let data = calledWith.data;
                    let error = calledWith.error;
                    should.exist(data);
                    should.not.exist(error);

                    // data.isAdmin should exist
                    should.exist(data.isAdmin);
                    data.isAdmin.should.be.a('boolean');
                    data.isAdmin.should.equal(false);

                    // data.systemPermissions should exist and contain an array of permissions
                    should.exist(data.systemPermissions);
                    data.systemPermissions.should.be.an('array');
                    data.systemPermissions.length.should.be.above(0);

                    for (let permission of data.systemPermissions) {
                        permission.should.be.an.instanceOf(Permission);
                        if (permission.id != null) {
                            permission.id.should.be.a('string');
                        }
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

                    // data.componentTagPermissions should exist and be an empty array
                    should.exist(data.componentTagPermissions);
                    data.componentTagPermissions.should.be.an('array');
                    data.componentTagPermissions.should.eql([]);
                    data.componentTagPermissions.length.should.equal(0);
                });
            });
        });
        describe('Group only has Component Tag Permissions', function () {
            it('should return 200 with a value of false for isAdmin and Component Tag Permissions when the given Group has Component Tag Permissions', function () {
                const request = {
                    params: {
                        groupName: "TAG1"
                    }
                };

                let getGroupPermissions = new Promise((resolve, reject) => {
                    let response = {};
                    response.json = sinon.stub().callsFake((d) => resolve(response));
                    response.status = sinon.stub().callsFake((n) => response);
                    GetGroupPermissions(request, response);
                });

                return getGroupPermissions.then(response => {
                    // status should be 200
                    response.status.should.have.been.calledWith(200);

                    // response should be a GalaxyReturn
                    response.json.should.have.been.calledOnce;
                    let calledWith = response.json.firstCall.args[0];
                    calledWith.should.be.an.instanceOf(GalaxyReturn);

                    // GalaxyReturn.data should exist and GalaxyReturn.error should not exist
                    let data = calledWith.data;
                    let error = calledWith.error;
                    should.exist(data);
                    should.not.exist(error);

                    // data.isAdmin should exist
                    should.exist(data.isAdmin);
                    data.isAdmin.should.be.a('boolean');
                    data.isAdmin.should.equal(false);

                    // data.systemPermissions should exist and be an empty array
                    should.exist(data.systemPermissions);
                    data.systemPermissions.should.be.an('array');
                    data.systemPermissions.should.eql([]);
                    data.systemPermissions.length.should.equal(0);

                    // data.componentTagPermissions should exist and contain an array of component tag permissions
                    should.exist(data.componentTagPermissions);
                    data.componentTagPermissions.should.be.an('array');
                    data.componentTagPermissions.length.should.be.above(0);

                    for (let componentTagPermission of data.componentTagPermissions) {
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
                            if (permission.id != null) {
                                permission.id.should.be.a('string');
                            }
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
        describe('Group has both System and Component Tag Permissions', function () {
            it('should return 200 with a value of false for isAdmin, System Permissions, and Component Tag Permissions when the given Group has both System and Component Tag Permissions', function () {
                const request = {
                    params: {
                        groupName: "BOTH1"
                    }
                };

                let getGroupPermissions = new Promise((resolve, reject) => {
                    let response = {};
                    response.json = sinon.stub().callsFake((d) => resolve(response));
                    response.status = sinon.stub().callsFake((n) => response);
                    GetGroupPermissions(request, response);
                });

                return getGroupPermissions.then(response => {
                    // status should be 200
                    response.status.should.have.been.calledWith(200);

                    // response should be a GalaxyReturn
                    response.json.should.have.been.calledOnce;
                    let calledWith = response.json.firstCall.args[0];
                    calledWith.should.be.an.instanceOf(GalaxyReturn);

                    // GalaxyReturn.data should exist and GalaxyReturn.error should not exist
                    let data = calledWith.data;
                    let error = calledWith.error;
                    should.exist(data);
                    should.not.exist(error);

                    // data.isAdmin should exist
                    should.exist(data.isAdmin);
                    data.isAdmin.should.be.a('boolean');
                    data.isAdmin.should.equal(false);

                    // data.systemPermissions should exist and contain an array of permissions
                    should.exist(data.systemPermissions);
                    data.systemPermissions.should.be.an('array');
                    data.systemPermissions.length.should.be.above(0);

                    for (let permission of data.systemPermissions) {
                        permission.should.be.an.instanceOf(Permission);
                        if (permission.id != null) {
                            permission.id.should.be.a('string');
                        }
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

                    // data.componentTagPermissions should exist and contain an array of component tag permissions
                    should.exist(data.componentTagPermissions);
                    data.componentTagPermissions.should.be.an('array');
                    data.componentTagPermissions.length.should.be.above(0);

                    for (let componentTagPermission of data.componentTagPermissions) {
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
                            if (permission.id != null) {
                                permission.id.should.be.a('string');
                            }
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
    describe('Calling GetGroupPermissions with an invalid parameter', function () {
        it('should return 400 and Error when called with [] (empty array)', () => {
            const request = {
                params: {
                    groupName: []
                }
            };

            let getGroupPermissions = new Promise((resolve, reject) => {
                let response = {};
                response.json = sinon.stub().callsFake((d) => resolve(response));
                response.status = sinon.stub().callsFake((n) => response);
                GetGroupPermissions(request, response);
            });

            return getGroupPermissions.then(response => {
                // status should be 400
                response.status.should.have.been.calledWith(400);

                // response should be a GalaxyReturn
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0];
                calledWith.should.be.an.instanceOf(GalaxyReturn);

                // GalaxyReturn.data should not exist and GalaxyReturn.error should exist
                let data = calledWith.data;
                let error = calledWith.error;
                should.not.exist(data);
                should.exist(error);

                // error should be a GalaxyError
                error.should.be.an.instanceOf(GalaxyError);
                should.exist(error.friendlyMsg);
                error.friendlyMsg.should.be.a('string');
                should.exist(error.description);
                error.description.should.be.a('string');

            });

        });
        it('should return 400 and Error when called with undefined', () => {
            const request = {
                params: {
                    groupName: undefined
                }
            };

            let getGroupPermissions = new Promise((resolve, reject) => {
                let response = {};
                response.json = sinon.stub().callsFake((d) => resolve(response));
                response.status = sinon.stub().callsFake((n) => response);
                GetGroupPermissions(request, response);
            });

            return getGroupPermissions.then(response => {
                // status should be 400
                response.status.should.have.been.calledWith(400);

                // response should be a GalaxyReturn
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0];
                calledWith.should.be.an.instanceOf(GalaxyReturn);

                // GalaxyReturn.data should not exist and GalaxyReturn.error should exist
                let data = calledWith.data;
                let error = calledWith.error;
                should.not.exist(data);
                should.exist(error);

                // error should be a GalaxyError
                error.should.be.an.instanceOf(GalaxyError);
                should.exist(error.friendlyMsg);
                error.friendlyMsg.should.be.a('string');
                should.exist(error.description);
                error.description.should.be.a('string');

            });

        });
        it('should return 400 and Error when called with null', () => {
            const request = {
                params: {
                    groupName: null
                }
            };

            let getGroupPermissions = new Promise((resolve, reject) => {
                let response = {};
                response.json = sinon.stub().callsFake((d) => resolve(response));
                response.status = sinon.stub().callsFake((n) => response);
                GetGroupPermissions(request, response);
            });

            return getGroupPermissions.then(response => {
                // status should be 400
                response.status.should.have.been.calledWith(400);

                // response should be a GalaxyReturn
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0];
                calledWith.should.be.an.instanceOf(GalaxyReturn);

                // GalaxyReturn.data should not exist and GalaxyReturn.error should exist
                let data = calledWith.data;
                let error = calledWith.error;
                should.not.exist(data);
                should.exist(error);

                // error should be a GalaxyError
                error.should.be.an.instanceOf(GalaxyError);
                should.exist(error.friendlyMsg);
                error.friendlyMsg.should.be.a('string');
                should.exist(error.description);
                error.description.should.be.a('string');

            });

        });
        it('should return 400 and Error when called with 0', () => {
            const request = {
                params: {
                    groupName: 0
                }
            };

            let getGroupPermissions = new Promise((resolve, reject) => {
                let response = {};
                response.json = sinon.stub().callsFake((d) => resolve(response));
                response.status = sinon.stub().callsFake((n) => response);
                GetGroupPermissions(request, response);
            });

            return getGroupPermissions.then(response => {
                // status should be 400
                response.status.should.have.been.calledWith(400);

                // response should be a GalaxyReturn
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0];
                calledWith.should.be.an.instanceOf(GalaxyReturn);

                // GalaxyReturn.data should not exist and GalaxyReturn.error should exist
                let data = calledWith.data;
                let error = calledWith.error;
                should.not.exist(data);
                should.exist(error);

                // error should be a GalaxyError
                error.should.be.an.instanceOf(GalaxyError);
                should.exist(error.friendlyMsg);
                error.friendlyMsg.should.be.a('string');
                should.exist(error.description);
                error.description.should.be.a('string');

            });

        });
        it('should return 400 and Error when called with 1', () => {
            const request = {
                params: {
                    groupName: 1
                }
            };

            let getGroupPermissions = new Promise((resolve, reject) => {
                let response = {};
                response.json = sinon.stub().callsFake((d) => resolve(response));
                response.status = sinon.stub().callsFake((n) => response);
                GetGroupPermissions(request, response);
            });

            return getGroupPermissions.then(response => {
                // status should be 400
                response.status.should.have.been.calledWith(400);

                // response should be a GalaxyReturn
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0];
                calledWith.should.be.an.instanceOf(GalaxyReturn);

                // GalaxyReturn.data should not exist and GalaxyReturn.error should exist
                let data = calledWith.data;
                let error = calledWith.error;
                should.not.exist(data);
                should.exist(error);

                // error should be a GalaxyError
                error.should.be.an.instanceOf(GalaxyError);
                should.exist(error.friendlyMsg);
                error.friendlyMsg.should.be.a('string');
                should.exist(error.description);
                error.description.should.be.a('string');

            });

        });
        it('should return 400 and Error when called with true', () => {
            const request = {
                params: {
                    groupName: true
                }
            };

            let getGroupPermissions = new Promise((resolve, reject) => {
                let response = {};
                response.json = sinon.stub().callsFake((d) => resolve(response));
                response.status = sinon.stub().callsFake((n) => response);
                GetGroupPermissions(request, response);
            });

            return getGroupPermissions.then(response => {
                // status should be 400
                response.status.should.have.been.calledWith(400);

                // response should be a GalaxyReturn
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0];
                calledWith.should.be.an.instanceOf(GalaxyReturn);

                // GalaxyReturn.data should not exist and GalaxyReturn.error should exist
                let data = calledWith.data;
                let error = calledWith.error;
                should.not.exist(data);
                should.exist(error);

                // error should be a GalaxyError
                error.should.be.an.instanceOf(GalaxyError);
                should.exist(error.friendlyMsg);
                error.friendlyMsg.should.be.a('string');
                should.exist(error.description);
                error.description.should.be.a('string');

            });

        });
        it('should return 400 and Error when called with false', () => {
            const request = {
                params: {
                    groupName: false
                }
            };

            let getGroupPermissions = new Promise((resolve, reject) => {
                let response = {};
                response.json = sinon.stub().callsFake((d) => resolve(response));
                response.status = sinon.stub().callsFake((n) => response);
                GetGroupPermissions(request, response);
            });

            return getGroupPermissions.then(response => {
                // status should be 400
                response.status.should.have.been.calledWith(400);

                // response should be a GalaxyReturn
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0];
                calledWith.should.be.an.instanceOf(GalaxyReturn);

                // GalaxyReturn.data should not exist and GalaxyReturn.error should exist
                let data = calledWith.data;
                let error = calledWith.error;
                should.not.exist(data);
                should.exist(error);

                // error should be a GalaxyError
                error.should.be.an.instanceOf(GalaxyError);
                should.exist(error.friendlyMsg);
                error.friendlyMsg.should.be.a('string');
                should.exist(error.description);
                error.description.should.be.a('string');

            });

        });
        it('should return 400 and Error when called with an object', () => {
            const request = {
                params: {
                    groupName: {
                        groudId: "abc"
                    }
                }
            };

            let getGroupPermissions = new Promise((resolve, reject) => {
                let response = {};
                response.json = sinon.stub().callsFake((d) => resolve(response));
                response.status = sinon.stub().callsFake((n) => response);
                GetGroupPermissions(request, response);
            });

            return getGroupPermissions.then(response => {
                // status should be 400
                response.status.should.have.been.calledWith(400);

                // response should be a GalaxyReturn
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0];
                calledWith.should.be.an.instanceOf(GalaxyReturn);

                // GalaxyReturn.data should not exist and GalaxyReturn.error should exist
                let data = calledWith.data;
                let error = calledWith.error;
                should.not.exist(data);
                should.exist(error);

                // error should be a GalaxyError
                error.should.be.an.instanceOf(GalaxyError);
                should.exist(error.friendlyMsg);
                error.friendlyMsg.should.be.a('string');
                should.exist(error.description);
                error.description.should.be.a('string');

            });

        });
        it('should return 400 and Error when called with an array', () => {
            const request = {
                params: {
                    groupName: ['a', 'b', 'c']
                }
            };

            let getGroupPermissions = new Promise((resolve, reject) => {
                let response = {};
                response.json = sinon.stub().callsFake((d) => resolve(response));
                response.status = sinon.stub().callsFake((n) => response);
                GetGroupPermissions(request, response);
            });

            return getGroupPermissions.then(response => {
                // status should be 400
                response.status.should.have.been.calledWith(400);

                // response should be a GalaxyReturn
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0];
                calledWith.should.be.an.instanceOf(GalaxyReturn);

                // GalaxyReturn.data should not exist and GalaxyReturn.error should exist
                let data = calledWith.data;
                let error = calledWith.error;
                should.not.exist(data);
                should.exist(error);

                // error should be a GalaxyError
                error.should.be.an.instanceOf(GalaxyError);
                should.exist(error.friendlyMsg);
                error.friendlyMsg.should.be.a('string');
                should.exist(error.description);
                error.description.should.be.a('string');

            });

        });
    });
});