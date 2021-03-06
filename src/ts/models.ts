/// <reference path="../../tools/typings/tsd.d.ts" />
/// <reference path="../../tools/typings/typescriptApp.d.ts" />

module Models {
	export interface ICustomer {
		name: string;
		projects: IProject[];
	}

	export interface IProject {
		name: string;
		tasks: ITask[];
	}

	export interface ITask {
		name: string;
    }

    export interface IEntry {
        customer: string;
        project: string;
        task: string;
        date: string;
        from: string;
        to: string;
    }
}