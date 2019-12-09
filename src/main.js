import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store';
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.config.productionTip = false;

import vuetify from './plugins/vuetify'; //Vue.use(Vuetify)

export const eventBus = new Vue();

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app');

const firebaseConfig = {
	apiKey: process.env.VUE_APP_API_KEY,
	authDomain: process.env.VUE_APP_AUTH_DOMAIN,
	databaseURL: process.env.VUE_APP_DATABASE_URL,
	projectId: process.env.VUE_APP_PROJECT_ID,
	storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
	appId: process.env.VUE_APP_ID,
	measurementId: process.env.VUE_APP_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
