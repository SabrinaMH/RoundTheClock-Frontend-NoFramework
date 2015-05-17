/// <reference path="../../tools/typings/tsd.d.ts" />
/// <reference path="../../tools/typings/typescriptApp.d.ts" />

var $: JQueryStatic;
$ = require('jquery');
jQuery = $; // needed for jquery-ui (no var, as it needs to be global)
require('jquery-ui');
var core = require('./core');
var entryVM = require('./entryVM');

module WM {
    export class FormVM {
        private $saveBtn = $('#saveBtn');
        private $customers = $('#customers');
        private $projects = $('#projects');
        private $tasks = $('#tasks');
        private $date = $('#date');
        private $from = $('#from');
        private $to = $('#to');
        private $message = $('#message');
        private customers: Models.ICustomer[];
        private projects: Models.IProject[];
        private core = new core();

        constructor() {
            this.setUpDatePicker();
            this.bindDataToForm();
            this.bindEventHandlers();
        }

        public bindEventHandlers() {
            this.listenForSelections();
            this.bindSaveButton();
        }

        public bindSaveButton() {
            $('#saveBtn').click(() => {
                this.core.saveEntry(new entryVM(
                    $('#customers :selected').text(),
                    $('#projects :selected').text(),
                    $('#tasks :selected').text(),
                    this.$date.val(),
                    this.$from.val(),
                    this.$to.val()
                    ),
                    this.showSuccess, this.showError);
            });
        }

        public setUpDatePicker() {
            this.$date.datepicker({
                dateFormat: 'dd-mm-yy'
            });
            var today = new Date();
            this.$date.datepicker('setDate', today);
        }

        public bindDataToForm() {
            this.core.getCustomers(
                (data) => {
                    this.customers = data;
                    this.projects = data[0].Projects;
                    this.populateCustomers(data);
                },
                (message) => this.showError(message));
        }

        public listenForSelections() {
            var self = this;
            this.$customers.change(function () {
                self.projects = $.grep(self.customers, cust => cust.name === this.value)[0].projects;
                self.populateProjects(self.projects);
            });
            this.$projects.change(function () {
                self.populateTasks($.grep(self.projects, proj => proj.name === this.value)[0].tasks);
            });
        }

        private populateCustomers(customers: Models.ICustomer[]) {
            if (customers.length === 0) {
                return;
            }

            this.addOptions(this.$customers, customers.map(cust => cust.name));
            this.populateProjects(customers[0].projects);
        }

        private populateProjects(projects: Models.IProject[]) {
            this.addOptions(this.$projects, projects.map(proj => proj.name));
            this.populateTasks(projects[0] ? projects[0].tasks : new Array<Models.ITask>());
        }

        private populateTasks(tasks: Models.ITask[]) {
            this.addOptions(this.$tasks, tasks.map(task => task.name));
        }

        private addOptions($dropdown: JQuery, elements: string[]) {
            $dropdown.empty();
            elements.forEach((e: string) => {
                $dropdown.append(
                    $('<option>',
                        {
                            value: e,
                            text: e
                        }));
            });
        }

        private showError(message: string) {
            this.$message.text(() => message);
        }

        private showSuccess() {
            this.$message.text(() => 'Entry saved');
        }
    }
}

module.exports = WM.FormVM;