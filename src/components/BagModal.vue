<template>
	<v-dialog width="unset" v-model="dialog" persistent>
		<v-card>
			<v-card-title :class="this.$vuetify.breakpoint.md ? 'subtitle-1' : 'headline'">{{ bagModel.name }}</v-card-title>
			<v-img
				sizes="(min-width: 900px) 40vw, 80vw"
				:src="bagModel.imageLo"
				:lazy-src="bagModel.imagePreviewLo"
				:srcset="bagModel.imageLo + ' 500w, ' + bagModel.imageHi + ' 1000w'"
				:alt="alt"
				class="grey lighten-2"
			>
				<v-container v-if="exceeded" class="d-flex fill-height justify-center  align-sm-center align-end">
					<span class="red--text text-center grey title d-inline-block pa-8 pa-sm-12">Quantity available exceeded</span>
				</v-container>

				<v-container v-if="sold" class="d-flex fill-height justify-center align-sm-center align-end">
					<span class="red--text text-center grey title d-inline-block pa-8 pa-sm-12">Sold Out</span>
				</v-container>
			</v-img>

			<v-card-text class="mt-3 pb-0 "
				><span class="font-weight-black">Stock:</span> {{ inventories[bagModel.idBag] }}
				<v-icon color="green darken-1">mdi-check</v-icon>
				<!--				<br />-->
				<span class="font-weight-black ml-2">Price:</span> {{ bagModel.price }}
				<v-icon color="green darken-1">mdi-cash-usd</v-icon>
			</v-card-text>

			<v-card-actions class="py-2 justify-space-around">
				<div>
					<v-btn fab dark x-small @click="decreaseQuantity">
						<v-icon dark>mdi-minus</v-icon>
					</v-btn>
					<v-btn fab dark x-small @click="increaseQuantity">
						<v-icon dark>mdi-plus</v-icon>
					</v-btn>

					<v-btn
						color="green darken-1"
						outlined
						:disabled="disableToCartButton"
						:class="this.$vuetify.breakpoint.xs ? 'body-2' : 'headline'"
						text
						@click="putIntoCart"
						>Buy {{ quantitySelected }}</v-btn
					>
				</div>

				<!-- Todo change buttons add to cart and close. -->
				<v-btn
					outlined
					color="red darken-1"
					:class="this.$vuetify.breakpoint.xs ? 'subtitle-2' : 'headline'"
					text
					@click="closeModal"
					>Close</v-btn
				>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	name: 'BagModal',
	props: {
		handbagTypeAndId: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			dialog: false,
			bagModel: {},
			idBag: 'null',
			quantitySelected: 1,
			disableToCartButton: false,
			alt: 'An Image of Handbag.'
		};
	},
	computed: {
		...mapGetters('cart', ['cart', 'idItemToCart', 'findCartItemWithId']),
		...mapGetters('inventories', ['inventories']),
		storeQuantity() {
			if (Object.entries(this.bagModel)) {
				return this.bagModel.quantity;
			}
			return null;
		},
		timestamp() {
			if (!Date.now) {
				return (Date.now = function() {
					return new Date().getTime();
				});
			}
			return Date.now();
		},
		exceeded() {
			if (this.findCartItemWithId(this.idBag)) {
				return (
					this.quantitySelected + this.findCartItemWithId(this.idBag)[1]['quantity'] > this.inventories[this.idBag]
				);
			}
			return false;
		},
		sold() {
			if (this.idBag) {
				return this.inventories[this.idBag] === 0;
			}
			return false;
		}
	},
	methods: {
		...mapActions('cart', ['addToCart', 'updateCartField']),
		closeModal() {
			this.dialog = false;
			this.quantitySelected = 1;
			this.disableToCartButton = false;
			this.quantity = 1;
		},

		/////////////////////////////////////////////////////////////////////////////////////////////////////////ADD TO CART
		putIntoCart() {
			this.disableToCartButton = true;
			let currentObjectBagInCart = this.findCartItemWithId(this.idBag);
			////////////////////////////////////////////////////////////////////////////////////////////////////////IF IN CART

			if (currentObjectBagInCart) {
				const payload = {
					itemNumber: currentObjectBagInCart[0],
					value: { quantity: this.quantitySelected + currentObjectBagInCart[1]['quantity'] }
				};
				this.updateCartField(payload).then(() => {
					this.closeModal();
				});

				//////////////////////////////////////////////////////////////////////////////////////////////////IF NOT IN CART
			} else {
				const payload = {
					[this.idItemToCart]: {
						idBag: this.idBag,
						quantity: this.quantitySelected,
						imageLo: this.bagModel.imageLo,
						name: this.bagModel.name,
						price: this.bagModel.price,
						timestamp: this.timestamp
					}
				};
				this.addToCart(payload).then(() => {
					this.closeModal();
				});
			}
		},

		///////////////////////////////////////////////////////////////////////////////////////MODAL BUTTONS SELECT QUANTITY
		increaseQuantity() {
			// Todo if not greater than quantity in store.
			if (this.quantitySelected < this.storeQuantity) {
				this.quantitySelected++;
			}
		},
		decreaseQuantity() {
			if (this.quantitySelected > 1) {
				this.quantitySelected--;
			}
		}
	},

	////////////////////////////////////////////////////////////////////////////////////////////////WATCH AND UPDATE PROPS
	watch: {
		handbagTypeAndId: {
			// the callback will be called immediately after the start of the observation
			immediate: true,
			handler() {
				// do your stuff
				this.bagModel = this.handbagTypeAndId || {};
				this.idBag = this.handbagTypeAndId.idBag || null;
				this.dialog = this.handbagTypeAndId.openModal || false;
			}
		}
	}
};
</script>
