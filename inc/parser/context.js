/**
 * Structure of the parser context.
 *
 * @namespace parser.context
 * 
 * @borrows data.db as db
 * @borrows data.dem as dem
 * @borrows string as demPath
 */
module.exports = {
    db: require('../data/db'),          // DB related data
    dem: require('../data/dem'),        // loaded DEM object
    demPath: '',                        // path to DEM JSON
};