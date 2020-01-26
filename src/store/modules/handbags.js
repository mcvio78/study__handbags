import HandbagsService from '../../services/HandbagsService';

export const namespaced = true;
export const state = {
	handbags: {
		// collections: {},
		// patrizia: {},
		// olivia: {},
		// melania: {},
		// anna: {}
	},
	handbagsStatus: null,
	handbagsError: null
};

export const mutations = {
	SET_HANDBAGS(state, payload) {
		//state.handbags[payload.subField] = payload.responseData;
		state.handbags = { ...state.handbags, [payload.subField]: payload.responseData };
		//state.handbags[payload.subField] = { ...payload.responseData };
		//Vue.set(state.handbags, payload.subField, payload.responseData);
	},
	SET_HANDBAGS_STATUS(state, payload) {
		state.handbagsStatus = payload;
	},
	SET_HANDBAGS_ERROR(state, payload) {
		state.handbagsError = payload;
	}
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////FETCH HANDBAGS
export const actions = {
	fetchHandbags({ commit, getters, dispatch }, subField) {
		if (!getters.checkIfCollectionExists(subField)) {
			commit('SET_HANDBAGS_STATUS', 'loading');
			return HandbagsService.getHandbagService(subField)
				.then(response => {
					const payload = {
						subField: subField,
						responseData: response.data
					};
					commit('SET_HANDBAGS', payload);
					commit('SET_HANDBAGS_STATUS', 'success');
					commit('SET_HANDBAGS_ERROR', null);
				})
				.catch(error => {
					commit('SET_HANDBAGS_STATUS', 'failure');
					commit('SET_HANDBAGS_ERROR', error.message);
					const notification = {
						type: 'error',
						field: 'handbags',
						message: `There was a problem fetching collections: ${error.message}`
					};
					dispatch('notification/add', notification, { root: true });
				});
		}
	}

	// handbagsStatus({ commit }, payload) {
	// 	commit('SET_HANDBAGS_STATUS', payload);
	// }
};

export const getters = {
	checkIfCollectionExists: state => subField => {
		return state.handbags[subField];
	},
	handbagsStatus: state => {
		return state.handbagsStatus;
	},
	handbagsError: state => {
		return state.handbagsError;
	}
};
