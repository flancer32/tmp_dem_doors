/**
 * @namespace data.dem
 */

var entity = {
    alias: '',
    comment: ''
};
/**
 * @namespace
 * @memberOf data.dem.dBEAR
 */
var pack = {
    alias: '',  // package alias (part of the tables names for entities)
    comment: '',
    pack: {}, // object with nested packages
    entity: {}  // object with this package entities
};
/**
 * @namespace
 * @memberOf data.dem
 */
var dBEAR = {
    entity: {}, // object wih root entities
    pack: {}    // object with internal packages
};

/**
 * @namespace data.dem
 * @borrows dBEAR as dBEAR
 */
var dem = {
    dBEAR: dBEAR
};

/**
 * @namespace data.dem
 */
module.exports = dem;