<template>
	<div class="text-center">
		<v-overlay color="red" :value="overlay">
			<div class="purple">
				<h1 class="pa-sm-2 red--text">404 Page Not Found.</h1>
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
export default {
	name: 'Error_404',
	data() {
		return {
			overlay: true
		};
	},
	methods: {
		returnHome() {
			this.$router.push({ name: 'home' });
		}
	}
};
</script>
