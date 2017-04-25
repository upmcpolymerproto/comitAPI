'use strict';

const mockPermissionTypes = require('./permissiontypes.json');
const PermissionType = require('../../models/permissiontype');
const GalaxyReturn = require('../../models/galaxyreturn');
const GalaxyError = require('../../models/galaxyerror');
const mockDb = require('./mockdatabase');
const chai = require('chai');
const sinon = require('sinon');

const should = require('chai').should();
chai.use(require('sinon-chai'));

const GetPermissionTypes = require('../../services/getpermissiontypes');

const sleepFor = 150;
const sleep = () =>
    new Promise(resolve => setTimeout(resolve, sleepFor));

describe('GetPermissionTypes', function () {

    // create mock data
    before(() =>
        mockDb.connect()
            .then(() => mockDb.destroy())
            .then(() => mockDb.create())
            .then(() => mockDb.close())
            .catch(err => console.log(err))
    );


    // destroy mock data
    after(() =>
        mockDb.connect()
            .then(() => mockDb.destroy())
            .then(() => mockDb.close())
            .catch(err => console.log(err))
    );

    describe('Calling GetPermissionTypes with a valid parameter', function () {

        it('should return Status = 200 and only permission types belonging to Alpha when called with "Alpha"', (done) => {
            let ids = [];
            for (let mockPermissionType of mockPermissionTypes) {
                if (mockPermissionType.SystemName === 'Alpha') {
                    ids.push(mockPermissionType.Id.toLowerCase());
                }
            }

            const request = {
                params: {
                    system: 'Alpha'
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetPermissionTypes(request, response);

            sleep().then(() => {
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

                // data.permissionTypes should exist and its length = 8
                let permissionTypes = data.permissionTypes;
                should.exist(permissionTypes);
                permissionTypes.length.should.equal(8);

                // each permission type should be a PermissionType 
                // and its id should belong to the list of alpha ids
                for (let permissionType of permissionTypes) {
                    permissionType.should.be.an.instanceOf(PermissionType);
                    ids.should.include(permissionType.id.toLowerCase());
                }

                done();
            });

        });

        it('should return Status = 200 and only permission types belonging to Beta when called with "Beta"', (done) => {
            let ids = [];
            for (let mockPermissionType of mockPermissionTypes) {
                if (mockPermissionType.SystemName === 'Beta') {
                    ids.push(mockPermissionType.Id.toLowerCase());
                }
            }

            const request = {
                params: {
                    system: 'Beta'
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetPermissionTypes(request, response);

            sleep().then(() => {
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

                // data.permissionTypes should exist and its length = 8
                let permissionTypes = data.permissionTypes;
                should.exist(permissionTypes);
                permissionTypes.length.should.equal(8);

                // each permission type should be a PermissionType 
                // and its id should belong to the list of beta ids
                for (let permissionType of permissionTypes) {
                    permissionType.should.be.an.instanceOf(PermissionType);
                    ids.should.include(permissionType.id.toLowerCase());
                }

                done();
            });

        });

        it('should return Status = 200 and [] when called with "Charlie"', (done) => {
            const request = {
                params: {
                    system: 'Charlie'
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetPermissionTypes(request, response);

            sleep().then(() => {
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

                // data.permissionTypes should exist and its length = 0
                let permissionTypes = data.permissionTypes;
                should.exist(permissionTypes);
                permissionTypes.length.should.equal(0);

                done();
            });

        });

        it('should return Status = 200 and only permission types belonging to Alpha when called with "alpha"', (done) => {
            let ids = [];
            for (let mockPermissionType of mockPermissionTypes) {
                if (mockPermissionType.SystemName === 'Alpha') {
                    ids.push(mockPermissionType.Id.toLowerCase());
                }
            }

            const request = {
                params: {
                    system: 'alpha'
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetPermissionTypes(request, response);

            sleep().then(() => {
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

                // data.permissionTypes should exist and its length = 8
                let permissionTypes = data.permissionTypes;
                should.exist(permissionTypes);
                permissionTypes.length.should.equal(8);

                // each permission type should be a PermissionType 
                // and its id should belong to the list of alpha ids
                for (let permissionType of permissionTypes) {
                    permissionType.should.be.an.instanceOf(PermissionType);
                    ids.should.include(permissionType.id.toLowerCase());
                }

                done();
            });

        });

        it('should return Status = 200 and only permission types belonging to Alpha when called with "AlPhA"', (done) => {
            let ids = [];
            for (let mockPermissionType of mockPermissionTypes) {
                if (mockPermissionType.SystemName === 'Alpha') {
                    ids.push(mockPermissionType.Id.toLowerCase());
                }
            }

            const request = {
                params: {
                    system: 'AlPhA'
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetPermissionTypes(request, response);

            sleep().then(() => {
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

                // data.permissionTypes should exist and its length = 8
                let permissionTypes = data.permissionTypes;
                should.exist(permissionTypes);
                permissionTypes.length.should.equal(8);

                // each permission type should be a PermissionType 
                // and its id should belong to the list of alpha ids
                for (let permissionType of permissionTypes) {
                    permissionType.should.be.an.instanceOf(PermissionType);
                    ids.should.include(permissionType.id.toLowerCase());
                }

                done();
            });

        });

        it('should return Status = 200 and [] when called with "aalpha"', (done) => {
            const request = {
                params: {
                    system: 'aalpha'
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetPermissionTypes(request, response);

            sleep().then(() => {
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

                // data.permissionTypes should exist and its length = 0
                let permissionTypes = data.permissionTypes;
                should.exist(permissionTypes);
                permissionTypes.length.should.equal(0);

                done();
            });

        });

        it('should return Status = 200 and [] when called with "alphaa"', (done) => {
            const request = {
                params: {
                    system: 'alphaa'
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetPermissionTypes(request, response);

            sleep().then(() => {
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

                // data.permissionTypes should exist and its length = 0
                let permissionTypes = data.permissionTypes;
                should.exist(permissionTypes);
                permissionTypes.length.should.equal(0);

                done();
            });

        });

        it('should return Status = 200 and [] when called with "Alpha123"', (done) => {
            const request = {
                params: {
                    system: 'Alpha123'
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetPermissionTypes(request, response);

            sleep().then(() => {
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

                // data.permissionTypes should exist and its length = 0
                let permissionTypes = data.permissionTypes;
                should.exist(permissionTypes);
                permissionTypes.length.should.equal(0);

                done();
            });

        });

        it('should return Status = 200 and [] when called with 0', (done) => {
            const request = {
                params: {
                    system: 0
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetPermissionTypes(request, response);

            sleep().then(() => {
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

                // data.permissionTypes should exist and its length = 0
                let permissionTypes = data.permissionTypes;
                should.exist(permissionTypes);
                permissionTypes.length.should.equal(0);

                done();
            });

        });

        it('should return Status = 200 and [] when called with 1', (done) => {
            const request = {
                params: {
                    system: 1
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetPermissionTypes(request, response);

            sleep().then(() => {
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

                // data.permissionTypes should exist and its length = 0
                let permissionTypes = data.permissionTypes;
                should.exist(permissionTypes);
                permissionTypes.length.should.equal(0);

                done();
            });

        });

        it('should return Status = 200 and [] when called with false', (done) => {
            const request = {
                params: {
                    system: false
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetPermissionTypes(request, response);

            sleep().then(() => {
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

                // data.permissionTypes should exist and its length = 0
                let permissionTypes = data.permissionTypes;
                should.exist(permissionTypes);
                permissionTypes.length.should.equal(0);

                done();
            });

        });

        it('should return Status = 200 and [] when called with true', (done) => {
            const request = {
                params: {
                    system: true
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetPermissionTypes(request, response);

            sleep().then(() => {
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

                // data.permissionTypes should exist and its length = 0
                let permissionTypes = data.permissionTypes;
                should.exist(permissionTypes);
                permissionTypes.length.should.equal(0);

                done();
            });

        });

        it('should return Status = 200 and [] when called with an object', (done) => {
            const request = {
                params: {
                    system: { name: "alpha" }
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetPermissionTypes(request, response);

            sleep().then(() => {
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

                // data.permissionTypes should exist and its length = 0
                let permissionTypes = data.permissionTypes;
                should.exist(permissionTypes);
                permissionTypes.length.should.equal(0);

                done();
            });

        });

        it('should return Status = 200 and [] when called with an array', (done) => {
            const request = {
                params: {
                    system: ["alpha", "beta", "charlie"]
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetPermissionTypes(request, response);

            sleep().then(() => {
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

                // data.permissionTypes should exist and its length = 0
                let permissionTypes = data.permissionTypes;
                should.exist(permissionTypes);
                permissionTypes.length.should.equal(0);

                done();
            });

        });

        it('should return Status = 200 and [] when called with a SQL Statement', (done) => {
            const request = {
                params: {
                    system: "; SELECT * FROM [PermissionType]"
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetPermissionTypes(request, response);

            sleep().then(() => {
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

                // data.permissionTypes should exist and its length = 0
                let permissionTypes = data.permissionTypes;
                should.exist(permissionTypes);
                permissionTypes.length.should.equal(0);

                done();
            });

        });

        it('should return Status = 200 and [] when called with a "undefined"', (done) => {
            const request = {
                params: {
                    system: 'undefined'
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetPermissionTypes(request, response);

            sleep().then(() => {
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

                // data.permissionTypes should exist and its length = 0
                let permissionTypes = data.permissionTypes;
                should.exist(permissionTypes);
                permissionTypes.length.should.equal(0);

                done();
            });

        });

        it('should return Status = 200 and [] when called with a "null"', (done) => {
            const request = {
                params: {
                    system: 'null'
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetPermissionTypes(request, response);

            sleep().then(() => {
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

                // data.permissionTypes should exist and its length = 0
                let permissionTypes = data.permissionTypes;
                should.exist(permissionTypes);
                permissionTypes.length.should.equal(0);

                done();
            });

        });

    });

    describe('Calling GetPermissionTypes with an invalid parameter', function () {

        it('should return Status = 400 and Error when called with " " (blank space)', (done) => {
            const request = {
                params: {
                    system: ' '
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetPermissionTypes(request, response);

            sleep().then(() => {
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

                done();
            });

        });

        it('should return Status = 400 and Error when called with "" (empty string)', (done) => {
            const request = {
                params: {
                    system: ''
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetPermissionTypes(request, response);

            sleep().then(() => {
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

                done();
            });

        });

        it('should return Status = 400 and Error when called with [] (empty array)', (done) => {
            const request = {
                params: {
                    contains: []
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetPermissionTypes(request, response);

            sleep().then(() => {
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

                done();
            });

        });

        it('should return Status = 400 and Error when called with undefined', (done) => {
            const request = {
                params: {
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetPermissionTypes(request, response);


            sleep().then(() => {
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

                done();
            });

        });

        it('should return Status = 400 and Error when called with null', (done) => {
            const request = {
                params: {
                    system: null
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetPermissionTypes(request, response);


            sleep().then(() => {
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

                done();
            });

        });

    });

});