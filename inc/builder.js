/**
 * Index script to aggregate 'builder' code.
 */
'use strict'
var knexLib = require('knex');
var context = require('./builder/context');

/**
 *
 * @param {string} name
 */
function utilConvertFullName(name) {
    let result = name.replace(/\./g, '_');
    return result;
}

/**
 * Load DEM JSON and parse it. Save parsed data into context.
 *
 * @param {builder.context} ctx
 */
function exec(ctx) {
    let cfg = ctx.cfg;
    /** @type {data.db} */
    let db = ctx.db;
    let knex = knexLib(cfg.knex)
    let tables = db.tables;
    for (let one of tables) {
        let tbl = utilConvertFullName(one);
        knex.schema.createTableIfNotExists(tbl, function (table) {
            table.increments();
            table.string('name');
            table.timestamps();
        }).finally(function () {
            knex.destroy(function () {
                console.log("Done");
            });
        });
    }

}

module.exports = {
    context: context,
    exec: exec
};