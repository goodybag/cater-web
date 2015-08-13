var path = require('path');

module.exports = {
    entry: './src/main.js',

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

    devtool: 'cheap-source-map'
}
