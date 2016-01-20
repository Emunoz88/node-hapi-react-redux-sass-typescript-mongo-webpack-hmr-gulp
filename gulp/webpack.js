var Gulp = require('gulp');
var Gutil = require('gulp-util');
var Webpack = require('webpack');
var path = require('path');

var config = require('../webpack.config.client-hot.js');

var CommonsChunkPlugin = Webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = Webpack.optimize.UglifyJsPlugin;
var executionCount = 0;


Gulp.task('webpack', function(callback) {

    /*
    var config = {
        watch: global.isWatching,
        entry: {
            account: './client/pages/account/index',
            admin: './client/pages/admin/index',
            contact: './client/pages/contact/index',
            login: './client/pages/login/index',
            signup: './client/pages/signup/index'
        },
        output: {
            path: './public/pages',
            filename: '[name].min.js',
            sourceMapFilename: '[name].map.js'
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        module: {
            loaders: [{
                test: /\.(jsx|es6)$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    optional: ['runtime']
                }
            }, {
                test: /\.scss$/,
                loader: 'style!css!postcss?pack=defaults!csslint'
            }, {
                test: /\.scss$/,
                loader: 'sass',
                query: {
                    precision: 10,
                    includePaths: [
                        path.resolve(__dirname, './node_modules')
                    ]
                }
            }]
        },
        devtool: 'source-map',
        plugins: [
            new CommonsChunkPlugin('../core.min.js', undefined, 2),
            new UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    };
    */
    Webpack(config, function(err, stats) {

        if (err) {
            throw new Gutil.PluginError('webpack', err);
        }

        Gutil.log('[webpack]', stats.toString({
            colors: true,
            chunkModules: false
        }));

        if (executionCount === 0) {
            callback();
        }
        executionCount += 1;
    });
});