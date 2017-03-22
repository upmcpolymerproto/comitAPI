const config = require('../config/config.json');
const activedirectory = require('activedirectory');
const activeDirectoryUPMC = new activedirectory(config.activedirectory);

/**
 * Determines wheter a user is within the UPMC local Active Directory 
 * by looking up or finding a user by their sAMAccountName, userPrincipalName, distinguishedName (dn) or custom filter.
 * @param {string} id The username to search for in the UPMC Active Directory.
 * @return {Promise} A promise that will either resolve to true (if user is found), 
 * resolve to false (if user is not found), or reject with an error.
 */
module.exports.isUserActive = (id) =>
    new Promise((resolve, reject) => {
        activeDirectoryUPMC.findUser(id, (error, user) => {
            if (error) {
                reject(error);
            } else {
                if (user) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        });
    });

/**
 * Looks up or finds a user by their sAMAccountName, userPrincipalName, 
 * distinguishedName (dn) or custom filter within the UPMC local Active Directory.
 * @param {string} id The username to search for in the UPMC Active Directory.
 * @return {Promise} A promise that will either resolve to a user (if user is found), 
 * resolve to false (if user is not found), or reject with an error.
 */
module.exports.findUser = (id) =>
    new Promise((resolve, reject) => {
        activeDirectoryUPMC.findUser(id, (error, user) => {
            if (error) {
                reject(error);
            } else {
                resolve(user);
            }
        });
    });

/**
 * For the specified username, retrieve all of the groups that a user belongs to in the UPMC Active Directory
 * If a retrieved group is a member of another group, then that group is recursively retrieved as well 
 * to build a complete hierarchy of groups that a user belongs to.
 * @param {string} id The name of the user to retrieve group membership for in the UPMC Active Directory. Can be a sAMAccountName, userPrincipalName, or a distinguishedName (dn).
 * @return {Promise} A promise that will either resolve to an array of groups (if user is found and belongs to 1 or more groups), 
 * resolve to false (if user is not found or belongs to no groups), or reject with an error.
 */
module.exports.getGroupMembershipForUser = (id) =>
    new Promise((resolve, reject) => {
        activeDirectoryUPMC.getGroupMembershipForUser(id, (error, groups) => {
            if (error) {
                reject(error);
            } else {
                resolve(groups);
            }
        });
    });