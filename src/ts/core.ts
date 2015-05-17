/// <reference path="../../tools/typings/tsd.d.ts" />
/// <reference path="../../tools/typings/typescriptApp.d.ts" />

var $: JQueryStatic;
$ = require('jquery');

module Api {
    export class Core {
        public getCustomers(success: (data: Models.ICustomer[]) => void, error: (text: string) => void): void {
            $.getJSON('http://localhost:50364/Customer')
                .done(function(data: any) {
                    success(<Models.ICustomer[]>data);
                })
                .fail(function(jqXHR, message) {
                    error(message);
                });
        }

        public saveEntry(entry: WM.EntryVM, success: () => void, error: (text: string) => void): void {
            $.ajax({
                type: 'POST',
                url: 'http://localhost:50364/Entry',
                data: JSON.stringify(entry),
                contentType: 'application/json; charset=utf-8'
            }).done(() => {
                success();
            }).fail((jqxhr: JQueryXHR) => {
                error(jqxhr.responseText);
            });
        }
    }
}

module.exports = Api.Core;