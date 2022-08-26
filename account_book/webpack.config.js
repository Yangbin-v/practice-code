const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = {
    performance: { hints: false },
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                  'vue-style-loader',
                  'css-loader'
                ]
              }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: "all",  // async表示抽取异步模块，all表示对所有模块生效，initial表示对同步模块生效
            cacheGroups: {
                vendors: {  // 抽离第三方插件
                    test: /[\\/]node_modules[\\/]/,     // 指定是node_modules下的第三方包
                    name: "vendors",
                    priority: -10                       // 抽取优先级
                },
            }
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'account_book'
        }),
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        }),
    ],
    watchOptions: {
        ignored: '**/node_modules',
        aggregateTimeout: 800,
        poll: 1000
    }
}
