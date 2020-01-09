import Vue from 'vue';
import Vuex from 'vuex';
import * as user from './modules/user';
import * as event from './modules/event';
import * as notification from './modules/notification';
import * as cart from './modules/cart';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		user,
		event,
		notification,
		cart
	}
});
