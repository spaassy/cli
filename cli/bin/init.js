#!/usr/bin/env node

const spawn = require('cross-spawn');
const chalk = require('chalk')

const gitUrl = 'https://github.com/spaassy/template.git'
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
}

module.exports = init