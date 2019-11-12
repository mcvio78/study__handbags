<template>
	<div class="bagsList">
		<h1>This is the BagList page</h1>
		<h2>This is the prop that NavBar has passed: - {{ bagType }} -</h2>

		<v-container fluid>
			<v-row>
				<v-col class="text-center">
					<BaseBagCard v-for="handbag in handbags[bagType]" :key="handbag.id" :handbag="handbag"></BaseBagCard>
				</v-col>
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
