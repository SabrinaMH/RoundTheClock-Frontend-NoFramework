'use strict';

var gulp = require('gulp'),
    del = require('del'),
    config = require('./../gulpfile.config');

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function (cb) {
  var typeScriptGenFiles = [config.tsOutputPath,            // path to generated JS files
                            config.sourceApp +'**/*.js',    // path to all JS files auto gen'd by editor
                            config.sourceApp +'**/*.js.map' // path to all sourcemap files auto gen'd by editor
                           ];

  // delete the files
  del(typeScriptGenFiles, cb);
});
