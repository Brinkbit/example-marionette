const webpack = require( 'webpack' );
const path = require( 'path' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );

const nodeModulesPath = path.resolve( __dirname, 'node_modules' );

const config = {
    context: __dirname,
    entry: {
        index: './src/bundle.js',
    },
    resolve: {
        mainFiles: ['public'],
        alias: {
            underscore: 'lodash',
        },
    },
    output: {
        filename: '[name].min.js',
        path: path.join( __dirname, './public' ),
        publicPath: '/',
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: [nodeModulesPath] },
            { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports-loader?jQuery=jquery' },
            { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded' },
            { test: /\.pug$/, loader: 'babel-loader?presets[]=es2015!pug-loader' },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&minetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&minetype=image/svg+xml' },
        ],
    },
    plugins: [
        new ExtractTextPlugin( 'bootstrap-and-customizations.css' ),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            backbone: 'backbone',
            underscore: 'lodash',
        }),
    ],
};

module.exports = config;
