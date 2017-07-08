/**
 * Structure of the parser context.
 */
'use strict'

/**
 * @namespace parser.context
 * @type {{demPath: string, dem: {}, db: {tables: Array}}}
 */
var context = {
    demPath: '',                    // path to DEM JSON
    dem: {},                        // loaded DEM object
    db: {                           // DB related data
        tables: []                  // tables sorted in depended order
    }
};

module.exports = context;