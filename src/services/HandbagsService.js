import axios from 'axios';
import { baseURLServer, handbagsPath, usersPath } from './URLs.js';

const apiClient = axios.create({
	baseURL: baseURLServer,
	withCredentials: false,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	},
	timeout: 10000 //throw error
});

export default {
	getHandbagService(id) {
		return apiClient.get(`${handbagsPath}${id}.json`);
	},
	putHandbagService(token, userUid, payload) {
		return apiClient.put(`${usersPath}${userUid}/profile.json?auth=${token}`, payload);
	}
};
