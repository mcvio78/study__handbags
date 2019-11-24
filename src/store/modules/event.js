import HandbagsService from '../../services/HandbagsService';

export const state = {
	handbags: {
		collections: {},
		patrizia: {},
		olivia: {},
		melania: {},
		anna: {}
	}
};

export const mutations = {
	SET_HANDBAGS(state, payload) {
		state.handbags[payload.subField] = payload.responseData;
	}
};

export const actions = {
	fetchHandbags({ rootState, commit }, subField) {
		HandbagsService.getHandbagService(subField)
			.then(response => {
				if (rootState.user.user.name === 'Mauro') {
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
};
