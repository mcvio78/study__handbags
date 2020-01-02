<template>
	<div>
		<v-toolbar color="purple darken-1" dark>
			<NavbarTitle />

			<v-spacer></v-spacer>

			<!-- Todo NavBarHomeButton shows when refresh. -->
			<NavBarHomeButton v-if="noHomePath" />

			<NavBarMenu />

			<NavBarLogButton v-if="userLogged" />
		</v-toolbar>

		<NavBarScroll />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
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
		...mapGetters('user', ['user']),
		userLogged() {
			return this.user;
		},
		noHomePath() {
			return this.$route.name !== 'home';
		}
	}
};
</script>
