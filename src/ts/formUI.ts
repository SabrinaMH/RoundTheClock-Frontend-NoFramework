/// <reference path="../../tools/typings/tsd.d.ts" />
/// <reference path="../../tools/typings/typescriptApp.d.ts" />

var $: JQueryStatic;
$ = require('jquery');
var dataFromApi = require('./data');

module UI {
    export class FormUI {
        private $customers = $('#customers');
        private $projects = $('#projects');
        private $tasks = $('#tasks');
        private customers: Models.ICustomer[];
        private projects: Models.IProject[];
        private selectedCustName: string;
        private selectedProjName: string;
        private selectedTaskName: string;

        public bindDataToForm() {
            var data = new dataFromApi();
            data.getCustomers(
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
                if (self.selectedCustName !== this.value) {
                    self.selectedCustName = this.value;
                    self.projects = $.grep(self.customers, cust => cust.Name === self.selectedCustName)[0].Projects;
                    self.populateProjects(self.projects);
                }
            });
            this.$projects.change(function () {
                if (self.selectedProjName !== this.value) {
                    self.selectedProjName = this.value;
                    self.populateTasks($.grep(self.projects, proj => proj.Name === self.selectedProjName)[0].Tasks);
                }
            });
            this.$tasks.change(function () {
                this.selectedTaskName = this.value;
            });
        }

        private populateCustomers(customers: Models.ICustomer[]) {
            if (customers.length === 0) {
                return;
            }

            this.addOptions(this.$customers, customers.map(cust => cust.Name));
            var firstCust = customers[0];
            if (firstCust.Projects.length > 0) {
                this.populateProjects(firstCust.Projects);
            }
        }

        private populateProjects(projects: Models.IProject[]) {
            if (projects.length === 0) {
                return;
            }

            this.addOptions(this.$projects, projects.map(proj => proj.Name));
            var firstProj = projects[0];
            if (firstProj.Tasks.length > 0) {
                this.populateTasks(firstProj.Tasks);
            }
        }

        private populateTasks(tasks: Models.ITask[]) {
            if (tasks.length === 0) {
                return;
            }

            this.addOptions(this.$tasks, tasks.map(task => task.Name));
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
            $('#errorMessage').text(() => message);
        }
    }
}

module.exports = UI.FormUI;