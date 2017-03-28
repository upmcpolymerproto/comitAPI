'use strict';

const Tag = require('../../models/tag');
const sql = require('./sqlserver');
const chai = require('chai');
const sinon = require('sinon');

chai.should();
chai.use(require('sinon-chai'));

const GetComponentTags = require('../../services/getcomponenttags');

const sleepFor = 50;
const sleep = () =>
    new Promise(resolve => setTimeout(resolve, sleepFor));

describe('GetComponentTags', function () {

    // create mock data
    before(() =>
        sql.connect()
            .then(() => sql.destroy())
            .then(() => sql.create())
            .then(() => sql.close())
            .catch(err => console.log(err))
    );


    // destroy mock data
    after(() =>
        sql.connect()
            .then(() => sql.destroy())
            .then(() => sql.close())
            .catch(err => console.log(err))
    );

    describe('Calling GetComponentTags with a valid parameter', function () {

        it('should return Status = 200 and [West Virginia] when called with "west"', (done) => {
            const tags = [new Tag('WV', 'West Virginia')];
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

                // response should be equal to tags
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0];
                calledWith.length.should.equal(1);
                tags.should.eql(calledWith);
                done();
            });

        });

        it('should return Status = 200 and [New Hampshire, New Jersey, New Mexico, New York] when called with "new"', (done) => {
            const compare = (a, b) => {
                if (a.id === b.id) {
                    return 0
                } else {
                    return (a.id < b.id) ? -1 : 1;
                }
            }

            let tags = [];
            tags.push(new Tag('NH', 'New Hampshire'));
            tags.push(new Tag('NJ', 'New Jersey'));
            tags.push(new Tag('NM', 'New Mexico'));
            tags.push(new Tag('NY', 'New York'));
            tags = tags.sort(compare);

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

                // response should be equal to tags
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0].sort(compare);
                tags.should.eql(calledWith);
                calledWith.length.should.equal(4);
                done();
            });

        });

        it('should return Status = 200 and [] when called with "canada"', (done) => {
            const tags = [];
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

                // response should be equal to tags
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0];
                tags.should.eql(calledWith);
                calledWith.length.should.equal(0);
                done();
            });

        });

        it('should return Status = 200 and [] when called with 0', (done) => {
            const tags = [];
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
                // status should be 200
                response.status.should.have.been.calledWith(200);

                // response should be equal to tags
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0];
                tags.should.eql(calledWith);
                calledWith.length.should.equal(0);
                done();
            });

        });

        it('should return Status = 200 and [] when called with 1', (done) => {
            const tags = [];
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
                // status should be 200
                response.status.should.have.been.calledWith(200);

                // response should be equal to tags
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0];
                tags.should.eql(calledWith);
                calledWith.length.should.equal(0);
                done();
            });

        });


        it('should return Status = 200 and [] when called with false', (done) => {
            const tags = [];
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
                // status should be 200
                response.status.should.have.been.calledWith(200);

                // response should be equal to tags
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0];
                tags.should.eql(calledWith);
                calledWith.length.should.equal(0);
                done();
            });

        });

        it('should return Status = 200 and [] when called with true', (done) => {
            const tags = [];
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
                // status should be 200
                response.status.should.have.been.calledWith(200);

                // response should be equal to tags
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0];
                tags.should.eql(calledWith);
                calledWith.length.should.equal(0);
                done();
            });

        });

        it('should return Status = 200 and [] when called with "undefined"', (done) => {
            const tags = [];
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

                // response should be equal to tags
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0];
                tags.should.eql(calledWith);
                calledWith.length.should.equal(0);
                done();
            });

        });

        it('should return Status = 200 and [] when called with "null"', (done) => {
            const tags = [];
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

                // response should be equal to tags
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0];
                tags.should.eql(calledWith);
                calledWith.length.should.equal(0);
                done();
            });

        });

        it('should return Status = 200 and [] when called with an object', (done) => {
            const tags = [];
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
                // status should be 200
                response.status.should.have.been.calledWith(200);

                // response should be equal to tags
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0];
                tags.should.eql(calledWith);
                calledWith.length.should.equal(0);
                done();
            });

        });

        it('should return Status = 200 and [] when called with an array', (done) => {
            const tags = [];
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
                // status should be 200
                response.status.should.have.been.calledWith(200);

                // response should be equal to tags
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0];
                tags.should.eql(calledWith);
                calledWith.length.should.equal(0);
                done();
            });

        });

        it('should return Status = 200 and [] when called with a SQL statement', (done) => {
            const tags = [];
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

                // response should be equal to tags
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0];
                tags.should.eql(calledWith);
                calledWith.length.should.equal(0);
                done();
            });

        });

    });

    describe('Calling GetComponentTags with an invalid parameter', function () {

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

                // response should be an error message
                response.send.should.have.been.calledOnce;
                let calledWith = response.send.firstCall.args[0];
                calledWith.should.be.a('string');
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

                // response should be an error message
                response.send.should.have.been.calledOnce;
                let calledWith = response.send.firstCall.args[0];
                calledWith.should.be.a('string');
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

                // response should be an error message
                response.send.should.have.been.calledOnce;
                let calledWith = response.send.firstCall.args[0];
                calledWith.should.be.a('string');
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

                // response should be an error message
                response.send.should.have.been.calledOnce;
                let calledWith = response.send.firstCall.args[0];
                calledWith.should.be.a('string');
                done();
            });

        });

    });

    describe('Calling GetComponentTags with a parameter that contains SQL Server Wildcard characters', function () {

        it('should return Status = 200 and ["[Testing^Escape-Characters]"] when called with "[Testing^Escape-Characters]"', (done) => {
            const tags = [new Tag('N/A', '[Testing^Escape-Characters]')];
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

                // response should be equal to tags
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0];
                calledWith.length.should.equal(1);
                tags.should.eql(calledWith);
                done();
            });

        });

        it('should return Status = 200 and ["Testing%Escape_Characters[]"] when called with "Testing%Escape_Characters[]"', (done) => {
            const tags = [new Tag('N/A', 'Testing%Escape_Characters[]')];
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

                // response should be equal to tags
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0];
                calledWith.length.should.equal(1);
                tags.should.eql(calledWith);
                done();
            });

        });

        it('should return Status = 200 and ["[Testing%Escape_Characters]"] when called with "[Testing%Escape_Characters]"', (done) => {
            const tags = [new Tag('N/A', '[Testing%Escape_Characters]')];
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

                // response should be equal to tags
                response.json.should.have.been.calledOnce;
                let calledWith = response.json.firstCall.args[0];
                calledWith.length.should.equal(1);
                tags.should.eql(calledWith);
                done();
            });

        });

    });

});