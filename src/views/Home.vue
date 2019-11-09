<template>
	<v-container fluid class="py-0 purple lighten-5" height="100%">
		<v-row>
			<v-col class="text-center pa-0" cols="12">
				<picture>
					<source
						type="image/jpg"
						media="(min-width: 1380px)"
						:srcset="heroLarge + ' 1920w, ' + heroLargeHiDpi + ' 3840w'"
					/>

					<source
						type="image/jpg"
						media="(min-width: 990px)"
						:srcset="heroMedium + ' 1380w, ' + heroMediumHiDpi + ' 2760w'"
					/>

					<source
						type="image/jpg"
						media="(min-width: 640px)"
						:srcset="heroSmall + ' 990w, ' + heroSmallHiDpi + ' 1980w'"
					/>

					<source
						type="image/jpg"
						media="(min-width: 530px)"
						:srcset="heroSmaller + ' 640w, ' + heroSmallerHiDpi + ' 1280w'"
					/>

					<source type="image/jpg" :srcset="heroSmallest + ' 530w, ' + heroSmallestHiDpi + ' 1060w'" />

					<img
						type="image/jpg"
						:src="heroSmallestFallback"
						:srcset="heroSmall + ' 990w, ' + heroLarge + ' 1920w'"
						:alt="myDescription"
					/>
				</picture>
			</v-col>
		</v-row>

		<v-row class="justify-center">
			<v-col cols="11" class="col-md-10">
				<h1 class="display-1 mb-2">Philosophy:</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos inventore itaque odio omnis optio rem
					sapiente suscipit tenetur velit voluptate? Alias ducimus, eveniet in itaque nobis optio rem sit vero.
				</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos inventore itaque odio omnis optio rem
					sapiente suscipit tenetur velit voluptate? Alias ducimus, eveniet in itaque nobis optio rem sit vero.
				</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos inventore itaque odio omnis optio rem
					sapiente suscipit tenetur velit voluptate? Alias ducimus, eveniet in itaque nobis optio rem sit vero.
				</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos inventore itaque odio omnis optio rem
					sapiente suscipit tenetur velit voluptate? Alias ducimus, eveniet in itaque nobis optio rem sit vero.
				</p>
				<p>
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
		// TODO Complete responsive photos with relative paths.
		return {
			myDescription: 'An Image of a couple of Handbags.'
		};
	},
	computed: {
		heroLarge() {
			return require('./../client/img/hero-optimized/hero_large.jpg');
		},
		heroLargeHiDpi() {
			return require('./../client/img/hero-optimized/hero_large--hi-dpi.jpg');
		},
		heroMedium() {
			return require('./../client/img/hero-optimized/hero_medium.jpg');
		},
		heroMediumHiDpi() {
			return require('./../client/img/hero-optimized/hero_medium--hi-dpi.jpg');
		},
		heroSmall() {
			return require('./../client/img/hero-optimized/hero_small.jpg');
		},
		heroSmallHiDpi() {
			return require('./../client/img/hero-optimized/hero_small--hi-dpi.jpg');
		},
		heroSmaller() {
			return require('./../client/img/hero-optimized/hero_smaller.jpg');
		},
		heroSmallerHiDpi() {
			return require('./../client/img/hero-optimized/hero_smaller--hi-dpi.jpg');
		},
		heroSmallest() {
			return require('./../client/img/hero-optimized/hero_smallest.jpg');
		},
		heroSmallestHiDpi() {
			return require('./../client/img/hero-optimized/hero_smallest--hi-dpi.jpg');
		},
		heroSmallestFallback() {
			return require('./../client/img/hero-optimized/hero_smallest--fallback.jpg');
		}
	}
};
</script>
