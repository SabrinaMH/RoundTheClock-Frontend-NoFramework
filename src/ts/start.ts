/// <reference path="../../tools/typings/lib.d.ts" />
/// <reference path="../../tools/typings/tsd.d.ts" />
/// <reference path="../../tools/typings/typescriptApp.d.ts" />

var $: JQueryStatic;
$ = require('jquery');

var formUI = require('./formUI');

$(document).ready(() => {
    var ui = new formUI();
    ui.bindDataToForm();
    ui.listenForSelections();
    ui.setUpDatePicker();
});