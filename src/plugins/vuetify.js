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
				primary: '#424242', // grey darken-3
				secondary: '#E0E0E0', // grey lighten-2
				accent: '#000000', // black
				accent2: '#BDBDBD', // grey lighten-1
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
