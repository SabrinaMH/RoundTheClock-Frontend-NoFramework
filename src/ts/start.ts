/// <reference path="../../tools/typings/lib.d.ts" />
/// <reference path="../../tools/typings/tsd.d.ts" />
/// <reference path="../../tools/typings/typescriptApp.d.ts" />

var $: JQueryStatic;
$ = require('jquery');

var formWM = require('./formWM');

$(document).ready(() => {
    var ui = new formWM();
});