<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
	<div>
		<v-toolbar color="purple darken-1" dark>
			<NavbarTitle />

			<v-spacer></v-spacer>

			<NavBarHomeButton />

			<NavBarMenu />

			<NavBarLogButton />
		</v-toolbar>

		<NavBarScroll />
	</div>
</template>

<script>
import store from './../store/store';
import NavbarTitle from './NavbarTitle';
import NavBarHomeButton from './NavBarHomeButton';
import NavBarMenu from './NavBarMenu';
import NavBarLogButton from './NavBarLogButton';
import NavBarScroll from './NavBarScroll';

export default {
	name: 'NavBar',
	components: {
		NavbarTitle,
		NavBarHomeButton,
		NavBarMenu,
		NavBarLogButton,
		NavBarScroll
	},
	created() {
		if (Object.keys(store.state.event.handbags).length === 0) {
			store.dispatch('event/fetchHandbags', 'collections');
		}
	}
};
</script>
