/**
 * @namespace parser.entity
 */

var context = require('./entity/context');

/**
 *
 * @param {parser.entity.context} ctx
 */
function exec(ctx) {
    /** @type data.dem.dBEAR.pack */
    const current = ctx.current;
    const alias = current.alias;
    const packs = current.pack;
    if (typeof packs === 'object') {
        const names = Object.keys(packs);
        for (let name of names) {
            /** @type data.dem.dBEAR.pack */
            let one = current[name];
            let alias = one.alias;
            let comment = one.comment;
            console.log('Package \'%s\' with alias \'%s\'.', name, alias);
            /* parse entries */
            let entities = one.entity;
            let eNames = Object.keys(entities);
            for (let eName of eNames) {
                /** @type data.dem.dBEAR.entity */
                let one = entities[eName];
                let eAlias = one.alias;
                let comment = one.comment;
                console.log('Entity \'%s\' with alias \'%s\' from pack \'%s\'.', eName, eAlias, alias);
                let fullName = alias + '.' + eAlias;
                let tableName = fullName;
                console.log('Table name: %s', tableName);
                db.tables.push(tableName);
            }
        }
    }
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