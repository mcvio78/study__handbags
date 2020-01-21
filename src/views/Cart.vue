<template>
	<v-data-table
		:headers="headers"
		:items="objectsInCart"
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
						<p class="headline">TOTAL : {{ total }}$</p>
					</v-col>

					<v-col class="col-4 col-sm-6 col-md-4 pa-0">
						<v-btn color="mcPrimary"><!--@click.buy--><span class="subtitle-1">Buy</span></v-btn>
					</v-col>
				</v-row>
			</v-container>
		</template>

		<template v-slot:item.imageLo="{ item }">
			<v-img width="50" height="50" :src="item.imageLo" class="mb-2 mb-sm-0"></v-img>
		</template>

		<template v-slot:item.quantity="{ item }">
			<v-chip :color="getColor(item)" dark>{{ item.quantity }}</v-chip>
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
import { mapGetters } from 'vuex';

export default {
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
			quantityEdit: 6
		};
	},
	computed: {
		...mapGetters('cart', ['cart', 'findObjectItemIfInCart']),
		...mapGetters('inventories', ['inventories']),

		///////////////////////////////////////////////////////////////ADD INVENTORIES QUANTITY PROP TO ITEMS IN CART OBJECT
		objectsInCart() {
			if (this.cart && this.inventories) {
				return Object.values(this.cart).map(obj => {
					obj.inventoriesQuantity = this.inventories[obj.idBag];
					return obj;
				});
			}
		},
		total() {
			if (this.objectsInCart) {
				return this.objectsInCart.reduce((acc, item) => {
					return acc + item.price * item.quantity;
				}, 0);
			}
		}
	},
	methods: {
		getColor(item) {
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
			this.$store.dispatch('cart/removeFromCart', this.findObjectItemIfInCart(item)[0]);
		}
	},

	created() {
		this.$store.dispatch('inventories/getInventories', 'quantity');
		setInterval(() => {
			this.$store.dispatch('inventories/getInventories', 'quantity');
		}, 600000); //10 min.
	}
};
</script>
