<template>
	<div style="min-height: 4px; background-color: #EEEEEE">
		<v-progress-linear v-model="value" :active="isLoading" :indeterminate="isLoading" :query="true">
		</v-progress-linear>
	</div>
</template>

<script>
import { mapState } from 'vuex';

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
		...mapState('user', ['status']),
		...mapState('handbags', ['handbagsStatus']),
		...mapState('cart', ['cartStatus']),

		isLoading() {
			return this.status === 'loading' || this.handbagsStatus === 'loading' || this.cartStatus === 'loading';
		}
	}
};
</script>
