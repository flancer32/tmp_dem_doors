/**
 * @namespace parser.entity.attr
 */

const console = require('console');

const context = require('./attr/context');
const utils = require('../../utils');
const origDbTableAttr = require('../../data/db/table/attribute');
/** @type data.db.table.attribute.type */
const attrType = require('../../data/db/table/attribute/type');

/**
 * Parse entity atttribute.
 *
 * @param {parser.entity.attr.context} ctx
 */
function exec(ctx) {
    /* get working vars from context */
    const attrName = ctx.name;
    /** @type data.db.table */
    const table = ctx.table;
    /** @type data.dem.dBEAR.entity.attr */
    const current = ctx.current;

    /* parse current attribute */

    /* create data object to save parsed values */
    /** @type data.db.table.attribute */
    const dbAttr = utils.clone(origDbTableAttr);
    dbAttr.name = current.as;
    dbAttr.comment = current.desc;
    if (current.increment) {
        dbAttr.type = attrType.increments;
    } else if (current.binary) {
        dbAttr.type = attrType.binary;
    } else if (current.boolean) {
        dbAttr.type = attrType.boolean;
    } else if (current.integer) {
        dbAttr.type = attrType.integer;
    } else if (current.numeric) {
        dbAttr.type = attrType.decimal;
    } else if (current.option) {
        dbAttr.type = attrType.enum;
    } else if (current.text) {
        dbAttr.type = attrType.string;
    }
    table.attributes.push(dbAttr);
    console.log('\t\tAttr: %s', attrName);
}

/**
 * @namespace parser.entity.attr
 *
 * @borrows parser.entity.attr.context as context
 */
module.exports = {
    context: context,
    exec: exec
};