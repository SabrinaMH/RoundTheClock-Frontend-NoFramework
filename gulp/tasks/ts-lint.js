'use strict';

var gulp = require('gulp'),
    tslint = require('gulp-tslint'),
    config = require('./../gulpfile.config');

/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript)
    		.pipe(tslint())
    		.pipe(tslint.report('verbose'));
});
