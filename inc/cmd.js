/**
 * Index script to aggregate 'cmd' code.
 *
 * @namespace cmd
 *
 * @borrows cmd.create as create
 * @borrows cmd.func as func
 */
module.exports = {
    create: require('./cmd/create'), // command 'create'
    func: require('./cmd/func')      // coercion functions for 'commander'
};