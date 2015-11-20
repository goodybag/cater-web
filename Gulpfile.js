'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var smaps = require('gulp-sourcemaps');
var filter = require('gulp-filter');
var url = require('url');

gulp.task('default', ['build', 'bundle', 'compile', 'migrate']);

// This step will compile the ES6/JSX in app/
// into ES5 versions (with source maps). This
// does not perform any bundling.
gulp.task('build', function() {
    // Requiring inline saves startup time for other builds
    var babel = require('gulp-babel');

    return gulp.src('app/**/*.js')
        .pipe(smaps.init())
        .pipe(babel())
        .pipe(smaps.write('.'))
        .pipe(gulp.dest('dist/src'));
});

// This will bundle the ES5 modules in dist/src
// into a single bundle (and source map) for
// dist/build
gulp.task('bundle', function(cb) {
    getWebpack().run(handleWebpackErrors(cb));
});

// This compiles all LESS files from app/styles
// into a single CSS bundle (and source map) in
// dist/build
gulp.task('compile', function() {
    var less = require('gulp-less');

    return gulp.src('./app/styles/main.less')
        .pipe(smaps.init())
        .pipe(less())
        .pipe(smaps.write('.'))
        .pipe(gulp.dest('dist/build'));
});

// This moves all the files from public/ to
// dist/build
gulp.task('migrate', function() {
    return gulp.src('public/**/*').pipe(gulp.dest('dist/build'));
});

gulp.task('final', ['build', 'bundle', 'compile', 'migrate'], function() {
    var RevAll = require('gulp-rev-all');
    var uglify = require('gulp-uglify');
    var cssmin = require('gulp-minify-css');

    var onlyJs = filter('*.js', {restore: true});
    var onlyCss = filter('*.css', {restore: true});
    var revAll = new RevAll({
        dontSearchFile: ['.js']
    });

    return gulp.src('dist/build/**/!(*.map)')
        .pipe(onlyJs).pipe(uglify()).pipe(onlyJs.restore)
        .pipe(onlyCss).pipe(cssmin()).pipe(onlyCss.restore)
        .pipe(revAll.revision())
        .pipe(gulp.dest('dist/final'))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest('dist'));
});

gulp.task('compress', ['final'], function() {
    var gzip = require('gulp-gzip');

    return gulp.src('dist/final/**/!(*.gz)')
        .pipe(gzip())
        .pipe(gulp.dest('dist/final'));
});

gulp.task('watch-bundle', function() {
    getWebpack().watch({}, handleWebpackErrors(logWebpackErrors));
});

// This watchs all the files
gulp.task('watch', ['build', 'watch-bundle', 'compile', 'migrate'], function() {
    gulp.watch('app/**/*.js', ['build']);
    gulp.watch('app/styles/**/*.less', ['compile']);
    gulp.watch('public/**/*', ['migrate']);
});

gulp.task('upload', function() {
    var awspublish = require('gulp-awspublish');
    var rename = require('gulp-rename');

    var publisher = awspublish.create({
        params: {
            Bucket: process.env.GOODYBAG_S3_BUCKET
        }
    });

    const headers = {
        // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
        'Cache-Control': "max-age=630720000, public",
        Expires: new Date(Date.now() + 63072000000).toISOString()
    };

    return gulp.src('dist/final/**/!(*.gz)')
        .pipe(rename(function(path) {
            path.dirname += '/assets';
        }))
        .pipe(awspublish.gzip())
        .pipe(publisher.publish(headers))
        .pipe(publisher.cache())
        .pipe(awspublish.reporter());
});

// You can safely disregard the unfortune that is below.

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

function logWebpackErrors(err, stats) {
    if (err) {
        gutil.log(err.toString().replace(new RegExp(__dirname, 'g'), '.'));
    } else {
        gutil.log(stats.toString({
            chunks: false,
            chunkModules: false
        }));
    }
}
