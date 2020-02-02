<template>
	<v-row v-if="!user" dense class="fill-height align-center  pa-0 ma-0">
		<v-col cols="12">
			<v-card color="rgb(225,190,231, 0.65)" max-width="400" class="mx-auto">
				<v-card-title class="headline justify-center">Subscribe or Sign in</v-card-title>

				<v-card-actions class="justify-center pb-0">
					<v-btn x-large color="primary" @click="toSubscribe">Sign up</v-btn>
				</v-card-actions>
				<v-card-subtitle class="pt-0">If you don't have an account yet.</v-card-subtitle>

				<v-card-actions class="justify-center pb-0">
					<v-btn x-large color="primary" @click="toAuthentication">Sign in</v-btn>
				</v-card-actions>
				<v-card-subtitle class="pt-0">Have an account?</v-card-subtitle>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'HomeSigninSubscribe',
	computed: {
		...mapState('user', ['user'])
	},
	methods: {
		toSubscribe() {
			this.$router.push({ name: 'subscribe' });
		},
		toAuthentication() {
			this.$router.push({ name: 'authentication' });
		}
	}
};
</script>
