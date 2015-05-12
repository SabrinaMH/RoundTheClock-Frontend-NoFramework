'use strict';

var gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    config = require('./../gulpfile.config');

/**
 * Compile TypeScript and include references to library and typescriptApp.d.ts files.
 */
gulp.task('compile-ts', ['ts-lint'], function () {
    var sourceTsFiles = [config.allTypeScript,                //path to typescript files
                         config.libraryTypeScriptDefinitions, //reference to library .d.ts files
                         config.appTypeScriptReferences];     //reference to typescriptApp.d.ts files

    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(tsc({
                           target: 'ES6',
                           declarationFiles: false,
                           noExternalResolve: true
                       }));

        tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
        return tsResult.js
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest(config.tsOutputPath));
});