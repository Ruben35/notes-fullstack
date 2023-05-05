import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import useUser from '@/data/hooks/useUser'
import Navbar from '@/components/Navbar'
import NoNotes from '@/components/home/NoNotes'
import { useRouter } from 'next/router'
import NoteService from '@/services/NoteService'
import WithNotes from '@/components/home/WithNotes'

const Home = () => {
	const { isLogged } = useUser()
	const router = useRouter()
	const [notes, setNotes] = useState([])

	useEffect(() => {
		if (!isLogged()) {
			router.replace('/')
		}

		NoteService.getAllNotes()
			.then((res) => {
				if (res.status == 200) {
					setNotes(res.data)
				}
			})
			.catch((e) => console.error(e))
	}, [isLogged, router])

	return (
		<>
			<Head>
				<title>Notes App | Homepage</title>
				<meta name='description' content='An app for taking notes.' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>
			<Navbar />
			{notes.length == 0 ? <NoNotes /> : <WithNotes notes={notes} />}
		</>
	)
}

export default Home
