<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
	<div>
		<v-toolbar color="purple darken-1" dark>
			<v-toolbar-title class="headline">
				<span class="font-weight-bold">ZH</span>
				<span class="font-weight-thin grey--text">andbags</span>
			</v-toolbar-title>

			<v-spacer></v-spacer>

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

					<div v-for="(bagName, index) in bagNames" :key='index' class="d-block d-sm-inline my-2">
						<v-btn
							color="deep-purple lighten-3"
							class="ma-sm-1 small"
							:class="{ 'v-size--x-large': $vuetify.breakpoint.sm }"
							>{{ bagName }}</v-btn
						>
					</div>
				</v-list>
			</v-menu>
		</v-toolbar>
		<v-btn v-scroll="onScroll" v-show="fab" fab fixed dark bottom right color="pink" @click="toTop">
			<v-icon>mdi-home</v-icon>
		</v-btn>
	</div>
</template>

<script>
export default {
	name: 'NavBar.vue',
	data: () => ({
		fab: false
	}),
	computed: {
		bagNames() {
			return Object.keys(this.$store.state.handbags.series);
		}
	},
	methods: {
		onScroll(e) {
			if (typeof window === 'undefined') return;
			const top = window.pageYOffset || e.target.scrollTop || 0;
			this.fab = top > 200;
		},
		toTop() {
			return this.$vuetify.goTo(0);
		}
	}
};
</script>
