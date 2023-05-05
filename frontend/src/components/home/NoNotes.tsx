import Button from '../Button'
import styles from '../../styles/Home.module.css'
const NoNotes = () => {
	return (
		<main className={styles.NoNotes__container}>
			<h1>Oh! It seems that you don’t have any note yet...</h1>
			<span className='lightCopy'>Well, there is always a start!</span>
			<Button onClick={() => {}}>Add Note</Button>
		</main>
	)
}

export default NoNotes
