import axios from 'axios';
import {
	baseURLServer,
	handbagsPath,
	handbagsQuantityData,
	usersPath,
	userProfileData,
	cartPath,
	userCartData,
	userHistoryData
} from './URLs.js';

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
		return apiClient.put(`${usersPath}${userUid}${userProfileData}?auth=${token}`, payload);
	},

	addToCartService(token, userUid, payload) {
		return apiClient.patch(`${usersPath}${userUid}${userCartData}?auth=${token}`, payload);
	},

	updateFieldItemCartService(token, userUid, itemNumber, payload) {
		return apiClient.patch(`${usersPath}${userUid}${cartPath}${itemNumber}/.json?auth=${token}`, payload);
	},

	removeItemCartService(token, userUid, itemNumber) {
		return apiClient.delete(`${usersPath}${userUid}${cartPath}${itemNumber}/.json?auth=${token}`);
	},

	deleteFieldService(token, userUid, field) {
		return apiClient.delete(`${usersPath}${userUid}/${field}/.json?auth=${token}`);
	},

	updateInventoriesService(token, userUid, payload) {
		return apiClient.patch(`${handbagsPath}${handbagsQuantityData}?auth=${token}`, payload);
	},

	addToHistoryService(token, userUid, payload) {
		return apiClient.patch(`${usersPath}${userUid}${userHistoryData}?auth=${token}`, payload);
	},

	getSelectedFieldService(token, userUid, field) {
		return apiClient.get(`${usersPath}${userUid}/${field}.json?auth=${token}`);
	}
};
