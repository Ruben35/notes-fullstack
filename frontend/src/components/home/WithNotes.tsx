import { useEffect, useMemo, useState } from 'react'
import ActionNoteModal, { Actions } from '../Modals/ActionNoteModal'
import styles from '../../styles/Home.module.css'
import Button from '../Button'
import NoteCard from './NoteCard'
import { type } from 'os'

interface Note {
	id: number
	title: string
	description: string
}

interface Props {
	notes: Note[]
}

const WithNotes: React.FC<Props> = (notes) => {
	const [openEditor, setOpenEditor] = useState(false)
	const [orderRecent, setOrderRecent] = useState(true)
	const [typeModal, setTypeModal] = useState<Actions>('create')
	const [noteToEdit, setNoteToEdit] = useState<Note>()

	const notesOrdered = useMemo(
		() =>
			notes.notes.sort((noteA, noteB) =>
				orderRecent ? noteB.id - noteA.id : noteA.id - noteB.id
			),
		[notes, orderRecent]
	)

	const handleAddNote = () => {
		setTypeModal('create')
		setOpenEditor(true)
	}

	const handleEdit = (note: Note) => {
		setTypeModal('edit')
		setNoteToEdit(note)
		setOpenEditor(true)
	}

	return (
		<>
			<main className={styles.WithNotes__container}>
				<div className={styles.orderBy}>
					<span className='buttonText'>Order by:</span>
					<button
						className={orderRecent ? styles.active : ''}
						onClick={() => {
							setOrderRecent(true)
						}}
					>
						Recent
					</button>
					<button
						className={!orderRecent ? styles.active : ''}
						onClick={() => {
							setOrderRecent(false)
						}}
					>
						Older
					</button>
				</div>
				<div className={styles.notesContainer}>
					<div className={styles.notes}>
						{notesOrdered.map((note) => (
							<NoteCard
								key={note.id}
								keyN={note.id}
								title={note.title}
								description={note.description}
								btnCallback={() => {
									handleEdit(note)
								}}
							/>
						))}
					</div>
				</div>
				<Button onClick={handleAddNote}>Add Note</Button>
			</main>
			<ActionNoteModal
				open={openEditor}
				setOpen={setOpenEditor}
				type={typeModal}
				note={noteToEdit}
				callback={() => {}}
			/>
		</>
	)
}

export default WithNotes
