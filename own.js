#!/usr/bin/env node
/**
 * Scheme generator CLI app.
 */


/* npm libs */
const console = require('console');
/** @type {teqfw.dem} */
const teqfw = require('teqfw-dem-es');

/* application config (DB connection) */
const cfg = require('./cfg');

/**
 * Create context for DEM builder and configure it.
 *
 * @type {teqfw.dem.context}
 */
const ctx = teqfw.context.clone();
ctx.cfg.knex = cfg.knex;
ctx.logger = console;
ctx.filename = 'doors.json';

/**
 * Build DB structure from DEM JSON.
 */
teqfw.build(ctx);