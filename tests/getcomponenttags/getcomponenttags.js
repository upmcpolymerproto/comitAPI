'use strict';

const Tag = require('../../models/tag');
const GalaxyReturn = require('../../models/galaxyreturn');
const GalaxyError = require('../../models/galaxyerror');
const mockDb = require('./mockdatabase');
const chai = require('chai');
const sinon = require('sinon');

const should = require('chai').should();
chai.use(require('sinon-chai'));

const GetComponentTags = require('../../services/getcomponenttags');

const sleepFor = 250;
const sleep = () =>
    new Promise(resolve => setTimeout(resolve, sleepFor));

describe('GetComponentTags', function () {

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

    describe('Calling GetComponentTags with a valid parameter', function () {

        it('should return Status = 200 and [West Virginia] when called with "west"', (done) => {
            const states = ['West Virginia'];
            const request = {
                params: {
                    contains: 'west'
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetComponentTags(request, response);

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

                // data.tags should exist and its length = 1
                let tags = data.tags;
                should.exist(tags);
                tags.length.should.equal(1);

                // tags[0] should be a Tag and its name should be included in states
                let tag = tags[0];
                should.exist(tag);
                tag.should.be.an.instanceOf(Tag);
                states.should.include(tag.name);

                done();
            });

        });

        it('should return Status = 200 and [New Hampshire, New Jersey, New Mexico, New York] when called with "new"', (done) => {
            let states = [];
            states.push('New Hampshire');
            states.push('New Jersey');
            states.push('New Mexico');
            states.push('New York');

            const request = {
                params: {
                    contains: 'new'
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetComponentTags(request, response);

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

                // data.tags should exist and its length = 4
                let tags = data.tags;
                should.exist(tags);
                tags.length.should.equal(4);

                // each tag should be a Tag and its name should be included in states
                for (let tag of tags) {
                    tag.should.be.an.instanceOf(Tag);
                    states.should.include(tag.name);
                }

                done();
            });

        });

        it('should return Status = 200 and [] when called with "canada"', (done) => {
            const states = [];
            const request = {
                params: {
                    contains: 'canada'
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetComponentTags(request, response);

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

                // data.tags should exist and its length = 0
                let tags = data.tags;
                should.exist(tags);
                tags.length.should.equal(0);
                tags.should.eql(states);

                done();
            });

        });

        it('should return Status = 200 and [New Jersey] when called with " jersey"', (done) => {
            const states = ['New Jersey'];
            const request = {
                params: {
                    contains: ' jersey'
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetComponentTags(request, response);

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

                // data.tags should exist and its length = 1
                let tags = data.tags;
                should.exist(tags);
                tags.length.should.equal(1);

                // tags[0] should be a Tag and its name should be included in states
                let tag = tags[0];
                should.exist(tag);
                tag.should.be.an.instanceOf(Tag);
                states.should.include(tag.name);

                done();
            });

        });

        it('should return Status = 200 and [Rhode Island] when called with "rhode "', (done) => {
            const states = ['Rhode Island'];
            const request = {
                params: {
                    contains: 'rhode '
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetComponentTags(request, response);

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

                // data.tags should exist and its length = 1
                let tags = data.tags;
                should.exist(tags);
                tags.length.should.equal(1);

                // tags[0] should be a Tag and its name should be included in states
                let tag = tags[0];
                should.exist(tag);
                tag.should.be.an.instanceOf(Tag);
                states.should.include(tag.name);

                done();
            });

        });

        it('should return Status = 200 and [Rhode Island] when called with "ode is"', (done) => {
            const states = ['Rhode Island'];
            const request = {
                params: {
                    contains: 'ode is'
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetComponentTags(request, response);

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

                // data.tags should exist and its length = 1
                let tags = data.tags;
                should.exist(tags);
                tags.length.should.equal(1);

                // tags[0] should be a Tag and its name should be included in states
                let tag = tags[0];
                should.exist(tag);
                tag.should.be.an.instanceOf(Tag);
                states.should.include(tag.name);

                done();
            });

        });

        it('should return Status = 200 and [] when called with "undefined"', (done) => {
            const states = [];
            const request = {
                params: {
                    contains: "undefined"
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetComponentTags(request, response);

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

                // data.tags should exist and its length = 0
                let tags = data.tags;
                should.exist(tags);
                tags.length.should.equal(0);
                tags.should.eql(states);

                done();
            });

        });

        it('should return Status = 200 and [] when called with "null"', (done) => {
            const states = [];
            const request = {
                params: {
                    contains: "null"
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetComponentTags(request, response);

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

                // data.tags should exist and its length = 0
                let tags = data.tags;
                should.exist(tags);
                tags.length.should.equal(0);
                tags.should.eql(states);

                done();
            });

        });

        it('should return Status = 200 and [] when called with a SQL statement', (done) => {
            const states = [];
            const request = {
                params: {
                    contains: "; SELECT * FROM [ComponentTag]"
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetComponentTags(request, response);

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

                // data.tags should exist and its length = 0
                let tags = data.tags;
                should.exist(tags);
                tags.length.should.equal(0);
                tags.should.eql(states);

                done();
            });

        });

    });

    describe('Calling GetComponentTags with an invalid parameter', function () {

        it('should return Status = 400 and Error when called with " " (blank space)', (done) => {
            const request = {
                params: {
                    contains: ' '
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetComponentTags(request, response);

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
                    contains: ''
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetComponentTags(request, response);

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

            GetComponentTags(request, response);

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

            GetComponentTags(request, response);


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
                    contains: null
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetComponentTags(request, response);


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

        it('should return Status = 400 and Error when called with 0', (done) => {
            const request = {
                params: {
                    contains: 0
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetComponentTags(request, response);

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

        it('should return Status = 400 and Error when called with 1', (done) => {
            const request = {
                params: {
                    contains: 1
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetComponentTags(request, response);

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

        it('should return Status = 400 and Error when called with false', (done) => {
            const request = {
                params: {
                    contains: false
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetComponentTags(request, response);

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

        it('should return Status = 400 and Error when called with true', (done) => {
            const request = {
                params: {
                    contains: true
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetComponentTags(request, response);

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

        it('should return Status = 400 and Error when called with an object', (done) => {
            const request = {
                params: {
                    contains: { x: "pennsylvania" }
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetComponentTags(request, response);

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

        it('should return Status = 400 and Error when called with an array', (done) => {
            const request = {
                params: {
                    contains: ["California", "Utah", "Nevada"]
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetComponentTags(request, response);

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

    describe('Calling GetComponentTags with a parameter that contains SQL Server Wildcard characters', function () {

        it('should return Status = 200 and ["[Testing^Escape-Characters]"] when called with "[Testing^Escape-Characters]"', (done) => {
            const strings = ['[Testing^Escape-Characters]'];
            const request = {
                params: {
                    contains: '[Testing^Escape-Characters]'
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetComponentTags(request, response);

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

                // data.tags should exist and its length = 1
                let tags = data.tags;
                should.exist(tags);
                tags.length.should.equal(1);

                // tags[0] should be a Tag and its name should be included in strings
                let tag = tags[0];
                should.exist(tag);
                tag.should.be.an.instanceOf(Tag);
                strings.should.include(tag.name);

                done();
            });

        });

        it('should return Status = 200 and ["Testing%Escape_Characters[]"] when called with "Testing%Escape_Characters[]"', (done) => {
            const strings = ['Testing%Escape_Characters[]'];
            const request = {
                params: {
                    contains: 'Testing%Escape_Characters[]'
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetComponentTags(request, response);

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

                // data.tags should exist and its length = 1
                let tags = data.tags;
                should.exist(tags);
                tags.length.should.equal(1);

                // tags[0] should be a Tag and its name should be included in strings
                let tag = tags[0];
                should.exist(tag);
                tag.should.be.an.instanceOf(Tag);
                strings.should.include(tag.name);

                done();
            });

        });

        it('should return Status = 200 and ["[Testing%Escape_Characters]"] when called with "[Testing%Escape_Characters]"', (done) => {
            const strings = ['[Testing%Escape_Characters]'];
            const request = {
                params: {
                    contains: '[Testing%Escape_Characters]'
                }
            };

            let response = {};
            response.send = sinon.spy();
            response.json = sinon.spy();
            response.status = sinon.stub().callsFake((n) => response);

            GetComponentTags(request, response);

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

                // data.tags should exist and its length = 1
                let tags = data.tags;
                should.exist(tags);
                tags.length.should.equal(1);

                // tags[0] should be a Tag and its name should be included in strings
                let tag = tags[0];
                should.exist(tag);
                tag.should.be.an.instanceOf(Tag);
                strings.should.include(tag.name);

                done();
            });

        });

    });

});