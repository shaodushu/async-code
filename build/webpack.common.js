const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const chalk = require("chalk");
const path = require('path')

// const APP_PATH = path.resolve(__dirname, '..')
// const APP_SRC = path.resolve(APP_PATH, 'src')

module.exports = {
    // mode: 'production',
    mode: 'development',
    devtool: false,
    entry: {
        index: path.resolve(__dirname, "../src/index.tsx") //主入口
    },
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
    },
    experiments: {
        outputModule: true,
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'index.js',
        chunkFormat: 'module',
        asyncChunks: false,
        library: {
            name: 'default',
            type: 'commonjs',
            export: 'default',
        },
        module: true,
        clean: true //每次构建清除dist包
    },
    plugins: [
        // // 进度条
        new ProgressBarPlugin({
            format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
        }),
        ],
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                use: [
                    {
                        loader: require.resolve('../loader/code-transform.js'),
                        options: {
                            presets: ["es2015", "env", ["react", {
                                runtime: 'automatic',
                            }], "typescript"],
                            filename: "*.tsx",
                        }
                    },
                    {
                        loader: require.resolve('../loader/sass-to-css.js'),
                    },
                    {
                        loader: require.resolve('../loader/resources-to-sass.js'),
                        // options: {
                        //     resources: [path.resolve(APP_SRC, 'variable.module.scss'), path.resolve(APP_SRC, 'mixins.scss')]
                        // }
                    },
                ]
            },
        ]
    },
    target: false,
    externals: {
        '@tarojs/components': '@tarojs/components',
        'react/jsx-runtime': 'react/jsx-runtime',
        '@tarojs/runtime': '@tarojs/runtime',
        '@tarojs/taro': '@tarojs/taro',
        'classnames': 'classnames',
        'lodash': 'lodash',
        'react': 'react',
    }
}