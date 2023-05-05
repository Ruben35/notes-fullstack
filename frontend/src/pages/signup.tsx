import NotesAppLogo from '@/components/NotesAppLogo'
import Textfield from '@/components/Textfield'
import Head from 'next/head'
import { useRef, useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Button from '@/components/Button'
import Link from 'next/link'
import InfoModal, { Status } from '@/components/Modals/InfoModal'
import UserService from '@/services/UserService'
import { useRouter } from 'next/router'
import useUser from '@/data/hooks/useUser'

const Signup = () => {
	const [error, setError] = useState('')
	const [open, setOpen] = useState(false)
	const [typeModal, setTypeModal] = useState<Status>('success')

	const usernameRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	const passwordRepeatRef = useRef<HTMLInputElement>(null)

	const { isLogged } = useUser()
	const router = useRouter()

	useEffect(() => {
		if (isLogged()) {
			router.replace('/home')
		}
	}, [isLogged, router])

	const handleClick = () => {
		const username = usernameRef.current?.value || ''
		const password = passwordRef.current?.value || ''
		const repeat_password = passwordRepeatRef.current?.value || ''

		if (!username || !password || !repeat_password) {
			setError('Fill in all the fields')
			return
		}
		if (password.length < 6) {
			setError('The password must be of at least 6 characters')
			return
		}
		if (password != repeat_password) {
			setError('The passwords do not match')
			return
		}

		setError('')

		UserService.registerUser({ username, password, repeat_password })
			.then((res) => {
				if (res.status == 409) setTypeModal('error')
				else setTypeModal('success')

				setOpen(true)
			})
			.catch((e) => console.error(e))
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
				onConfirmationCallback={
					typeModal == 'success'
						? () => {
								router.push('/')
						  }
						: () => {}
				}
				title={
					typeModal == 'success'
						? '¡Successfully Created!'
						: 'Username already in use'
				}
				type={typeModal}
				buttonLabel={
					typeModal == 'success' ? 'Go Back To Login' : 'Choose another one'
				}
			/>
		</>
	)
}

export default Signup
