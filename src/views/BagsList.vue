<template>
	<div class="bagsList fill-height pink lighten-5">
		<v-row no-gutters>
			<v-col class="text-center">
				<p :class="[this.$vuetify.breakpoint.xs ? 'headline' : 'display-1']" class="mb-0 mt-2">
					This is the {{ bagTypeUpperCase }} Collection<span
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
import route from './../router';

function getCollection(routeTo, next) {
	if (!store.state.event.handbags.collections) {
		store.dispatch('event/fetchHandbags', 'collections').then(() => {
			if (!Object.values(store.state.event.handbags.collections).includes(routeTo.params.bagType)) {
				route.push({ name: 'home' });
			}
		});
	}
	store.dispatch('event/fetchHandbags', routeTo.params.bagType).then(() => {
		next();
	});
}

export default {
	name: 'BagsList',
	beforeRouteEnter(routeTo, routeFrom, next) {
		getCollection(routeTo, next);
	},
	beforeRouteUpdate(routeTo, routeFrom, next) {
		getCollection(routeTo, next);
	},
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
		...mapState({ handbags: state => state.event.handbags })
	}
};
</script>
