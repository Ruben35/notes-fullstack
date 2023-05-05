import UserProvider from '@/data/UserProvider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
	weight: ['300', '400', '700'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'auto',
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<UserProvider>
				<style jsx global>{`
					html {
						font-family: ${poppins.style.fontFamily};
					}
				`}</style>
				<Component {...pageProps} />
			</UserProvider>
		</>
	)
}
