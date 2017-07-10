/**
 * Application common utilities.
 *
 * @namespace utils
 */
module.exports = {
    /**
     * Clone 'object'.
     *
     * @param {object} obj object to clone
     * @returns {object} cloned object
     */
    clone: function clone(obj) {
        var result = JSON.parse(JSON.stringify(obj));
        return result;
    }
};