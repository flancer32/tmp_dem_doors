/**
 * Command to load DEM JSON and process all nodes to create DB schema.
 */
'use strict'
var parser = require('../parser');
var utils = require('../utils');

/**
 * Main function to execute command 'create'
 * @param {context} ctx
 */
function exec(ctx) {
    var demFile = ctx.dem;
    console.log('Create structure from "' + demFile + '".');
    /** @type parser.context */
    var ctxParser = utils.clone(parser.context);
    ctxParser.demPath = demFile;
    parser.exec(ctxParser);
}

module.exports = {
    exec: exec
}