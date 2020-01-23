<template>
	<div class="text-center">
		<v-dialog v-model="showModal" width="500" persistent>
			<v-card>
				<v-card-title class="headline grey lighten-2" primary-title>
					Notice:
				</v-card-title>

				<v-card-text>
					<p class="body-1 font-weight-bold my-2">You have exceeded the number of bags in stock with:</p>
					<p v-for="(handbag, index) in handbagToShow" :key="index" class="my-0">{{ index + 1 }}) {{ handbag }}</p>
				</v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" text @click="$emit('update:showModal', false)">
						I understand
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	name: 'BaseNotificationModal',
	props: {
		showModal: {
			type: Boolean
		},
		handbagToShow: {
			type: Array
		}
	}
};
</script>
