const jscodeshift = require('jscodeshift')
const tsx = jscodeshift.withParser('tsx');
const Tokenizer = require('css-selector-tokenizer')
const pxtorem = require('postcss-pxtransform')
const postcss = require('postcss');
const _path = require('path');
const _ = require('lodash')
const { isStyleModules, toCamel } = require('./tools.js');

function css2json(css) {
    if (!css) {
        return {}
    }

    const type = { '{': 'func', '"': 'str', '\'': 'str' }[css[0]]
    css = css.substring(1, css.length - 1)

    // {{color:'red}}
    if (type === 'func') {
        try {
            console.log('类型1');
            return JSON.stringify(eval('(' + css + ')'))
        } catch (error) {
            console.log('类型4');
            return css
        }
    }
    // {style}
    if (_.includes(css, ':') && type === 'str') {
        console.log('类型2');
        const transform = toObject(css.split(';').map(e => e.trim()).filter(e => e.length > 0))
        return JSON.stringify(transform)

    }

    function toObject(array) {
        let ret = {}
        array.forEach(e => {
            const index = e.indexOf(':')
            const property = e.substring(0, index).trim()
            const value = e.substring(index + 1).trim()
            ret[property] = value
        })
        return ret
    }
    console.log('类型3');
    return css
}

function classToStyle(ast, classname = 'className', stylename = 'style') {
    const code = ast.find(tsx.JSXAttribute, (v) => v.name.name === classname)
    if (code.size() !== 0) {
        code.forEach((path) => {
            // 内联样式code
            let inlineStyle = JSON.stringify({})
            const inlineStyleCode = tsx(path.parent).find(tsx.JSXAttribute, (v) => v.name.name === stylename)
            if (inlineStyleCode.size() !== 0) {
                inlineStyleCode.forEach((path) => {
                    inlineStyle = css2json(tsx(path.value.value).toSource({ quote: 'single' }))
                })
            }
            inlineStyleCode.remove()

            // 处理classname
            let classnames = tsx(path.value.value).toSource({ quote: 'single' })
            if (_.includes(classnames, 'classNames')) {
                tsx(path).replaceWith(
                    `${stylename}=${_.replace(classnames, 'classNames(', `stylesNames(${inlineStyle},`)}`
                );
            } else if (_.includes(classnames,"{")){
                tsx(path).replaceWith(
                    `${stylename}={stylesNames(${inlineStyle},${classnames.substring(1, classnames.length - 1)})}`
                );
            } else {
                tsx(path).replaceWith(
                    `${stylename}={stylesNames(${inlineStyle},${classnames})}`
                );
            }
        })
    }
}

// 填充内联样式
const fillInlineStyles = (ast, cssMap) => {
    // 清除引入css
    ast.find(tsx.ImportDeclaration, v => isStyleModules(v.source.value)).remove()

    // TODO 插入方法
    const insertMethods = ast.find(tsx.ImportDeclaration)
    if (insertMethods.size() !== 0) {
        insertMethods.forEach((path, index) => {
            if (index === insertMethods.size() - 1) {
                tsx(path).insertAfter(`
                const stylesNames = (extra,...arg) => {
                    function LodashGet(data = {}, url = '') {
                        const split = url.replace(/(\\"|'*)/g, '').replace(/[\\[]|[\\]]/g, '.').split('.')
                        const key = split.reduce((a, b) => !b && a || a && a[b], data)
                        return key
                    }
                    // cssMap 直接注入
                    const cssMap = ${JSON.stringify(cssMap)}
                    // TODO 根据录入选择是否需要classnames
                    const t2 = require('classnames')(arg)
                    // 固有style直接注入
                    let style = {}
                    t2.split(' ').forEach(item => {
                        style=Object.assign({},style,LodashGet(cssMap,item))
                    })
                    // console.log(extra,style)
                    return Object.assign({},extra,style)
                }
                `)
            }
        })
    }

    // styles.转字符串
    const stylesFormat = ast.find(tsx.MemberExpression, (v) => tsx.Identifier.check(v.object) && Object.keys(cssMap).includes(v.object.name))
    if (stylesFormat.size() !== 0) {
        stylesFormat.forEach((path) => {
            tsx(path).replaceWith(`"${tsx(path).toSource({ quote: 'single' })}"`)
        })
    }

    // TODO 寻找className以及style
    classToStyle(ast)
    classToStyle(ast, 'contentClassName', 'contentStyle')

    return ast.toSource({ quote: 'single' })
}

const getCSSPath = (fileInfo) => {
    const ast = tsx(fileInfo.source);
    const dir = _path.dirname(fileInfo.path);

    let map = {};

    const cssImportSpecifiers = ast.find(
        tsx.ImportDeclaration,
        (node) =>
            tsx.StringLiteral.check(node.source) && isStyleModules(node.source.value),
    );

    if (cssImportSpecifiers.size() !== 0) {
        cssImportSpecifiers.forEach((path) => {
            const importDecl = tsx(path);

            const importDefaultSpecifiers = importDecl
                .find(tsx.ImportDefaultSpecifier)
                .find(tsx.Identifier);
            const importDefaultNodes = importDefaultSpecifiers.nodes();

            if (importDefaultNodes.length === 0) return;

            const importDefaultNode = importDefaultNodes[0];
            const importDefaultName = importDefaultNode.name;

            const sourcePath = importDecl.find(tsx.Literal).get().node;
            const cssSourcePath = sourcePath.value;
            const cssPath = _path.resolve(dir,cssSourcePath);
            map={
                key:importDefaultName,
                value:cssPath
            }
        });
    }
    return map;
}

const getCSSObject = async (contents) => {
    const processor = postcss(pxtorem({
        enable: true,
        config: {
        },
    }))
    const { root } = await processor.process(contents, { from: undefined });

    // 只处理css文件
    const cssObject = {}

    // 遍历属性
    root.walkDecls((decl) => {
        const declObject = {}
        declObject[toCamel(decl.prop)] = decl.value;
        const selectorNodes = Tokenizer.parse(decl.parent.selector)
        // 只解析class
        const selectorName = selectorNodes.nodes[0].nodes[0].name
        cssObject[selectorName] = _.assign(declObject, cssObject[selectorName])
    });
    return cssObject
}

module.exports = {
    getCSSPath,
    getCSSObject,
    fillInlineStyles
}