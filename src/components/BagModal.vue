<template>
	<v-dialog width="unset" v-model="dialog" persistent>
		<v-card>
			<v-card-title :class="this.$vuetify.breakpoint.md ? 'subtitle-1' : 'headline'">{{ bagModel.name }}</v-card-title>
			<v-img
				sizes="(min-width: 900px) 40vw, 80vw"
				:src="bagModel.imageLo"
				:lazy-src="bagModel.imagePreviewLo"
				:srcset="bagModel.imageLo + ' 500w, ' + bagModel.imageHi + ' 1000w'"
				:alt="alt"
				class="grey lighten-2"
			></v-img>
			<v-card-text class="mt-3 pb-0"
				><span class="font-weight-black">Stock:</span> {{ bagModel.quantity }} <v-icon>mdi-check</v-icon>
				<br />
				<span class="font-weight-black">Price:</span> {{ bagModel.price }} <v-icon>mdi-cash-usd</v-icon>
			</v-card-text>
			<v-card-actions class="pt-0">
				<v-spacer></v-spacer>
				<v-btn
					color="red darken-1"
					:class="this.$vuetify.breakpoint.xs ? 'subtitle-1' : 'headline'"
					text
					@click="dialog = false"
					>Close</v-btn
				>
				<v-btn
					color="green darken-1"
					:class="this.$vuetify.breakpoint.xs ? 'subtitle-1' : 'headline'"
					text
					@click="dialog = false"
					>To Cart</v-btn
				>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { eventBus } from './../main';

export default {
	data() {
		return {
			dialog: false,
			bagModel: {},
			alt: 'An Image of Handbag.'
		};
	},
	methods: {
		setHandbagModal(handbag) {
			this.bagModel = handbag;
			this.dialog = true;
		}
	},
	mounted() {
		eventBus.$on('modalTrueAndBag', handbag => {
			this.setHandbagModal(handbag);
		});
	}
};
</script>
