/**
 * Load DEM JSON and process all nodes to create DB schema.
 */
'use strict'

var fs = require('fs');

function loader(file) {
    var result = JSON.parse(fs.readFileSync(file, 'utf8'));
    return result;
}

function exec(ctx) {
    var demFile = ctx.dem;
    var dem = loader(demFile);
    console.log("parser");
}

module.exports = {
    exec: exec
}