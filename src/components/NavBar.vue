<template>
	<nav>
		<v-app-bar color="purple darken-1" dark>
			<v-container fluid>
				<v-row>
					<v-col cols="3">
						<v-toolbar-title class="headline">
							<span class="font-weight-bold">ZH</span>
							<span class="font-weight-thin grey--text">andbags</span>
						</v-toolbar-title>
					</v-col>

					<v-col cols="6" class="text-center">
						<v-btn color="deep-purple lighten-3">Patrizia</v-btn>
						<v-btn color="deep-purple lighten-3">Melania</v-btn>
						<v-btn color="deep-purple lighten-3">Olivia</v-btn>
						<v-btn color="deep-purple lighten-3">Anna</v-btn>
					</v-col>

					<v-col cols="3" class="text-right">
						<v-btn color="deep-purple lighten-3 black--text">
							<v-icon left>mdi-cart</v-icon>
							<span>Cart</span>
						</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</v-app-bar>
	</nav>
</template>

<script>
export default {
	name: 'NavBar.vue'
};
</script>
