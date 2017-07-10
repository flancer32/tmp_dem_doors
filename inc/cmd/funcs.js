/**
 * Commander coercion functions (https://www.npmjs.com/package/commander#coercion).
 */
'use strict';

var path = require('path');

/**
 * Return absolute path to file related to working directory.
 *
 * @param {string} val
 * @returns {string}
 */
function absolutePath(val) {
    var currentDir = process.cwd();
    var result = path.join(currentDir, val);
    return result;
}

module.exports = {
    absolutePath: absolutePath
};