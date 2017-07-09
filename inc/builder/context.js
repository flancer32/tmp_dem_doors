/**
 * Structure of the builder context.
 */
'use strict'

/**
 * @namespace builder.context
 * @borrows data.cfg as cfg
 * @borrows data.db as db
 */
let context = {
    cfg: require('../data/cfg'),                // application configuration
    db: require('../data/db')                   // DB related data
};

module.exports = context;