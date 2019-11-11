<template>
	<div class="list">
		<h1>This is a list page</h1>
		<h2>{{ bagType }}</h2>
		<h2>{{ borse }}</h2>
	</div>
</template>

<script>
export default {
	name: 'list',
	props: ['bagType'],
	computed: {
		borse() {
			return this.$store.state.handbags.series;
		}
	}
};
</script>
