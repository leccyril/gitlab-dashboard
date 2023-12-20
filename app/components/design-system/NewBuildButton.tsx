'use client'
import {newPipeline} from '@/app/services/actions'

interface Props {
	projectId: number,
}

export function NewBuildButton(props: Readonly<Props>) {
	return <button onClick={() => newPipeline(props.projectId)} className="btn btn-info">New build</button>
}

export default NewBuildButton

