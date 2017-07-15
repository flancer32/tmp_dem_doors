/**
 * @namespace builder.table
 */

const console = require('console');
const utils = require('../utils');
/** @type data.db.table.attribute.type */
const attrType = require('../data/db/table/attribute/type');


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
        return new Promise(function (resolve) {
            const knex = ctx.knex;
            const tables = ctx.db.tables;
            let current = ctx.currentIndex;
            /** @type {data.db.table} */
            let table = tables[current];
            const name = utils.dbName(table.fullName);
            console.log('Create table: %s.', name);
            ++current;
            ctx.currentIndex = current;
            knex.schema
                .createTableIfNotExists(name, (baby) => {
                    const attrs = table.attributes;
                    /** @type data.db.table.attribute */
                    for (let one of attrs) {
                        const colName = one.name;
                        let column;
                        if (one.type === attrType.increments) {
                            column = baby.increments(colName);
                        } else if (one.type === attrType.binary) {
                            column = baby.binary(colName);
                        } else if (one.type === attrType.boolean) {
                            column = baby.boolean(colName);
                        } else if (one.type === attrType.integer) {
                            column = baby.integer(colName);
                        } else if (one.type === attrType.decimal) {
                            column = baby.decimal(colName);
                        } else if (one.type === attrType.enum) {
                            column = baby.enu(colName);
                        } else if (one.type === attrType.string) {
                            column = baby.string(colName);
                        }
                        /* nullable */
                        if (one.nullable === true) {
                            column.nullable();
                        } else {
                            column.notNullable();
                        }
                        /* unsigned */
                        if (one.unsigned === true) {
                            column.unsigned();
                        }
                    }
                })
                .then(() => {
                    console.log('Table %s is created.', name);
                    resolve(ctx);
                });
        }).then(create);
    } else {
        /* end loop of promises and reset ctx counter for tables creature */
        ctx.currentIndex = 0;
        return ctx;
    }
}


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
            console.log('Drop table: %s.', name);
            ++current;
            ctx.currentIndex = current;
            knex.schema
                .dropTableIfExists(name)
                .then(() => {
                    console.log('Table %s is dropped.', name);
                    resolve(ctx);
                });
        }).then(drop);
    } else {
        /* end loop of promises and reset ctx counter for tables creature */
        ctx.currentIndex = 0;
        return ctx;
    }
}

module.exports = {
    create: create,
    drop: drop
};