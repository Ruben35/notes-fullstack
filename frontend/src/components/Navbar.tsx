import Image from 'next/image'
import NotesAppLogo from '../../public/icons/NoteAppLogo.svg'
import useUser from '@/data/hooks/useUser'
import { useRouter } from 'next/router'
const Navbar = () => {
	const { logout } = useUser()
	const router = useRouter()
	return (
		<nav>
			<Image src={NotesAppLogo} alt='NoteAppLogo' />
			<button
				onClick={() => {
					logout()
					router.replace('/')
				}}
			>
				Logout
			</button>
		</nav>
	)
}

export default Navbar
