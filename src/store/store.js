import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import HandbagsService from './../services/HandbagsService';

export default new Vuex.Store({
	state: {
		handbags: {}
	},
	mutations: {
		SET_EVENTS(state, names) {
			state.handbags = names;
		}
	},
	actions: {
		fetchEvents({ commit }) {
			HandbagsService.getHandbagsService()
				.then(response => {
					commit('SET_EVENTS', response.data);
				})
				.catch(error => {
					console.log('There was a problem fetching events: ', error.message);
				});
		}
	}
});
