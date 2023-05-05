import React from 'react'
import Head from 'next/head'
import useUser from '@/data/hooks/useUser'
import Navbar from '@/components/Navbar'
import NoNotes from '@/components/home/NoNotes'

const Home = () => {
	const { isLogged } = useUser()

	return (
		<>
			<Head>
				<title>Notes App | Homepage</title>
				<meta name='description' content='An app for taking notes.' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>
			<Navbar />
			<NoNotes />
		</>
	)
}

export default Home
