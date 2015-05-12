'use strict'

var gulp = require('gulp'),
	browserify = require('browserify'),
	debowerify = require('debowerify'),
	source = require('vinyl-source-stream'),
	config = require('./../gulpfile.config');

gulp.task('browserify', ['compile-ts'], function() {
	return browserify({
			entries: './src/js/start.js',
			debug: true
		})
		.transform(debowerify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.tsOutputPath));
});