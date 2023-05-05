import { useMemo, useState } from 'react'
import ActionNoteModal, { Actions } from '../Modals/ActionNoteModal'
import styles from '../../styles/Home.module.css'
import Button from '../Button'
import NoteCard from './NoteCard'
import DeleteModal from '../Modals/DeleteModal'
import InfoModal from '../Modals/InfoModal'
import NoteService from '@/services/NoteService'
import useUser from '@/data/hooks/useUser'
import { useRouter } from 'next/router'

interface Note {
	id: number
	title: string
	description: string
}

interface Props {
	notes: Note[]
}

const WithNotes: React.FC<Props> = (notes) => {
	// ActionNoteModal
	const [openEditor, setOpenEditor] = useState(false)
	const [orderRecent, setOrderRecent] = useState(true)
	const [typeModal, setTypeModal] = useState<Actions>('create')
	const [noteToEdit, setNoteToEdit] = useState<Note>()

	// DeleteModal
	const [openDelete, setOpenDelete] = useState(false)
	const [deleteNote, setDeleteNote] = useState({
		id: 0,
		title: 'The title',
	})

	// InfoModal
	const [openInfo, setOpenInfo] = useState(false)

	const { logout } = useUser()
	const router = useRouter()

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

	const handleCallback = (arg: any) => {
		if (typeModal == 'edit') {
			setDeleteNote(arg)
			setOpenDelete(true)
		}
	}

	const handleOnDelete = () => {
		NoteService.deleteNote(deleteNote.id)
			.then((res) => {
				if (res.status != 200) {
					setOpenInfo(true)
					if (res.status == 403) {
						logout()
						router.replace('/')
					}
				}
			})
			.catch((e) => console.error(e))
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
				callback={handleCallback}
			/>
			<DeleteModal
				open={openDelete}
				setOpen={setOpenDelete}
				noteTitle={deleteNote.title}
				callback={handleOnDelete}
			/>
			<InfoModal
				open={openInfo}
				setOpen={setOpenInfo}
				onConfirmationCallback={() => {}}
				type='error'
				title='There was an error'
				buttonLabel='Okey'
			/>
		</>
	)
}

export default WithNotes
