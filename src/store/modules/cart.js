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
	/////////////////////////////////////////////////////////////////////////////////////////////////////////ADD TO CART
	addToCart({ commit }, payload) {
		return firebase.auth().onAuthStateChanged(user => {
			if (user) {
				commit('SET_CART_STATUS', 'loading');
				return user
					.getIdToken(/* forceRefresh */ true)
					.then(idToken => HandbagsService.addToCartService(idToken, user.uid, payload))
					.then(response => {
						console.log('response: ', response);
						commit('SET_CART_STATUS', 'success');
					});
			} else {
				// No user is signed in.
				alert('there is no user');
			}
		});
	}
};
