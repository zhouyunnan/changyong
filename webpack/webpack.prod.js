const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin'); //css提取

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        // 分离CSS
        new MiniCssExtractPlugin({
            filename: "css/[name][chunkhash].css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
          
        ]
    },
    
});