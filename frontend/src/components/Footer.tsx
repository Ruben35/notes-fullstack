import Image from 'next/image'
import GitHubIcon from '../../public/icons/github.svg'
import Link from 'next/link'

const Footer = () => {
	return (
		<footer>
			<span>Built by:</span>
			<Link href='https://github.com/Ruben35' target='_blank'>
				<Image src={GitHubIcon} alt='GitHub Icon' priority />
				Ruben35
			</Link>
		</footer>
	)
}

export default Footer
