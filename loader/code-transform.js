//babel核心库，用来实现核心的转换引擎
const babel = require("@babel/standalone")
const jscodeshift = require('jscodeshift')
const _ = require('lodash')
const helper = require('../utils/helper')

const tsx = jscodeshift.withParser('tsx');

const schema = {
    type: "object",
    properties: {
        presets: {
            type: "array"
        }
    }
}

module.exports = async function (content) {
    const callback = this.async()
    const options = this.getOptions(schema)

    try {
        // TODO 考虑cssPath为空
        if (!_.isEmpty(content.cssPath)) {
            const cssMap = await helper.getCSSObject(content.cssCode)
            const ast = tsx(content.jsCode);
            const css = {}
            css[content.cssPath.key] = cssMap
            const cssCode = await helper.fillInlineStyles(ast, css)
            const { code } = babel.transform(cssCode, options)

            callback(null, code)
        } else {
            const { code } = babel.transform(content.jsCode, _.assign({}, options))

            callback(null,code)
        }
    }catch (err){
        callback(err)
    }
}