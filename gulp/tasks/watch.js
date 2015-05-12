'use strict'

var gulp     = require('gulp'),
    config   = require('./../gulpfile.config');

gulp.task('watch', function() {
  gulp.watch([config.allTypeScript], ['ts-lint', 'compile-ts', 'gen-ts-refs', 'browserify', 'sass', 'browser-sync']);	
});
