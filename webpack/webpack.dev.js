const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },

        ]
    },
    devServer: {
        contentBase: './dist',
        hot: true,
        proxy: {
            '/api': {
                target: 'https://api.doudianwang.com/admin/',
                changeOrigin: true,// target是域名的话，需要这个参数，
                ws: true, //是否代理
                pathRewrite: { //将开头的api除掉  路径重写
                    '^/api': ''
                }
            }
        }
    },
    devtool: 'inline-source-map',//跟踪错误
});