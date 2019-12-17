<template>
	<div class="text-center">
		<v-overlay :value="notifications.length ? (overlay = true) : overlay">
			<notification-bar v-for="notification in notifications" :key="notification.id" :notification="notification" />
			<div class="my-2">
				<!---------------------------------------------------------------------------------------------OverlayButtons-->
				<v-btn v-if="closeButton" x-large :disabled="notifications.length > 0" @click="closeOverlay">
					<p class="display-1 ma-auto">
						<v-icon large>{{ !signInUpView ? 'mdi-close' : 'mdi-account-alert' }}</v-icon
						>{{ !signInUpView ? 'Close' : 'Try Again' }}
					</p>
				</v-btn>

				<v-btn v-if="refreshButton" x-large :disabled="notifications.length > 0" @click="refreshPage">
					<p class="display-1 ma-auto"><v-icon large>mdi-refresh</v-icon> Try again</p>
				</v-btn>

				<v-btn v-if="okButton" x-large :disabled="notifications.length > 0" @click="closeOverlay">
					<p class="display-1 ma-auto"><v-icon large>mdi-check</v-icon> OK</p>
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
			refreshButton: false,
			closeButton: false,
			okButton: false
		};
	},
	watch: {
		notifications() {
			if (this.notifications.length === 0) {
				this.resetTemporaryId();
			}
		}
	},
	computed: {
		...mapState('notification', ['notifications', 'temporaryId']),
		...mapState('user', ['user', 'status']),
		...mapState('event', ['eventStatus']),
		signInUpView() {
			return this.$route.path === '/subscribe' || this.$route.path === '/authentication';
		},
		currentPath() {
			return this.$route.path;
		}
	},
	methods: {
		...mapActions('notification', ['resetTemporaryId']),
		OverlayButtons(currentPath, currentEventStatus, currentUser, currentUserStatus) {
			if (currentEventStatus === 'failure' || (currentUserStatus === 'failure' && this.signInUpView)) {
				this.closeButton = true;
			}
			if ((currentPath === '/' || currentPath === '/list/') && currentEventStatus === 'failure') {
				this.refreshButton = true;
			}
			if ((currentUser && currentUserStatus === 'success') || (!currentUser && currentUserStatus === 'success')) {
				this.okButton = true;
			}
		},
		resetFields() {
			this.refreshButton = false;
			this.closeButton = false;
			this.okButton = false;
		},
		refreshPage() {
			this.resetFields();
			this.$router.go();
		},
		closeOverlay() {
			this.resetFields();
			this.overlay = false;
			if (this.status === 'success' && this.signInUpView) {
				this.$router.push({ name: 'home' });
			}
		}
	},
	created() {
		this.OverlayButtons(this.currentPath, this.eventStatus, this.user, this.status);
	}
};
</script>
