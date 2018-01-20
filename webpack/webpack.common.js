const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const WebpackRTLPlugin = require("webpack-rtl-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const utils = require('./utils.js');

module.exports = (options) => {
    const DATAS = {
        VERSION: '1',
        DEBUG_INFO_ENABLED: options.env === 'development'
    };
    return {
        resolve: {
            extensions: ['.ts', '.js'],
            modules: ['node_modules']
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        caseSensitive: true,
                        removeAttributeQuotes: false,
                        minifyJS: false,
                        minifyCSS: false
                    },
                    exclude: ['.html']
                },
                {
                    test: /(main\.scss)/,
                    include: [/(assets)/, /(node_modules)/],
                    use: ExtractTextPlugin.extract({
                        use: [{
                            loader: "css-loader"
                        }, {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: function () {
                                        return [
                                            require('precss'),
                                            require('autoprefixer')
                                        ];
                                    }
                                }
                            }, {
                            loader: "sass-loader"
                        }]
                    })
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    loaders: ['file-loader?name=../images/[name].[ext]']
                },
                {
                  test: /\.svg$/,
                  use: [
                    'svg-sprite-loader'
                  ]
                }

            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(options.env)
                }
            }),
            new CopyWebpackPlugin([{
                    from: './node_modules/core-js/client/shim.min.js',
                    to: 'js/core-js-shim.min.js'
                },
                {
                    from: './assets/fonts',
                    to: 'css/fonts/'
                },
                {
                    from: './assets/images',
                    to: 'images/'
                }
            ]),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Util: "exports-loader?Util!bootstrap/js/dist/util",
                Popper: ['popper.js', 'default'],
                Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
                Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse"
                //Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
                //Button: "exports-loader?Button!bootstrap/js/dist/button",
                //Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
                //Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
                //Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
                //ScrollSpy: "exports-loader?ScrollSpy!bootstrap/js/dist/scrollspy",
                //Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
                //Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip"
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './assets/html/index.html',
                chunksSortMode: 'dependency',
                inject: 'body',
                excludeAssets: [/.css/]
            }),
            new HtmlWebpackExcludeAssetsPlugin(),
            new StringReplacePlugin(),
            new ExtractTextPlugin('css/style.css')
        ]
    };
};
