/**
 * Structure of the builder context.
 *
 * @namespace builder.context
 *
 * @borrows data.cfg as cfg
 * @borrows data.db as db
 */
module.exports = {
    cfg: require('../data/cfg'),                // application configuration
    db: require('../data/db'),                  // DB related data
    knex: {}                                    // initialized knex object
};