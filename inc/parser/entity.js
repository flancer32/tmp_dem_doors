/**
 * @namespace parser.entity
 */

const console = require('console');

const utils = require('../utils');
const context = require('./entity/context');
const parserAttr = require('./entity/attr');
const parserRel = require('./entity/relation');
const origCtxAttr = require('./entity/attr/context');
const origDbTable = require('../data/db/table');

/**
 * Parse entity.
 *
 * @param {parser.entity.context} ctx
 */
function exec(ctx) {
    /* get working vars from context */
    const db = ctx.db;
    const entityName = ctx.name;
    const pack = ctx.pack;
    /** @type data.dem.dBEAR.entity */
    const current = ctx.current;

    /* parse current entity */
    const alias = current.as;
    const comment = current.desc;
    const attrs = current.attrs;
    const indexes = current.index;
    const relations = current.relation;
    const path = utils.path(pack, alias);
    console.log('Parse entity "%s" as "%s" (path: "%s"; comment: "%s")', entityName, alias, path, comment);
    /* create data object to save parsed values */
    /**
     * Table object to be processed in 'builder' (@see {@link builder.table})
     * @type data.db.table
     */
    const dbTable = utils.clone(origDbTable);
    dbTable.fullName = path;

    /* parse entity attributes */
    if (typeof attrs === 'object') {
        const names = Object.keys(attrs);
        for (let name of names) {
            /** @type data.dem.dBEAR.entity.attr */
            const one = attrs[name];
            /** @type parser.entity.attr.context */
            const ctxAttr = utils.clone(parserAttr.context);
            ctxAttr.name = name;
            ctxAttr.current = one;
            ctxAttr.table = dbTable;
            parserAttr.exec(ctxAttr);
        }
    }

    /* parse entity relations */
    if (typeof relations === 'object') {
        const names = Object.keys(relations);
        for (let name of names) {
            /** @type data.dem.dBEAR.entity.relation */
            const one = relations[name];
            /** @type parser.entity.relation.context */
            const ctxRel = utils.clone(parserRel.context);
            ctxRel.name = name;
            ctxRel.current = one;
            ctxRel.table = dbTable;
            parserRel.exec(ctxRel);
        }
    }

    db.tables.push(dbTable);
}

/**
 * @namespace parser.entity
 *
 * @borrows parser.entity.context as context
 * @borrows parser.entity.exec as exec
 */
module.exports = {
    context: context,
    exec: exec
};