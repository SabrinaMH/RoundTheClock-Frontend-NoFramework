/// <reference path="../../tools/typings/lib.d.ts" />
/// <reference path="../../tools/typings/tsd.d.ts" />
/// <reference path="../../tools/typings/typescriptApp.d.ts" />

var formVM = require('./formVM');
var tableVM = require('./tableVM');

document.addEventListener('DOMContentLoaded', () => {
    new formVM();
    new tableVM();
});