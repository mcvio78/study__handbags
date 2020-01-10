import firebase from 'firebase/app';
import HandbagsService from './../../services/HandbagsService';

export const namespaced = true;

export const state = {
	cart: null,
	cartStatus: null,
	cartError: null
};

export const mutations = {
	SET_CART(state, payload) {
		state.cart = payload;
	},
	REMOVE_ITEM(state) {
		// Todo remove specific item.
		state.cart = null;
	},
	SET_CART_STATUS(state, payload) {
		state.cartStatus = payload;
	},
	SET_CART_ERROR(state, payload) {
		state.cartError = payload;
	}
};

export const actions = {
	///////////////////////////////////////////////////////////////////////////////////////////////////////////ADD TO CART
	//Todo When you add *n time then you have *n time 'there is no firebase user'.
	addToCart({ commit, rootState, dispatch }, payload) {
		if (rootState.user.user) {
			return new Promise(resolve => {
				//Todo Maybe here you are loggin *n time.
				firebase.auth().onAuthStateChanged(user => {
					if (user) {
						commit('SET_CART_STATUS', 'loading');
						user
							.getIdToken(/* forceRefresh */ true)
							.then(idToken => HandbagsService.addToCartService(idToken, user.uid, payload))
							.then(response => {
								console.log('response: ', response);
								commit('SET_CART', response.data);
								commit('SET_CART_STATUS', 'success');
								commit('SET_CART_ERROR', null);
								resolve(response.status);
							})
							.then(() => {
								const notification = {
									type: 'success',
									field: 'cart',
									name: firebase.auth().currentUser.displayName,
									message: 'The item has been added to your cart.'
								};
								dispatch('notification/add', notification, { root: true });
							})
							.catch(error => {
								commit('SET_CART_STATUS', 'failure');
								commit('SET_CART_ERROR', error.message);

								const notification = {
									type: 'error',
									field: 'cart',
									message: `'There was a problem add item to cart: '${error.message}`
								};
								dispatch('notification/add', notification, { root: true });
							});
					} else {
						// No user is signed in.
						alert('there is no firebase user.'); //Todo complete behaviour.
					}
				});
			});
		} else {
			alert('there is no local user data.');
		}
	}
};

export const getters = {
	cart: state => {
		return state.cart;
	},
	cartStatus: state => {
		return state.cartStatus;
	},
	cartError: state => {
		return state.cartError;
	}
};
