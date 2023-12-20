import {Project} from "@/app/lib/types";
import {getProjects} from './services/actions'
import FailedBuilds from "@/app/components/page/FailedBuilds";
import RunningBuilds from "@/app/components/page/RunningBuilds";


export default async function Home() {

	const projects: Project[] = await getProjects();

	return <section id="jobs">
		<div className="container mx-auto p-5 lg:p-10">
			<h2 className="text-5xl font-bold">Running Builds :</h2>
			<RunningBuilds projects={projects} />

			<h2 className="text-5xl font-bold">Failed Builds :</h2>
			<FailedBuilds projects={projects} />
		</div>
	</section>
}
