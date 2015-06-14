/// <reference path="../../tools/typings/tsd.d.ts" />
/// <reference path="../../tools/typings/typescriptApp.d.ts" /> 

var core = require('./core');
var messageVM = require('./messageVM');

module VM {
    export class TableVM {
        private tblElem = <HTMLTableElement>document.getElementById('uncommittedEntriesTbl');
        private btnElem = <HTMLButtonElement>document.getElementById('uncommittedEntriesBtn');
        private tblBodyElem = <HTMLTableSectionElement>document.getElementById('uncommittedEntriesTblBody');
        private core = new core();
        private messageVM = new messageVM();
        
        constructor() {
            this.bindBtn();
        }

        private bindBtn() {
            var self = this;
            this.btnElem.addEventListener('click', function () {
                self.core.getUncommittedEntries(self.fillTblBody, (message) => self.messageVM.showMessage(message));
            });
        }

        private fillTblBody(entries: Models.IEntry[]) {
            entries.sort(this.compareEntries).forEach((e: Models.IEntry) => {
                var row = document.createElement('tr');
                for (var prop in e) {
                    if (e.hasOwnProperty(prop)) {
                        var cell = document.createElement('td');
                        cell.textContent = (typeof e[prop] === 'object') ? e[prop].name : e[prop];
                        row.appendChild(cell);
                    }
                }
                this.tblBodyElem.appendChild(row);
            });
        }

        private compareEntries(e1: Models.IEntry, e2: Models.IEntry) : number {
            var dateComp = e1.date.localeCompare(e2.date);
            return dateComp === 0 ? e1.from.localeCompare(e2.from) : dateComp;
        }
    }
}

module.exports = VM.TableVM;