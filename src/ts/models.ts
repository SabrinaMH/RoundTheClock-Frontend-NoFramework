/// <reference path="../../tools/typings/tsd.d.ts" />
/// <reference path="../../tools/typings/typescriptApp.d.ts" />

module Models {
	export interface ICustomer {
		Name: string;
		Projects: IProject[];
	}

	export interface IProject {
		Name: string;
		Tasks: ITask[];
	}

	export interface ITask {
		Name: string;
	}
}