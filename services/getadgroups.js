'use strict';
const config = require('../config/config.json');
const activeDirectory = require('activedirectory');
const Group = require('../models/group');
const galaxyLog = require('../helpers/galaxylog');
const GalaxyReturn = require('../models/galaxyreturn');
const filters = activeDirectory.filters;
const ad = new activeDirectory(config.activedirectory);

/**
 * Parses the GUID from the storage buffer
 * @param {Buffer} objectGUID The Buffer containing the GUID to be parsed.
 * @return {String} The parsed and formatted GUID String.
 */
const parseGUID = ( objectGUID ) => {
    var s, hex = Array.prototype.map.call(
        //calls the following function on all elements of objectGUID
        objectGUID, value => {
            //Get the least significant byte and convert it to hex.
            s = (value & 0xFF).toString(16);
            return value <= 0xF ? ('0' + s) : s;
        }
    );
    return( 
        [hex[3], hex[2], hex[1], hex[0], '-',
        hex[5], hex[4], '-',
        hex[7], hex[6], '-',
        hex[8], hex[9], '-',
        hex[10], hex[11], hex[12], hex[13], hex[14], hex[15], ''
    ].join(''));
}

/**
 * Queries the AD server and returns a subset of groups containing the specified string.
 * @param {String} startsWith The parameter from the user to search all groups for.
 * @return {Promise} A promise that resolves to a GalaxyReturn containing a collection of Group objects or rejects to an error message.
 */
const getADGroups = (startsWith) => 
    new Promise((resolve, reject) => {
    //specify optional params for ldap query
    var opts = {  
        filter: "CN=" + startsWith + "*",
        //specify which attributes to be returned from the AD server
        attributes: ['objectGUID', 'cn'],
        sizeLimit: 20,
        timeLimit: 2,
        //specify custom function (parseGUID) to parse the results of the ldap object(s)
        entryParser: (entry, raw, callback) => {
            //parse and overwrite each raw GUID with the format matching xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
            entry.objectGUID = parseGUID(raw.objectGUID);
            callback(entry);
        }
    }
    ad.findGroups(opts, (err, groups) => {
        var returnGroups = [];
        //ldap query failed
        if (err) {
            reject(new GalaxyReturn(returnGroups, err));
        }else if(!groups){
            resolve(new GalaxyReturn(returnGroups, null));
        }else{
            for(var i = 0; i< groups.length; i++){
                returnGroups.push(new Group(groups[i].objectGUID, groups[i].cn,[]));
            };
            resolve(new GalaxyReturn(returnGroups, null));
        }
    });
});


module.exports = (request, response, next) =>  {
    let startsWith = (request.params.startsWith != null) ? String(request.params.startsWith).trim() : '';
    if (startsWith === '') {
        let error = new Error('Please provide a valid parameter');
        galaxyLog.logMessage(error);
        response.status(400).send(error.message);
    } else {
        getADGroups(startsWith).then(groups =>{
            galaxyLog.logMessage("Query for groups containing \"" + startsWith +"\" returned " + groups.data.length + " group(s).");
            response.status(200).send(groups);
        }).catch(err => {
            galaxyLog.logMessage('ERROR: ' + err);
            response.status(400).send(err);
        });
    }
}