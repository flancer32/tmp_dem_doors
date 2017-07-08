/**
 * Index script to aggregate 'cmd' code.
 */
'use strict'
var create = require('./cmd/create');
var funcs = require('./cmd/funcs');

module.exports = {
    create: create, // command 'create'
    funcs: funcs    // coercion functions for 'commander'
};