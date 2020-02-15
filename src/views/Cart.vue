<template>
	<v-data-table
		v-if="cart && inventories"
		:headers="headers"
		:items="cartBagObjAndStoreQuantity"
		:items-per-page="5"
		class="elevation-2 mb-12  mb-sm-0 fill-height grey lighten-4"
	>
		<template v-slot:top>
			<v-container fluid>
				<v-row class="text-center mt-4 mb-0">
					<v-col class="col-12 col-sm-12 col-md-4 pa-0">
						<p class="headline font-weight-bold">YOUR CART</p>
					</v-col>

					<v-col class="col-8 col-sm-6 col-md-4 pa-0">
						<p class="headline">TOTAL : ${{ totalAmoutn }}</p>
					</v-col>

					<v-col class="col-4 col-sm-6 col-md-4 pa-0">
						<v-btn color="deep-purple lighten-3"
							><!--@click.buy--><span class="subtitle-1" @click="buy">Buy</span></v-btn
						>
					</v-col>
				</v-row>
			</v-container>

			<BaseNotificationModal :showModal.sync="modalStatus" :handbagToShow="excessHandbags"></BaseNotificationModal>
		</template>

		<template v-slot:item.imageLo="{ item }">
			<v-img width="50" height="50" :src="item.imageLo" class="mb-2 mb-sm-0"></v-img>
		</template>

		<template v-slot:item.quantity="{ item }">
			<v-chip :color="getColorCart(item)" dark>{{ item.quantity }}</v-chip>
		</template>

		<template v-slot:item.inventoriesQuantity="{ item }">
			<v-chip color="grey" dark>{{ item.inventoriesQuantity }}</v-chip>
		</template>

		<template v-slot:item.action="{ item }">
			<v-btn fab dark x-small color="red" @click="decrementQuantityHandbag(item)">
				<v-icon>mdi-minus</v-icon>
			</v-btn>

			<v-btn fab dark x-small color="green" class="ml-1" @click="incrementQuantityHandbag(item)">
				<v-icon>mdi-plus</v-icon>
			</v-btn>

			<v-btn fab dark x-small color="grey" class="ml-1" @click="removeFromCart(item.idBag)">
				<v-icon>mdi-delete</v-icon>
			</v-btn>
		</template>
	</v-data-table>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import { timeStamp } from './../mixins/timeStamp';

export default {
	name: 'Cart',

	mixins: [timeStamp],

	data() {
		return {
			headers: [
				{
					text: 'Name',
					align: 'left',
					sortable: false,
					value: 'name'
				},
				{ text: 'Price ($)', value: 'price' },
				{ text: 'Quantity', value: 'quantity' },
				{ text: 'Inventories', value: 'inventoriesQuantity' },
				{ text: 'Pic', value: 'imageLo' },
				{ text: 'Actions', value: 'action', sortable: false }
			],
			modalStatus: null
		};
	},

	computed: {
		...mapState('cart', ['cart']),
		...mapState('inventories', ['inventories']),
		...mapGetters('cart', ['findCartPropertyById']),

		/**
		 **************************************************************ADD INVENTORIES QUANTITY PROP TO ITEMS IN CART OBJECT
		 */
		cartBagObjAndStoreQuantity() {
			if (this.cart && this.inventories) {
				return Object.values(this.cart).map(obj => {
					obj.inventoriesQuantity = this.inventories[obj.idBag];
					return obj;
				});
			}
			return null;
		},

		totalAmoutn() {
			return Object.values(this.cart).reduce((acc, item) => {
				return acc + item.price * item.quantity;
			}, 0);
		},

		excessHandbags() {
			return Object.values(this.cart)
				.filter(obj => obj.quantity > this.inventories[obj.idBag])
				.map(item => item.name);
		}
	},

	methods: {
		...mapActions('inventories', ['updateInventories']),

		getColorCart(item) {
			if (item.quantity > this.inventories[item.idBag]) return 'red';
			else if (item.quantity === this.inventories[item.idBag]) return 'orange';
			else return 'green';
		},

		incrementQuantityHandbag(item) {
			return this.$store.dispatch('cart/incrementQuantityHandbag', this.findCartPropertyById(item.idBag)[0]);
		},

		decrementQuantityHandbag(item) {
			if (item.quantity > 1)
				return this.$store.dispatch('cart/decrementQuantityHandbag', this.findCartPropertyById(item.idBag)[0]);
		},

		removeFromCart(item) {
			return this.$store.dispatch('cart/removeFromCart', this.findCartPropertyById(item)[0]);
		},

		buy() {
			if (Object.values(this.cart).every(item => item.quantity <= this.inventories[item.idBag])) {
				const cartOrderBuy = Object.values(this.cart).reduce(
					(acc, item) => ({ ...acc, [item.idBag]: item.quantity }),
					{}
				);

				const inventoriesObjValuesUpdated = Object.entries(cartOrderBuy).reduce(
					(acc, item) => ({ ...acc, [item[0]]: this.inventories[item[0]] - item[1] }),
					{}
				);

				const cartHistoryIndexed = { [this.createTimeStamp()]: this.cart };
				const payload = { inventoriesObjValuesUpdated, cartHistoryIndexed };

				this.updateInventories(payload);

				this.modalStatus = false;
			} else {
				this.modalStatus = true;
			}
		}
	}
};
</script>
