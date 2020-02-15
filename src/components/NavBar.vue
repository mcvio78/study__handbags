<template>
	<div>
		<v-toolbar color="grey darken-1" dark>
			<NavbarTitle />

			<v-spacer></v-spacer>

			<NavBarHomeButton v-if="noHomePath && $route.name" />

			<NavBarMenu />

			<NavBarLogButton v-if="userLogged" />
		</v-toolbar>

		<NavBarScroll />
	</div>
</template>

<script>
import { mapState } from 'vuex';
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

	computed: {
		...mapState('user', ['user']),

		userLogged() {
			return this.user;
		},

		noHomePath() {
			return this.$route.name !== 'home';
		}
	},

	created() {
		this.$store.dispatch('inventories/getInventories', 'quantity');
		setInterval(() => {
			this.$store.dispatch('inventories/getInventories', 'quantity');
		}, 60000); //1 min.
	}
};
</script>
