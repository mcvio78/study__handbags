<template>
	<div style="min-height: 4px; background-color: #E1BEE7">
		<v-progress-linear v-model="value" :active="isLoading" :indeterminate="isLoading" :query="true">
		</v-progress-linear>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			show: false,
			query: false,
			value: 20,
			interval: 0
		};
	},
	computed: {
		...mapGetters('user', ['status']),
		...mapGetters('event', ['eventStatus']),
		isLoading() {
			return this.status === 'loading' || this.eventStatus === 'loading';
		}
	}
};
</script>
