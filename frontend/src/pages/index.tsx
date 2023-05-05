import NotesAppLogo from '@/components/NotesAppLogo'
import Textfield from '@/components/Textfield'
import Head from 'next/head'
import { useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import Button from '@/components/Button'
import Link from 'next/link'

export default function Home() {
	const [error, setError] = useState('')

	const usernameRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	const handleClick = () => {
		if (!usernameRef.current?.value || !passwordRef.current?.value) {
			setError('Llene sus datos')
			return
		}

		setError('')
	}

	return (
		<>
			<Head>
				<title>Notes App | Login</title>
				<meta name='description' content='An app for taking notes.' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>
			<main>
				<NotesAppLogo />
				<span className='lightCopy'>
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
				</div>
				<Button onClick={handleClick}>Login</Button>
				<span>
					Don’t have an account?
					<Link href='/signup'>Sign up</Link>
				</span>
			</main>
		</>
	)
}
