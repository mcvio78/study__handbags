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
			show: false,
			query: false,
			value: 20,
			interval: 0
		};
	},
	mounted() {
		eventBus.$on('progressBarState', state => {
			this.show = state;
			this.query = state;
		});
	}
};
</script>
