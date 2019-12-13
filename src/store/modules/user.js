import firebase from 'firebase/app';

export const namespaced = true;

export const state = {
	user: null
};

export const mutations = {
	SET_USER(state, payload) {
		state.user = payload;
	},
	REMOVE_USER(state) {
		state.user = null;
	},
	SET_STATUS(state, payload) {
		state.status = payload;
	},
	SET_ERROR(state, payload) {
		state.error = payload;
	}
};

export const actions = {
	signUpAction({ commit, dispatch }, payload) {
		commit('SET_STATUS', 'loading');
		firebase
			.auth()
			.createUserWithEmailAndPassword(payload.email, payload.password)
			.then(response => {
				commit('SET_USER', response.user.uid);
				commit('SET_STATUS', 'success');
				commit('SET_ERROR', 'null');
				response.user
					.updateProfile({
						displayName: payload.name
					})
					.then(() => {
						const notification = {
							type: 'success',
							name: payload.name,
							message: 'Your registratin has been successful!'
						};
						dispatch('notification/add', notification, { root: true });
					});
			})
			.catch(error => {
				commit('SET_STATUS', 'failure');
				commit('SET_ERROR', error.message);
				const notification = {
					type: 'error',
					message: `There was a problem with your subscription: ${error.message}`
				};
				dispatch('notification/add', notification, { root: true });
			});
	},
	signInAction({ commit, dispatch }, payload) {
		firebase
			.auth()
			.signInWithEmailAndPassword(payload.email, payload.password)
			.then(response => {
				commit('SET_USER', response.user.uid);
				commit('SET_STATUS', 'success');
				commit('SET_ERROR', 'null');
				return response.user.displayName;
			})
			.then(displayName => {
				const notification = {
					type: 'success',
					name: displayName,
					message: 'Authentication has been successful!'
				};
				dispatch('notification/add', notification, { root: true });
			})
			.catch(error => {
				commit('SET_STATUS', 'failure');
				commit('SET_ERROR', error.message);
				const notification = {
					type: 'error',
					message: `There was a problem with authentication: ${error.message}`
				};
				dispatch('notification/add', notification, { root: true });
			});
	},
	signOutAction({ commit, dispatch }) {
		firebase
			.auth()
			.signOut()
			.then(() => {
				commit('SET_USER', null);
				commit('SET_STATUS', 'success');
				commit('SET_ERROR', null);
			})
			.then(() => {
				const notification = {
					type: 'success',
					message: 'You have successfully logged out!'
				};
				dispatch('notification/add', notification, { root: true });
			})
			.catch(error => {
				commit('SET_STATUS', 'failure');
				commit('SET_ERROR', error.message);
				const notification = {
					type: 'error',
					message: `There was a problem with log out: ${error.message}`
				};
				dispatch('notification/add', notification, { root: true });
			});
	}
};

export const getters = {
	status(state) {
		return state.status;
	},
	user(state) {
		return state.user;
	},
	error(state) {
		return state.error;
	}
};
