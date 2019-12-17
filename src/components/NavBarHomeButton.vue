<template>
	<v-btn @click="toHome" v-if="noHomePath">Home</v-btn>
</template>

<script>
export default {
	name: 'NavBarHomeButton',
	computed: {
		noHomePath() {
			return this.$route.name !== 'home';
		}
	},
	methods: {
		toHome() {
			this.$router.push({ name: 'home' });
		}
	}
};
</script>
