const _ = require('lodash')

module.exports = function (content) {
    // loader 上下文
    const context = this
    // 指明该loader异步运行
    const callback = this.async()

    if (_.isEmpty(content.cssPath)) {
        callback(null, content)
    } else {
        function run(code, _callback) {
            // 伪造新loader context
            const loaderContext = {
                ...context,
                async: () => _callback
            }

            const sassLoader = require('sass-loader').bind(loaderContext)
            sassLoader(code)
        }

        run(content.cssCode, (err, cssCode) => {
            if (err) callback(err)
            else callback(null, { ...content, cssCode })
        })
    }
}