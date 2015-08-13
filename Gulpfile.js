'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var smaps = require('gulp-sourcemaps');

gulp.task('default', ['bundle', 'compile', 'migrate']);

// This step will compile the ES6/JSX in src/
// into ES5 versions (with source maps). This
// does not perform any bundling.
gulp.task('build', function() {
    return transpileBabel()
        .pipe(gulp.dest('dist/src'));
});

// This will bundle the ES5 modules in dist/src
// into a single bundle (and source map) for
// dist/build
gulp.task('bundle', function(cb) {
    var compiler = getWebpack();

    compiler.run(handleWebpackErrors(cb));
});

// This compiles all LESS files from src/styles
// into a single CSS bundle (and source map) in
// dist/build
gulp.task('compile', function() {
    var less = require('gulp-less');

    return gulp.src('./src/styles/main.less')
        .pipe(smaps.init())
        .pipe(less())
        .pipe(smaps.write('.'))
        .pipe(gulp.dest('dist/build'));
});

// This moves all the files from public/ to
// dist/build
gulp.task('migrate', function() {
    return gulp.src('public/**/*')
        .pipe(gulp.dest('dist/build'));
});

gulp.task('watch-bundle', function() {
    getWebpack().watch({}, handleWebpackErrors(function(err, stats) {
        if (err) {
            gutil.log(err);
        } else {
            gutil.log(stats.toString({
                chunks: false,
                chunkModules: false
            }));
        }
    }));
});

// This watchs all the files
gulp.task('watch', ['build', 'watch-bundle', 'compile', 'migrate'], function() {
    gulp.watch('src/**/*', ['build']);
    gulp.watch('src/styles/**/*.less', ['compile']);
    gulp.watch('public/**/*', ['migrate']);
});

function transpileBabel() {
    // Requiring inline saves startup time for other builds
    var babel = require('gulp-babel');

    return gulp.src('src/**/*.js')
        .pipe(smaps.init())
        .pipe(babel())
        .pipe(smaps.write('.'));
}

function handleWebpackErrors(cb) {
    return function(err, stats) {
        if (err) return cb(new gutil.PluginError('webpack', err));

        var statData = stats.toJson();

        if (stats.hasErrors()) {
            return cb(new gutil.PluginError('webpack', statData.errors[0]));
        }

        if (stats.hasWarnings()) {
            return cb(new gutil.PluginError('webpack', statData.warnings[0]));
        }

        cb(null, stats);
    };
}

function getWebpack() {
    var webpack = require('webpack');

    return webpack(require('./webpack.config'));
}
