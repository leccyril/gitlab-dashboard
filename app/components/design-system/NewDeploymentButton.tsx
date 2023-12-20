'use client'
import {newPipeline} from '@/app/services/actions'


interface Props {
	projectId: number,
}

export function NewDeploymentButton(props: Readonly<Props>) {
	return <button onClick={() => newPipeline(props.projectId)} className="btn btn-info">Deploy</button>
}

export default NewDeploymentButton

