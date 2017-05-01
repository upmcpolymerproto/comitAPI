'use strict';

const _ = require('lodash');
_.mixin(require('lodash-uuid'));
const db = require('../helpers/galaxydb');
const utils = require('../helpers/galaxyutils');
const log4galaxy = require('../helpers/galaxylog');
const GalaxyReturn = require('../models/galaxyreturn');
const GalaxyError = require('../models/galaxyerror');
const PermissionTypes = require('../models/permissiontypes.json');

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
                    return db.getPermissionTypesBySystemName('comit')
                        .then(permissionTypes => {
                            let systemPermissionTypes = [];
                            let componentTagPermissionTypes = [];

                            for (let permissionType of permissionTypes) {
                                if (permissionType.type === PermissionTypes.SYSTEM) {
                                    systemPermissionTypes.push(permissionType);
                                } else if (permissionType.type === PermissionTypes.COMPONENT) {
                                    componentTagPermissionTypes.push(permissionType);
                                }
                            }

                            data.systemPermissions =
                                utils.mergePermissionsWithPermissionTypes(group.systemPermissions, systemPermissionTypes);
                            data.componentTagPermissions =
                                utils.mergeComponentTagPermissionsWithPermissionTypes(group.componentTagPermissions, componentTagPermissionTypes);
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