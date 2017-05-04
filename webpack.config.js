var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
    entry:{
        common:['babel-polyfill','react','redux'],
        authApp:["./client/authentication/App.js"],
        analyticsApp:["./client/analytics/App.js"],
        styleGuide:["./client/common/StyleGuideApp.js"]
    },
    output: {
        publicPath: 'build/',
        path: __dirname + '/public/build/',
        filename: "[name].bundle.js"
    },
    resolve: {
        modules: [path.join(__dirname, "client"), "node_modules"],
        alias: {
            konux:  path.resolve(__dirname, 'client'),
        }
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new CaseSensitivePathsPlugin({debug: false}),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'development'),
            "process.env.BUILD_APP_TARGET": '"CLIENT"'
        }),
        new webpack.optimize.CommonsChunkPlugin({name : "common", filename: "common.bundle.js"}),
        new ExtractTextPlugin({
            filename:  (getPath) => {
                return getPath('style/[name].css');
            },
            allChunks: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: [/node_modules/, /public/],
                options: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$/,
                loader: 'file'
            },
            {
                test: /\.sass$|\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.gif$/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            },
            {
                test: /\.jpg$/,
                loader: "url-loader?limit=10000&mimetype=image/jpg"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            },
            {
                test: /\.svg$/,
                loader: "url-loader?mimetype=image/svg+xml;charset=UTF-8"
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    }
};