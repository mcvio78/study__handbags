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

////////////////////////////////////////////////////////////////////////////////////////////////FIREBASE USER CREDENTIAL
function firebaseId() {
	return firebase.auth().currentUser.uid;
}

function firebaseName() {
	return firebase.auth().currentUser.displayName;
}

function firebaseToken() {
	return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
}

////////////////////////////////////////////////////////////////////////////////////////////////////FIREBASE PERSISTENCE
function firebaseCreate(payload) {
	return firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password);
}

function firebaseAuthentication(payload) {
	return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
}

function PersistenceLocal(payload, signTypeAccount) {
	if (signTypeAccount === 'signUp') {
		return firebaseCreate(payload);
	} else if (signTypeAccount === 'signIn') {
		return firebaseAuthentication(payload);
	}
}

function PersistenceSession(payload, signTypeAccount) {
	if (signTypeAccount === 'signUp') {
		return firebase
			.auth()
			.setPersistence(firebase.auth.Auth.Persistence.SESSION)
			.then(() => firebaseCreate(payload));
	} else if (signTypeAccount === 'signIn') {
		return firebase
			.auth()
			.setPersistence(firebase.auth.Auth.Persistence.SESSION)
			.then(() => firebaseAuthentication(payload));
	}
}

function firebasePersistence(payload, signTypeAccount) {
	if (payload.staySigned) {
		return PersistenceLocal(payload, signTypeAccount);
	} else {
		return PersistenceSession(payload, signTypeAccount);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////MUTATE STATE SUCCESS
function mutateStateSuccess(commit, userValue, statusValue, errorValue, usernameValue) {
	commit('SET_USER', userValue);
	commit('SET_STATUS', statusValue);
	commit('SET_ERROR', errorValue);
	commit('SET_USERNAME', usernameValue);
}

////////////////////////////////////////////////////////////////////////////////////////////////////MUTATE STATE FAILURE
function mutateStateFailure(commit, statusValue, err) {
	commit('SET_STATUS', statusValue);
	commit('SET_ERROR', err.message);
}

export const actions = {
	//////////////////////////////////////////////////////////////////////////////////////////////////////////SUBSCRIPTION
	signUpAction({ commit, dispatch }, payload) {
		commit('SET_STATUS', 'loading');

		firebasePersistence(payload, 'signUp')
			.then(response => response.user.updateProfile({ displayName: payload.name }))
			.then(() => firebaseToken())
			.then(idToken =>
				HandbagsService.putUserProfileService(idToken, firebaseId(), {
					name: payload.name,
					email: payload.email
				})
			)

			.then(() => {
				mutateStateSuccess(commit, firebaseId(), 'success', null, firebaseName());

				const notification = {
					type: 'success',
					field: 'user',
					name: firebaseName(),
					message: 'Your registration has been successful!'
				};
				dispatch('notification/add', notification, { root: true });
			})

			.catch(error => {
				mutateStateFailure(commit, 'failure', error);

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

		firebasePersistence(payload, 'signIn')
			.then(() => {
				mutateStateSuccess(commit, firebaseId(), 'success', null, firebaseName());
			})

			.then(() => {
				dispatch('cart/getCart', firebase.auth().currentUser, { root: true });

				const notification = {
					type: 'success',
					field: 'user',
					name: firebaseName(),
					message: 'Authentication has been successful!'
				};
				dispatch('notification/add', notification, { root: true });
			})

			.catch(error => {
				mutateStateFailure(commit, 'failure', error);

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
				mutateStateSuccess(commit, null, 'success', null, null);

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
				mutateStateFailure(commit, 'failure', error);

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
		commit('SET_STATUS', 'loading');

		mutateStateSuccess(commit, firebaseUser.uid, 'success', null, firebaseUser.displayName);

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
