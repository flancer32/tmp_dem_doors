/**
 * DEM structure parser collects DB data for 'knex' processing.
 *
 * @namespace parser
 */
const fs = require('fs');

const context = require('./parser/context');
const parserEntity = require('./parser/entity');
const parserPack = require('./parser/pack');
const utils = require('./utils');

/**
 * Load DEM JSON as object.
 *
 * @param {string} file name of the JSON file to load.
 * @returns {object} loaded JSON as object.
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
function parse(ctx) {
    /** @type {data.dem.dBEAR} */
    const dBEAR = ctx.dem.dBEAR;
    const packs = dBEAR.pack;
    const entities = dBEAR.entity;
    const db = ctx.db;
    /* parse all packages */
    if (typeof packs === 'object') {
        const names = Object.keys(packs);
        for (let name of names) {
            const pack = packs[name];
            /** @type parser.pack.context */
            const ctxPack = utils.clone(parserPack.context);
            ctxPack.db = db;
            ctxPack.name = name;
            ctxPack.path = '/';  // initial path is empty
            ctxPack.current = pack;
            parserPack.exec(ctxPack);
        }
    }

    /* parse all entities  */
    if (typeof entities === 'object') {
        const names = Object.keys(entities);
        for (let name of names) {
            const entity = entities[name];
            /** @type parser.entity.context */
            const ctxEntity = utils.clone(parserEntity.context);
            ctxEntity.db = db;
            ctxEntity.name = name;
            ctxEntity.path = '/';  // initial path is empty
            ctxEntity.current = entity;
            parserEntity.exec(ctxEntity);
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
    parse(ctx);
}

/**
 * @namespace parser
 */
module.exports = {
    context: context,
    exec: exec
};