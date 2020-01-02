<template>
	<v-app>
		<NavBar />
		<ProgressBar />
		<notification-box v-if="eventStatus" />
		<v-content>
			<router-view :key="$route.fullPath" />
		</v-content>
	</v-app>
</template>

<script>
import NavBar from './components/NavBar';
import NotificationBox from './components/NorificationBox';
import ProgressBar from './components/ProgressBar';
import { mapState } from 'vuex';

export default {
	name: 'App',
	components: { NavBar, NotificationBox, ProgressBar },
	data() {
		return {
			isEditing: false //Todo decide if true or false.
		};
	},
	computed: mapState('event', ['eventStatus']),

	//Prevent browser refresh, URL changes and route navigation.
	methods: {
		preventNav(event) {
			if (!this.isEditing) return;
			event.preventDefault();
			event.returnValue = '';
		}
	},
	beforeMount() {
		window.addEventListener('beforeunload', this.preventNav);
	},

	beforeDestroy() {
		window.removeEventListener('beforeunload', this.preventNav);
	}
};
</script>
