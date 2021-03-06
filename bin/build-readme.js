#!/usr/bin/env node

'use strict';

/**
 * @readme-quick-run
 *
 * run buildreadme in your project root
 *
 * [readme-lang:zh]在你的项目的根目录下运行buildreadme
 *
 * ## test tar=bash
 *
 * cd ../test/fixture/node/p0
 * ./node_modules/.bin/buildreadme | head -c 200
 * echo "\n\n......"
 */

/**
 * @readme-quick-run
 *
 * write result to readme.md, just add `-w` option
 *
 * [readme-lang:zh]加上-w选项把结果写入到readme文件中
 *
 * ## test tar=bash
 *
 * cd ../test/fixture/node/p0
 * ./node_modules/.bin/buildreadme -w
 * ls README*
 */

let fs = require('fs');
let promisify = require('es6-promisify');
let path = require('path');

let writeFile = promisify(fs.writeFile);

let docBuilder = require('..');

let yargs = require('yargs');

yargs.usage(`Usage: buildreadme
    -p [project directory, default is current directory]
    -t [project type, default is node]
    -w [write to readme.md]
    `).help('h').alias('h', 'help');

let {
    argv
} = yargs;

let projectDir = path.resolve(argv.p || process.cwd());

docBuilder({
    projectDir
}, argv.t).then((readmeMap) => {
    if (argv.w) {
        return Promise.all(
            Object.keys(readmeMap).map((type) => {
                let readmePath = type === 'en' ? path.resolve(projectDir, 'README.md') : path.resolve(projectDir, `README_${type}.md`);
                return writeFile(readmePath, readmeMap[type], 'utf-8');
            })
        );
    } else {
        console.log(readmeMap.en); // eslint-disable-line
    }
}).catch(err => {
    console.log(err.stack); // eslint-disable-line
});
