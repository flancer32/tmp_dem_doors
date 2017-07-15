/**
 * Functions to parse relation part of DEM.
 *
 * @namespace parser.entity.relation
 */

const console = require('console');

const context = require('./relation/context');
const utils = require('../../utils');
const origDbForeign = require('../../data/db/table/foreign');

/**
 * Parse entity relation.
 *
 * @param {parser.entity.relation.context} ctx
 */
function exec(ctx) {
    const name = ctx.name;
    /** @type data.db.table */
    const table = ctx.table;
    /** @type data.dem.dBEAR.entity.relation */
    const current = ctx.current;

    /* parse current relation */

    /* create data object to save parsed values */
    /** @type data.db.table.foreign */
    const dbForeign = utils.clone(origDbForeign);
    dbForeign.own = current.own;
    const refPath = current.ref.path;
    const refTable = utils.dbName(refPath);
    dbForeign.inTable = refTable;
    dbForeign.other = current.ref.attrs;

    table.foreigns.push(dbForeign);
    console.log('\t\tRelation: %s', name);
}

/**
 * @namespace parser.entity.relation
 *
 * @borrows parser.entity.attr.context as context
 */
module.exports = {
    context: context,
    exec: exec
};