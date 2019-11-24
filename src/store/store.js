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
		handbags: {
			collections: {},
			patrizia: {},
			olivia: {},
			melania: {},
			anna: {}
		}
	},
	mutations: {
		SET_HANDBAGS(state, payload) {
			state.handbags[payload.subField] = payload.responseData;
		}
	},
	actions: {
		fetchHandbags({ state, commit }, subField) {
			HandbagsService.getHandbagService(subField)
				.then(response => {
					if (state.user.user.name === 'Mauro') {
						const payload = {
							subField: subField,
							responseData: response.data
						};
						commit('SET_HANDBAGS', payload);
					}
				})
				.catch(error => {
					console.log('There was a problem fetching events: ', error.message);
				});
		}
	}
});
