import NotesAppLogo from '@/components/NotesAppLogo'
import Textfield from '@/components/Textfield'
import Head from 'next/head'
import { useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import Button from '@/components/Button'
import Link from 'next/link'
import UserService from '@/services/UserService'
import InfoModal from '@/components/Modals/InfoModal'

export default function Home() {
	const [error, setError] = useState('')
	const [displayModalError, setDisplayModalError] = useState(false)

	const usernameRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	const handleClick = () => {
		const username = usernameRef.current?.value || ''
		const password = passwordRef.current?.value || ''

		if (!username || !password) {
			setError('Fill in all the fields')
			return
		}

		setError('')

		UserService.login({ username, password })
			.then((res) => {
				if (res.status != 200) setDisplayModalError(true)
				else {
					console.log(res.data.access_token)
				}
			})
			.catch((e) => console.error(e))
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
			<InfoModal
				open={displayModalError}
				setOpen={setDisplayModalError}
				onConfirmationCallback={() => {}}
				title='Username or password incorrect'
				type='error'
				buttonLabel='Try again'
			/>
		</>
	)
}
