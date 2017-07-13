const console = require('console');
const utils = require('../utils');

function create(ctx) {
    /** @type data.db.tables[] */
    const tables = ctx.db.tables;
    let current = ctx.currentTableIndex;
    if (current == undefined) {
        current = 0;
        ctx.currentTableIndex = current;
    }
    if (current < tables.length) {
        /* continue loop of promises */
        return new Promise(function (resolve) {
            const knex = ctx.knex;
            const tables = ctx.db.tables;
            let current = ctx.currentTableIndex;
            /** @type {data.db.table} */
            var table = tables[current];
            const name = utils.dbName(table.fullName);
            console.log('Create table: %s.', name);
            current += 1;
            ctx.currentTableIndex = current;
            knex.schema
                .createTableIfNotExists(name, (baby) => {
                    const attrssss = table.attributes;
                    /** @type data.db.table.attribute */
                    for (let one of attrssss) {
                        const colName = one.name;
                        if (one.type == 'increment') {
                            baby.increments(colName);
                        } else {
                            baby.string(colName);
                        }
                    }
                })
                .then(() => {
                    console.log('Table %s is created.', name);
                    resolve(ctx);
                });
        }).then(create);
    } else {
        /* end loop of promises */
        return ctx;
    }
}


function drop(ctx) {
    /** @type data.db.tables[] */
    const tables = ctx.db.tables;
    let current = ctx.currentTableIndex;
    if (current == undefined) {
        current = 0;
        ctx.currentTableIndex = current;
    }
    if (current < tables.length) {
        /* continue loop of promises */
        return new Promise((resolve) => {
            const knex = ctx.knex;
            const tables = ctx.db.tables;
            let current = ctx.currentTableIndex;
            /** @type {data.db.table} */
            const table = tables[current];
            const name = utils.dbName(table.fullName);
            console.log('Drop table: %s.', name);
            current += 1;
            ctx.currentTableIndex = current;
            knex.schema
                .dropTableIfExists(name)
                .then(() => {
                    console.log('Table %s is dropped.', name);
                    resolve(ctx);
                });
            // resolve(ctx);
        }).then(drop);
    } else {
        /* end loop of promises and reset ctx counter to create tables */
        ctx.currentTableIndex = 0;
        return ctx;
    }
}

module.exports = {
    create: create,
    drop: drop
};