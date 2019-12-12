<template>
	<div class="text-center">
		<v-overlay :value="notifications.length ? (overlay = true) : overlay">
			<notification-bar v-for="notification in notifications" :key="notification.id" :notification="notification" />
			<div class="my-2">
				<v-btn :disabled="notifications.length > 0" x-large @click="close">
					<!-- Todo icons align to the center -->
					<div v-if="typeButton">
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
import { mapState } from 'vuex';

export default {
	name: 'NotificationBox',
	components: {
		NotificationBar
	},
	data() {
		return {
			overlay: false,
			typeButton: null
		};
	},
	watch: {
		notifications() {
			if (this.notifications.length) {
				this.typeButton = this.notifications['0']['type'] === 'success';
			}
		}
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
