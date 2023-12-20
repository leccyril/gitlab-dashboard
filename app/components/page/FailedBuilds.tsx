import {Project} from "@/app/lib/types";
import Build from "@/app/components/page/Build";

interface Props {
	projects: Project[];
}

export function FailedBuilds(props: Readonly<Props>) {
	const projects: Project[] = props.projects
	return (
		<div className="container mx-auto p-5 lg:p-10">
			<div data-theme="cmyk" className="mx-auto mt-10 grid xs:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
				{projects.map((project: Project, index) => (
					project.lastPipeline?.status === 'failed' &&  (
						<Build key={index} project={project}/>
					)
				))}
			</div>
		</div>
	)
}

export default FailedBuilds