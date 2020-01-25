import firebase from 'firebase/app';
import HandbagsService from './../../services/HandbagsService';

export const namespaced = true;

export const state = {
	user: null, //Todo is user.uid necessary and secure?
	status: null,
	error: null,
	username: null
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
	},
	SET_USERNAME(state, payload) {
		state.username = payload;
	}
};

export const actions = {
	//////////////////////////////////////////////////////////////////////////////////////////////////////////SUBSCRIPTION
	signUpAction({ commit, dispatch }, payload) {
		commit('SET_STATUS', 'loading');

		function PersistenceLocal() {
			return firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password);
		}

		function PersistenceSession() {
			return firebase
				.auth()
				.setPersistence(firebase.auth.Auth.Persistence.SESSION)
				.then(() => firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password));
		}

		function firebasePersistence() {
			if (payload.staySigned) {
				return PersistenceLocal();
			} else {
				return PersistenceSession();
			}
		}

		firebasePersistence()
			.then(response => response.user.updateProfile({ displayName: payload.name }))
			.then(() => firebase.auth().currentUser.getIdToken(/* forceRefresh */ true))
			.then(idToken =>
				HandbagsService.putUserProfileService(idToken, firebase.auth().currentUser.uid, {
					name: payload.name,
					email: payload.email
				})
			)
			.then(() => {
				commit('SET_USER', firebase.auth().currentUser.uid);
				commit('SET_STATUS', 'success');
				commit('SET_ERROR', null);
				commit('SET_USERNAME', firebase.auth().currentUser.displayName);
			})
			.then(() => {
				const notification = {
					type: 'success',
					field: 'user',
					name: firebase.auth().currentUser.displayName,
					message: 'Your registration has been successful!'
				};
				dispatch('notification/add', notification, { root: true });
			})
			.catch(error => {
				commit('SET_STATUS', 'failure');
				commit('SET_ERROR', error.message);

				const notification = {
					type: 'error',
					field: 'user',
					message: `There was a problem with your subscription: ${error.message}`
				};
				dispatch('notification/add', notification, { root: true });
				throw error;
			});
	},

	////////////////////////////////////////////////////////////////////////////////////////////////////////AUTHENTICATION
	signInAction({ commit, dispatch }, payload) {
		commit('SET_STATUS', 'loading');

		function PersistenceLocal() {
			return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
		}

		function PersistenceSession() {
			return firebase
				.auth()
				.setPersistence(firebase.auth.Auth.Persistence.SESSION)
				.then(() => firebase.auth().signInWithEmailAndPassword(payload.email, payload.password));
		}

		function firebasePersistence() {
			if (payload.staySigned) {
				return PersistenceLocal();
			} else {
				return PersistenceSession();
			}
		}

		firebasePersistence()
			.then(() => {
				commit('SET_USER', firebase.auth().currentUser.uid);
				commit('SET_STATUS', 'success');
				commit('SET_ERROR', null);
				commit('SET_USERNAME', firebase.auth().currentUser.displayName);
			})
			.then(() => {
				const notification = {
					type: 'success',
					field: 'user',
					name: firebase.auth().currentUser.displayName,
					message: 'Authentication has been successful!'
				};
				dispatch('notification/add', notification, { root: true });
				dispatch('cart/getCart', firebase.auth().currentUser, { root: true });
			})
			.catch(error => {
				commit('SET_STATUS', 'failure');
				commit('SET_ERROR', error.message);

				const notification = {
					type: 'error',
					field: 'user',
					message: `'There was a problem with your Authentication: '${error.message}`
				};
				dispatch('notification/add', notification, { root: true });
			});
	},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////SIGN OUT
	signOutAction({ commit, dispatch }) {
		commit('SET_STATUS', 'loading');
		firebase
			.auth()
			.signOut()
			.then(() => {
				commit('SET_USER', null);
				commit('SET_STATUS', 'success');
				commit('SET_ERROR', null);
				commit('SET_USERNAME', null);

				dispatch('cart/signOutCart', null, { root: true });
			})
			.then(() => {
				const notification = {
					type: 'success',
					field: 'user',
					message: 'You have successfully logged out!'
				};
				dispatch('notification/add', notification, { root: true });
			})
			.catch(error => {
				commit('SET_STATUS', 'failure');
				commit('SET_ERROR', error.message);
				const notification = {
					type: 'error',
					field: 'user',
					message: `There was a problem with log out: ${error.message}`
				};
				dispatch('notification/add', notification, { root: true });
			});
	},

	/////////////////////////////////////////////////////////////////////////////////////////////////////KEEP ME LOGGED IN
	keepUserLogged({ commit, dispatch }, firebaseUser) {
		commit('SET_USER', firebaseUser.uid);
		commit('SET_STATUS', 'success');
		commit('SET_ERROR', null);
		commit('SET_USERNAME', firebaseUser.displayName);

		dispatch('cart/getCart', firebaseUser, { root: true });
	}
};

export const getters = {
	status: state => {
		return state.status;
	},
	user: state => {
		return state.user;
	},
	error: state => {
		return state.error;
	},
	username: state => {
		return state.username;
	}
};
