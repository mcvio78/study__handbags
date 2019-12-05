<template>
	<div style="min-height: 4px; background-color: #E1BEE7">
		<v-progress-linear v-model="value" :active="show" :indeterminate="query" :query="true"> </v-progress-linear>
	</div>
</template>

<script>
import { eventBus } from '././../main';

export default {
	data() {
		return {
			show: '',
			query: '',
			value: 0,
			interval: 0
		};
	},
	computed: {
		main() {
			return this.$route.path !== '/';
		}
	},

	// mounted() {
	// 	this.queryAndIndeterminate();
	// },

	// beforeDestroy() {
	// 	clearInterval(this.interval);
	// },

	// methods: {
	// 	queryAndIndeterminate() {
	// 		this.query = true;
	// 		this.show = true;
	// 		this.value = 0;
	//
	// 		setTimeout(() => {
	// 			this.query = false;
	//
	// 			this.interval = setInterval(() => {
	// 				if (this.value === 100) {
	// 					clearInterval(this.interval);
	// 					this.show = false;
	// 					return setTimeout(this.queryAndIndeterminate, 2000);
	// 				}
	// 				this.value += 25;
	// 			}, 1000);
	// 		}, 2500);
	// 	}
	// }

	mounted() {
		eventBus.$on('progressBarState', state => {
			this.show = state;
			this.query = state;
		});
	}
};
</script>
