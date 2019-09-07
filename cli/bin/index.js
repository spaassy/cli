#!/usr/bin/env node


/**
 * Module dependencies.
 */

var program = require('commander');

program
    .command('init')
    .description('Generate a new project')
    .option("-p --project [projectName]", "set project name default 'spaassy'", 'spaassy')
    .alias('i')
    .action(function (cmd) {
        require('./init.js')(cmd.project)
    })

program.parse(process.argv)