<template>
	<v-app>
		<NavBar />
		<ProgressBar />
		<notification-box />
		<v-content>
			<router-view :key="$route.fullPath" />
		</v-content>
	</v-app>
</template>

<script>
import NavBar from './components/NavBar';
import NotificationBox from './components/NorificationBox';
import ProgressBar from './components/ProgressBar';

export default {
	name: 'App',
	components: { NavBar, NotificationBox, ProgressBar },
	data() {
		return {};
	}
};
</script>
