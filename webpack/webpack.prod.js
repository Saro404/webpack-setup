const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const commonConfig = require('./webpack.common.js');
const ENV = 'production';
const extractSASS = new ExtractTextPlugin(`[name]-sass.[hash].css`);
const extractCSS = new ExtractTextPlugin(`[name].[hash].css`);
const utils = require('./utils.js');
const WebpackRTLPlugin = require("webpack-rtl-plugin");
module.exports = webpackMerge(commonConfig({ env: ENV }), {
    entry: {
        main: './assets/js/index.js'
    },
    output: {
        path: utils.root('static'),
        filename: 'js/[name].[hash].bundle.js',
        chunkFilename: 'js/[id].[hash].chunk.js'
    },
    plugins: [
        extractSASS,
        extractCSS,
        new WebpackRTLPlugin({
            filename: 'css/' + 'style-rtl.css',
            options: {},
            plugins: [],
            diffOnly: false,
            minify: true
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        })
    ]
});
