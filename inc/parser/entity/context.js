/**
 * Context for entity parser.
 *
 * @namespace parser.entity.context
 * @borrows data.dem.dBEAR.pack as current
 * @borrows data.db as db
 */
let context = {
    pack: '',       // full path to the current package ('/user/group')
    name: '',       // name of the current entity (SaleOrder)
    current: {},    // currently processing entity structure
    db: {},         // DB structure to save parsed results
};

module.exports = context;