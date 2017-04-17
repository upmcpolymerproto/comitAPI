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

const collapseItemPermissions = (itemPermissionSets) => {
    let itemPemissions = {};
    for (let itemPermissionSet of itemPermissionSets) {
        for (let itemPermission of itemPermissionSet) {
            let itemId = itemPermission.item.id;
            if (itemPemissions[itemId]) {
                // collapse the item's permissions
                let permissionSets = [itemPemissions[itemId].permissions, itemPermission.permissions];
                let permissions = collapsePermissions(permissionSets);
                itemPemissions[itemId].permissions = permissions;
            } else {
                // insert item permission if it does not exist yet 
                itemPemissions[itemId] = itemPermission;
            }
        }
    }
    //convert itemPermissions from map to an array
    itemPemissions = Object.keys(itemPemissions).map(key => itemPemissions[key]);
    return itemPemissions;
}

const collapseSystemPermissions = (user, systemPermissionSets) => {
    for (let systemPermissionSet of systemPermissionSets) {
        for (let systemPermission of systemPermissionSet) {
            if (systemPermission.type.code === 'admin' && systemPermission.hasPermission === true) {
                user.isAdmin = true;
                break;
            }
        }
    }
    return collapsePermissions(systemPermissionSets);
}

const mergeGroups = (adGroups, dbGroups) => {
    let groups = [];
    for (let dbGroup of dbGroups) {
        if (adGroups.includes(dbGroup.name)) {
            groups.push(dbGroup);
        }
    }
    return groups;
}

module.exports = (user, context) => {
    if (context == null || context.length === 0) {
        return Promise.reject(new Error('Please provide a valid parameter'));
    } else {
        context = String(context).trim().toLowerCase();
        // db.getSystemByName(context)
        //     .then(system => db.getGroupsBySystemId(system.id))
        //     .then(groups => mergeGroups(user.groups, groups))
        //     .then(groups => {
        //         let itemPermissionSets = [];
        //         let systemPermissionSets = [];
        //         for (let group of groups) {
        //             for (let roles of group.roles) {
        //                 systemPermissionSets = systemPermissionSets.concat(roles.systemPermissions);
        //                 itemPermissionSets = itemPermissionSets.concat(roles.itemPermissions);
        //             }
        //         }
        //         let promises = [collapseSystemPermissions(user, systemPermissionSets), collapseItemPermissions(itemPermissionSets)]
        //         return Promise.all(promises);
        //     })
        //     .then(result => {
        //         user.systemPermissions = result[0];
        //         user.itemPemissions = result[1];
        //         return user;
        //     })
        //     .catch(error => Promise.reject(error));
            
            // TODO remove
            return Promise.resolve(user);
    }
}