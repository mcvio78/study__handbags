//import firebase from 'firebase/app';
import HandbagsService from './../../services/HandbagsService';

export const namespaced = true;

export const state = {
	inventories: null,
	inventoriesStatus: null,
	inventoriesError: null
};

export const mutations = {
	SET_INVENTORIES(state, payload) {
		state.inventories = payload;
	},
	SET_INVENTORIES_STATUS(state, payload) {
		state.inventoriesStatus = payload;
	},
	SET_INVENTORIES_ERROR(state, payload) {
		state.inventoriesError = payload;
	}
};

export const actions = {
	/////////////////////////////////////////////////////////////////////////////////////////////////GET QUANTITY DATABASE
	getInventories({ commit, dispatch }, subField) {
		return HandbagsService.getHandbagService(subField)
			.then(response => {
				commit('SET_INVENTORIES', response.data);
				commit('SET_INVENTORIES_STATUS', 'success');
				commit('SET_INVENTORIES_ERROR', null);
				//return response
			})
			.catch(error => {
				commit('SET_INVENTORIES_STATUS', 'failure');
				commit('SET_INVENTORIES_ERROR', error.message);

				const notification = {
					type: 'error',
					field: 'database',
					message: `'There was a problem fetching inventories: '${error.message}`
				};
				dispatch('notification/add', notification, { root: true });
			});
	}
};

export const getters = {
	inventories: state => {
		return state.inventories;
	},
	inventoriesStatus: state => {
		return state.inventoriesStatus;
	},
	inventoriesError: state => {
		return state.inventoriesError;
	}
};
