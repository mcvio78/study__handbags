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

		<v-list class="text-center pa-1 pa-sm-2">
			<v-list-item-title class="title d-block mb-2">User: {{ username }}</v-list-item-title>

			<div class="mb-2">
				<v-btn class="mr-1" color="accent2" @click="logoutFirebase">Logout</v-btn>
				<v-btn v-if="!urlPurchasedPath" color="accent2" @click="toCartHistory">Purchased</v-btn>
			</div>

			<div v-if="!urlCartPath">
				<v-divider v-if="ifCartItems" class="mb-2"></v-divider>

				<p v-if="ifCartItems" class="mb-2">Your Cart:</p>

				<v-list-item v-for="(item, index) in cart" :key="index" class="px-0">
					<v-row no-gutters class="align-center">
						<v-col class="col-3">
							<v-list-item class="mx-0 px-0 mb-1">
								<v-card>
									<v-img width="50" height="50" :src="item.imageLo"></v-img>
								</v-card>
							</v-list-item>
						</v-col>

						<v-col class="col-6">
							<v-list-item-group>
								<v-row no-gutters>
									<v-col class="py-0">
										<v-list-item-subtitle>{{ item.name }}</v-list-item-subtitle>
										<v-list-item-subtitle>Quantity: {{ item.quantity }} </v-list-item-subtitle>
									</v-col>
								</v-row>
							</v-list-item-group>
						</v-col>

						<v-col class="col-3">
							<v-row no-gutters class="justify-end">
								<v-list-item-action width="50" height="50" class="ma-0 secondary ">
									<v-btn width="50" height="50" text icon color="deep-orange" @click="removeItem(index)">
										<v-icon>mdi-close</v-icon>
									</v-btn>
								</v-list-item-action>
							</v-row>
						</v-col>
					</v-row>
				</v-list-item>

				<v-btn v-if="ifCartItems" class="mt-2" color="accent2" @click="toCart">To Cart</v-btn>
			</div>
		</v-list>
	</v-menu>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'NavBarlogButton',

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
