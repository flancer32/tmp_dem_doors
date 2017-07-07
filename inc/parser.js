/**
 * Load DEM JSON and process all nodes to create DB schema.
 */
'use strict'

var fs = require('fs');

function loader(file) {
    var result = JSON.parse(fs.readFileSync(file, 'utf8'));
    return result;
}

function sortEntitiesByDeps(dem) {
    var db = dem.dBEAR;
    var ns = db.namespace;
    var packages = db.package;
    var entities = db.entity;
    var ctxSort = {
        orderedEntities: {}
    };

    function* entries(obj) {
        for (let key of Object.keys(obj)) {
            yield [key, obj[key]];
        }
    }

    for (let [key, value] of entries(entities)) {
        console.log("key" + key);
    }
}

function exec(ctx) {
    var demFile = ctx.dem;
    var dem = loader(demFile);
    var sorted = sortEntitiesByDeps(dem);
    console.log("parser");
}

module.exports = {
    exec: exec
}