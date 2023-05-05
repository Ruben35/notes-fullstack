import NotesAppLogo from '@/components/NotesAppLogo'
import Textfield from '@/components/Textfield'
import Head from 'next/head'
import { useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import Button from '@/components/Button'
import Link from 'next/link'
import InfoModal from '@/components/Modals/InfoModal'

const Signup = () => {
	const [error, setError] = useState('')
	const [open, setOpen] = useState(false)

	const usernameRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	const passwordRepeatRef = useRef<HTMLInputElement>(null)

	const handleClick = () => {
		// if (
		// 	!usernameRef.current?.value ||
		// 	!passwordRef.current?.value ||
		// 	!passwordRepeatRef.current?.value
		// ) {
		// 	setError('Llene el formulario')
		// 	return
		// }
		// setError('')
		setOpen(true)
	}

	return (
		<>
			<Head>
				<title>Notes App | Sign up</title>
				<meta name='description' content='An app for taking notes.' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>
			<main>
				<NotesAppLogo />
				<span className={`lightCopy ${styles.copy}`}>
					Do you forget things? Now that’s problem from the past...
				</span>
				<div className={styles.form}>
					{error ? <span className={styles.error}>{error}</span> : null}
					<Textfield
						label='Username'
						placeholder='Your username'
						type='text'
						myRef={usernameRef}
					/>
					<Textfield
						label='Password'
						placeholder='Your password'
						type='password'
						myRef={passwordRef}
					/>
					<Textfield
						label='Repeat Password'
						placeholder='Repeat password'
						type='password'
						myRef={passwordRepeatRef}
					/>
				</div>
				<Button onClick={handleClick}>Sign up</Button>
				<span>
					Already have an account?
					<Link href='/'>Login</Link>
				</span>
			</main>
			<InfoModal
				open={open}
				setOpen={setOpen}
				onConfirmationCallback={() => {}}
				title='¡Successfully Created!'
				type='success'
				buttonLabel='Go Back To Login'
			/>
		</>
	)
}

export default Signup
