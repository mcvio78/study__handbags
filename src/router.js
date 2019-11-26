import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Error_404 from './views/Error_404';
import Register from './views/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
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

export default new Router({
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
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/register',
			name: 'Register',
			component: Register
		},
		{
			path: '/dashboard',
			name: 'Dashboard',
			component: Dashboard
		},
		{ path: '*', component: Error_404 }
	]
});
