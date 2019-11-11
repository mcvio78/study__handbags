<template>
	<div class="list">
		<h1>This is the BagList page</h1>
		<h2>This is the prop that NavBar has passed: {{ bagType }}</h2>

		<BaseBagCard></BaseBagCard>
	</div>
</template>

<script>
export default {
	name: 'BagsList',
	props: ['bagType']
};
</script>
