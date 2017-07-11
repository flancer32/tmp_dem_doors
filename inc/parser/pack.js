/**
 * @namespace parser.pack
 */

const console = require('console');

/** @type parser.entity */
const parserEntity = require('./entity');
const ctxPack = require('./pack/context');
const ctxEntity = require('./entity/context');
const utils = require('../utils');

/**
 *
 * @param {parser.pack.context} ctx
 */
function exec(ctx) {
    const packName = ctx.name;
    const path = ctx.path;
    /** @type data.dem.dBEAR.pack */
    const current = ctx.current;
    const alias = current.as;
    const comment = current.desc;
    console.log('Parse package "%s" as "%s" (path: "%s"; comment: "%s")', packName, alias, path, comment);

    /* parse nested packages */
    const packs = current.pack;
    if (typeof packs === 'object') {
        const names = Object.keys(packs);
        for (let name of names) {
            const pack = packs[name];
            /** @type parser.pack.context */
            const ctxPackNested = utils.clone(ctxPack);
            ctxPackNested.db = ctx.db;
            ctxPackNested.name = name;
            ctxPackNested.path = path + alias + '/';
            ctxPackNested.current = pack;
            exec(ctxPackNested);
        }
    }
    /* parse nested entities */
    const entities = current.entity;
    if (typeof entities === 'object') {
        const names = Object.keys(entities);
        for (let name of names) {
            const entity = entities[name];
            /** @type parser.entity.context */
            const ctxEntNested = utils.clone(ctxEntity);
            ctxEntNested.db = ctx.db;
            ctxEntNested.name = name;
            ctxEntNested.pack = path + alias + '/';
            ctxEntNested.current = entity;
            parserEntity.exec(ctxEntNested);
        }
    }
}

/**
 * @namespace parser.pack
 */
module.exports = {
    context: ctxPack,
    exec: exec
};