/// <reference path="../../tools/typings/tsd.d.ts" />
/// <reference path="../../tools/typings/typescriptApp.d.ts" />

var $: JQueryStatic;
$ = require('jquery');

module Api {
    export class Core {
        private connectionString = 'http://localhost:50364';

        public getCustomers(success: (data: Models.ICustomer[]) => void, error: (text: string) => void): void {
            $.getJSON(this.connectionString + '/Customer')
                .done(function(data: any) {
                    success(<Models.ICustomer[]>data);
                })
                .fail(function(jqXHR, message) {
                    error(message);
                });
        }

        public saveEntry(entry: VM.EntryVM, success: () => void, error: (text: string) => void): void {
            $.ajax({
                type: 'POST',
                url: this.connectionString + '/Entry',
                data: JSON.stringify(entry),
                crossDomain: true,
                contentType: 'application/json; charset=utf-8'
            }).done(() => {
                success();
            }).fail((jqxhr: JQueryXHR) => {
                error(jqxhr.responseText);
            });
        }

        public getUncommittedEntries(success: (data: Models.IEntry[]) => void, error: (text: string) => void): void {
            $.getJSON(this.connectionString + '/Entry')
                .done(function (data: any) {
                    success(<Models.IEntry[]>data);
                })
                .fail(function (jqXHR, message) {
                    error(message);
                });
        }
    }
}

module.exports = Api.Core;