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
	signUpAction({ commit }, payload) {
		commit('SETSTATUS', 'loading');
		firebase
			.auth()
			.createUserWithEmailAndPassword(payload.email, payload.password)
			.then(response => {
				alert('success');
				commit('SETUSER', response.user.uid);
				commit('SETSTATUS', 'success');
				commit('SETERROR', 'null');
			})
			.catch(error => {
				commit('SETSTATUS', 'failure');
				commit('SETERROR', error.message);
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
