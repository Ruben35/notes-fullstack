import React, { createContext, useState } from 'react'

interface UserProviderProps {
	children: React.ReactNode
}

interface UserValues {
	token: string
	setToken: React.Dispatch<React.SetStateAction<string>>
}

export const UserContext = createContext<UserValues>(undefined!)

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [token, setToken] = useState(() => {
		let storedToken = null
		if (typeof window !== 'undefined') {
			storedToken = localStorage.getItem('access_token')
		}
		return storedToken !== null ? storedToken : ''
	})

	const contextValue: UserValues = { token, setToken }

	return (
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	)
}

export default UserProvider
