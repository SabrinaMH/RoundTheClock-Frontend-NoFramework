/// <reference path="../../tools/typings/tsd.d.ts" />
/// <reference path="../../tools/typings/typescriptApp.d.ts" />

var $: JQueryStatic;
$ = require('jquery');
jQuery = $; // needed for jquery-ui (no var, as it needs to be global)
require('jquery-ui');
var core = require('./core');
var messageVM = require('./messageVM');
var entryVM = require('./entryVM');

module VM {
    export class FormVM {
        private form = <HTMLFormElement>document.getElementById('time-entry-form')
        private customersElem = <HTMLSelectElement>document.getElementById('customers');
        private projectsElem = <HTMLSelectElement>document.getElementById('projects');
        private tasksElem = <HTMLSelectElement>document.getElementById('tasks');
        private dateElem = <HTMLInputElement>document.getElementById('date');
        private fromElem = <HTMLInputElement>document.getElementById('from');
        private toElem = <HTMLInputElement>document.getElementById('to');
        private customers: Models.ICustomer[];
        private projects: Models.IProject[];
        private core = new core();
        private messageVM = new messageVM();

        constructor() {
            this.setUpDatePicker();
            this.getPrefilledData();
            this.bindEventHandlers();
        }

        public bindEventHandlers() {
            this.listenForSelections();
            this.bindSaveButton();
        }

        public bindSaveButton() {
            var self = this;
            this.form.addEventListener('submit', function (e) {
                if (!self.isTimeElemValid(self.fromElem) || !self.isTimeElemValid(self.toElem)) {
                    e.preventDefault();
                } else {
                    self.core.saveEntry(new entryVM(
                            self.customersElem.options[self.customersElem.selectedIndex].text,
                            self.projectsElem.options[self.projectsElem.selectedIndex].text,
                            self.tasksElem.options[self.tasksElem.selectedIndex].text,
                            self.dateElem.value, self.fromElem.value, self.toElem.value),
                        () => self.messageVM.showMessage('Entry saved'),
                        self.messageVM.showMessage);
                }
            });
        }

        private isTimeElemValid(timeElem: HTMLInputElement): boolean {
            if (!timeElem.validity.valid) {
                return false;
            }

            var splitTime = timeElem.textContent.split(':');
            var hours = parseInt(splitTime[0], 10);
            var minutes = parseInt(splitTime[1], 10);
            if (isNaN(hours) && hours > 23) {
                return false;
            }
            if (isNaN(minutes) && minutes > 59) {
                return false;
            }

            return true;
        }

        public setUpDatePicker() {
            var $date = $(this.dateElem);
            $date.datepicker({
                dateFormat: 'dd-mm-yy'
            });
            var today = new Date();
            $date.datepicker('setDate', today);
        }

        public getPrefilledData() {
            this.core.getCustomers(
                (data) => {
                    this.customers = data;
                    this.projects = data[0].Projects;
                    this.populateCustomers(data);
                },
                (message) => this.messageVM.showMessage(message));
        }

        public listenForSelections() {
            var self = this;
            this.customersElem.addEventListener('change', function () {
                self.projects = $.grep(self.customers, cust => cust.name === this.value)[0].projects;
                self.populateProjects(self.projects);
            });
            this.projectsElem.addEventListener('change', function () {
                self.populateTasks($.grep(self.projects, proj => proj.name === this.value)[0].tasks);
            });
        }

        private populateCustomers(customers: Models.ICustomer[]) {
            if (customers.length === 0) {
                return;
            }

            this.addOptions(this.customersElem, customers.map(cust => cust.name));
            this.populateProjects(customers[0].projects);
        }

        private populateProjects(projects: Models.IProject[]) {
            this.addOptions(this.projectsElem, projects.map(proj => proj.name));
            this.populateTasks(projects[0] ? projects[0].tasks : new Array<Models.ITask>());
        }

        private populateTasks(tasks: Models.ITask[]) {
            this.addOptions(this.tasksElem, tasks.map(task => task.name));
        }

        private addOptions(dropdownElem: HTMLSelectElement, elements: string[]) {
            dropdownElem.options.length = 0;
            elements.sort().forEach((e: string) => {
                var option = document.createElement('option');
                option.value = option.text = e;
                dropdownElem.add(option);
            });
        }
    }
}

module.exports = VM.FormVM;