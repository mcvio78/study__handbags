import HandbagsService from '../../services/HandbagsService';

export const namespaced = true;

export const state = {
	handbags: {
		//collections: {},
		// patrizia: {},
		// olivia: {},
		// melania: {},
		// anna: {}
	}
};

export const mutations = {
	SET_HANDBAGS(state, payload) {
		//state.handbags[payload.subField] = payload.responseData;
		state.handbags = { ...state.handbags, [payload.subField]: payload.responseData };
	}
};

export const actions = {
	fetchHandbags({ rootState, commit, getters, dispatch }, subField) {
		if (!getters.checkIfCollectionExists(subField)) {
			return HandbagsService.getHandbagService(subField)
				.then(response => {
					//Todo remove user authentication here
					if (rootState.user.user.name === 'Mauro') {
						const payload = {
							subField: subField,
							responseData: response.data
						};
						commit('SET_HANDBAGS', payload);
					}
				})
				.catch(error => {
					const notification = {
						type: 'error',
						message: `There was a problem fetching collections: ${error.message}`
					};
					dispatch('notification/add', notification, { root: true });
				});
		}
	}
	//Todo when you POST/PATCH/DELETE it needs: SUCCESS and ERROR+THROW
};

export const getters = {
	checkIfCollectionExists: state => subField => {
		return state.handbags[subField];
	}
};
