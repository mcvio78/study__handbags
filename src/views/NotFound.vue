<template>
	<div class="text-center">
		<v-overlay :value="overlay" color="red" opacity="0.3">
			<div>
				<p class="display-1 red--text font-weight-bold pa-sm-2">404 Page Not Found.</p>
			</div>

			<div class="my-2">
				<v-btn x-large @click="returnHome">
					<p class="display-1 ma-auto"><v-icon>mdi-close</v-icon>Home</p>
				</v-btn>
			</div>
		</v-overlay>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'Error_404',

	data() {
		return {
			overlay: true
		};
	},

	methods: {
		...mapActions('notification', ['resetButtonsAndTempId']),
		returnHome() {
			this.$router.push({ name: 'home' });
			this.resetButtonsAndTempId();
		}
	}
};
</script>
