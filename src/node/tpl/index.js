'use strict';

let {langs, getLang} = require('./language');

var toc = require('markdown-toc');

let renderBinQuickRuns = require('./renderBinQuickRuns');

let renderJsQuickRuns = require('./renderJsQuickRuns');

let renderDevInfos = require('./renderDevInfos');

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

let getDoc = (options, lang, langTypes) => {
    let packageJson = options.packageJson;
    let bodyText = getDocBody(options, lang);
    let tocContent = toc(bodyText).content;

    return `# ${packageJson.name}

${langTypes.map((type) => type === 'en'? `[${langGuideMap[type]}](./README.md)`: `[${langGuideMap[type]}](./README_${type}.md)`).join('   ')}

${packageJson.description}
${tocContent}
${bodyText}`;
};

let getDocBody = (data, lang) => {
    let {
        packageJson,
        license,
        comments = {},
        binHelpers = [],
        binQuickRunInfos = [],
        jsQuickRunInfos = []
    } = data;

    return `
## ${lang('install')}

\`npm i ${packageJson.name} --save\` ${lang('or')} \`npm i ${packageJson.name} --save-dev\`

${lang('Install on global')}, ${lang('using')} \`npm i ${packageJson.name} -g\`

${comments.rawReadDocs? comments.rawReadDocs.map(({text}) => text).join('\n') : ''}

## ${lang('usage')}
${renderBinQuickRuns(binQuickRunInfos, lang)}
${binHelpers.length? `### ${lang('CLI options')}\n`: ''}
${binHelpers.map(({name, text}) => {
    return `- ${name}

\`\`\`shell

$ ./node_modules/${packageJson.name}/bin/${name} -h

${text}
\`\`\``;
})}

${renderJsQuickRuns(jsQuickRunInfos, lang)}

${renderDevInfos(data, lang)}
${license?`## ${lang('license')}

${license}` : ''}`;
};
