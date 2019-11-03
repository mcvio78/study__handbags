<template>
	<v-container fluid class="fill-height pa-0 purple lighten-5">
		<!--<h1>Homepage</h1>-->
		<v-row>
			<v-col>
				<!--				<img src="cat-200px.jpg" alt="sugar free cat" width="200"-->
				<!--				     srcset="cat-200px.jpg 1x, -->
				<!--             cat-400px.jpg 2x, -->
				<!--             cat-600px.jpg 3x,-->
				<!--             cat-800px.jpg 4x">-->

				<!--				<img src="./../client/img/hero/heroFallback_640x654.jpg" :alt="myDescription" width="100%"-->
				<!--				     srcset="./../client/img/hero/heroFallback_640x654.jpg 1x,-->
				<!--             ./../client/img/hero/hero_990x654.jpg 2x,-->
				<!--             ./../client/img/hero/hero_1380x654.jpg 3x,-->
				<!--             ./../client/img/hero/hero_1920x654.jpg 4x">-->

				<picture>
					<source
						srcset="
						./../client/img/hero/hero_1920x654.jpg 1920w 1x,
						./../client/img/hero/hero_3840x1308.jpg 3840 2x"
						media="(min-width: 1380px)"
					/>
					<source
						srcset="
						./../client/img/hero/hero_1380x654.jpg 1380w 1x,
						./../client/img/hero/hero_2760x1308.jpg 2760 2x"
						media="(min-width: 990px)"
					/>
					<source
						srcset="
						./../client/img/hero/hero_990x654.jpg 990w 1x,
						./../client/img/hero/hero_1980x1308.jpg 1980w 2x"
						media="(min-width: 640px)"
					/>
					<source
						srcset="
						./../client/img/hero/hero_640x654.jpg 640w 1x,
						./../client/img/hero/hero_1280x1308.jpg 1280w 2x"
					/>
					<img src="./../client/img/hero/heroFallback_640x654.jpg" :alt="myDescription" />
				</picture>

				<!--				<v-img-->
				<!--					sizes="-->
				<!--					(min-width: 1380px) 1920w,-->
				<!--            (min-width: 990px) 1380w,-->
				<!--				     (min-width: 640px) 990w"-->
				<!--					:srcset="-->
				<!--						`-->
				<!--					${heroLarge} 1920w,-->
				<!--					${heroMedium} 1380w,-->
				<!--					${heroSmall} 990w,-->
				<!--					${heroSmaller} 640w-->
				<!--					`-->
				<!--					"-->
				<!--					:src="`${heroSmaller}`"-->
				<!--					:alt="myDescription"-->
				<!--				></v-img>-->
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'Home',
	data() {
		return {
			// heroLarge: require('./../client/img/hero/hero_1920x654.jpg'),
			// heroLargeHiDpi: require('./../client/img/hero/hero_3840x1308.jpg'),
			//
			// heroMedium: require('./../client/img/hero/hero_1380x654.jpg'),
			// heroMediumHiDpi: require('./../client/img/hero/hero_2760x1308.jpg'),
			//
			// heroSmall: require('./../client/img/hero/hero_990x654.jpg'),
			// heroSmallHiDpi: require('./../client/img/hero/hero_1980x1308.jpg'),
			//
			// heroSmaller: require('./../client/img/hero/heroFallback_640x654.jpg'),
			// heroSmallerHiDpi: require('./../client/img/hero/hero_1280x1308.jpg'),

			myDescription: 'An Image of a couple of Handbags.'
		};
	}
};
</script>
