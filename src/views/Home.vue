<template>
	<v-container fluid class="py-0 purple lighten-5" height="100%">
		<HomeBackground />

		<HomeText />

		<HomeFooter />
	</v-container>
</template>

<script>
import HomeText from './../components/HomeText';
import HomeFooter from './../components/HomeFooter';
import HomeBackground from './../components/HomeBackgroundImage';

export default {
	name: 'Home',
	components: {
		HomeText,
		HomeFooter,
		HomeBackground
	},
	data() {
		return {};
	}
};
</script>
