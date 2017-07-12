/**
 * DB session functions.
 *
 * @namespace builder.session
 */

const console = require('console');
const knexLib = require('knex');

/**
 * Create promise that starts build session.
 *
 * @param {builder.context} ctx
 * @returns {Promise}
 */
function start(ctx) {
    return new Promise(function (resolve) {
        const cfg = ctx.cfg;
        const knex = knexLib(cfg.knex);
        ctx.knex = knex;
        resolve(ctx);
    });
}


/**
 *  Create promise that closes DB connections.
 *
 * @param ctx
 * @returns {Promise}
 */
function close(ctx) {
    return new Promise(function (resolve) {
        const knex = ctx.knex;
        knex.destroy(() => {
            console.log('"knex" is done.');
            resolve(ctx);
        });
    });
}

module.exports = {
    start: start,
    close: close
};