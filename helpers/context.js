'use strict';

const db = require('./galaxydb');

/**
 * Collapses multiple arrays of Permission into a single array. 
 * Permissions will be distinguised by their code.
 * Whenever a duplicate permission is found,
 * it will overwrite the previous permission only if the current permission's value is true.
 * @param {Permission[][]} permissionSets An array of Permission arrays.
 * @return {Permission[]}
 */
const collapsePermissions = (permissionSets) => {
    let permissions = {};
    for (let permissionSet of permissionSets) {
        for (let permission of permissionSet) {
            // insert permission if it does not exist yet OR overwrite permission if new permission is true
            if (!permissions[permission.type.code] || permission.hasPermission) {
                permissions[permission.type.code] = permission;
            }
        }
    }
    //convert permissions from map to an array
    return Object.keys(permissions).map(key => permissions[key]);
}

/**
 * Collapses multiple arrays of ComponentTagPermission into a single array. 
 * ComponentTagPermissions will be distinguised by their Tag's id.
 * Whenever a duplicate ComponentTagPermission is found,
 * it will collapse the previous ComponentTagPermission's Permissions 
 * with the current ComponentTagPermission's Permissions using collapsePermissions().
 * @param {ComponentTagPermission[][]} componentTagPermissionSets An array of ComponentTagPermission arrays.
 * @return {ComponentTagPermission[]}
 */
const collapseComponentTagPermissions = (componentTagPermissionSets) => {
    let componentTagPermissions = {};
    for (let componentTagPermissionSet of componentTagPermissionSets) {
        for (let componentTagPermission of componentTagPermissionSet) {
            let tagId = componentTagPermission.tag.id;
            if (componentTagPermissions[tagId]) {
                // collapse the tags's permissions
                let permissionSets = [componentTagPermissions[tagId].permissions, componentTagPermission.permissions];
                let permissions = collapsePermissions(permissionSets);
                componentTagPermissions[tagId].permissions = permissions;
            } else {
                // insert component tag permissions if it does not exist yet 
                componentTagPermissions[tagId] = componentTagPermission;
            }
        }
    }
    //convert itemPermissions from map to an array
    componentTagPermissions = Object.keys(componentTagPermissions).map(key => componentTagPermissions[key]);
    return componentTagPermissions;
}

/**
 * Fetches both CoMIT System Permissions and CoMIT Component Tag Permissions for the given User. 
 * 
 * In the case where a User belongs to a Group that is marked as administrative in galaxyDB, 
 * user.isAdmin will be set to true and 
 * both user.systemPermissions and user.componenetTagPermissions will be an empty array.
 * 
 * In the case where a User does not belong to a Group that is marked as administrative in galaxyDB,
 * user.isAdmin will be set to false,
 * user.systemPermissions will contain an array of System Permissions, and 
 * user.componenetTagPermissions will contain an array of Component Tag Permissions.
 * 
 * @param {User} user The User to fetch permissions for, where user.groups contains a string array of UPMC AD Group (friendly) names
 * in which the User belongs to.
 * @return {Promise} A promise that will either resolve to a User (now with permissions), or reject with an error.
 */
const comit = (user) => {
    let promises = [];
    for (let group of user.groups) {
        promises.push(db.getComitGroupByName(group));
    }
    return Promise.all(promises)
        .then(groups => {
            let systemPermissionSets = [];
            let componenetTagPermissionSets = [];
            for (let group of groups) {
                if (group.isAdmin) {
                    //user is administrator, ignore permissions
                    user.isAdmin = true;
                    user.systemPermissions = [];
                    user.componenetTagPermissions = [];
                    return user;
                }
                systemPermissionSets.push(group.systemPermissions);
                componenetTagPermissionSets.push(group.componenetTagPermissions);
            }
            //user is not an administrator, merge all permissions
            user.isAdmin = false;
            user.systemPermissions = collapsePermissions(systemPermissionSets);
            user.componenetTagPermissions = collapseComponentTagPermissions(componenetTagPermissionSets)
            return user;
        });
}

module.exports = (user, context) => {
    context = String(context).toLowerCase().trim();
    if (context === 'comit') {
        return comit(user);
    } else {
        return Promise.reject(new Error('The context: ' + String(context) + ' is invalid'));
    }
}
