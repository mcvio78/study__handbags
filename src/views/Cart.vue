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
				{ text: 'Pic', value: 'imageLo' }
			]
		};
	},
	computed: {
		...mapGetters('cart', ['cart']),
		...mapGetters('inventories', ['inventories']),

		///////////////////////////////////////////////////////////////ADD INVENTORIES QUANTITY PROP TO ITEMS IN CART OBJECT
		objectsInCart() {
			if (this.cart) {
				return Object.values(this.cart).map(obj => {
					obj.inventoriesQuantity = this.inventories[obj.idBag];
					return obj;
				});
			}
		},
		total() {
			if (this.objectsInCart) {
				return this.objectsInCart.reduce((acc, item) => {
					return acc + item.price;
				}, 0);
			}
		}
	},
	methods: {
		getColor(item) {
			if (item.quantity > this.inventories[item.idBag]) return 'red';
			else if (item.quantity === this.inventories[item.idBag]) return 'orange';
			else return 'green';
		}
	},
	created() {
		this.$store.dispatch('inventories/getInventories', 'quantity');
		setInterval(() => {
			this.$store.dispatch('inventories/getInventories', 'quantity');
		}, 300000); //5 min.
	}
};
</script>
