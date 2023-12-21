import FormattedDate from "@/app/components/design-system/FormattedDate";
import RelaunchBuildButton from "@/app/components/design-system/RelaunchBuildButton";
import NewBuildButton from "@/app/components/design-system/NewBuildButton";
import NewDeploymentButton from "@/app/components/design-system/NewDeploymentButton";
import {Project} from "@/app/lib/types";

interface Props {
	project: Project;
	key: number;
}

export function Build(props: Readonly<Props>) {
	const project: Project = props.project;
	return (
		<div key={props.key} className="card bg-base-100 shadow-xl m-2">
			<div className="card-body">
				<h2 className="card-title">{project.name}
					{project.lastPipeline.status === 'failed' && (
						<span className="badge badge-error"></span>
					)}
					{project.lastPipeline.status === 'success' && (
						<span className="badge badge-success"></span>
					)}
					{project.runningPipeline && (
						<span className="badge badge-info"></span>
					)}
				</h2>
				{project.lastPipeline?.started_at && (
					<p className="inline-block align-text-middle">Last build date : <FormattedDate isoDate={project.lastPipeline?.started_at}/></p>
				)}
				<p className="inline-block align-text-middle">Last build duration : {project.lastPipeline?.duration} s</p>
				{project.lastPipeline.status === 'failed' && (
					<div className="card-actions justify-center">
						<RelaunchBuildButton projectId={project.id} pipelineId={project.lastPipeline.id}/>
					</div>
				)}
				{project.lastPipeline.status !== 'failed' && (
					<div className="card-actions justify-center">
						<NewBuildButton projectId={project.id}/>
						<NewDeploymentButton projectId={project.id}/>
					</div>
				)}
			</div>
		</div>
	)
}

export default Build