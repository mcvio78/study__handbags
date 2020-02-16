<template>
	<v-card class="d-inline-block ma-2 ma-md-3 ma-lg-4 elevation-12" @click.native.stop>
		<v-container>
			<v-row>
				<v-col cols="auto">
					<v-img
						height="200"
						width="200"
						sizes="(min-width: 350px) 320px, 160px"
						:srcset="handbag.imagePreviewLo + ' 160w, ' + handbag.imagePreviewHi + ' 320w'"
						:src="handbag.imagePreviewHi"
						:alt="alt"
					>
						<v-row align="start" class="lightbox white--text pt-1 fill-height">
							<v-col>
								<p class="primary subheading ma-0">{{ handbag.name }}</p>
								<p class="body-1 ma-0 pa-0">zhbags@gmail.com</p>
							</v-col>
						</v-row>
					</v-img>
				</v-col>

				<v-col cols="auto" class="text-center pl-0">
					<v-row class="flex-column ma-0 fill-height" justify="center">
						<v-col class="px-0">
							<v-btn disabled icon @click.native.stop>
								<v-icon>mdi-heart</v-icon>
							</v-btn>
						</v-col>

						<v-col class="px-0">
							<v-btn disabled icon @click.stop>
								<v-icon>mdi-bookmark</v-icon>
							</v-btn>
						</v-col>

						<v-col class="px-0">
							<v-btn icon @click.stop="modalBag">
								<v-icon>mdi-information</v-icon>
							</v-btn>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-container>
	</v-card>
</template>

<script>
export default {
	name: 'BagCard',

	props: {
		idBag: {
			type: String,
			required: true
		},

		handbag: {
			type: Object,
			required: true
		}
	},

	data() {
		return {
			alt: 'Bag preview image.'
		};
	},

	methods: {
		modalBag() {
			const handbagTypeAndId = { ...this.handbag, idBag: this.idBag, openModal: true };
			this.$emit('handBagToModal', handbagTypeAndId);
		}
	}
};
</script>
