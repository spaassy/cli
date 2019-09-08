#!/usr/bin/env node

/**
 * Module dependencies.
 */

const program = require('commander');
const ora = require('ora');
const download = require('download-git-repo');
const chalk = require('chalk')
const utils = require('../utils')
const path = require('path')

const fileIsExist = utils.fileIsExist

const gitUrl = 'github:spaassy/template'

program
    .command('init')
    .description('Generate a new project')
    .option("-p --project [projectName]", "set project name default 'spaassy'", 'spaassy')
    .alias('i')
    .action(function (cmd) {
        const spinner = ora('正在初始化项目……').start();
        const projectName = cmd.project
        // require('./init')(projectName)
        const indexPath = process.cwd()
        if(fileIsExist(path.resolve(indexPath, `${projectName}`))){
            console.info(chalk.red(`\n${projectName} 文件夹已存在，请先删除！`));
            spinner.stop()
            return
        }

        download(`${gitUrl}#master`, projectName, function (err) {
            spinner.stop()
            if (!err) {
                // 可以输出一些项目成功的信息
                console.info(chalk.blueBright('模板初始化成功！'));
            } else {
                // 可以输出一些项目失败的信息
                console.log(chalk.red(err))
            }
        })
    })

program.parse(process.argv)