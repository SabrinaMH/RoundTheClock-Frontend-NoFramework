'use strict';

var source = './src/',
    sourceTs = source + 'ts/',
    sourceSass = source + 'css/',
    typings = './tools/typings/';

module.exports = {
    sourceSass: sourceSass,
    mainSass: sourceSass + 'main.scss',
    tsOutputPath: source + '/js',
    allJavaScript: [source + '/js/**/*.js'],
    allTypeScript: sourceTs + '/**/*.ts',

    typings: typings,
    libraryTypeScriptDefinitions: typings + '**/*.ts',
    appTypeScriptReferences: typings + 'typescriptApp.d.ts',
};