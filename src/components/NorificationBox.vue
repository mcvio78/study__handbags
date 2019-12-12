<template>
	<div class="text-center">
		<v-overlay :value="notifications.length ? (overlay = true) : overlay">
			<notification-bar v-for="notification in notifications" :key="notification.id" :notification="notification" />
			<div class="my-2">
				<v-btn :disabled="notifications.length > 0" x-large @click="buttonErrOK">
					<!-- Todo icons align to the center -->
					<div v-if="lastNotifIsSuccess">
						<p class="display-1 ma-auto"><v-icon large>mdi-check</v-icon> OK</p>
					</div>

					<div v-else>
						<p class="display-1 ma-auto"><v-icon large>mdi-refresh</v-icon> Try again</p>
					</div>
				</v-btn>
			</div>
		</v-overlay>
	</div>
</template>

<script>
import NotificationBar from './NotificationBar';
import { mapState, mapActions } from 'vuex';

export default {
	name: 'NotificationBox',
	components: {
		NotificationBar
	},
	data() {
		return {
			overlay: false,
			lastNotifIsSuccess: null
		};
	},
	watch: {
		notifications() {
			if (this.notifications.length) {
				this.lastNotifIsSuccess = this.notifications['0']['type'] === 'success';
			} else {
				this.resetTemporaryId();
			}
		}
	},
	computed: mapState('notification', ['notifications', 'temporaryId']),
	methods: {
		buttonErrOK() {
			this.overlay = false;
			if (this.lastNotifIsSuccess === false && this.$route.path === '/') {
				this.$router.go();
			} else if (this.lastNotifIsSuccess === false) {
				//Todo add home button or remove this else if.
			} else {
				this.$router.push({ name: 'home' });
			}
		},
		...mapActions('notification', ['resetTemporaryId'])
	}
};
</script>
