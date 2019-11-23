<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
	<!-- Todo this has to be lazy.  -->
	<v-row justify="center" class="pa-0 ma-0">
		<v-dialog v-model="dialog" persistent max-width="500px">
			<v-card>
				<v-card-title class="custom-selector" :class="this.$vuetify.breakpoint.xs ? 'subtitle-1' : 'headline'">{{
					bagModel.name
				}}</v-card-title>
				<v-img
					sizes="(min-width: 500px) 1000px, 500px"
					:srcset="bagModel.imageLo + ' 500w, ' + bagModel.imageHi + ' 1000w'"
					:src="bagModel.imageLo"
					:alt="alt"
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
	</v-row>
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
