import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import store from './store/store';
//
const requireComponent = require.context(
	// The relative path of the components folder
	'./components',
	// Whether or not to look in subfolders
	false,
	// The regular expression used to match base component filenames
	/Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
	// Get component config
	const componentConfig = requireComponent(fileName);
	// Get PascalCase name of component
	const componentName = upperFirst(
		camelCase(
			// Gets the file name regardless of folder depth
			fileName
				.split('/')
				.pop()
				.replace(/\.\w+$/, '')
		)
	);

	// Register component globally
	Vue.component(
		componentName,
		// Look for the component options on `.default`, which will
		// exist if the component was exported with `export default`,
		// otherwise fall back to module's root.
		componentConfig.default || componentConfig
	);
});

Vue.use(Router);

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/list/:bagType',
			name: 'bags-list',
			props: true,
			// route level code-splitting
			// this generates a separate chunk (list.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "list" */ './views/BagsList.vue')
		},
		{
			path: '/subscribe',
			name: 'subscribe',
			component: () => import(/* webpackChunkName: "subscribe" */ './views/Subscribe.vue'),
			beforeEnter: (to, from, next) => {
				if (store.state.user.user === null) {
					next();
				} else {
					next({ name: 'home' });
				}
			}
		},
		{
			path: '/authentication',
			name: 'authentication',
			component: () => import(/* webpackChunkName: "authentication" */ './views/Authentication.vue'),
			beforeEnter: (to, from, next) => {
				if (store.state.user.user === null) {
					next();
				} else {
					next({ name: 'home' });
				}
			}
		},
		{
			path: '/cart',
			name: 'cart',
			component: () => import(/* webpackChunkName: "cart" */ './views/Cart.vue'),
			beforeEnter: (to, from, next) => {
				if (store.state.user.user !== null) {
					next();
				} else {
					next({ name: 'home' });
				}
			}
		},
		{
			path: '/search-not-found',
			name: 'search-not-found',
			props: true,
			component: () => import(/* webpackChunkName: "not-found" */ './views/SearchNotFound.vue')
		},
		{
			path: '/404',
			name: '404',
			component: () => import(/* webpackChunkName: "404" */ './views/NotFound')
		},
		{
			path: '*',
			redirect: { name: '404' }
		}
	]
});

router.beforeEach((routeTo, routeFrom, next) => {
	// store.dispatch('handbags/setHandbagsStatus', 'loading');
	if (window.navigator.onLine) {
		if (store.state.handbags.handbags.collections) {
			next();
		} else {
			store.dispatch('handbags/fetchHandbags', 'collections')
			.then(() => {
				next();
			})
		}
	} else {
		next(false);

		const notification = {
			type: 'error',
			field: 'connection',
			message: `You are offline.`
		};
		store.dispatch('notification/add', notification, { root: true });

		throw new Error('You are offline');
	}
});

// router.afterEach(() => {
// 	store.dispatch('handbags/setHandbagsStatus', 'success');
// });

export default router;
