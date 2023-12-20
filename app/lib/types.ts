export interface Project {
	id: number;
	name: number;
	lastPipeline: Pipeline,
	runningPipeline: Pipeline,
}

export interface Pipeline {
	id: number,
	ref: string,
	status: string,
	started_at: string,
	duration: number
}