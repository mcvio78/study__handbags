<template>
	<div class="text-center">
		<v-overlay :value="overlay">
			<p class="display-3 pa-sm-2 red--text">Oops!</p>
			<p class="display-1 pa-sm-2 black--text">
				<template v-if="resource">
					<span class="display-1">The </span>
					<span class="font-weight-bold">{{ inexistentResource }}</span>
				</template>
				page you're looking for is not here.
			</p>
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
	name: 'NotFound',
	props: {
		resource: {
			type: String
		}
	},
	data() {
		return {
			overlay: true,
			inexistentResource: this.resource
		};
	},
	methods: {
		...mapActions('notification', ['resetButtonsAndTempId']),

		returnHome() {
			this.$router.push({ name: 'home' });
			this.resetButtonsAndTempId();
		}
	},

	beforeDestroy() {
		this.inexistentResource = null;
	}
};
</script>
