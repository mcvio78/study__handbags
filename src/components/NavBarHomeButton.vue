<template>
	<v-btn class="mx-1" color="accent" dark @click="toHome">Home</v-btn>
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
