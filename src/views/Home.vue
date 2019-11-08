<template>
	<v-container fluid class="pa-0 purple lighten-5" height="100%">
		<!--<h1>Homepage</h1>-->
		<v-row>
			<v-col class="text-center pa-0" cols="12">
				<picture>
					<source
						type="image/jpg"
						media="(min-width: 1380px)"
						srcset="
							./../client/img/hero-optimized/hero_large.jpg         1920w,
							./../client/img/hero-optimized/hero_large--hi-dpi.jpg 3840w
						"
					/>
					<source
						type="image/jpg"
						media="(min-width: 990px)"
						srcset="
							./../client/img/hero-optimized/hero_medium.jpg         1380w,
							./../client/img/hero-optimized/hero_medium--hi-dpi.jpg 2760w
						"
					/>
					<source
						type="image/jpg"
						media="(min-width: 640px)"
						srcset="
							./../client/img/hero-optimized/hero_small.jpg          990w,
							./../client/img/hero-optimized/hero_small--hi-dpi.jpg 1980w
						"
					/>
					<source
						type="image/jpg"
						media="(min-width: 530px)"
						srcset="
							./../client/img/hero-optimized/hero_smaller.jpg          640w,
							./../client/img/hero-optimized/hero_smaller--hi-dpi.jpg 1280w
						"
					/>
					<source
						type="image/jpg"
						srcset="
							./../client/img/hero-optimized/hero_smallest.jpg          530w,
							./../client/img/hero-optimized/hero_smallest--hi-dpi.jpg 1060w
						"
					/>
					<img src="./../client/img/hero-optimized/hero_smallest--fallback.jpg" :alt="myDescription" />
				</picture>
			</v-col>
		</v-row>
		<v-row class='justify-center'>
			<v-col cols="11" class='col-md-10'>
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


		<v-row style="height: 3vh" class="purple darken-1"> </v-row>

	</v-container>
</template>

<script>
export default {
	name: 'Home',
	data() {
		// TODO Complete responsive photos with relative paths.
		return {
			// heroLarge: require('./../client/img/hero-optimized/hero_large.jpg'),
			// heroLargeHiDpi: require('./../client/img/hero-optimized/hero_smaller--hi-dpi.jpg'),
			//
			// heroMedium: './../client/img/hero-optimized/hero_medium.jpg',
			// heroMediumHiDpi: require('./../client/img/hero-optimized/hero_medium--hi-dpi.jpg'),
			//
			// heroSmall: require('./../client/img/hero-optimized/hero_small.jpg'),
			// heroSmallHiDpi: require('./../client/img/hero-optimized/hero_small.jpg'),
			//
			// heroSmaller: require('./../client/img/hero-optimized/hero_smaller.jpg'),
			// heroSmallerHiDpi: require('./../client/img/hero-optimized/hero_smaller.jpg'),
			//
			myDescription: 'An Image of a couple of Handbags.'
		};
	}
};
</script>
