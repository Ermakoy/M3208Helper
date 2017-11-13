/* eslint-disable */
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: "./src/helperEntry.js",
    output: {
        filename: './static/js/script.js',
        library: 'helper'
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["es2015"]
                }
            },
            {
                test: /\.js$/,
                exclude: /node-modules/,
                loader: 'eslint-loader'
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            exclude: /node_modules/
        })
    ]
};
