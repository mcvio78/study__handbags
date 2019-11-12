<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
	<!-- Todo this has to be lazy.  -->
	<v-row justify="center" class="pa-0 ma-0">
		<v-dialog v-model="dialog" persistent max-width="290">
			<v-card>
				<v-card-title class="headline">Use Google's location service?</v-card-title>
				<v-card-text
					>Let Google help apps determine location. This means sending anonymous location data to Google, even when no
					apps are running.</v-card-text
				>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>
					<v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
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
			dialog: false
		};
	},
	created() {
		eventBus.$on('modalTrue', data => {
			this.dialog = data;
		});
	}
};
</script>
