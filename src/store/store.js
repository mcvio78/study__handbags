import Vue from 'vue';
import Vuex from 'vuex';
import * as user from './modules/user';
import * as handbags from './modules/handbags';
import * as notification from './modules/notification';
import * as cart from './modules/cart';
import * as inventories from './modules/inventories';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		user,
		handbags,
		notification,
		cart,
		inventories
	}
});
