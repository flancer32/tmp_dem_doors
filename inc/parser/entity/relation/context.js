/**
 * Context for entity relation parser.
 *
 * @namespace parser.entity.relation.context
 * @borrows data.dem.dBEAR.entity.relation as current
 * @borrows data.db.table as table
 */
let context = {
    name: '',       // name of the current relation ('toCustomerGroup')
    current: {},    // currently processing entity attribute structure
    table: {},      // DB table structure to save parsed results
};

module.exports = context;