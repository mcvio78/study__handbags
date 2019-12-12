<template>
	<v-container fluid class="py-0 purple lighten-5" height="100%">
		<v-row>
			<v-col class="text-center pa-0" cols="12">
				<!-- Todo manage pictures with CSS instead. -->

				<div class="img">
					<v-row v-if="signCard" dense class="fill-height align-center  pa-0 ma-0">
						<v-col cols="12">
							<v-card color="rgb(225,190,231, 0.65)" max-width="400" class="mx-auto">
								<v-card-title class="headline justify-center">Subscribe or Sign in</v-card-title>

								<v-card-actions class="justify-center pb-0">
									<v-btn x-large color="primary" @click="toSubscribe">Sign up</v-btn>
								</v-card-actions>
								<v-card-subtitle class="pt-0">If you don't have an account yet.</v-card-subtitle>

								<v-card-actions class="justify-center pb-0">
									<v-btn x-large color="primary">Sign in</v-btn>
								</v-card-actions>
								<v-card-subtitle class="pt-0">Have an account?</v-card-subtitle>
							</v-card>
						</v-col>
					</v-row>
				</div>
			</v-col>
		</v-row>

		<v-row class="justify-center">
			<v-col cols="11" class="pa-0 col-md-10 col-lg-11 text-xl-center">
				<h1 class="display-1 mb-2 mt-4">Philosophy:</h1>
				<p class="d-lg-inline-block">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos inventore itaque odio omnis optio rem
					sapiente suscipit tenetur velit voluptate? Alias ducimus, eveniet in itaque nobis optio rem sit vero.
				</p>
				<p class="d-lg-inline-block">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos inventore itaque odio omnis optio rem
					sapiente suscipit tenetur velit voluptate? Alias ducimus, eveniet in itaque nobis optio rem sit vero.
				</p>
				<p class="d-lg-inline-block">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos inventore itaque odio omnis optio rem
					sapiente suscipit tenetur velit voluptate? Alias ducimus, eveniet in itaque nobis optio rem sit vero.
				</p>
				<p class="d-lg-inline-block">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos inventore itaque odio omnis optio rem
					sapiente suscipit tenetur velit voluptate? Alias ducimus, eveniet in itaque nobis optio rem sit vero.
				</p>
				<p class="d-lg-inline-block">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos inventore itaque odio omnis optio rem
					sapiente suscipit tenetur velit voluptate? Alias ducimus, eveniet in itaque nobis optio rem sit vero.
				</p>
			</v-col>
		</v-row>

		<v-footer class="ma-0 pa-0">
			<v-row style="height: 32vmax" class="purple darken-1 align-end">
				<v-col>
					<a href="#" onClick="return false" class="white--text my-0 mx-2">www.zhandbags.com</a>
				</v-col>
			</v-row>
		</v-footer>
	</v-container>
</template>

<script>
export default {
	name: 'Home',
	data() {
		return {
			signCard: true
		};
	},
	methods: {
		toSubscribe() {
			this.$router.push({ name: 'subscribe' });
		}
	}
};
</script>

<style scoped lang="css">

.img {
	background-image: url('./../assets/img/hero_medium--fallback.jpg');
	background-image: -webkit-image-set("./../assets/img/hero_small.jpg" 1x, "./../assets/img/hero_large.jpg" 2x);
	background-image: image-set("./../assets/img/hero_small.jpg" 1x, "./../assets/img/hero_large.jpg" 2x);
	background-size: cover;
	background-position: center;
	height: 654px;
}

@media (max-width: 530px) {
	.img {
		background-image: url('./../assets/img/hero_smallest.jpg');
		background-image: -webkit-image-set('./../assets/img/hero_smallest.jpg' 1x, './../assets/img/hero_smallest--hi-dpi.jpg' 2x);
		background-image: image-set('./../assets/img/hero_smallest.jpg' 1x, './../assets/img/hero_smallest--hi-dpi.jpg' 2x);
		background-size: cover;
		background-position: center;
	}
}

@media (min-width: 530px) {
	.img {
		background-image: url('./../assets/img/hero_smaller.jpg');
		background-image: -webkit-image-set('./../assets/img/hero_smaller.jpg' 1x, './../assets/img/hero_smaller--hi-dpi.jpg' 2x);
		background-image: image-set('./../assets/img/hero_smaller.jpg' 1x, './../assets/img/hero_smaller--hi-dpi.jpg' 2x);
		background-size: cover;
		background-position: center;
	}
}

@media (min-width: 640px) {
	.img {
		background-image: url('./../assets/img/hero_small.jpg');
		background-image: -webkit-image-set('./../assets/img/hero_small.jpg' 1x, './../assets/img/hero_small--hi-dpi.jpg' 2x);
		background-image: image-set('./../assets/img/hero_small.jpg' 1x, './../assets/img/hero_small--hi-dpi.jpg' 2x);
		background-size: cover;
		background-position: center;
	}
}

@media (min-width: 990px) {
	.img {
		background-image: url('./../assets/img/hero_medium.jpg');
		background-image: -webkit-image-set('./../assets/img/hero_medium.jpg' 1x, './../assets/img/hero_medium--hi-dpi.jpg' 2x);
		background-image: image-set('./../assets/img/hero_medium.jpg' 1x, './../assets/img/hero_medium--hi-dpi.jpg' 2x);
		background-size: cover;
		background-position: center;
	}
}

@media (min-width: 1380px) {
	.img {
		background-image: url('./../assets/img/hero_large.jpg');
		background-image: -webkit-image-set('./../assets/img/hero_large.jpg' 1x, './../assets/img/hero_large--hi-dpi.jpg' 2x);
		background-image: image-set('./../assets/img/hero_large.jpg' 1x, './../assets/img/hero_large--hi-dpi.jpg' 2x);
		background-size: cover;
		background-position: center;
	}
}

@media (min-width: 1920px) {
	.img {
		background-image: url('./../assets/img/hero_large--hi-dpi.jpg');
		background-image: -webkit-image-set('./../assets/img/hero_large--hi-dpi.jpg' 1x);
		background-image: image-set('./../assets/img/hero_large--hi-dpi.jpg' 1x);
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}
}
</style>
