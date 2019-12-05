import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Error_404 from './views/Error_404';
import Register from './views/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import { eventBus } from './main';
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
			component: Home,
			beforeEnter(routeTo, routeFrom, next) {
				store.dispatch('event/fetchHandbags', 'collections').then(() => {
					next();
				});
			}
		},
		{
			//Todo try to filter inexistent dynamic route segments.
			path: '/list/:bagType',
			name: 'bags-list',
			props: true,
			// route level code-splitting
			// this generates a separate chunk (list.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "list" */ './views/BagsList.vue'),
			beforeEnter(routeTo, routeFrom, next) {
				if (!store.state.event.handbags.collection) {
					store.dispatch('event/fetchHandbags', 'collections').then(() => {
						if (!Object.values(store.state.event.handbags.collections).includes(routeTo.params.bagType)) {
							router.push({ name: 'home' });
						}
					});
				}
				store.dispatch('event/fetchHandbags', routeTo.params.bagType).then(() => {
					next();
				});
			}
		},
		//Todo lazy import for the rest of components.
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/register',
			name: 'register',
			component: Register
		},
		{
			path: '/dashboard',
			name: 'dashboard',
			component: Dashboard
		},
		{ path: '*', component: Error_404 }
	]
});

router.beforeEach((routeTo, routeFrom, next) => {
	eventBus.$emit('progressBarState', true);
	next();
});

router.afterEach(() => {
	eventBus.$emit('progressBarState', false);
});

export default router;
