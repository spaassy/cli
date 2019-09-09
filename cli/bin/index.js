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
const inquirer = require('inquirer')

const fileIsExist = utils.fileIsExist
const readFileSync = utils.readFileSync
const writeFileSync = utils.writeFileSync

const gitUrl = 'github:spaassy/template'

program
    .command('init')
    .description('Generate a new project')
    .option("-p --project [projectName]", "set project name default 'spaassy'", 'spaassy')
    .alias('i')
    .action(function (cmd) {
        const projectName = cmd.project
        const indexPath = process.cwd()
        console.log(chalk.blue('填写项目相关信息，你也可以直接使用默认值，然后在package.json文件中修改！'))

        inquirer.prompt([{
                type: String,
                name: 'name',
                message: '项目名称:',
                default: projectName
            },
            {
                type: String,
                name: 'version',
                message: '版本:',
                default: '1.0.0'
            },
            {
                type: String,
                name: 'description',
                message: '描述:',
                default: ''
            },
            {
                type: String,
                name: 'author',
                message: '作者:',
                default: ''
            },
            {
                type: String,
                name: 'license',
                message: '许可:',
                default: 'ISC'
            }
        ]).then(answers => {
            const spinner = ora('正在初始化项目……').start();
            console.log(answers)

            if (fileIsExist(path.resolve(indexPath, `${projectName}`))) {
                console.info(chalk.red(`\n${projectName} 文件夹已存在，请先删除！`));
                spinner.stop()
                return
            }

            download(`${gitUrl}#master`, projectName, function (err) {
                spinner.stop()
                if (!err) {
                    let tempPackageData = null
                    if (fileIsExist(path.resolve(indexPath, `${projectName}/package.json`))) {
                        let tempPackageJsonPath = path.resolve(indexPath, `${projectName}/package.json`)
                        tempPackageData = readFileSync(tempPackageJsonPath)
                        let tempPackageJson = JSON.parse(tempPackageData)

                        Object.keys(answers).map(key => {
                            tempPackageJson[key] = answers[key]
                        })

                        let newTempPackageJson = JSON.stringify(tempPackageJson, null, '\t')
                        writeFileSync(tempPackageJsonPath, newTempPackageJson)
                    }
                    // 可以输出一些项目成功的信息
                    console.info(chalk.blueBright('模板初始化成功！'));
                } else {
                    // 可以输出一些项目失败的信息
                    console.log(chalk.red(err))
                }
            })
        })
    })

program.parse(process.argv)