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
	putUserProfileService(token, userUid, payload) {
		return apiClient.put(`${usersPath}${userUid}/profile.json?auth=${token}`, payload);
	},
	addToCartService(token, userUid, payload) {
		return apiClient.patch(`${usersPath}${userUid}/cart.json?auth=${token}`, payload);
	},
	updateFieldItemCartService(token, userUid, itemNumber, payload) {
		return apiClient.patch(`${usersPath}${userUid}/cart/${itemNumber}/.json?auth=${token}`, payload);
	},
	getCartService(token, userUid) {
		return apiClient.get(`${usersPath}${userUid}/cart.json?auth=${token}`);
	},
	removeItemCartService(token, userUid, itemNumber) {
		return apiClient.delete(`${usersPath}${userUid}/cart/${itemNumber}/.json?auth=${token}`);
	},
	deleteField(token, userUid, field) {
		return apiClient.delete(`${usersPath}${userUid}/${field}/.json?auth=${token}`);
	},
	updateInventoriesService(token, userUid, payload) {
		return apiClient.patch(`${handbagsPath}/quantity.json?auth=${token}`, payload);
	}
};
