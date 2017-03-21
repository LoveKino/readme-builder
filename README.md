# readme-builder

[中文文档](./README_zh.md)   [document](./README.md)

 A simple tool used to generate read me doc for project
- [install](#install)
- [usage](#usage)
  * [CLI quick run](#cli-quick-run)
  * [CLI options](#cli-options)
  * [API quick run](#api-quick-run)
- [develop](#develop)
  * [file structure](#file-structure)
  * [run tests](#run-tests)
- [license](#license)

## install

`npm i readme-builder --save` or `npm i readme-builder --save-dev`

Install on global, using `npm i readme-builder -g`



## usage

### CLI quick run

- buildreadme

run buildreadme in your project root


```shell
commands

    $  cd ../test/fixture/node/p0
    $  ./node_modules/.bin/buildreadme | head -c 200
    $  echo ......
```

<pre>
output

    # test-p0
    
    test p0 project
    
    [中文文档](./README_zh.md)   [document](./README.md)
    
    ## install
    
    `npm i test-p0 --save` or `npm i test-p0 --save-dev`
    
    Install on global, using `npm i test-p0 -g`
    
    ## ......

</pre>


write result to readme.md, just add `-w` option


```shell
commands

    $  cd ../test/fixture/node/p0
    $  ./node_modules/.bin/buildreadme -w
```




### CLI options

- buildreadme

```shell

$ ./node_modules/readme-builder/bin/buildreadme -h

Usage: buildreadme
    -p [project directory, default is current directory]
    -t [project type, default is node]
    -w [write to readme.md]


Options:
  -h, --help  Show help                                                [boolean]


```


### API quick run



```js
let path = require('path');

readmeBuilder({
    projectDir: path.resolve(__dirname, '../test/fixture/node/p0')
}).then((ret) => {
    console.log(ret.en.slice(0, 500) + '\n......'); // en version
    console.log(ret.zh.slice(0, 500) + '\n......'); // zh version
});
```

<pre>
output

    # test-p0
    
    [中文文档](./README_zh.md)   [document](./README.md)
    
    test p0 project
    - [install](#install)
    - [goal](#goal)
    - [usage](#usage)
      * [CLI quick run](#cli-quick-run)
      * [CLI options](#cli-options)
    - [develop](#develop)
      * [file structure](#file-structure)
      * [run tests](#run-tests)
    - [license](#license)
    
    ## install
    
    `npm i test-p0 --save` or `npm i test-p0 --save-dev`
    
    Install on global, using `npm i test-p0 -g`
    
    ## goal
    
    our goal is blah blah...
    
    ## usage
    
    ### CLI quick run
    
    - test
    
    
    ### 
    ......
    # test-p0
    
    [中文文档](./README_zh.md)   [document](./README.md)
    
    test p0 project
    - [安装](#%E5%AE%89%E8%A3%85)
    - [goal](#goal)
    - [使用方法](#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
      * [命令行快速运行](#%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%BF%AB%E9%80%9F%E8%BF%90%E8%A1%8C)
      * [CLI 选项](#cli-%E9%80%89%E9%A1%B9)
    - [开发](#%E5%BC%80%E5%8F%91)
      * [文件结构](#%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84)
      * [运行测试用例](#%E8%BF%90%E8%A1%8C%E6%B5%8B%E8%AF%95%E7%94%A8%E4%BE%8B)
    - [许可证](#%E8%AE%B8%E5%8F%AF%E8%AF%81)
    
    ## 安装
    
    `npm i test-p0 --sa
    ......

</pre>

## develop

### file structure

```
.
│──LICENSE
│──README.md
│──README_zh.md
│──bin
│   └──build-readme.js
│──index.js
│──package.json
│──src
│   │──index.js
│   │──node
│   │   │──collector
│   │   │   │──binHelpers.js
│   │   │   │──commentsContent.js
│   │   │   │──devHelpers.js
│   │   │   │──index.js
│   │   │   └──license.js
│   │   │──filesToc.js
│   │   │──index.js
│   │   └──processor
│   │       │──binQuickRunInfos.js
│   │       │──commentToDocVariables.js
│   │       │──index.js
│   │       └──jsQuickRunInfos.js
│   └──util
│       └──index.js
└──test
    │──fixture
    │   └──node
    └──index.js 
```


### run tests

`npm test`

## license

MIT License

Copyright (c) 2017 chenjunyu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
