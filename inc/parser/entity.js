/**
 * @namespace parser.entity
 */

const console = require('console');

const context = require('./entity/context');
const utils = require('../utils');
const dataDbTable = require('../data/db/table');

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
    const attrs = current.attr;
    const indexes = current.index;
    const relations = current.relation;
    const path = utils.path(pack, alias);
    console.log('Parse entity "%s" as "%s" (path: "%s"; comment: "%s")', entityName, alias, path, comment);
    /* create data object to save parsed values */
    /** @type data.db.table */
    const dbTable = utils.clone(dataDbTable);
    dbTable.fullName = path;
    /* parse entity relations */
    if (typeof relations === 'object') {
        const names = Object.keys(relations);
        for (let name of names) {
            /** @type data.dem.dBEAR.entity.relation */
            const one = relations[name];
            /** @type data.dem.dBEAR.entity.relation.ref */
            const ref = one.ref;
            const depPath = utils.path(ref.path); // path to related entity (dependency)
            dbTable.relations.push(depPath);
            console.log('Ref: %s', JSON.stringify(depPath));
        }
    }

    db.tables.push(dbTable);


    // if (typeof packs === 'object') {
    //     const names = Object.keys(packs);
    //     for (let name of names) {
    //         /** @type data.dem.dBEAR.pack */
    //         let one = current[name];
    //         let alias = one.alias;
    //         let comment = one.comment;
    //         console.log('Package \'%s\' with alias \'%s\'.', name, alias);
    //         /* parse entries */
    //         let entities = one.entity;
    //         let eNames = Object.keys(entities);
    //         for (let eName of eNames) {
    //             /** @type data.dem.dBEAR.entity */
    //             let one = entities[eName];
    //             let eAlias = one.alias;
    //             let comment = one.comment;
    //             console.log('Entity \'%s\' with alias \'%s\' from pack \'%s\'.', eName, eAlias, alias);
    //             let fullName = alias + '.' + eAlias;
    //             let tableName = fullName;
    //             console.log('Table name: %s', tableName);
    //             db.tables.push(tableName);
    //         }
    //     }
    // }
};

/**
 * @namespace parser.entity
 *
 * @borrows parser.entity.context as context
 */
module.exports = {
    context: context,
    exec: exec
};