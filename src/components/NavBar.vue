<template>
	<v-container fluid class="pa-0">
		<v-row no-gutters>
			<v-app-bar color="purple darken-1" dark>
				<v-col cols="6">
					<v-toolbar-title class="headline">
						<span class="font-weight-bold">ZH</span>
						<span class="font-weight-thin grey--text">andbags</span>
					</v-toolbar-title>
				</v-col>

				<!--				<v-col cols="8" class="text-sm-center s">-->
				<!--					<v-btn color="deep-purple lighten-3" class='v-size&#45;&#45;large ma-1'>Patrizia</v-btn>-->
				<!--					<v-btn color="deep-purple lighten-3" class='v-size&#45;&#45;large ma-1'>Olivia</v-btn>-->
				<!--					<v-btn color="deep-purple lighten-3" class='v-size&#45;&#45;large ma-1'>Melania</v-btn>-->
				<!--					<v-btn color="deep-purple lighten-3" class='v-size&#45;&#45;large ma-1'>Anna</v-btn>-->
				<!--				</v-col>-->

				<v-spacer></v-spacer>

				<v-col cols="6" class="text-end">
					<v-btn color="deep-purple lighten-3 black--text" class="v-size--large">
						<v-icon left>mdi-cart</v-icon>
						<span>Cart</span>
					</v-btn>
				</v-col>
			</v-app-bar>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'NavBar.vue'
};
</script>
