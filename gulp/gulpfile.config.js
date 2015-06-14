'use strict';

var source = './src/',
    sourceTs = source + 'ts/',
    sourceSass = source + 'scss/',
    typings = './tools/typings/';

module.exports = {
    source: source,
    sourceSass: sourceSass,
    allSass: sourceSass + '*.scss',
    mainSass: sourceSass + 'main.scss',
    tsOutputPath: source + '/js',
    allJavaScript: [source + '/js/**/*.js'],
    allTypeScript: sourceTs + '/**/*.ts',

    typings: typings,
    libraryTypeScriptDefinitions: typings + '**/*.ts',
    appTypeScriptReferences: typings + 'typescriptApp.d.ts',
};