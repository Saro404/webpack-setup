const webpack = require('webpack');
const writeFilePlugin = require('write-file-webpack-plugin');
const webpackMerge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');
const WebpackRTLPlugin = require("webpack-rtl-plugin");
const commonConfig = require('./webpack.common.js');
const utils = require('./utils.js');
const ENV = 'development';

module.exports = webpackMerge(commonConfig({ env: ENV }), {
    devtool: 'eval-source-map',
    entry: {
        main: ['./assets/js/index.js', './assets/scss/main.scss']
    },
    output: {
        path: utils.root('/static'),
        filename: 'js/[name].bundle.js',
        chunkFilename: 'app/[id].chunk.js'
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 9000,
            proxy: {
                target: 'http://localhost:9060'
            }
        }, {
            reload: true
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new writeFilePlugin(),
        new WebpackRTLPlugin({
            filename: 'css/' + 'style-rtl.css',
            options: {},
            plugins: [],
            diffOnly: false,
            minify: false
        }),
        new WebpackNotifierPlugin({
            title: 'Hey',
            contentImage: path.join(__dirname, 'logo.png')
        })
    ]
});
