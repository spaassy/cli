#!/usr/bin/env node

const spawn = require('cross-spawn');
const chalk = require('chalk')
const fs = require('fs')

const gitUrl = 'https://github.com/spaassy/template.git'


// 删除文件夹
/**
 * @param {string} path 删除文件的路劲
 */
function delDir(path) {
    let files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                delDir(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(path);
    }
}

const init = (projectName) => {
    console.log(chalk.green(`\n start clone template ......!`))
    const result = spawn.sync(
        `git clone -b master ${gitUrl} ${projectName} && cd ${projectName} && rm -rf .git && npm install`, {
            stdio: 'inherit',
            shell: true
        }
    )
    if (result.signal) {
        if (result.signal === 'SIGKILL') {
            console.log(
                'The init failed because the process exited too early. ' +
                'This probably means the system ran out of memory or someone called ' +
                '`kill -9` on the process.'
            );
        } else if (result.signal === 'SIGTERM') {
            console.log(
                'The init failed because the process exited too early. ' +
                'Someone might have called `kill` or `killall`, or the system could ' +
                'be shutting down.'
            );
        }
        process.exit(1);
    }

    console.log(chalk.green('\n √ Generation completed!'))
    process.exit(result.status);

    // 删除.git文件夹
    delDir(`./${projectName}/.git`)
    let installResult = spawn.sync(
        `cd ${projectName} && npm install`, {
            stdio: 'inherit',
            shell: true
        }
    )
    process.exit(installResult.status);
}

module.exports = init