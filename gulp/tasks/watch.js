'use strict'

var gulp     = require('gulp'),
    config   = require('./../gulpfile.config'),
    browsersync = require('./browser-sync');

gulp.task('watch', function() {
  browsersync(); // isn't included in watch, because then a new browserSync session will try to be started each time 
  gulp.watch([config.allTypeScript, config.allSass], ['ts-lint', 'compile-ts', 'gen-ts-refs', 'browserify', 'sass']);	
});
