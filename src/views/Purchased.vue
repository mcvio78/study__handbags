<template>
	<v-container>
		<h1>{{ history }}</h1>
	</v-container>
</template>

<script>
import store from './../store/store';

export default {
	name: 'Purchased',

	data() {
		return {
			history: null
		};
	},

	created() {
		store.dispatch('cart/getHistory').then(response => {
			this.history = response;
		});
	}
};
</script>
