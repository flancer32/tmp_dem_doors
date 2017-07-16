const console = require('console');
const utils = require('../utils');

/**
 * @param {builder.context} ctx
 */
function create(ctx) {
    const total = ctx.db.tables.length;
    let current = ctx.currentIndex;
    if (current === undefined) {
        current = 0;
        ctx.currentIndex = current;
    }
    /* return promise for tables processing or context at the end. */
    if (current < total) {
        /* continue loop of promises */
        return new Promise((resolve) => {
            const knex = ctx.knex;
            const tables = ctx.db.tables;
            let current = ctx.currentIndex;
            /** @type {data.db.table} */
            const table = tables[current];
            const name = utils.dbName(table.fullName);
            console.log('Create foreign keys for table: %s.', name);
            ++current;
            ctx.currentIndex = current;
            /* use 'knex' to create foreign keys for the table. */
            knex.schema.table(name, (tbl) => {
                /** @type {data.db.table.foreign[]} */
                const foreigns = table.foreigns;
                for (let one of foreigns) {
                    const own = one.own;
                    const others = one.other;
                    const inTable = one.inTable;
                    tbl.foreign(own)
                        .references(others).inTable(inTable)
                        .onDelete('CASCADE')
                        .onUpdate('CASCADE');
                }
                resolve(ctx);
            }).then(() => {
                console.log('Foreign keys for table %s are processed.', name);
                resolve(ctx);
            });
        }).then(create);
    } else {
        /* end loop of promises and reset ctx counter for tables creature */
        ctx.currentIndex = 0;
        return ctx;
    }
}

/**
 * @param {builder.context} ctx
 */
function drop(ctx) {
    const total = ctx.db.tables.length;
    let current = ctx.currentIndex;
    if (current === undefined) {
        current = 0;
        ctx.currentIndex = current;
    }
    if (current < total) {
        /* continue loop of promises */
        return new Promise((resolve) => {
            const knex = ctx.knex;
            const tables = ctx.db.tables;
            let current = ctx.currentIndex;
            /** @type {data.db.table} */
            const table = tables[current];
            const name = utils.dbName(table.fullName);
            console.log('Drop foreign keys for table: %s.', name);
            ++current;
            ctx.currentIndex = current;
            /* get table by name */
            knex.schema.table(name, (tbl) => {
                /** @type {data.db.table.foreign[]} */
                const foreigns = table.foreigns;
                for (let one of foreigns) {
                    const own = one.own;
                    tbl.dropForeign(own);
                }
                resolve(ctx);
            }).then(() => {
                console.log('Foreign keys for table %s are processed.', name);
                resolve(ctx);
            });
        }).then(drop);
    } else {
        /* end loop of promises and reset ctx counter for tables creature */
        ctx.currentIndex = 0;
        return ctx;
    }
}

/**
 * @namespace builder.foreign
 */
module.exports = {
    create: create,
    drop: drop
};