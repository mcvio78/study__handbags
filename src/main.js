import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;

import vuetify from './plugins/vuetify';

//todo momentary eventBus
export const eventBus = new Vue();

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app');
