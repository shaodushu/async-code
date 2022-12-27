const fs = require('fs')
const _ = require('lodash')
const helper = require('../utils/helper')

module.exports = function (content) {
    // loader 上下文
    const context = this
    // 指明该loader异步运行
    const callback = this.async()

    const cssPath = helper.getCSSPath({
        source: content,
        path: this.resourcePath
    })
    if (_.isEmpty(cssPath)) {
        callback(null, { cssCode: null, jsCode: content, cssPath: {} })
    } else {
        // TODO 判断是否存在css路径， 当前文件对应css 路径 
        const cssContent = fs.readFileSync(cssPath.value).toString()

        function run(code, _callback) {
            // 伪造新loader context
            const loaderContext = {
                ...context,
                async: () => _callback
            }

            const sassResourcesLoader = require('sass-resources-loader').default.bind(loaderContext)
            sassResourcesLoader(code)
        }

        run(cssContent, (err, cssCode) => {
            if (err) callback(err)
            else callback(null, { cssCode,jsCode:content,cssPath})
        })
    }
}