'use strict';

const db = require('../helpers/galaxydb');
const log4galaxy = require('../helpers/galaxylog');
const GalaxyReturn = require('../models/galaxyreturn');
const GalaxyError = require('../models/galaxyerror');



module.exports = (request, response, next) => {
    let system = (request.params.system != null) ? String(request.params.system).trim() : '';
    if (system === '') {
        let error = new Error('Please provide a valid parameter for the search');
        log4galaxy.logMessage(error);
        response.status(400).send(new GalaxyReturn(null, new GalaxyError(error.message, error.stack)));
    } else {
        db.getPermissionTypesBySystemName(system)
            .then(permissionTypes => {
                let data = {
                    permissionTypes: permissionTypes
                };
                response.status(200).json(new GalaxyReturn(data, null));
            })
            .catch(error => {
                log4galaxy.logMessage(error);
                let friendly = 'An error occurred while fetching Permission Types.';
                response.status(500).send(new GalaxyReturn(null, new GalaxyError(friendly, error.stack)));
            });
    }
}