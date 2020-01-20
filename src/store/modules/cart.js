import firebase from 'firebase/app';
import HandbagsService from './../../services/HandbagsService';
//import Vue from 'vue';

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
	ADD_TO_CART(state, payload) {
		state.cart = { ...state.cart, [Object.keys(payload)[0]]: Object.values(payload)[0] };
	},
	UPDATE_CART_FIELD(state, payload) {
		state.cart[payload.itemNumber]['quantity'] = payload.value.quantity;
	},
	REMOVE_FROM_CART(state, payload) {
		// Todo decide if use Vue.delete intead.
		if (payload.status === 200) {
			const cart = { ...state.cart };
			delete cart[payload.itemId];
			state.cart = cart;
		}
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
	addToCart({ commit, rootState, dispatch }, payload) {
		if (rootState.user.user) {
			return new Promise(resolve => {
				if (firebase.auth().currentUser) {
					commit('SET_CART_STATUS', 'loading');
					firebase
						.auth()
						.currentUser.getIdToken(/* forceRefresh */ true)
						.then(idToken => HandbagsService.addToCartService(idToken, firebase.auth().currentUser.uid, payload))
						.then(response => {
							commit('ADD_TO_CART', response.data);
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
					//Todo complete behaviour #1.
					alert('there is no firebase user.');
				}
			});
		} else {
			//Todo complete behaviour #2.
			alert('there is no local user data.');
		}
	},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////GET CART
	getCart({ commit, dispatch }, currentUserSignIn) {
		currentUserSignIn
			.getIdToken(/* forceRefresh */ true)
			.then(idToken => HandbagsService.getCartService(idToken, currentUserSignIn.uid))
			.then(response => {
				commit('SET_CART', response.data);
				commit('SET_CART_STATUS', 'success');
				commit('SET_CART_ERROR', null);
			})
			.catch(error => {
				commit('SET_CART_STATUS', 'failure');
				commit('SET_CART_ERROR', error.message);

				const notification = {
					type: 'error',
					field: 'cart',
					message: `'There was a problem fetching cart: '${error.message}`
				};
				dispatch('notification/add', notification, { root: true });
			});
	},

	///////////////////////////////////////////////////////////////////////////////////////////////////////////UPDATE CART
	updateCartField({ commit, rootState, dispatch }, payload) {
		if (rootState.user.user) {
			return new Promise(resolve => {
				if (firebase.auth().currentUser) {
					commit('SET_CART_STATUS', 'loading');
					firebase
						.auth()
						.currentUser.getIdToken(/* forceRefresh */ true)
						.then(idToken =>
							HandbagsService.updateFieldItemCartService(
								idToken,
								firebase.auth().currentUser.uid,
								payload.itemNumber,
								payload.value
							)
						)
						.then(response => {
							commit('UPDATE_CART_FIELD', payload);
							commit('SET_CART_STATUS', 'success');
							commit('SET_CART_ERROR', null);
							resolve(response.status);
						})
						.then(() => {
							const notification = {
								type: 'success',
								field: 'cart',
								name: firebase.auth().currentUser.displayName,
								message: 'The cart item quantity has been updated.'
							};
							dispatch('notification/add', notification, { root: true });
						})
						.catch(error => {
							commit('SET_CART_STATUS', 'failure');
							commit('SET_CART_ERROR', error.message);

							const notification = {
								type: 'error',
								field: 'cart',
								message: `'There was a problem update your cart: '${error.message}`
							};
							dispatch('notification/add', notification, { root: true });
						});
				} else {
					//Todo complete behaviour #1.
					alert('there is no firebase user.');
				}
			});
		} else {
			//Todo complete behaviour #2.
			alert('there is no local user data.');
		}
	},

	//////////////////////////////////////////////////////////////////////////////////////////////////////REMOVE FROM CART
	removeFromCart({ commit, rootState, dispatch }, payload) {
		if (rootState.user.user) {
			return new Promise(resolve => {
				if (firebase.auth().currentUser) {
					commit('SET_CART_STATUS', 'loading');
					firebase
						.auth()
						.currentUser.getIdToken(/* forceRefresh */ true)
						.then(idToken => HandbagsService.removeItemCartService(idToken, firebase.auth().currentUser.uid, payload))
						.then(response => {
							commit('REMOVE_FROM_CART', { status: response.status, itemId: payload });
							commit('SET_CART_STATUS', 'success');
							commit('SET_CART_ERROR', null);
							resolve(response.status);
						})
						.then(() => {
							const notification = {
								type: 'success',
								field: 'cart',
								name: firebase.auth().currentUser.displayName,
								message: 'The item has been removed from your cart.'
							};
							dispatch('notification/add', notification, { root: true });
						})
						.catch(error => {
							commit('SET_CART_STATUS', 'failure');
							commit('SET_CART_ERROR', error.message);

							const notification = {
								type: 'error',
								field: 'cart',
								message: `'There was a problem remove item from cart: '${error.message}`
							};
							dispatch('notification/add', notification, { root: true });
						});
				} else {
					//Todo complete behaviour #1.
					alert('there is no firebase user.');
				}
			});
		} else {
			//Todo complete behaviour #2.
			alert('there is no local user data.');
		}
	},

	////////////////////////////////////////////////////////////////////////////////////////////////////////////CLEAR CART
	clearCart({ commit }) {
		commit('SET_CART', null);
		commit('SET_CART_STATUS', 'success');
		commit('SET_CART_ERROR', null);
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
	},
	idItemToCart: getters => {
		if (getters.cart) {
			let itemNumberInCart = Object.keys(getters.cart).map(item => Number(item.split('_')[1]));

			for (let i = 0; i <= itemNumberInCart.length; i++) {
				if (itemNumberInCart.indexOf(i) === -1) {
					return `item_${i}`;
				}
			}
		} else {
			return 'item_0';
		}
	},
	findObjectItemIfInCart: state => idSearch => {
		if (state.cart) {
			return Object.entries(state.cart).find(([key, value]) => value.idBag === idSearch);
		}
	},
	cartItemNumber: getters => {
		if (getters.cart) {
			return Object.values(getters.cart).reduce((acc, item) => {
				return acc + item.quantity;
			}, 0);
		}
	}
};
