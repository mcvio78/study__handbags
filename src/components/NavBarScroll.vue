<template>
	<v-btn v-scroll="onScroll" v-show="fab" fab fixed dark bottom right color="pink" @click="toTop">
		<v-icon>mdi-home</v-icon>
	</v-btn>
</template>

<script>
export default {
	name: 'NavBarScroll',
	data: () => ({
		fab: false
	}),
	methods: {
		onScroll(e) {
			if (typeof window === 'undefined') return;
			const top = window.pageYOffset || e.target.scrollTop || 0;
			this.fab = top > 200;
		},
		toTop() {
			return this.$vuetify.goTo(0);
		}
	}
};
</script>
