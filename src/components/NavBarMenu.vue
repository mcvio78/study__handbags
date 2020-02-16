<template>
	<v-menu offset-y>
		<template v-slot:activator="{ on }">
			<v-btn color="accent" dark v-on="on">Handbags</v-btn>
		</template>

		<v-list class="text-center pa-2">
			<v-list-tile-content class="d-block headline mb-2">Select your Bag</v-list-tile-content>

			<v-list-tile-sub-title class="d-block mb-2">Our collection</v-list-tile-sub-title>

			<div>
				<div v-for="(bagType, key, index) in collections" :key="key" class="d-sm-inline-block d-sm-inline mb-2 mb-sm-0">
					<v-btn
						color="accent2"
						:disabled="bagType === params"
						:class="[indexLastArrayItem === index ? 'mr-0' : 'mr-1']"
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
		},
		indexLastArrayItem() {
			return Object.keys(this.collections).length - 1;
		}
	},

	methods: {
		toBagsList(bagType) {
			this.$router.push({ name: 'bags-list', params: { bagType: bagType } });
		}
	}
};
</script>
