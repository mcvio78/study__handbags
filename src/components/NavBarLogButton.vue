<template>
	<v-menu offset-y>
		<template v-slot:activator="{ on }">
			<v-btn text icon large class="pa-0" v-on="on">
				<div style="position: absolute">
					<p class="white--text mt-0" style="font-size: .7rem; font-weight: bold">1</p>
				</div>
				<v-icon color="grey">mdi-cart-outline</v-icon>
			</v-btn>
		</template>

		<v-list class="text-center py-sm-2 ma-sm-0">
			<v-list-item-title class="title">Username: {{ username }}</v-list-item-title>
			<v-list-item>
				<v-btn @click="logoutFirebase">Logout</v-btn>
			</v-list-item>
			<v-list-item-subtitle>
				<p class="subtitle-1">{{ cart }}</p>
			</v-list-item-subtitle>
		</v-list>
	</v-menu>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'NavBarlogButton',
	data: () => ({
		fab: false
	}),
	computed: {
		userLogged() {
			return this.user; //Todo Do you need it?
		},
		...mapGetters('user', ['user', 'username']),
		...mapGetters('cart', ['cart'])
	},
	methods: {
		logoutFirebase() {
			this.$store.dispatch('user/signOutAction');
		}
	}
};
</script>
