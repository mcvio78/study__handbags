<template>
	<v-menu offset-y>
		<template v-slot:activator="{ on }">
			<v-btn color="purple darken-2" dark v-on="on">Handbags</v-btn>
		</template>

		<v-list class="text-center py-sm-2 ma-sm-0">
			<div class="d-inline">
				<p class="black--text headline px-1 px-sm-0 mb-0 mb-sm-2">Select your Bag</p>
			</div>

			<div class="d-inline">
				<p><small>Our collection</small></p>
			</div>

			<div>
				<div v-for="(bagType, index) in collections" :key="index" class="d-block d-sm-inline my-2">
					<v-btn
						v-if="bagType !== params"
						color="deep-purple lighten-3"
						class="ma-sm-1 small"
						:class="{ 'v-size--x-large': $vuetify.breakpoint.sm }"
						@click="toBagsList(bagType)"
						>{{ bagType }}</v-btn
					>
				</div>
			</div>

			<div v-if="!collections" class="px-2">
				<p class="red--text">We are sorry! There was a problem fetching Collections.</p>
			</div>
		</v-list>
	</v-menu>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'NavBarMenu',

	computed: {
		...mapState({ collections: state => state.handbags.handbags.collections }),

		params() {
			return this.$route.params.bagType;
		}
	},

	methods: {
		toBagsList(bagType) {
			this.$router.push({ name: 'bags-list', params: { bagType: bagType } });
		}
	}
};
</script>
