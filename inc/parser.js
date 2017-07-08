/**
 * Index script to aggregate 'parser' code.
 */
'use strict'
var fs = require('fs');
var context = require('./parser/context');

function load(file) {
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
/**
 * Load DEM JSON and parse it. Save parsed data into context.
 */
function exec(ctx) {

}

module.exports = {
    context: context,
    exec: exec
};