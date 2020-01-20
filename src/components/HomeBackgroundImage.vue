<template>
	<v-row>
		<v-col class="text-center pa-0" cols="12">
			<div class="img">
				<HomeSubscribeAuth />
			</div>
		</v-col>
	</v-row>
</template>

<script>
import HomeSubscribeAuth from './../components/HomeSubscribeAuth';

export default {
	name: 'HomeBackgroundImage',
	components: {
		HomeSubscribeAuth
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
