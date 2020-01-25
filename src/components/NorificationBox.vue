<template>
	<div class="text-center">
		<v-overlay :value="notifications.length ? (overlay = true) : overlay">
			<notification-bar v-for="notification in notifications" :key="notification.id" :notification="notification" />
			<div class="my-2">
				<!--------------------------------------------------------------------------------------------OVERLAY BUTTONS-->
				<v-btn error class="ma-1" v-if="closeButton" x-large :disabled="notifications.length > 0" @click="closeOverlay">
					<p class="display-1 ma-auto"><v-icon large>mdi-close</v-icon> Close</p>
				</v-btn>

				<v-btn class="ma-1" v-if="refreshButton" x-large :disabled="notifications.length > 0" @click="refreshPage">
					<p class="display-1 ma-auto"><v-icon large>mdi-refresh</v-icon> Try again</p>
				</v-btn>

				<v-btn
					color="success"
					class="ma-1"
					v-if="okButton"
					x-large
					:disabled="notifications.length > 0"
					@click="closeOverlay"
				>
					<p class="display-1 ma-auto"><v-icon large>mdi-check</v-icon> OK</p>
				</v-btn>
			</div>
		</v-overlay>
	</div>
</template>

<script>
import NotificationBar from './NotificationBar';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

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
	computed: {
		...mapGetters('notification', ['closeButton', 'refreshButton', 'okButton', 'notifications']),
		...mapGetters('user', ['status']),
		...mapGetters('cart', ['cart']),
		signInUpView() {
			return this.$route.path === '/subscribe' || this.$route.path === '/authentication';
		},
		cartViewEmptyCart() {
			return this.$route.path === '/cart' && Object.keys(this.cart).length === 0;
		},
	},
	methods: {
		...mapActions('notification', ['resetButtonsAndTempId']),
		refreshPage() {
			//this.resetButtonsAndTempId();// Todo is this necessary?
			this.$router.go();
		},
		closeOverlay() {
			this.resetButtonsAndTempId();
			this.overlay = false;
			if (this.status === 'success' && this.signInUpView || this.cartViewEmptyCart) {
				this.$router.push({ name: 'home' });
			}
		}
	}
};
</script>
