'use strict';

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

    describe('User belongs to an Administrative Group', function () {
        it('should return a User marked as an administrator with no Permissions when the given User belongs to one administrative group', function () {

        });
        it('should return a User marked as an administrator with no Permissions when the given User belongs to multiple administrative groups', function () {

        });
    });
    describe('User does not belong to an Administrative Group and has neither System nor Component Tag Permissions', function () {
        it('should return a User with no Permissions when the given User belongs to no groups', function () {

        });
        it('should return a User with no Permissions when the given User belongs to one group with no Permissions', function () {

        });
        it('should return a User with no Permissions when the given User belongs to many groups with no Permissions', function () {

        });
    });
    describe('User only has System Permissions', function () {
        it('should return a User with System Permissions when the given User belongs to one group with System Permissions', function () {

        });
        it('should return a User with System Permissions when the given User belongs to many groups with System Permissions', function () {

        });
    });
    describe('User only has Component Tag Permissions', function () {
        it('should return a User with Component Tag Permissions when the given User belongs to one group with Component Tag Permissions', function () {

        });
        it('should return a User with Component Tag Permissions when the given User belongs to many groups with Component Tag Permissions', function () {

        });
    });
    describe('User has both System and Component Tag Permissions', function () {
        it('should return a User with System and Component Tag Permissions when the given User belongs to one group with both System and Component Tag Permissions', function () {

        });
        it('should return a User with System and Component Tag Permissions when the given User belongs to one group with System Permissions and another group with Component Tag Permissions', function () {

        });
        it('should return a User with System and Component Tag Permissions when the given User belongs to many groups with both System and Component Tag Permissions', function () {

        });
    });

});