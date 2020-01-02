<template>
	<v-btn @click="toHome">Home</v-btn>
</template>

<script>
export default {
	name: 'NavBarHomeButton',
	methods: {
		toHome() {
			this.$router.push({ name: 'home' });
		}
	}
};
</script>
