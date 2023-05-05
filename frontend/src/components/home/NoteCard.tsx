import React from 'react'
import Edit from '../../../public/icons/edit.svg'
import Image from 'next/image'

interface Props {
	keyN?: number
	title?: string
	description?: string
	btnCallback: () => any
}

const NoteCard: React.FC<Props> = ({
	keyN = '1',
	title = 'title',
	description = 'description',
	btnCallback = () => {},
}) => {
	return (
		<div className='NoteCard'>
			<div>
				<span className='buttonText'>
					#{keyN} {title}
				</span>
				<button onClick={btnCallback}>
					<Image src={Edit} alt='edit' />
				</button>
			</div>
			<div>{description}</div>
		</div>
	)
}

export default NoteCard
