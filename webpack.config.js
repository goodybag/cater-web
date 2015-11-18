var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './app/main.js',

    output: {
        path: 'dist/build',
        filename: 'bundle.js'
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: path.join(__dirname, 'node_modules')
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },

    resolveLoader: {
        modulesDirectories: [
            path.join(__dirname, 'node_modules')
        ]
    },

    devtool: 'source-map',

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
                GOODYBAG_ORDER_ID: JSON.stringify(+process.env.GOODYBAG_ORDER_ID)
            }
        })
    ],

    externals: {
        jquery: '{}' // jQuery probably won't get loaded,
                     // this is so Backbone won't complain
    }
};
