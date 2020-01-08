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
	eventStatus: null,
	eventError: null
};

export const mutations = {
	SET_HANDBAGS(state, payload) {
		//state.handbags[payload.subField] = payload.responseData;
		state.handbags = { ...state.handbags, [payload.subField]: payload.responseData };
		//state.handbags[payload.subField] = { ...payload.responseData };
		//Vue.set(state.handbags, payload.subField, payload.responseData);
	},
	SET_EVENT_STATUS(state, payload) {
		state.eventStatus = payload;
	},
	SET_EVENT_ERROR(state, payload) {
		state.eventError = payload;
	}
};

export const actions = {
	fetchHandbags({ commit, getters, dispatch }, subField) {
		if (!getters.checkIfCollectionExists(subField)) {
			commit('SET_EVENT_STATUS', 'loading');
			return HandbagsService.getHandbagService(subField)
				.then(response => {
					const payload = {
						subField: subField,
						responseData: response.data
					};
					commit('SET_HANDBAGS', payload);
					commit('SET_EVENT_STATUS', 'success');
					commit('SET_EVENT_ERROR', null);
				})
				.catch(error => {
					commit('SET_EVENT_STATUS', 'failure');
					commit('SET_EVENT_ERROR', error.message);
					const notification = {
						type: 'error',
						message: `There was a problem fetching collections: ${error.message}`
					};
					dispatch('notification/add', notification, { root: true });
				});
		}
	},
	setEventStatus({ commit }, payload) {
		commit('SET_EVENT_STATUS', payload);
	}
};

export const getters = {
	checkIfCollectionExists: state => subField => {
		return state.handbags[subField];
	},
	eventStatus: state => {
		return state.eventStatus;
	},
	eventError: state => {
		return state.eventError;
	}
};
