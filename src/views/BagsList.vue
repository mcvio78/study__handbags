<template>
	<div class="bagsList fill-height pink lighten-5">
		<h1>This is the BagList page</h1>
		<h2>NavBar prop has been passed: - {{ bagType }} -</h2>

		<v-container fluid class="text-center">
			<v-row no-gutters class="justify-center">
				<BaseBagCard v-for="handbag in handbags[bagType]" :key="handbag.id" :handbag="handbag"> </BaseBagCard>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'BagsList',
	props: {
		bagType: {
			type: String,
			required: true
		}
	},
	computed: mapState(['handbags'])
};
</script>
