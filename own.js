#!/usr/bin/env node
/**
 * Scheme generator CLI app.
 */

/* npm libs */
/** @type {teqfw.dem} */
const teqfw = require('teqfw-dem-es');

const bu = teqfw.util.clone({ad: 'da'});
console.log('op: %s', bu.ad);