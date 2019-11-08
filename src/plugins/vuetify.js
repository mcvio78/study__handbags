import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import './../scss/styles.scss';

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
		iconfont: 'mdi'
	},
	theme: {
		themes: {
			light: {
				primary: '#3f51b5',
				secondary: '#b0bec5',
				accent: '#8c9eff',
				error: '#b71c1c'
			}
		}
	},
	breakpoint: {
		thresholds: {
			xs: 340,
			sm: 540,
			md: 800,
			lg: 1280
		},
		scrollBarWidth: 24
	}
});
