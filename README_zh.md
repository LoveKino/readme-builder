# readme-builder

[中文文档](./README_zh.md)   [document](./README.md)

用于生成项目的readme文档的简单工具
- [安装](#%E5%AE%89%E8%A3%85)
- [goal](#goal)
- [使用方法](#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
  * [命令行快速运行](#%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%BF%AB%E9%80%9F%E8%BF%90%E8%A1%8C)
  * [CLI 选项](#cli-%E9%80%89%E9%A1%B9)
  * [API 快速运行](#api-%E5%BF%AB%E9%80%9F%E8%BF%90%E8%A1%8C)
- [api](#api)
  * [result=readmeBuilder(options, type)](#resultreadmebuilderoptions-type)
- [开发](#%E5%BC%80%E5%8F%91)
  * [文件结构](#%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84)
  * [运行测试用例](#%E8%BF%90%E8%A1%8C%E6%B5%8B%E8%AF%95%E7%94%A8%E4%BE%8B)
- [许可证](#%E8%AE%B8%E5%8F%AF%E8%AF%81)

## 安装

`npm i readme-builder --save` 或者 `npm i readme-builder --save-dev`

全局安装, 使用 `npm i readme-builder -g`

## goal

our goal is blah blah...

## 使用方法

### 命令行快速运行

- buildreadme

在你的项目的根目录下运行buildreadme


```shell
命令

    $  cd ../test/fixture/node/p0
    $  ./node_modules/.bin/buildreadme | head -c 200
    $  echo "\n\n......"
```

```
输出

    # test-p0
    
    test p0 project
    
    [中文文档](./README_zh.md)   [document](./README.md)
    
    ## install
    
    `npm i test-p0 --save` or `npm i test-p0 --save-dev`
    
    Install on global, using `npm i test-p0 -g`
    
    ## 
    
    ......

```


加上-w选项把结果写入到readme文件中


```shell
命令

    $  cd ../test/fixture/node/p0
    $  ./node_modules/.bin/buildreadme -w
    $  ls README*
```

```
输出

    README.md
    README_zh.md

```


### CLI 选项

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


### API 快速运行

 最快使用readme builder api的方法，指定好目标项目的路径即可

```js
let readmeBuilder = require('readme-builder')
let path = require('path');

readmeBuilder({
    projectDir: path.resolve(__dirname, './test/fixture/node/p0')
}).then((ret) => {
    console.log(ret.en.slice(0, 200) + '\n\n......\n\n\n'); // en version
    console.log(ret.zh.slice(0, 200) + '\n\n......\n\n'); // zh version
});
```

```
输出

    # test-p0
    
    [中文文档](./README_zh.md)   [document](./README.md)
    
    test p0 project
    - [install](#install)
    - [goal](#goal)
    - [usage](#usage)
      * [CLI quick run](#cli-quick-run)
      * [CLI options](#cli-options)
    
    ......
    
    
    
    # test-p0
    
    [中文文档](./README_zh.md)   [document](./README.md)
    
    test p0 project
    - [安装](#%E5%AE%89%E8%A3%85)
    - [goal](#goal)
    - [使用方法](#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
      * [命令行快速运行](#%E5%91%BD%E4%BB%
    
    ......

```
## api
### result=readmeBuilder(options, type)



```js
let readmeBuilder = require('readme-builder/src/index.js')
// example
// readmeBuilder({
//    projectDir: path.resolve(__dirname, './project')
// })
```

<ul><li><strong>options</strong> <code>(Falsy | Object)</code> <div><code>options (Object)</code>
<ul><li><strong>projectDir</strong> <code>(String)</code> - 要生成文档的项目的目录<div></div></li></ul></div></li><li><strong>type</strong> <code>(String | Falsy)</code> - 目前只支持node项目<div></div></li></ul>

<ul>
<li><strong>result</strong> <code>(Promise)</code> <div></div></li>
</ul>


## 开发

### 文件结构

```
.    
│──LICENSE    
│──README.md    
│──README_zh.md    
│──TODO.md    
│──bin    
│   └──build-readme.js    
│──index.js    
│──package.json    
│──src    
│   │──index.js    
│   │──node    
│   │   │──collector    
│   │   │   │──binHelpers.js    collect bin help info
│   │   │   │──commentsContent.js    
│   │   │   │──devHelpers.js    
│   │   │   │──index.js    
│   │   │   └──license.js    
│   │   │──index.js    
│   │   └──processor    
│   │       │──apiInfos.js    
│   │       │──binQuickRunInfos.js    
│   │       │──commentToDocVariables.js    
│   │       │──index.js    
│   │       └──jsQuickRunInfos.js    
│   └──util    
│       └──index.js    
└──test    
    │──fixture    
    │   └──node    
    └──function    
        │──index.js    
        └──testUtil.js     
```


### 运行测试用例

`npm test`

## 许可证

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
