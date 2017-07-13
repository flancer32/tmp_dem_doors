/**
 * Context for entity attribute parser.
 *
 * @namespace parser.entity.attr.context
 * @borrows data.dem.dBEAR.entity.attr as current
 * @borrows data.db.table as table
 */
let context = {
    name: '',       // name of the current entity attribute ('GroupRef')
    current: {},    // currently processing entity attribute structure
    table: {},      // DB table structure to save parsed results
};

module.exports = context;