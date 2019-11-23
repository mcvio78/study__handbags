<template>
	<div class="bagsList fill-height pink lighten-5">
		<v-row no-gutters class="justify-center">
			<h1>This is the {{ bagTypeUpperCase }} Collection</h1>
			<h2>page</h2>
		</v-row>

		<v-container fluid class="text-center">
			<v-row no-gutters class="justify-center">
				<BaseBagCard v-for="handbag in handbags[bagType]" :key="handbag.id" :handbag="handbag"></BaseBagCard>
			</v-row>
		</v-container>
		<BagModal></BagModal>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import BagModal from './../components/BagModal';

export default {
	name: 'BagsList',
	props: {
		bagType: {
			type: String,
			required: true
		}
	},
	components: {
		BagModal
	},
	computed: {
		bagTypeUpperCase() {
			return this.bagType.charAt(0).toUpperCase() + this.bagType.substr(1);
		},
		...mapState(['handbags'])
	}
};
</script>
