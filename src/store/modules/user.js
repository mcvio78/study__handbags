import firebase from 'firebase/app';

export const namespaced = true;

export const state = {
	user: null
};

export const mutations = {
	SETUSER(state, payload) {
		state.user = payload;
	},
	REMOVEUSER(state) {
		state.user = null;
	},
	SETSTATUS(state, payload) {
		state.status = payload;
	},
	SETERROR(state, payload) {
		state.error = payload;
	}
};

export const actions = {
	signUpAction({ commit, dispatch }, payload) {
		commit('SETSTATUS', 'loading');
		firebase
			.auth()
			.createUserWithEmailAndPassword(payload.email, payload.password)
			.then(response => {
				commit('SETUSER', response.user.uid);
				commit('SETSTATUS', 'success');
				commit('SETERROR', 'null');
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
				commit('SETSTATUS', 'failure');
				commit('SETERROR', error.message);
				return error;
			})
			.then(error => {
				const notification = {
					type: 'error',
					message: `There was a problem with your subscription: ${error.message}`
				};
				dispatch('notification/add', notification, { root: true });
			});
	},
	signInAction({ commit }, payload) {
		firebase
			.auth()
			.signInWithEmailAndPassword(payload.email, payload.password)
			.then(response => {
				commit('SETUSER', response.user.uid);
				commit('SETSTATUS', 'success');
				commit('SETERROR', 'null');
			})
			.catch(error => {
				commit('SETSTATUS', 'failure');
				commit('SETERROR', error.message);
			});
	},
	signOutAction() {}
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
