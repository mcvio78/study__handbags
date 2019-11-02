<template>
	<div class="home">
		<h1>Homepage</h1>
		<div>
			<v-img :src="heroLarge" :alt="myDescription"></v-img>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Home',
	data() {
		return {
			myDescription: 'An Image of a couple of Handbags.',
			heroLarge: require('./../client/img/hero/hero_1920x654.jpg')
		};
	}
};
</script>
