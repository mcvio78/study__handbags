<template>
	<div class="bagsList fill-height secondary">
		<v-row no-gutters>
			<v-col class="text-center">
				<p :class="[this.$vuetify.breakpoint.xs ? 'headline' : 'display-1']" class="mt-4 mb-2">
					{{ bagType | firstCapital }} Collection page
				</p>
			</v-col>
		</v-row>

		<v-container fluid class="text-center pa-0">
			<v-row no-gutters class="justify-center">
				<BaseBagCard
					@handBagToModal="handBagToModal"
					v-for="(handbag, index) in handbags[bagType]"
					:key="index"
					:handbag="handbag"
					:idBag="index"
				></BaseBagCard>
			</v-row>
		</v-container>

		<BagModal :handbagTypeAndId="handbagReceivedToModal" />
	</div>
</template>

<script>
import { mapState } from 'vuex';
import BagModal from './../components/BagModal';
import store from './../store/store';
import firstCapital from './../filters/firstCapital';

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

	data() {
		return {
			handbagReceivedToModal: {}
		};
	},

	computed: mapState('handbags', ['handbags']),

	methods: {
		handBagToModal(handbagTypeAndId) {
			this.handbagReceivedToModal = handbagTypeAndId;
		}
	},

	filters: {
		firstCapital
	},

	beforeRouteEnter(routeTo, routeFrom, next) {
		if (
			store.state.handbags.handbags.collections &&
			Object.values(store.state.handbags.handbags.collections).includes(routeTo.params.bagType)
		) {
			next();
		} else if (
			store.state.handbags.handbags.collections &&
			!Object.values(store.state.handbags.handbags.collections).includes(routeTo.params.bagType)
		) {
			next({ name: 'search-not-found', params: { resource: routeTo.params.bagType } });
		} else {
			next();
		}
	},

	created() {
		store.dispatch('handbags/fetchHandbags', this.bagType);
	}
};
</script>
