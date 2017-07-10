/**
 * Structure of the parser context.
 */
'use strict';

/**
 * @namespace parser.context
 * @borrows data.db as db
 * @borrows data.dem as dem
 * @borrows string as demPath
 */
let context = {
    db: require('../data/db'),          // DB related data
    dem: require('../data/dem'),        // loaded DEM object
    demPath: '',                        // path to DEM JSON
};

module.exports = context;