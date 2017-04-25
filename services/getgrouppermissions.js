'use strict';

const _ = require('lodash');
_.mixin(require('lodash-uuid'));
const db = require('../helpers/galaxydb');
const log4galaxy = require('../helpers/galaxylog');
const Permission = require('../models/permission');
const PermissionTypes = require('./permissiontypes.json');
const GalaxyReturn = require('../models/galaxyreturn');
const GalaxyError = require('../models/galaxyerror');

const mergePermissionsWithPermissionTypes = (permissions, permissionTypes) => {
    let mergedPermissions = {};
    for (let permission of permissions) {
        mergedPermissions[permission.type.code] = permission;
    }
    for (let permissionType of permissionTypes) {
        // if permission type doesnt exist yet, then add a new permission defaulted to false
        if (!mergedPermissions[permission.type.code]) {
            mergedPermissions[permission.type.code] = new Permission(null, permissionType, false);
        }
    }
    //convert mergedPermissions from map to an array
    return Object.keys(mergedPermissions).map(key => mergedPermissions[key]);
}

const mergeComponentTagPermissionsWithPermissionTypes = (componentTagPermissions, permissionTypes) => {
    for (let componentTagPermission of componentTagPermissions) {
        componentTagPermission.permissions =
            mergePermissionsWithPermissionTypes(componentTagPermission.permissions, permissionTypes, PermissionTypes.Component);
    }
    return componentTagPermissions;
}

module.exports = (request, response, next) => {
    let groupId = request.params.groupId;
    if (!_.isString(groupId) || !_.isUuid(groupId.trim())) {
        let error = new Error('"' + groupId + '" is an invalid uuid');
        log4galaxy.logMessage(error);
        response.status(400).json(new GalaxyReturn(null, new GalaxyError(error.message, error.stack)));
    } else {
        db.getComitGroupById(groupId)
            .then(group => {
                let data = {
                    componentTagPermissions: [],
                    systemPermissions: [],
                    isAdmin: false
                };
                if (group.isAdmin) {
                    data.isAdmin = true;
                    return data;
                } else {
                    db.getPermissionTypesBySystemName('comit')
                        .then(permissionTypes => {
                            let systemPermissionTypes = [];
                            let componentTagPermissionTypes = [];

                            for (permissionType of permissionTypes) {
                                if (permissionType.type === PermissionTypes.System) {
                                    systemPermissionTypes.push(permissionType);
                                } else if (permissionType.type === PermissionTypes.Component) {
                                    componentTagPermissionTypes.push(permissionType);
                                }
                            }

                            data.systemPermissions =
                                mergePermissionsWithPermissionTypes(group.systemPermissions, systemPermissionTypes);
                            data.componentTagPermissions =
                                mergeComponentTagPermissionsWithPermissionTypes(group.componentTagPermissions, componentTagPermissionTypes);
                            return data;
                        });
                }
            })
            .then(data => response.status(200).json(new GalaxyReturn(data, null)))
            .catch(error => {
                log4galaxy.logMessage(error);
                let friendly = 'An error occurred while fetching Group permissions.';
                response.status(500).json(new GalaxyReturn(null, new GalaxyError(friendly, error.stack)));
            });
    }
}