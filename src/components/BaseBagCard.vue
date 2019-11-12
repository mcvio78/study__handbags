<template>
	<v-card class="d-inline-block ma-2 ma-md-3 ma-lg-4 elevation-12">
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
						<v-row align="start" class="lightbox white--text pa-2 fill-height">
							<v-col>
								<div class="subheading">{{ handbag.name }}</div>
								<div class="body-1">Mmcvio78@gmail.com</div>
							</v-col>
						</v-row>
					</v-img>
				</v-col>

				<v-col cols="auto" class="text-center pl-0">
					<v-row class="flex-column ma-0 fill-height" justify="center">
						<v-col class="px-0">
							<v-btn icon>
								<v-icon>mdi-heart</v-icon>
							</v-btn>
						</v-col>

						<v-col class="px-0">
							<v-btn icon>
								<v-icon>mdi-bookmark</v-icon>
							</v-btn>
						</v-col>

						<v-col class="px-0">
							<v-btn icon>
								<v-icon>mdi-share-variant</v-icon>
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
		handbag: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			alt: 'Bag preview image.'
		};
	}
};
</script>
