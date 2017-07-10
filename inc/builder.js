/**
 * Index script to aggregate 'builder' code.
 *
 * @namespace builder
 */
var console = require('console');
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
 * Start build session.
 * @param ctx
 */
function sessionStart(ctx) {
    return new Promise(function (resolve, reject) {
        let cfg = ctx.cfg;
        let knex = knexLib(cfg.knex);
        ctx.knex = knex;
        resolve(ctx);
    });
}
/**
 * Close DB connections.
 *
 * @param ctx
 * @returns {Promise}
 */
function sessionClose(ctx) {
    return new Promise(function (resolve, reject) {
        const knex = ctx.knex;
        knex.destroy(() => {
            console.log('knex is done');
        });
    });
}

function createTables(ctx) {
    /** @type data.db.tables[] */
    const tables = ctx.db.tables;
    let current = ctx.currentTableIndex;
    if (current == undefined) {
        current = 0;
        ctx.currentTableIndex = current;
    }
    if (current < tables.length) {
        /* continue loop of promises */
        return new Promise(function (resolve, reject) {
            const knex = ctx.knex;
            const tables = ctx.db.tables;
            let current = ctx.currentTableIndex;
            const tblName = tables[current];
            console.log('Current table: %s.', tblName);
            current += 1;
            ctx.currentTableIndex = current;
            resolve(ctx);
        }).then(createTables);
    } else {
        /* end loop of promises */
        return ctx;
    }
}
/**
 * Load DEM JSON and parse it. Save parsed data into context.
 *
 * @param {builder.context} ctx
 */
function exec(ctx) {
    sessionStart(ctx)
        .then(createTables)
        .then(sessionClose);
    // let cfg = ctx.cfg;
    // /** @type {data.db} */
    // let db = ctx.db;
    // let knex = knexLib(cfg.knex);
    // let tables = db.tables;
    // for (let one of tables) {
    //     let tbl = utilConvertFullName(one);
    //     knex.schema.createTableIfNotExists(tbl, function (table) {
    //         table.increments();
    //         table.string('name');
    //         table.timestamps();
    //     }).finally(function () {
    //         knex.destroy(function () {
    //             console.log('Done');
    //         });
    //     });
    // }

}

/**
 * @namespace builder
 */
module.exports = {
    context: context,
    exec: exec
};