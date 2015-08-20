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
            exclude: path.resolve(__dirname, 'node_modules')
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },

    devtool: 'cheap-source-map',

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
                GOODYBAG_API: JSON.stringify(process.env.GOODYBAG_API || 'https://www.goodybag.com/api')
            }
        })
    ],

    externals: {
        jquery: '{}' // jQuery probably won't get loaded,
                     // this is so Backbone won't complain
    }
};
