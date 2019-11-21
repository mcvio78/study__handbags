import axios from 'axios';
import { baseURLServer, dataFile, pathData } from './URLs.js';

const apiClient = axios.create({
	baseURL: baseURLServer,
	withCredentials: false,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
});

export default {
	getHandbagsService() {
		return apiClient.get(`${dataFile}`);
	},
	getHandbagService(id) {
		return apiClient.get(`${pathData}${id}.json`);
	}
};
