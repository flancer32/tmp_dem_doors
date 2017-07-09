/**
 * Application common utilities.
 *
 * @namespace utils
 */
'use strict'

/**
 * Clone 'object'.
 *
 * @param obj
 */
function clone(obj) {
    var result = JSON.parse(JSON.stringify(obj));
    return result;
}

module.exports = {
    clone: clone
};