/**
 * Index script to aggregate 'parser' code.
 */
'use strict'
var fs = require('fs');
var console = require('console');
var context = require('./parser/context');

/**
 * Load DEM JSON as object.
 *
 * @param {string} file
 */
function load(file) {
    var result = JSON.parse(fs.readFileSync(file, 'utf8'));
    return result;
}

/**
 * Parse DEM and collect tables data.
 *
 * @param {parser.context} ctx
 */
function collectTables(ctx) {
    /** @type {data.dem.dBEAR} */
    let dBEAR = ctx.dem.dBEAR;
    let db = ctx.db;
    /* parse packages */
    let packs = dBEAR.pack;
    let pNames = Object.keys(packs);
    for (let pName of pNames) {
        /** @type data.dem.dBEAR.pack */
        let one = packs[pName];
        let pAlias = one.alias;
        let comment = one.comment;
        console.log("Package '%s' with alias '%s'.", pName, pAlias);
        /* parse entries */
        let entities = one.entity;
        let eNames = Object.keys(entities);
        for (let eName of eNames) {
            /** @type data.dem.dBEAR.entity */
            let one = entities[eName];
            let eAlias = one.alias;
            let comment = one.comment;
            console.log("Entity '%s' with alias '%s' from pack '%s'.", eName, eAlias, pAlias);
            let fullName = pAlias + '.' + eAlias;
            let tableName = fullName;
            console.log("Table name: %s", tableName);
            db.tables.push(tableName);
        }
    }
}

/**
 * Load DEM JSON and parse it. Save parsed data into context.
 *
 * @param {parser.context} ctx
 */
function exec(ctx) {
    var demPath = ctx.demPath;
    var dem = load(demPath);
    ctx.dem = dem;
    collectTables(ctx);
}

module.exports = {
    context: context,
    exec: exec
};