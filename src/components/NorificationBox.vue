<template>
	<div class="text-center">
		<v-overlay :value="notifications.length ? (overlay = true) : overlay">
			<notification-bar v-for="notification in notifications" :key="notification.id" :notification="notification" />

			<div class="my-2">
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
import { mapActions, mapState } from 'vuex';

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
		...mapState('notification', ['closeButton', 'refreshButton', 'okButton', 'notifications']),
		...mapState('user', ['status']),
		...mapState('cart', ['cart']),

		signInUpView() {
			return this.$route.path === '/subscribe' || this.$route.path === '/authentication';
		},

		cartViewEmptyCart() {
			return this.$route.path === '/cart' && this.cart === null;
		},

		purchasedView() {
			return this.$route.path === '/purchased';
		}
	},

	methods: {
		...mapActions('notification', ['resetButtonsAndTempId']),

		refreshPage() {
			this.$router.go();
		},

		closeOverlay() {
			this.resetButtonsAndTempId();
			this.overlay = false;
			if ((this.status === 'success' && this.signInUpView) || this.cartViewEmptyCart || this.purchasedView) {
				this.$router.push({ name: 'home' });
			}
		}
	}
};
</script>
