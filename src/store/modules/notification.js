export const namespaced = true;

export const state = {
	notifications: [],
	temporaryId: 1,
	closeButton: false,
	refreshButton: false,
	okButton: false
};

export const mutations = {
	PUSH(state, notification) {
		state.notifications = [...state.notifications, { ...notification, id: state.temporaryId++ }];

		switch (`${notification.type}${notification.field}`) {
			case 'errorhandbags':
				state.closeButton = true;
				state.refreshButton = true;
				break;

			case 'erroruser':
				state.closeButton = true;
				break;

			case 'successuser':
				state.okButton = true;
				break;

			case 'successcart':
				state.okButton = true;
				break;

			case 'errorcart':
				state.closeButton = true;
				break;

			case 'successdatabase':
				state.okButton = true;
				break;

			case 'errorconnection':
				state.closeButton = true;
				break;

			default:
				break;
		}
	},
	DELETE(state, notificationToRemove) {
		state.notifications = state.notifications.filter(notification => notification.id !== notificationToRemove.id);
	},
	RESET_BUTTONS_AND_TEMP_ID(state) {
		state.temporaryId = 1;
		state.closeButton = false;
		state.refreshButton = false;
		state.okButton = false;
	}
};

export const actions = {
	add({ commit }, notification) {
		commit('PUSH', notification);
	},
	remove({ commit }, notificationToRemove) {
		commit('DELETE', notificationToRemove);
	},
	resetButtonsAndTempId({ commit }) {
		commit('RESET_BUTTONS_AND_TEMP_ID');
	}
};

export const getters = {
	notifications: state => {
		return state.notifications;
	},
	closeButton: state => {
		return state.closeButton;
	},
	refreshButton: state => {
		return state.refreshButton;
	},
	okButton: state => {
		return state.okButton;
	}
};
