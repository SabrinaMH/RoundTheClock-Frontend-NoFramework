/// <reference path="../../tools/typings/tsd.d.ts" />
/// <reference path="../../tools/typings/typescriptApp.d.ts" />

var $: JQueryStatic;
$ = require('jquery');

module Api {
    export class Data {
        getCustomers(success: (data: Models.ICustomer[]) => void, error: (error: string) => void): void {
            $.getJSON('http://localhost:9001/Customer')
                .done(function(data: any) {
                    success(<Models.ICustomer[]>data);
                })
                .fail(function(jqXHR, message) {
                    error(message);
                });
        }
    }
}

module.exports = Api.Data;