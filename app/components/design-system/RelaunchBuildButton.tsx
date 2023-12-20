'use client'
import {relaunchPipeline} from '@/app/services/actions'


interface Props {
	projectId: number,
	pipelineId: number,
}

export function RelaunchBuildButton(props: Readonly<Props>) {
	return <button onClick={() => relaunchPipeline(props.projectId, props.pipelineId)} className="btn btn-block">Relaunch</button>
}

export default RelaunchBuildButton

