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
			<v-list-item-title>Username: </v-list-item-title>
			<v-list-item-subtitle>
				<span class="overline">{{ user }}</span>
			</v-list-item-subtitle>
			<v-list-item>
				<div>
					<v-btn @click="logoutFirebase">Logout</v-btn>
				</div>
			</v-list-item>
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
			return this.user;
		},
		...mapGetters('user', ['user'])
	},
	methods: {
		logoutFirebase() {
			this.$store.dispatch('user/signOutAction');
		}
	}
};
</script>
