/**
 * Build database structure with 'knex' using parsed DEM.
 *
 * @namespace builder
 */
var console = require('console');
var context = require('./builder/context');
var session = require('./builder/session');
var table = require('./builder/table');
var foreign = require('./builder/foreign');

/**
 * Get parsed data from context and recreate DB structure.
 *
 * @param {builder.context} ctx
 */
function exec(ctx) {
    /* Create promises chain to re-build the structure */
    session.start(ctx)
        .then(foreign.drop)
        .then(table.drop)
        .then(table.create)
        .then(foreign.create)
        .then(session.close)
        .catch((e) => {
            console.log('Some error: %s', JSON.stringify(e));
            session.close(ctx);
        });
}

/**
 * @namespace builder
 *
 * @borrows builder.context as context
 */
module.exports = {
    context: context,
    exec: exec
};