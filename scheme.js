#!/usr/bin/env node
/**
 * Scheme generator CLI app.
 */
'use strict'

/* npm libs */
var cmd = require('commander');

/* app incs */
var cmdFuncs = require('./inc/commander');
var ctx = require('./inc/context');
var parser = require('./inc/parser');

/* app configs */
var cfg = require('./cfg');
ctx.cfg = cfg;  // load local config and put to context

/**
 * Define application options & commands.
 */
cmd
    .version(require('./package.json').version)
    .option('-i, --in [value]', 'Input DEM file (JSON)', cmdFuncs.absolutePath);

cmd
    .command('create')
    .description('Create DB scheme from DEM. Usage: scheme --in [value] create')
    .action(function (command) {
        ctx.dem = cmd.in;
        parser.exec(ctx)
    });

/**
 * Parse runtime parameters and execute requested command.
 */
cmd.parse(process.argv);