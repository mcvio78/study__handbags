<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
	<div>
		<v-toolbar color="purple darken-1" dark>
			<v-toolbar-title class="headline">
				<span class="font-weight-bold">ZH</span>
				<span class="font-weight-thin grey--text">andbags</span>
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn @click="toHome" v-if="main">Home</v-btn>

			<v-menu offset-y>
				<template v-slot:activator="{ on }">
					<v-btn color="primary" dark v-on="on">Handbags</v-btn>
				</template>

				<v-list class="text-center py-sm-2 ma-sm-0">
					<div class="d-inline">
						<p class="black--text headline px-1 px-sm-0 mb-0 mb-sm-2">Select your Bag</p>
					</div>

					<div class="d-inline">
						<p><small>Our collection</small></p>
					</div>

					<!--TODO bad resizing when it returns to home page. -->
					<div v-for="(bagType, index) in bagTypes" :key="index" class="d-block d-sm-inline my-2">
						<v-btn
							v-if="bagType !== params"
							color="deep-purple lighten-3"
							class="ma-sm-1 small"
							:class="{ 'v-size--x-large': $vuetify.breakpoint.sm }"
							@click="toBagsList(bagType)"
							>{{ bagType }}</v-btn
						>
					</div>
				</v-list>
			</v-menu>

			<v-btn color="primary">Login</v-btn>
		</v-toolbar>
		<v-btn v-scroll="onScroll" v-show="fab" fab fixed dark bottom right color="pink" @click="toTop">
			<v-icon>mdi-home</v-icon>
		</v-btn>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'NavBar.vue',
	data: () => ({
		fab: false
	}),
	computed: {
		bagTypes() {
			return Object.values(this.collections);
		},
		main() {
			return this.$route.path !== '/';
		},
		params() {
			return this.$route.params.bagType;
		},
		...mapState({ collections: state => state.handbags.collections })
	},
	methods: {
		onScroll(e) {
			if (typeof window === 'undefined') return;
			const top = window.pageYOffset || e.target.scrollTop || 0;
			this.fab = top > 200;
		},
		toTop() {
			return this.$vuetify.goTo(0);
		},
		toBagsList(bagType) {
			this.$router.push({ name: 'bags-list', params: { bagType: bagType } });
		},
		toHome() {
			this.$router.push({ name: 'home' });
		}
	},
	created() {
		this.$store.dispatch('fetchHandbags', 'collections');
	}
};
</script>
