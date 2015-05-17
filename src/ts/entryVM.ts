/// <reference path="../../tools/typings/tsd.d.ts" />
/// <reference path="../../tools/typings/typescriptApp.d.ts" />

module WM {
    export class EntryVM {
        private customerName: string;
        private projectName: string;
        private taskName: string;
        private date: string;
        private from: string;
        private to: string;

        constructor(cName: string, pName: string, tName: string, date: string, from: string, to: string) {
            this.customerName = cName;
            this.projectName = pName;
            this.taskName = tName;
            this.date = date;
            this.from = from;
            this.to = to;
        }
    }
}

module.exports = WM.EntryVM;