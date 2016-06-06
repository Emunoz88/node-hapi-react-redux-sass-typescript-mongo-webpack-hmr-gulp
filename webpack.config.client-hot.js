var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var Config = require('./src/global/server/config');
var pkg = require('./package.json');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var util = require('util');
var webpack = require('webpack');
var Pages = require('./src/global/server/config.pages').getConfig();

var processEntries = function(pages){
    var entry = {}, webpack, src, id;
    for (var i = pages.length - 1; i >= 0; i--) {
        if(pages[i].hasOwnProperty('webpack') && pages[i].webpack.hasOwnProperty('id') && pages[i].webpack.id !== ''){
            webpack = pages[i].webpack;
            id = webpack.id;
            src = webpack.src;
            
            if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
                entry[id] = [
                    path.resolve(__dirname, src),
                ]
            }
            else {
                entry[id] = [
                    'webpack-dev-server/client?http://localhost:8080',
                    'webpack/hot/only-dev-server',
                    path.resolve(__dirname, src),
                ]
            }
            
        }
        
    }
    return entry;
}

var Entries = processEntries(Pages);

var buildDir = path.resolve('./build');

var DEBUG = process.env.NODE_ENV === 'development';
var PRODUCTION = process.env.NODE_ENV === 'production';
var TEST = process.env.NODE_ENV === 'test';

var extractCSS = new ExtractTextPlugin(
    'css/[name].min.css',
    {
        allChunks: true,
        publicPath: '/'
    }
)


var jsxLoader;
var sassLoader;
var cssLoader;

var htmlLoader = [
    'file-loader?name=[path][name].[ext]',
    'template-html-loader?' + [
        'raw=true',
        'engine=lodash',
        'version=' + pkg.version,
        'title=' + pkg.name,
        'debug=' + DEBUG
    ].join('&')
].join('!');

var sassParams = [
    'outputStyle=expanded',
    'includePaths[]=' + path.resolve(__dirname, './src/global/client/scss'),
    'includePaths[]=' + path.resolve(__dirname, './node_modules')
];

sassParams.push('sourceMap', 'sourceMapContents=true');
sassLoader = [
    'css-loader?sourceMap',
    'resolve-url',
    'sass-loader?' + sassParams.join('&')
].join('!');
cssLoader = [
    'style-loader',
    'css-loader',
    'postcss-loader'
].join('!');


module.exports = {
    // cheap-module-eval-source-map will create sourcemaps that get line-numbers correct.
    // That should be good enough for most debug situations
    devtool: 'cheap-module-eval-source-map',
    entry: Entries,
    output: {
        path: path.join(buildDir, 'global/client'),
        filename: 'js/[name].min.js',
        sourceMapFilename: 'js/[name].min.map',
        publicPath: "http://localhost:8080/",
        devtoolModuleFilenameTemplate: "../[resource-path]",
        devtoolFallbackModuleFilenameTemplate:"../[resource-path]"
    },
    plugins: [
        extractCSS,
        new webpack.optimize.DedupePlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        // Do NOT put .jsx files here! ONLY Typescript is allowed for react code.
        extensions: ['', '.json', '.js', '.scss', '.ts', '.tsx'],
        root: [`${__dirname}/src/global/client/`],
        fallback: path.join(__dirname, "node_modules"),
        alias: {
          webworkify: 'webworkify-webpack'
        }
    },
    resolveLoader: {
        root: path.join(__dirname, "node_modules")
    },
    node: {
        console: true,
        fs: "empty"
    },
    module: {
        preLoaders: [{
            test: /\.ts(x?)$/,
            loader: 'tslint'
        }, {
            test: /\.css$/,
            loader: 'csslint',
            exclude: [/dashboard.min.css/]
        }],
        loaders: [{
            test: /\.html$/,
            loader: htmlLoader
        }, {
            test: /\.css$/,
            loader: PRODUCTION ? extractCSS.extract('style-loader', 'css-loader', 'postcss-loader') : 'style-loader!css-loader!postcss-loader'
        }, {
            test: /\.scss$/,
            loader: PRODUCTION ? extractCSS.extract('style-loader', sassLoader) : 'style-loader!' +sassLoader
        }, {
            test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$/,
            loader: 'url-loader?name=img/[name].[ext]&limit=4096'
        }, {
            test: /\.woff$|\.woff2$|\.ttf$|\.eot$/,
            loader: 'url-loader?name=fonts/[name].[ext]&limit=4096'//32768
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        },{
            test: /\.(js|jsx|es6)$/,
            loaders: [
                'react-hot',
                'babel?cacheDirectory',
            ],
            exclude: [/bower_components/, /node_modules/]
        }, {
            test: /\.ts(x?)$/,
            loaders: [
                'react-hot',
                'babel?cacheDirectory',
                'ts-loader'
            ],
            exclude: [/bower_components/, /node_modules/]
        },{
            test: /\.js$/,
            include: path.resolve(__dirname, 'node_modules/mapbox-gl/js/render/shaders.js'),
            loader: 'transform/cacheable?brfs'
        },{
            test: /\.js$/,
            include: path.resolve(__dirname, 'node_modules/webworkify/index.js'),
            loader: 'worker'
        }]
    }
};
