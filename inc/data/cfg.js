/**
 * Structure for application configuration data.
 *
 * @namespace cfg
 * @memberOf data
 */
'use strict'

/**
 * see http://knexjs.org/#Installation-client
 *
 * @namespace knex
 * @memberOf data.cfg
 */
let knex = {
    client: '',
    connection: {
        host: '',
        user: '',
        password: '',
        database: '',
        db: ''
    },
    debug: true
}

/**
 * @namespace cfg
 * @memberOf data
 * @borrows data.cfg.knex as knex
 */
module.exports = {
    knex: knex
}