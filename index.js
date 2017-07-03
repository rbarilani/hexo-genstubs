#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const pkg = require('./package.json');
const genstubs = require('./lib/genstubs');

const program = require('yargs')
  .usage('$0 [options]')
  .example('$0 -N 1000 -P 10', 'Generate 1000 posts, with 10 paragraphs each')
  .option('number', {
    alias: 'N',
    describe: 'number of posts to generate',
    default: 5000
  })
  .option('layout', {
    alias: 'L',
    describe: 'post or page?',
    default: 'post'
  })
  .option('paragraphs', {
    alias: 'P',
    describe: 'number of paragraphs to generate per post',
    default: 100
  })
  .option('tags', {
    alias: 't',
    describe: 'number of tags to be added (from tagPool) per post',
    default: 0
  })
  .option('tag-pool', {
    alias: 'T',
    describe: 'size of tagPool',
    default: 50
  })
  .option('cats', {
    alias: 'c',
    describe: 'number of categories to be added (from catPool) per post',
    default: 0
  })
  .option('cat-pool', {
    alias: 'C',
    describe: 'size of catPool',
    default: 20
  })
  .epilogue(
    chalk.bold('  Author: ') +
    chalk.underline('leesei@gmail.com') + '       ' +
    chalk.underline('ruben.barilani.dev@gmail.com') + '       ' +
    chalk.bold('License: ') + pkg.license
  )
  .help()
  .alias('h', 'help')
  .strict()
  .argv;


genstubs(program);
