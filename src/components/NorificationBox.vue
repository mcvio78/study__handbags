<template>
	<div class="text-center">
		<v-overlay :value="notifications.length > 0 ? (overlay = true) : overlay">
			<notification-bar v-for="notification in notifications" :key="notification.id" :notification="notification" />
			<div class="my-2">
				<v-btn :disabled="notifications.length > 0" x-large @click="close">
					<p class="display-1 ma-auto">
						<v-icon large>mdi-window-close</v-icon>
						Close
					</p>
				</v-btn>
			</div>
		</v-overlay>
	</div>
</template>

<script>
import NotificationBar from './NotificationBar';
import { mapState } from 'vuex';

export default {
	name: 'NotificationBox',
	components: {
		NotificationBar
	},
	data() {
		return {
			overlay: false
		};
	},
	computed: mapState('notification', ['notifications']),
	methods: {
		close() {
			this.overlay = false;
			if (this.$route.path === '/') {
				this.$router.go();
			} else {
				this.$router.push({ name: 'home' });
			}
		}
	}
};
</script>
