/// <reference path="../../tools/typings/tsd.d.ts" />
/// <reference path="../../tools/typings/typescriptApp.d.ts" /> 

module VM {
    export class MessageVM {
        private messageElem = <HTMLParagraphElement>document.getElementById('message');

        public showMessage(message : string) {
            this.messageElem.textContent = message;
        }
    }
}

module.exports = VM.MessageVM;