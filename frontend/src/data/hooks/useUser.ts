import { useContext } from 'react'
import { UserContext } from '../UserProvider'
import jwt from 'jsonwebtoken'; 
import { JwtPayload } from 'jsonwebtoken';

export default function useUser() {
	const { token, setToken } = useContext(UserContext)

    const login = (token: string) => {
        localStorage.setItem('access_token',token)
        setToken(token)
    }

    const logout = () => {
        localStorage.removeItem('access_token')
        setToken('')
    }

    const isLogged = () => {
        if(token === null || token === undefined || token === '')
            return false
        
        const payload = jwt.decode(token) as JwtPayload | null
        const currentTime = Date.now();
        const expirationTime = payload?.expires * 1000;

        if(currentTime > expirationTime){
            logout()
            return false
        }

        return true
    }

	return {
		isLogged,
		login,
		logout
	}
}
