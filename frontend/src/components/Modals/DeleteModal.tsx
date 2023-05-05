import React, { useState } from 'react'
import Button from '../Button'
import Image from 'next/image'
import QuestionMark from '../../../public/icons/question-mark.svg'

interface Props {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	noteTitle: string
	callback: () => any
}

const DeleteModal: React.FC<Props> = ({
	open,
	setOpen,
	noteTitle = 'Title',
	callback = () => {},
}) => {
	const [exit, onExit] = useState(false)

	const close = () => {
		onExit(true)
		setTimeout(() => {
			setOpen(false)
			onExit(false)
		}, 400)
	}

	const handleConfirmation = () => {
		close()
		callback()
	}

	if (!open) return null

	return (
		<div className={`modal__background ${exit ? 'modal--exit' : ''}`}>
			<div className='modal__frame'>
				<span className='modal__title'>
					Do you really want to delete {`"${noteTitle}"`}?
				</span>
				<Image src={QuestionMark} alt='Icon' />
				<div className='modal__smallButtons delete'>
					<Button onClick={handleConfirmation}>Delete</Button>
					<Button onClick={() => close()}>Cancel</Button>
				</div>
			</div>
		</div>
	)
}

export default DeleteModal
