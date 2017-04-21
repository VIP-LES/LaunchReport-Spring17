var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var ghPages = require('gulp-gh-pages');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
    ' * Georgia Tech VIP Lightning from the Edge of Space Launch Report Template\n',
    ' * Copyright 2017-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' */\n',
    ''
].join('');

// Compile LESS files from /less into /css
gulp.task('less', function() {
    return gulp.src('less/creative.less')
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function() {
    return gulp.src('dist/css/creative.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js', function() {
    return gulp.src('dist/js/creative.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('dist/vendor/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('dist/vendor/jquery'))

    gulp.src(['node_modules/magnific-popup/dist/*'])
        .pipe(gulp.dest('dist/vendor/magnific-popup'))

    gulp.src(['node_modules/scrollreveal/dist/*.js'])
        .pipe(gulp.dest('dist/vendor/scrollreveal'))

    gulp.src(['node_modules/scrollreveal/dist/*.js'])
        .pipe(gulp.dest('dist/vendor/scrollreveal'))

    gulp.src(['node_modules/highcharts/js/**/*'])
        .pipe(gulp.dest('dist/vendor/highcharts/js'))

    gulp.src(['node_modules/highcharts/css/**/*'])
        .pipe(gulp.dest('dist/vendor/highcharts/css'))

    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('dist/vendor/font-awesome'))

    gulp.src(['img/**/*']).pipe(gulp.dest('dist/img'))
})

// Run everything
gulp.task('default', ['less', 'minify-css', 'minify-js', 'copy']);

gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});