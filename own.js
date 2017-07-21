#!/usr/bin/env node
/**
 * Scheme generator CLI app.
 */
const console = require('console');
const cfg = require('./cfg');

/* npm libs */
/** @type {teqfw.dem} */
const teqfw = require('teqfw-dem-es');

/** @type {teqfw.dem.context} */
const ctx = teqfw.context.clone();
ctx.cfg.knex = cfg.knex;
ctx.logger = console;
ctx.dem = {dem: {path: '/root/path'}, entity: {user: {}}};

teqfw.build(ctx);