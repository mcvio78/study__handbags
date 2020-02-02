import firebase from 'firebase/app';
import handbagsService from './../../services/HandbagsService';

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
	},

	UPDATE_INVENTORIES_FIELD(state, payload) {
		Object.keys(payload).forEach(key => (state.inventories[key] = payload[key]));
	}
};

export const actions = {
	/**
	 ************************************************************************************************GET QUANTITY DATABASE
	 */
	getInventories({ commit, dispatch }, subField) {
		return handbagsService
			.getHandbagService(subField)

			.then(response => {
				commit('SET_INVENTORIES', response.data);
				commit('SET_INVENTORIES_STATUS', 'success');
				commit('SET_INVENTORIES_ERROR', null);
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
	},

	/**
	 ***************************************************************************************************UPDATE INVENTORIES
	 */
	updateInventories({ commit, rootState, dispatch }, payload) {
		if (firebase.auth().currentUser && rootState.user.user) {
			commit('SET_INVENTORIES_STATUS', 'loading');

			firebase
				.auth()
				.currentUser.getIdToken(/* forceRefresh */ true)
				.then(idToken => handbagsService.updateInventoriesService(idToken, firebase.auth().currentUser.uid, payload))

				.then(() => {
					commit('UPDATE_INVENTORIES_FIELD', payload);
					commit('SET_INVENTORIES_STATUS', 'success');
					commit('SET_INVENTORIES_ERROR', null);

					dispatch('cart/cleanCart', 'cart', { root: true });
				})

				.then(() => {
					const notification = {
						type: 'success',
						field: 'database',
						name: firebase.auth().currentUser.displayName,
						message: 'Your order has been sent.'
					};
					dispatch('notification/add', notification, { root: true });
				})

				.catch(error => {
					commit('SET_INVENTORIES_STATUS', 'failure');
					commit('SET_INVENTORIES_ERROR', error.message);

					const notification = {
						type: 'error',
						field: 'database',
						message: `'There was a problem sent your order: '${error.message}`
					};
					dispatch('notification/add', notification, { root: true });
				});
		} else {
			const notification = {
				type: 'error',
				field: 'user',
				message: `'There is no User.`
			};
			dispatch('notification/add', notification, { root: true });
		}
	}
};
