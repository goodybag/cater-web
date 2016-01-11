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
    var newer = require('gulp-newer');

    return gulp.src('app/**/*.js')
        .pipe(newer('dist/src'))
        .pipe(smaps.init())
        .pipe(babel())
        .on('error', err => {
            gutil.log(err.toString());
        })
        .pipe(smaps.write('.'))
        .pipe(gulp.dest('dist/src'));
});

// This will bundle the ES5 modules in dist/src
// into a single bundle (and source map) for
// dist/build
gulp.task('bundle', bundle);

gulp.task('watch-bundle', function() {
    var watchify = require('watchify');
    var browserify = require('browserify');
    var babelify = require('babelify');

    watchify(getBundler(), {
        ignoreWatch: ['**/dist/**'] // we want to watch node_modules
                                    // because we do a lot of linking
    }).on('update', () => {
        gulp.start('bundle');
    });

    return gulp.start('bundle');
});

var bundler;

function bundle() {
    var source = require('vinyl-source-stream');
    var buffer = require('vinyl-buffer');

    return getBundler().bundle()
        .on('error', err => {
            gutil.log(new gutil.PluginError('browserify', err).toString());
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(smaps.init({loadMaps: true}))
        .pipe(smaps.write('.'))
        .pipe(gulp.dest('dist/build'));
}

function getBundler() {
    var browserify = require('browserify');
    var babelify = require('babelify');

    if (!bundler) {
        bundler = browserify('app/main.js', {
            cache: {},
            packageCache: {},
            debug: true,
            transform: [babelify.configure({sourceMap: true})]
        });
    }

    return bundler;
}

// This compiles all LESS files from app/styles
// into a single CSS bundle (and source map) in
// dist/build
gulp.task('compile', function() {
    var less = require('gulp-less');
    var NpmImportPlugin = require('less-plugin-npm-import');
    var npmImports = new NpmImportPlugin({prefix: '~'});

    return gulp.src('./app/styles/main.less')
        .pipe(smaps.init())
        .pipe(less({plugins: [npmImports]}))
        .pipe(smaps.write('.', {sourceRoot: '/source/app/styles'}))
        .pipe(gulp.dest('dist/build'));
});

// This moves all the files from public/ to
// dist/build
gulp.task('migrate', function() {
    var newer = require('gulp-newer');

    return gulp.src('public/**/*')
        .pipe(newer('dist/build'))
        .pipe(gulp.dest('dist/build'));
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
