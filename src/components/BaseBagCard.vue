<template>
	<v-card class="d-inline-block mx-auto elevation-12">
		<v-container>
			<v-row justify="space-between">
				<v-col cols="auto">
					<v-img height="200" width="200" :src="patriziaTypes.patrizia_01.image">
						<v-row align="start" class="lightbox white--text pa-2 fill-height">
							<v-col>
								<div class="subheading">Mauro Vio</div>
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
import { mapState } from 'vuex';

export default {
	name: 'BagCard',
	computed: mapState({ patriziaTypes: state => state.handbags.patrizia })
};
</script>
