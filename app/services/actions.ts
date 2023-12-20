'use server'

import {Project, Pipeline} from "@/app/lib/types";
import {revalidatePath} from "next/cache";

const baseUrl = (process.env.BASE_URL as string)

/*export const getProjects = async (): Promise<Project[]> => {
	//const data = await fetch(baseUrl + "/api/v4/projects?per_page=100&order_by=id&sort=asc", {
	const data = await fetch(baseUrl + "/api/v4/projects", {
		headers: {"PRIVATE-TOKEN": (process.env.TOKEN as string)},
	});
	console.log("loading projects")
	const projectList = await data.json();

	await Promise.all(projectList.map(async (project: Project) => {
		project.lastPipeline = await getLastProjectPipeline(project.id);
		const pipelines = await getRunningPipelines(project.id);
		project.runningPipeline = pipelines[0]
	}));

	return projectList;
}*/

async function getLastProjectPipeline(projectId: number) {
	try {
		const response = await fetch(baseUrl + `/api/v4/projects/${projectId}/pipelines/latest?ref=main`, {
			headers: {"PRIVATE-TOKEN": (process.env.TOKEN as string)}
		});

		if (!response.ok) {
			//console.trace("No Build found")
		}

		return response.json();
	} catch (error) {
		console.error(`Error while loading last pipeline for project ${projectId}:`, error);
		throw error;
	}
}

async function getRunningPipelines(projectId: number): Promise<Pipeline[]> {
	try {
		const today = new Date();
		const yesterday = new Date(today);
		const response = await fetch(baseUrl + `/api/v4/projects/${projectId}/pipelines?ref=main&scope=running&update_before=${yesterday.toISOString()}`, {
			headers: {"PRIVATE-TOKEN": (process.env.TOKEN as string)}
		});
		return response.json();
	} catch (error) {
		console.error(`Error while loading running pipeline for project ${projectId}:`, error);
		throw error;
	}
}


export const getProjects = async (): Promise<Project[]> => {
	const data = await fetch(baseUrl + "/api/v4/projects?per_page=100&order_by=id&sort=asc", {
	//const data = await fetch(baseUrl + "/api/v4/projects", {
		headers: {"PRIVATE-TOKEN": (process.env.TOKEN as string)},
	});
	console.log("loading projects")
	const projectList = await data.json();

	await Promise.all(projectList.map(async (project: Project) => {
		project.lastPipeline = await getLastProjectPipeline(project.id);
		const pipelines = await getRunningPipelines(project.id);
		project.runningPipeline = pipelines[0]
	}));

	return projectList;
}

export async function relaunchPipeline(projectId: number, pipelineId: number) {
	const response = await fetch(baseUrl + `/api/v4/projects/${projectId}/pipelines/${pipelineId}/retry`, {
		method: "POST",
		headers: {"PRIVATE-TOKEN": (process.env.TOKEN as string)}
	});
	const res = await response.json();
	revalidatePath("/")
	console.log(res)
}

export async function newPipeline(projectId: number) {
	const response = await fetch(baseUrl + `/api/v4/projects/${projectId}/pipeline?ref=main`, {
		method: "POST",
		headers: {"PRIVATE-TOKEN": (process.env.TOKEN as string)}
	});
	const res = await response.json();
	revalidatePath("/")
	console.log(res)
}