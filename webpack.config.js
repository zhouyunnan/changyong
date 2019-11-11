const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin'); //css提取




module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management',
            templateContent:
                `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Document</title>
            </head>
            <body>
                <div id="app"></div>
            </body>
            </html>`
        }),
        new VueLoaderPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // 分离CSS
        new MiniCssExtractPlugin({
            filename: "css/[name][chunkhash].css",
        }),
        
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    process.env.NODE_ENV !== 'production'
                        ? 'vue-style-loader'
                        : MiniCssExtractPlugin.loader, //分离css
                    'css-loader',
                    'sass-loader'
                    // MiniCssExtractPlugin.loader,
                    // 'css-loader',
                    // 'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    mode: process.env.NODE_ENV,
    devServer: {
        contentBase: './dist',
        hot: true
    },
    devtool: 'inline-source-map',//跟踪错误
};