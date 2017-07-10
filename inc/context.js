/**
 * Structure of the application context.
 *
 * use 'namespace' not a 'module'
 * @namespace context
 *
 * @borrows data.cfg as cfg
 * @borrows data.dem as dem
 */
module.exports = {
    cfg: require('./data/cfg'),                    // application configuration
    dem: require('./data/dem')                     // path to DEM JSON
}