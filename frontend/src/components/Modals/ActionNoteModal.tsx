import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button'
import Textfield from '../Textfield'
import TextArea from '../TextArea'
import NoteService from '@/services/NoteService'
import useUser from '@/data/hooks/useUser'
import { useRouter } from 'next/router'

export type Actions = 'create' | 'edit'

export interface Note {
	id: number
	title: string
	description: string
}

interface Props {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	type?: Actions
	note?: Note
	callback?: () => any
}

const ActionNoteModal: React.FC<Props> = ({
	open,
	setOpen,
	type = 'create',
	note = { id: -1, title: '', description: '' },
	callback = () => {},
}) => {
	const [exit, onExit] = useState(false)
	const [error, setError] = useState('')
	const titleRef = useRef<HTMLInputElement>(null)
	const descriptionRef = useRef<HTMLTextAreaElement>(null)
	const { logout } = useUser()
	const router = useRouter()

	const close = () => {
		onExit(true)
		setTimeout(() => {
			setOpen(false)
			onExit(false)
		}, 400)
	}

	const handleAddNote = () => {
		const title = titleRef.current?.value || ''
		const description = descriptionRef.current?.value || ''

		if (!title || !description) {
			setError('Fill in all the fields')
			return
		}
		setError('')

		NoteService.addNote({ title, description })
			.then((res) => {
				switch (res.status) {
					case 409:
						setError('Another note has the same title')
						break
					case 201:
						close()
						callback()
						break
					case 403:
						logout()
						router.replace('/')
					default:
						setError('Title length < 100 and description < 1000')
						break
				}
			})
			.catch((e) => console.error(e))
	}

	const handleEditNote = () => {
		const title = titleRef.current?.value || ''
		const description = descriptionRef.current?.value || ''

		if (!title || !description) {
			setError('Fill in all the fields')
			return
		}
		setError('')

		NoteService.editNote(note.id, { title, description })
			.then((res) => {
				switch (res.status) {
					case 409:
						setError('Another note has the same title')
						break
					case 200:
						close()
						callback()
						break
					case 403:
						logout()
						router.replace('/')
					default:
						setError('Title length < 100 and description < 1000')
						break
				}
			})
			.catch((e) => console.error(e))
	}

	useEffect(() => {
		if (titleRef.current && descriptionRef.current) {
			if (type == 'edit') {
				titleRef.current.value = note.title
				descriptionRef.current.value = note.description
			} else {
				titleRef.current.value = ''
				descriptionRef.current.value = ''
			}
		}
		setError('')
	}, [note.description, note.title, open, type])

	if (!open) return null

	return (
		<div className={`modal__background ${exit ? 'modal--exit' : ''}`}>
			<div className='modal__frame'>
				<span className='modal__title'>
					{type == 'create' ? 'New Note' : 'Edit Note'}
				</span>
				<Textfield
					label='Title'
					placeholder='Note title..'
					type='text'
					myRef={titleRef}
				/>
				<TextArea
					label='Description'
					placeholder='Note description...'
					rows={4}
					myRef={descriptionRef}
				/>
				{error ? <span className='modal__error'>{error}</span> : null}

				<div className='modal__smallButtons'>
					{type == 'create' ? (
						<Button onClick={handleAddNote}>Add Note</Button>
					) : (
						<Button onClick={handleEditNote}>Edit Note</Button>
					)}
					<Button
						onClick={() => {
							close()
						}}
					>
						Cancel
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ActionNoteModal
