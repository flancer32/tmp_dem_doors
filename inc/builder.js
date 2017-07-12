/**
 * Index script to aggregate 'builder' code.
 *
 * @namespace builder
 */
var console = require('console');
var context = require('./builder/context');
var session = require('./builder/session');
var table = require('./builder/table');

/**
 * Get parsed data from context and recreate DB structure.
 *
 * @param {builder.context} ctx
 */
function exec(ctx) {
    /* Create promises chain to build the structure */
    session.start(ctx)
        .then(table.drop)
        .then(table.create)
        .then(session.close)
        .catch((e) => {
            console.log('u-ups...');
            session.close((ctx) => {
            });
        });
}

/**
 * @namespace builder
 */
module.exports = {
    context: context,
    exec: exec
};