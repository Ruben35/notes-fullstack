import axios, { AxiosRequestConfig } from 'axios'
import config from '../config'

const client = axios.create({
	baseURL: config.apiURL,
	headers: {
		'Content-Type': 'application/json',
	},
}
)

client.interceptors.request.use((config) => {
	const token = localStorage.getItem('access_token')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export const clientRequest = (options: AxiosRequestConfig<any>) =>
	client(options)
		.then((response) => response)
		.catch((error) => error.response)
