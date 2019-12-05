<template>
	<v-alert prominent type="error">
		<v-row align="center">
			<h2 class="pa-sm-2" :class="notification.type.isAxiosError ? 'white--text' : 'grey--text'">
				{{ notification.message }}
			</h2>
		</v-row>
	</v-alert>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'NotificationBar',
	props: {
		notification: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			timeout: null
		};
	},
	mounted() {
		this.timeout = setTimeout(() => this.remove(this.notification), 5000);
	},
	beforeDestroy() {
		clearTimeout(this.timeout);
	},
	methods: mapActions('notification', ['remove'])
};
</script>
