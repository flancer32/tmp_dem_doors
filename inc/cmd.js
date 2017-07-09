/**
 * Index script to aggregate 'cmd' code.
 */
'use strict'

module.exports = {
    create: require('./cmd/create'), // command 'create'
    funcs: require('./cmd/funcs')    // coercion functions for 'commander'
};