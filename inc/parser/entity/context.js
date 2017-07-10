/**
 * Context for entity parser.
 *
 * @namespace parser.entity.context
 * @borrows data.dem.dBEAR.pack as current
 * @borrows data.db as db
 */
let context = {
    path: '',       // full path to the current package (com.flancer32.doors)
    name: '',       // name of the current package (Root)
    current: {},    // currently processing package structure
    db: {},         // DB structure to save parsed results
};

module.exports = context;