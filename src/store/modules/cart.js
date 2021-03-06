import firebase from 'firebase/app';
import handbagsService from './../../services/HandbagsService';

export const namespaced = true;

export const state = {
	cart: null,
	cartStatus: null,
	cartError: null,
	cartHistory: null
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
		if (payload.status === 200 && payload.data === null) {
			const cart = { ...state.cart };
			delete cart[payload.itemId];
			state.cart = cart;
		}
		if (Object.keys(state.cart).length === 0) {
			state.cart = null;
		}
	},

	SET_CART_STATUS(state, payload) {
		state.cartStatus = payload;
	},

	SET_CART_ERROR(state, payload) {
		state.cartError = payload;
	},

	INCREMENT_QUANTITY_HANDBAG(state, payload) {
		state.cart[payload]['quantity']++;
	},

	DECREMENT_QUANTITY_HANDBAG(state, payload) {
		state.cart[payload]['quantity']--;
	}
};

export const actions = {
	/**
	 **********************************************************************************************************ADD TO CART
	 */
	addToCart({ commit, rootState, dispatch }, payload) {
		if (firebase.auth().currentUser && rootState.user.user) {
			commit('SET_CART_STATUS', 'loading');

			return firebase
				.auth()
				.currentUser.getIdToken(/* forceRefresh */ true)

				.then(idToken => handbagsService.addToCartService(idToken, firebase.auth().currentUser.uid, payload))

				.then(response => {
					commit('ADD_TO_CART', response.data);
					commit('SET_CART_STATUS', 'success');
					commit('SET_CART_ERROR', null);
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
			const notification = {
				type: 'error',
				field: 'user',
				message: `'There is no User.`
			};
			dispatch('notification/add', notification, { root: true });
		}
	},

	/**
	 *************************************************************************************************************GET CART
	 */
	getCart({ commit, dispatch }, currentUserSignIn) {
		commit('SET_CART_STATUS', 'loading');

		currentUserSignIn
			.getIdToken(/* forceRefresh */ true)

			.then(idToken => handbagsService.getSelectedFieldService(idToken, currentUserSignIn.uid, 'cart'))

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

	/**
	 **********************************************************************************************************UPDATE CART
	 */
	updateCartField({ commit, rootState, dispatch }, payload) {
		if (firebase.auth().currentUser && rootState.user.user) {
			commit('SET_CART_STATUS', 'loading');

			return firebase
				.auth()
				.currentUser.getIdToken(/* forceRefresh */ true)

				.then(idToken =>
					handbagsService.updateFieldItemCartService(
						idToken,
						firebase.auth().currentUser.uid,
						payload.itemNumber,
						payload.value
					)
				)

				.then(() => {
					commit('UPDATE_CART_FIELD', payload);
					commit('SET_CART_STATUS', 'success');
					commit('SET_CART_ERROR', null);
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
			const notification = {
				type: 'error',
				field: 'user',
				message: `'There is no User.`
			};
			dispatch('notification/add', notification, { root: true });
		}
	},

	/**
	 *******************************************************************************************INCREMENT QUANTITY HANDBAG
	 */
	incrementQuantityHandbag({ commit }, payload) {
		commit('INCREMENT_QUANTITY_HANDBAG', payload);
	},

	/**
	 *******************************************************************************************INCREMENT QUANTITY HANDBAG
	 */
	decrementQuantityHandbag({ commit }, payload) {
		commit('DECREMENT_QUANTITY_HANDBAG', payload);
	},

	/**
	 *****************************************************************************************************REMOVE FROM CART
	 */
	removeFromCart({ commit, rootState, dispatch }, payload) {
		if (firebase.auth().currentUser && rootState.user.user) {
			commit('SET_CART_STATUS', 'loading');

			firebase
				.auth()
				.currentUser.getIdToken(/* forceRefresh */ true)

				.then(idToken => handbagsService.removeItemCartService(idToken, firebase.auth().currentUser.uid, payload))

				.then(response => {
					commit('REMOVE_FROM_CART', { status: response.status, data: response.data, itemId: payload });
					commit('SET_CART_STATUS', 'success');
					commit('SET_CART_ERROR', null);
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
						message: `'There was a problem removing item: '${error.message}`
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
	},

	/**
	 ********************************************************************************************************SIGN OUT CART
	 */
	signOutCart({ commit }) {
		commit('SET_CART', null);
		commit('SET_CART_STATUS', 'success');
		commit('SET_CART_ERROR', null);
	},

	/**
	 ***********************************************************************************************************CLEAN CART
	 */
	cleanCart({ commit, rootState, dispatch }, payload) {
		if (firebase.auth().currentUser && rootState.user.user) {
			commit('SET_CART_STATUS', 'loading');

			firebase
				.auth()
				.currentUser.getIdToken(/* forceRefresh */ true)

				.then(idToken => handbagsService.deleteFieldService(idToken, firebase.auth().currentUser.uid, payload))

				.then(() => {
					commit('SET_CART', null);
					commit('SET_CART_STATUS', 'success');
					commit('SET_CART_ERROR', null);
				})

				.catch(error => {
					commit('SET_CART_STATUS', 'failure');
					commit('SET_CART_ERROR', error.message);

					const notification = {
						type: 'error',
						field: 'cart',
						message: `'There was a problem delete your cart in database: '${error.message}`
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
	},

	/**
	 **********************************************************************************************************GET HISTORY
	 */
	getHistory({ commit, dispatch }) {
		return firebase
			.auth()
			.currentUser.getIdToken(/* forceRefresh */ true)

			.then(idToken => handbagsService.getSelectedFieldService(idToken, firebase.auth().currentUser.uid, 'history'))

			.catch(error => {
				commit('SET_CART_STATUS', 'failure');
				commit('SET_CART_ERROR', error.message);

				const notification = {
					type: 'error',
					field: 'cart',
					message: `'There was a problem with cart history: '${error.message}`
				};
				dispatch('notification/add', notification, { root: true });
			});
	},

	/**
	 *******************************************************************************************************UPDATE HISTORY
	 */
	putToCartHistory({ commit, dispatch }, payload) {
		commit('SET_CART_STATUS', 'loading');

		firebase
			.auth()
			.currentUser.getIdToken(/* forceRefresh */ true)

			.then(idToken => handbagsService.addToHistoryService(idToken, firebase.auth().currentUser.uid, payload))

			.catch(error => {
				commit('SET_CART_STATUS', 'failure');
				commit('SET_CART_ERROR', error.message);

				const notification = {
					type: 'error',
					field: 'cart',
					message: `'There was a problem create cart history database: '${error.message}`
				};
				dispatch('notification/add', notification, { root: true });
			});
	}
};

export const getters = {
	/**
	 *********************************************************************************GET PROPERTY/OBJECT IN CART BY IDBAG
	 */
	findCartPropertyById: state => idSearch => {
		if (state.cart) {
			// eslint-disable-next-line
			return Object.entries(state.cart).find(([key, value]) => value.idBag === idSearch);
		}
	}
};
