<template>
	<div class="bagsList fill-height pink lighten-5">
		<v-row no-gutters>
			<v-col class="text-center">
				<p :class="[this.$vuetify.breakpoint.xs ? 'headline' : 'display-1']" class="mb-0 mt-2">
					This is the {{ bagType | firstCapital }} Collection<span
						class="font-italic"
						:class="[this.$vuetify.breakpoint.xs ? 'subtitle-1' : 'headline']"
					>
						page</span
					>
				</p>
			</v-col>
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
import store from './../store/store';
import firstCapital from './../filters/firstCapital';
import { eventBus } from '../main';

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
		// bagTypeUpperCase() {
		// 	return this.bagType.charAt(0).toUpperCase() + this.bagType.substr(1);
		// },
		...mapState('event', ['handbags'])
	},
	filters: {
		firstCapital
	},
	beforeRouteEnter(routeTo, routeFrom, next) {
		if (
			store.state.event.handbags.collections &&
			Object.values(store.state.event.handbags.collections).includes(routeTo.params.bagType)
		) {
			next();
		} else if (
			store.state.event.handbags.collections &&
			!Object.values(store.state.event.handbags.collections).includes(routeTo.params.bagType)
		) {
			next({ name: 'not-found', params: { resource: routeTo.params.bagType } });
		} else {
			next();
		}
	},
	created() {
		store.dispatch('event/fetchHandbags', this.bagType).then(() => {
			eventBus.$emit('progressBarState', false);
		});
	}
};
</script>
