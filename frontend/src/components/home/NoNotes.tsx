import Button from '../Button'
import styles from '../../styles/Home.module.css'
import ActionNoteModal from '../Modals/ActionNoteModal'
import { useState } from 'react'
import { useRouter } from 'next/router'
const NoNotes = () => {
	const [openEditor, setOpenEditor] = useState(false)
	const router = useRouter()
	return (
		<>
			<main className={styles.NoNotes__container}>
				<h1>Oh! It seems that you don’t have any note yet...</h1>
				<span className='lightCopy'>Well, there is always a start!</span>
				<Button
					onClick={() => {
						setOpenEditor(true)
					}}
				>
					Add Note
				</Button>
			</main>
			<ActionNoteModal
				open={openEditor}
				setOpen={setOpenEditor}
				type='create'
				callback={() => {
					router.reload()
				}}
			/>
		</>
	)
}

export default NoNotes
