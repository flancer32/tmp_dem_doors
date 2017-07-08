#!/usr/bin/env node
/**
 * Scheme generator CLI app.
 */
'use strict'

/* npm libs */
var commander = require('commander');

/* application includes */
var ctx = require('./inc/context');
var cmd = require('./inc/cmd');
var funcs = cmd.funcs;

/* application local configs */
var cfg = require('./cfg'); // load local config
ctx.cfg = cfg;  // ...and put it to application context

/**
 * Define application options & commands.
 */
commander
    .version(require('./package.json').version)
    .option('-i, --in [value]', 'Input DEM file (JSON)', funcs.absolutePath);

commander
    .command('create')
    .description('Create DB scheme from DEM. Usage: scheme --in [value] create')
    .action(function (command) {
        ctx.dem = commander.in;
        cmd.create.exec(ctx)
    });

/**
 * Parse runtime parameters and execute requested command.
 */
commander.parse(process.argv);