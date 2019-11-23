import Vue from 'vue';
import Vuex from 'vuex';
import * as user from './modules/user';

Vue.use(Vuex);

import HandbagsService from './../services/HandbagsService';

export default new Vuex.Store({
	modules: {
		user
	},
	state: {
		handbags: {}
	},
	mutations: {
		SET_EVENTS(state, names) {
			state.handbags = names;
		}
	},
	actions: {
		fetchEvents({ state, commit }) {
			HandbagsService.getHandbagsService()
				.then(response => {
					if (state.user.user.name === 'Mauro') {
						commit('SET_EVENTS', response.data);
					}
				})
				.catch(error => {
					console.log('There was a problem fetching events: ', error.message);
				});
		}
	}
});
