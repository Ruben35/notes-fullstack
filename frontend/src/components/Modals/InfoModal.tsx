import React, { useState } from 'react'
import Button from '../Button'
import Image from 'next/image'
import GreenCheck from '../../../public/icons/green-check.svg'
import CrossMark from '../../../public/icons/cross-mark.svg'

export type Status = 'success' | 'error'

interface Props {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	onConfirmationCallback: () => any
	title?: string
	type?: Status
	buttonLabel?: string
}

const InfoModal: React.FC<Props> = ({
	open,
	setOpen,
	onConfirmationCallback,
	title = 'InfoModal Title',
	type = 'success',
	buttonLabel = '',
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
		onConfirmationCallback()
	}

	if (!open) return null

	return (
		<div className={`modal__background ${exit ? 'modal--exit' : ''}`}>
			<div className='modal__frame'>
				<span className='modal__title'>{title}</span>
				<Image src={type == 'success' ? GreenCheck : CrossMark} alt='Icon' />
				<Button onClick={handleConfirmation}>
					{buttonLabel ? buttonLabel : 'Button'}
				</Button>
			</div>
		</div>
	)
}

export default InfoModal
