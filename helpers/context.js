'use strict';

const db = require('./galaxydb');

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

const comit = (user) => {
    let promises = [];
    for (group of user.groups) {
        promises.push(db.getComitGroupByName(group.name));
    }
    return Promise.all(promises)
        .then(groups => {
            let systemPermissionSets = [];
            let componenetTagPermissionSets = [];
            for (group of groups) {
                if (group.isAdmin) {
                    //user is administrator
                    user.isAdmin = true;
                    return user;
                }
                systemPermissionSets = systemPermissionSets.concat(group.systemPermissions);
                componenetTagPermissionSets = componenetTagPermissionSets.concat(group.componenetTagPermissions);
            }
            //user is not an administrator, merge all permissions
            user.isAdmin = false;
            user.systemPermissions = collapsePermissions(systemPermissionSets);
            user.componenetTagPermissions = collapseComponentTagPermissions(componenetTagPermissionSets)
            return user;
        });
}

module.exports = (user, context) => {
    if (context == null || context.length === 0) {
        return Promise.reject(new Error('Please provide a valid parameter'));
    } else {
        context = String(context).trim().toLowerCase();
        if (context === 'comit') {
            return comit(user);
        } else {
            return Promise.reject(new Error('The context: ' + String(context) + ' is invalid'));
        }
    }
}
