/**
 * Structure of the application context.
 */
'use strict';

/**
 * Application context.
 *
 * @namespace context
 * @borrows data.cfg as cfg
 * @borrows data.dem as dem
 */
let context = {
    cfg: require('./data/cfg'),                    // application configuration
    dem: require('./data/dem')                     // path to DEM JSON
};
module.exports = context;