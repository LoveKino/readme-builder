'use strict';

let {langs, getLang} = require('./language');

let {getFileLines} = require('../filesToc');

let path = require('path');

let langGuideMap = {
    'zh': '中文文档',
    'en': 'document'
};

module.exports = (opts) => {
    return langs.reduce((prev, type) => {
        let lang = getLang(type);
        prev[type] = getDoc(opts, lang, langs);
        return prev;
    }, {});
};

let getDoc = ({
    packageJson,
    license,
    comments = {},
    binHelpers = [],
    devHelpers = {},
    projectDir
}, lang, langTypes) => {
    let testText = getTestText(packageJson);

    return `# ${packageJson.name}

${packageJson.description}

${langTypes.map((type) => type === 'en'? `[${langGuideMap[type]}](./README.md)`: `[${langGuideMap[type]}](./README_${type}.md)`).join('   ')}

## ${lang('install')}

\`npm i ${packageJson.name} --save\` ${lang('or')} \`npm i ${packageJson.name} --save-dev\`

${lang('Install on global')}, ${lang('using')} \`npm i ${packageJson.name} -g\`

${comments.rawReadDocs? comments.rawReadDocs.map(({text}) => text).join('\n') : ''}

## usage

${binHelpers.length? `### ${lang('bin options')}\n`: ''}
${binHelpers.map(({name, text}) => {
    return `- ${name}

\`\`\`shell

$ ./node_modules/${packageJson.name}/bin/${name} -h

${text}
\`\`\``;
})}

## ${lang('develop')}

### ${lang('file structure')}

${getFileLines(devHelpers.filesTree, (name, file) => {
    return `[${name}](${path.relative(projectDir, file.path) || '.'})`;
}).map((line) => `\`${line}\``).join('\n')} 

${testText? `
### ${lang('run tests')}

\`npm test\`
`: ''}
${license?`## ${lang('license')}

${license}` : ''}`;
};

let getTestText = (packageJson) => {
    let scripts = packageJson.scripts || {};
    let test = scripts.test;
    if(test==='echo \"Error: no test specified\" && exit 1') return '';
    return test;
};
