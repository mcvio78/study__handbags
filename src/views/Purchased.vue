<template>
	<v-row class="ma-0 pa-0">
		<p v-if="noHistory" class="headline d-inline-block ma-auto">There are no items.</p>

		<v-expansion-panels inset class="secondary">
			<v-expansion-panel v-for="(dateObject, iKey, index) in history" :key="index">
				<v-expansion-panel-header>
					<v-row>
						<v-col class="col-12 col-sm-auto py-0 py-sm-1">
							<p class="my-1 ma-sm-1">Order Nº{{ index }}</p>
						</v-col>

						<v-col class="col-12 col-sm-auto py-0 py-sm-1">
							<p class="my-1 ma-sm-1">Date: {{ convertToDate(iKey) }}</p>
						</v-col>

						<v-col class="col-12  col-sm-auto py-0 py-sm-1">
							<p class="my-1 ma-sm-1">Time: {{ convertToTime(iKey) }}</p>
						</v-col>
					</v-row>
				</v-expansion-panel-header>

				<v-expansion-panel-content v-for="(objectCart, index) in dateObject" :key="index">
					<v-row>
						<v-col class="col-12 py-0">
							<v-divider></v-divider>
						</v-col>

						<v-col class="col-12 pb-0">
							<p>{{ index }}</p>
						</v-col>

						<v-col class="col-12 py-0">
							<v-divider></v-divider>
						</v-col>

						<v-col class="col-12 col-sm-2">
							<v-img width="50" height="50" :src="objectCart['imageLo']" class="mb-2 mb-sm-0"></v-img>
						</v-col>

						<v-col class="col-12 col-sm-4 py-0 ">
							<p>Name: {{ objectCart.name }}</p>
						</v-col>

						<v-col class="col-12 col-sm-2 py-0 ">
							<p>Price: {{ objectCart.price }}</p>
						</v-col>

						<v-col class="col-12 col-sm-2 py-0 ">
							<p>Quantity: {{ objectCart.quantity }}</p>
						</v-col>
					</v-row>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</v-row>
</template>

<script>
import store from './../store/store';
import { timeStamp } from './../mixins/timeStamp';

export default {
	name: 'Purchased',

	data() {
		return {
			history: null,
			noHistory: false
		};
	},

	mixins: [timeStamp],

	computed: {
		cartObjectsPurchased() {
			return Object.values(this.history);
		}
	},

	created() {
		store.dispatch('cart/getHistory').then(response => {
			this.history = response.data;
			if (response.data === null) {
				this.noHistory = true;
			}
		});
	}
};
</script>
