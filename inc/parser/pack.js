const console = require('console');

const context = require('./pack/context');
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
    const alias = current.alias;
    const comment = current.comment;
    console.log('Parse package "%s" as "%s" (path: "%s"; comment: "%s")', packName, alias, path, comment);
    const packs = current.pack;
    if (typeof packs === 'object') {
        const names = Object.keys(packs);
        for (let name of names) {
            const pack = packs[name];
            /** @type parser.pack.context */
            const ctxPack = utils.clone(context);
            ctxPack.db = ctx.db;
            ctxPack.name = name;
            ctxPack.path = path + alias + '/';
            ctxPack.current = pack;
            exec(ctxPack);
        }

    }
}

/**
 * @namespace parser.pack
 */
module.exports = {
    context: context,
    exec: exec
};