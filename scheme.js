#!/usr/bin/env node
/**
 * Scheme generator CLI app.
 */

/* npm libs */
const commander = require('commander');

/* application includes */
const ctx = require('./inc/context');
const cmd = require('./inc/cmd');

/* application local configs */
const cfg = require('./cfg'); // load local config
ctx.cfg = cfg;  // ...and put it to application context

/**
 * Define application options & commands.
 */
commander
    .version(require('./package.json').version)
    .option('-i, --in [value]', 'Input DEM file (JSON)', cmd.func.absolutePath);

commander
    .command('create')
    .description('Create DB scheme from DEM. Usage: scheme --in [value] create')
    .action(function () {
        ctx.dem = commander.in;
        cmd.create.exec(ctx);
    });

/**
 * Parse runtime parameters and execute requested command.
 */
commander.parse(process.argv);