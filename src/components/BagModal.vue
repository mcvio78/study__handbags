<template>
	<v-dialog width="unset" v-model="dialog" persistent v-if="notEmptyBagModelProp">
		<v-card class="text-center pt-2">
			<v-card-title class="d-inline-block pa-0 mb-2" :class="fontTitle">{{ bagModel.name }}</v-card-title>

			<v-img
				sizes="(min-width: 900px) 40vw, 80vw"
				:src="bagModel.imageLo"
				:lazy-src="bagModel.imagePreviewLo"
				:srcset="bagModel.imageLo + ' 500w, ' + bagModel.imageHi + ' 1000w'"
				:alt="alt"
				class="grey lighten-2"
			>
				<v-container
					v-if="exceeded && !sold"
					class="d-flex fill-height justify-center align-sm-center align-end border"
				>
					<span class="white--text text-center grey title d-inline-block pa-8 pa-sm-12"
						>Quantity available exceeded</span
					>
				</v-container>

				<v-container v-if="sold" class="d-flex fill-height justify-center align-sm-center align-end">
					<span class="white--text text-center grey title d-inline-block pa-8 pa-sm-12">Sold Out</span>
				</v-container>
			</v-img>

			<v-card-text class="pt-2 pb-0">
				<div class="d-inline-block mr-1">
					<span class="font-weight-black">Stock:</span> {{ inventories[bagModel.idBag] }}
					<v-icon v-if="sold" color="red darken-1">mdi-close</v-icon>
					<v-icon v-else color="green darken-1">mdi-check</v-icon>
				</div>

				<div class="d-inline-block">
					<span class="d-inline-block font-weight-black">Price:</span> {{ bagModel.price }}
					<v-icon color="green darken-1">mdi-cash-usd</v-icon>
				</div>
			</v-card-text>

			<v-card-actions class="justify-space-around">
				<div>
					<v-btn v-if="user" fab class="mx-1" color="primary" dark x-small @click="decreaseQuantity">
						<v-icon dark>mdi-minus</v-icon>
					</v-btn>

					<v-btn v-if="user" fab class="mr-1 ml-0" color="primary" dark x-small @click="increaseQuantity">
						<v-icon dark>mdi-plus</v-icon>
					</v-btn>

					<v-btn
						class="mr-1 ml-0"
						:class="fontButtons"
						color="accent2"
						:disabled="disableToCartButtons || !user"
						@click="putIntoCart"
					>
						<span v-if="user">Buy {{ quantitySelected }}</span>
						<span v-else>No User</span>
					</v-btn>

					<v-btn class="mr-1 ml-0" :class="fontButtons" color="accent2" @click="closeModal">Close </v-btn>
				</div>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { findIdItem } from './../mixins/findIdItem';

export default {
	name: 'BagModal',

	mixins: [findIdItem],

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
			quantitySelected: 1,
			disableToCartButtons: false,
			alt: 'An Image of Handbag.'
		};
	},

	computed: {
		...mapState('cart', ['cart']),
		...mapState('inventories', ['inventories']),
		...mapState('user', ['user']),
		...mapGetters('cart', ['findCartPropertyById']),

		notEmptyBagModelProp() {
			return Object.keys(this.bagModel).length;
		},

		exceeded() {
			if (this.bagModel.idBag && this.findCartPropertyById(this.bagModel.idBag)) {
				return (
					this.quantitySelected + this.findCartPropertyById(this.bagModel.idBag)[1]['quantity'] >
					this.inventories[this.bagModel.idBag]
				);
			} else if (this.bagModel.idBag) {
				return this.quantitySelected > this.inventories[this.bagModel.idBag];
			} else {
				return false;
			}
		},

		sold() {
			if (this.bagModel.idBag !== null) {
				return this.inventories[this.bagModel.idBag] === 0;
			}
			return false;
		},

		fontButtons() {
			return this.$vuetify.breakpoint.xs ? 'subtitle-2' : 'headline';
		},

		fontTitle() {
			return this.$vuetify.breakpoint.md ? 'subtitle-1' : 'headline';
		}
	},

	methods: {
		...mapActions('cart', ['addToCart', 'updateCartField']),

		/**
		 ********************************************************************************************************CLOSE MODAL
		 */
		closeModal() {
			this.dialog = false;
			this.quantitySelected = 1;
			this.disableToCartButtons = false;
		},

		/**
		 ********************************************************************************************************ADD TO CART
		 */
		putIntoCart() {
			this.disableToCartButtons = true;
			const currentObjectBagInCart = this.findCartPropertyById(this.bagModel.idBag);

			// if in cart
			if (currentObjectBagInCart) {
				const payload = {
					itemNumber: currentObjectBagInCart[0],
					value: { quantity: this.quantitySelected + currentObjectBagInCart[1]['quantity'] }
				};
				this.updateCartField(payload).then(() => {
					this.closeModal();
				});

				// if not in cart
			} else {
				if (this.notEmptyBagModelProp) {
					const payload = {
						[this.findAppropriateCartId(this.cart)]: {
							idBag: this.bagModel.idBag,
							quantity: this.quantitySelected,
							imageLo: this.bagModel.imageLo,
							name: this.bagModel.name,
							price: this.bagModel.price
						}
					};
					this.addToCart(payload).then(() => {
						this.closeModal();
					});
				}
			}
		},

		/**
		 **************************************************************************************MODAL BUTTONS SELECT QUANTITY
		 */
		increaseQuantity() {
			this.quantitySelected++;
		},

		decreaseQuantity() {
			if (this.quantitySelected > 1) {
				this.quantitySelected--;
			}
		}
	},

	/**
	 ******************************************************************************************WATCH PROPS AND UPDATE DATA
	 */
	watch: {
		handbagTypeAndId: {
			// The callback will be called immediately after the start of the observation.
			immediate: true,
			handler() {
				// Do your stuff.
				this.bagModel = { ...this.handbagTypeAndId };
				this.dialog = this.handbagTypeAndId.openModal;
			}
		}
	}
};
</script>
