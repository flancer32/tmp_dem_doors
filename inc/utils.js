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
const PD = '/';     // path delimiter (in DEM)
const ND = '_';     // names delimiter (in DB)
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
    },
    /**
     * Conver DEM path to DB allowed name.
     *
     * @param Pstring} path DEM path (/usr/group/role)
     * @returns {string} DB allowed name (usr_group_role)
     */
    dbName: function (path) {
        /* TODO: create pattern based on utils.PD */
        let result = path.replace(/\//g, ND);
        if (result.charAt(0) === ND)
            result = result.slice(1);
        return result;
    }
};