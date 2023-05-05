import axios, { AxiosRequestConfig } from 'axios'
import config from '../config'

const client = axios.create({
	baseURL: config.apiURL,
	headers: {
		'Content-Type': 'application/json',
	},
})

export const clientRequest = (options: AxiosRequestConfig<any>) =>
	client(options)
		.then((response) => response)
		.catch((error) => error.response)
