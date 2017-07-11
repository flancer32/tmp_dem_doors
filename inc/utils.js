/**
 * Application common utilities.
 *
 * @namespace utils
 */
/**
 * Path delimiter.
 *
 * @type {string}
 */
const PD = '/';
/**
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
    },

    /**
     * Join any number of arguments to path string '/pack1/pack2/...'.
     * All doubled part delimiters will be replaced ('// => '/').
     *
     * @param {...string} any number of path parts.
     * @returns {string}
     */
    path: function () {
        const args = Array.prototype.slice.call(arguments);
        let result = args.join(PD);
        const double = PD + PD;
        while (result.includes(double)) {
            result = result.replace(double, PD);
        }
        return result;
    }
};