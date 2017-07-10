/**
 * Command to load DEM JSON and process all nodes to create DB schema.
 * @namespace cmd.create
 */
var console = require('console');
var builder = require('../builder');
var parser = require('../parser');
var utils = require('../utils');

/**
 * Main function to execute command 'create'
 *
 * @param {context} ctx
 */
function exec(ctx) {
    let demFile = ctx.dem;
    console.log('Create structure from "' + demFile + '".');
    /** @type {parser.context} */
    let ctxParser = utils.clone(parser.context);
    ctxParser.demPath = demFile;
    parser.exec(ctxParser);
    /** @type {builder.context} */
    let ctxBuilder = utils.clone(builder.context);
    ctxBuilder.cfg = ctx.cfg;
    ctxBuilder.db = ctxParser.db;
    builder.exec(ctxBuilder);
    console.log('Done.');
}

/**
 * @namespace cmd.create
 */
module.exports = {
    exec: exec
};