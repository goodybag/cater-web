'use strict';

var gulp = require('gulp');
var smaps = require('gulp-sourcemaps');

gulp.task('default', ['bundle', 'compile', 'migrate']);

// This step will compile the ES6/JSX in src/
// into ES5 versions (with source maps). This
// does not perform any bundling.
gulp.task('build', function() {
    // Requiring inline saves startup time for other builds
    var babel = require('gulp-babel');

    return gulp.src('src/**/*.js')
        .pipe(smaps.init())
        .pipe(babel())
        .pipe(smaps.write('.'))
        .pipe(gulp.dest('dist/src'));
});

// This will bundle the ES5 modules in dist/src
// into a single bundle (and source map) for
// dist/build
gulp.task('bundle', ['build'], function() {
    var webpack = require('webpack-stream');

    return gulp.src('dist/src/main.js')
        .pipe(webpack({
            output: {filename: 'bundle.js'},
            module: {
                preLoaders: [{test: /\.js$/, loader: 'source-map-loader'}]
            },
            devtool: 'source-map'
        }))
        .pipe(gulp.dest('dist/build'));
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
    return gulp.src('public/**')
        .pipe(gulp.dest('dist/build'));
});

// This watchs all the files
gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['build', 'bundle']);
    gulp.watch('src/styles/**/*.less', ['compile']);
    gulp.watch('public/**', ['migrate']);
});
