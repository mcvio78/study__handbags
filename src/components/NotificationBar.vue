<template>
	<v-alert prominent :type="notification.type">
		<v-row v-if="!isError" class="pr-10">
			<v-col>
				<h1>Thanks {{ notification.name }}!</h1>
			</v-col>
		</v-row>

		<v-row class="pr-6">
			<v-col>
				<h2 class="pa-sm-2" :class="[this.$vuetify.breakpoint.xs ? 'subtitle-1' : 'headline']">
					<span v-if="isError">Error {{ notification.id }} : </span>{{ notification.message }}
				</h2>
			</v-col>
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

	computed: {
		isError() {
			return this.notification.type === 'error';
		}
	},

	mounted() {
		this.timeout = setTimeout(() => this.remove(this.notification), 2000);
	},

	beforeDestroy() {
		clearTimeout(this.timeout);
	},

	methods: mapActions('notification', ['remove'])
};
</script>
