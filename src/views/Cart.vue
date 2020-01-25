<template>
	<v-data-table
		v-if="cart && inventories"
		:headers="headers"
		:items="cartBagObjAndStoreQuantity"
		:items-per-page="5"
		class="elevation-2 mb-12  mb-sm-0   fill-height"
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
						<v-btn color="mcPrimary"><!--@click.buy--><span class="subtitle-1" @click="buy">Buy</span></v-btn>
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
			<v-btn fab dark x-small color="red" @click="decrementQuantityEdit(item)">
				<v-icon>mdi-minus</v-icon>
			</v-btn>

			<v-btn fab dark x-small color="green" class="ml-1" @click="incrementQuantityEdit(item)">
				<v-icon>mdi-plus</v-icon>
			</v-btn>

			<v-btn fab dark x-small color="grey" class="ml-1" @click="removeFromCart(item.idBag)">
				<v-icon>mdi-delete</v-icon>
			</v-btn>
		</template>
	</v-data-table>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'Cart',
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
		...mapGetters('cart', ['cart', 'findCartItemWithId']),
		...mapGetters('inventories', ['inventories']),

		///////////////////////////////////////////////////////////////ADD INVENTORIES QUANTITY PROP TO ITEMS IN CART OBJECT
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
			return this.cartBagObjAndStoreQuantity.reduce((acc, item) => {
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
		incrementQuantityEdit(item) {
			item.quantity++;
		},
		decrementQuantityEdit(item) {
			if (item.quantity > 1) item.quantity--;
		},
		removeFromCart(item) {
			this.$store.dispatch('cart/removeFromCart', this.findCartItemWithId(item)[0]);
		},
		buy() {
			if (this.cartBagObjAndStoreQuantity.every(item => item.quantity <= this.inventories[item.idBag])) {
				// Todo send and remove item in store.

				const cartOrderBuy = this.cartBagObjAndStoreQuantity.reduce(
					(acc, item) => ({ ...acc, [item.idBag]: item.quantity }),
					{}
				);

				const inventoriesObjValuesUpdated = Object.entries(cartOrderBuy).reduce(
					(acc, item) => ({ ...acc, [item[0]]: this.inventories[item[0]] - item[1] }),
					{}
				);

				this.updateInventories(inventoriesObjValuesUpdated);
				this.modalStatus = false;
			} else {
				this.modalStatus = true;
			}
		}
	}
};
</script>
