<template>
	<v-menu offset-y>
		<template v-slot:activator="{ on }">
			<v-btn text icon large class="pa-0" v-on="on">
				<div style="position: absolute">
					<p class="white--text mt-0" style="font-size: .7rem; font-weight: bold">{{ cartItemQuantity }}</p>
				</div>
				<v-icon color="grey">mdi-cart-outline</v-icon>
			</v-btn>
		</template>

		<v-list class="text-center py-sm-2 ma-sm-0">
			<v-list-item-title class="title">User: {{ username }}</v-list-item-title>

			<v-list-item-action class="d-inline-block">
				<v-btn color="mcPrimary" class=" mx-1" @click="logoutFirebase">Logout</v-btn>
				<v-btn v-if="!urlPurchasedPath" color="mcPrimary" class=" mr-1" @click="toCartHistory">Purchased</v-btn>
			</v-list-item-action>

			<div v-if="!urlCartPath">
				<v-divider v-if="ifCartItems" class="my-1"></v-divider>

				<v-subheader v-if="ifCartItems" class="ma-0 py-0">Your Cart:</v-subheader>

				<v-list-item v-for="(item, index) in cart" :key="index" class="subtitle-1 pa-0 ma-0 mb-1 justify-end">
					<v-list-item>
						<v-card>
							<v-img width="50" height="50" :src="item.imageLo"></v-img>
						</v-card>
					</v-list-item>

					<v-list-item class="ma-0 pa-0">
						<v-list-item-group class="text-right">
							<v-list-item-subtitle>{{ item.name }}</v-list-item-subtitle>
							<v-list-item-subtitle>Quantity: {{ item.quantity }} </v-list-item-subtitle>
						</v-list-item-group>

						<v-list-item-action class="my-0 ml-0 mr-2">
							<v-btn text icon color="deep-orange" @click="removeItem(index)">
								<v-icon>mdi-close</v-icon>
							</v-btn>
						</v-list-item-action>
					</v-list-item>
				</v-list-item>

				<v-list-item v-if="ifCartItems" class="justify-end mt-2">
					<v-btn color="mcPrimary" @click="toCart">To Cart</v-btn>
				</v-list-item>
			</div>
		</v-list>
	</v-menu>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'NavBarlogButton',
	data: () => ({
		fab: false
	}),
	computed: {
		...mapState('user', ['user', 'username']),
		...mapState('cart', ['cart']),

		ifCartItems() {
			if (this.cart) {
				if (Object.keys(this.cart).length) {
					return true;
				}
			} else {
				return false;
			}
			return null;
		},

		urlPurchasedPath() {
			return this.$route.name === 'purchased';
		},

		urlCartPath() {
			return this.$route.name === 'cart';
		},

		cartItemQuantity() {
			if (this.cart) {
				return Object.values(this.cart).reduce((acc, item) => {
					return acc + item.quantity;
				}, 0);
			}
			return 0;
		}
	},
	methods: {
		logoutFirebase() {
			this.$store.dispatch('user/signOutAction');
		},

		removeItem(item) {
			this.$store.dispatch('cart/removeFromCart', item);
		},

		toCart() {
			return this.$router.push({ name: 'cart' });
		},

		toCartHistory() {
			return this.$router.push({ name: 'purchased' });
		}
	}
};
</script>
