import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		handbags: {
			patrizia: {
				patrizia_01: {
					id: 'p01',
					name: 'Patrizia London',
					price: 40,
					imagePreviewLo: require('./../server/img/patrizia/patrizia_01/patrizia-london-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/patrizia/patrizia_01/patrizia-london-preview--hi-dpi.jpg'),
					imageLo: require('./../server/img/patrizia/patrizia_01/patrizia-london--lo-dpi.jpg'),
					imageHi: require('./../server/img/patrizia/patrizia_01/patrizia-london--hi-dpi.jpg'),
					quantity: 3
				},
				patrizia_02: {
					id: 'p02',
					name: 'Patrizia Dots',
					price: 40,
					imagePreviewLo: require('./../server/img/patrizia/patrizia_02/patrizia-dots-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/patrizia/patrizia_02/patrizia-dots-preview--hi-dpi.jpg'),
					imageLo: require('./../server/img/patrizia/patrizia_02/patrizia-dots--lo-dpi.jpg'),
					imageHi: require('./../server/img/patrizia/patrizia_02/patrizia-dots--hi-dpi.jpg'),
					quantity: 1
				},
				patrizia_03: {
					id: 'p03',
					name: 'Patrizia Flowers',
					imagePreviewLo: require('./../server/img/patrizia/patrizia_03/patrizia-flowers-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/patrizia/patrizia_03/patrizia-flowers-preview--hi-dpi.jpg'),
					imageLo: require('./../server/img/patrizia/patrizia_03/patrizia-flowers--lo-dpi.jpg'),
					imageHi: require('./../server/img/patrizia/patrizia_03/patrizia-flowers--hi-dpi.jpg'),
					price: 40,
					quantity: 5
				},
				patrizia_04: {
					id: 'p04',
					name: 'Patrizia Painting',
					imagePreviewLo: require('./../server/img/patrizia/patrizia_04/patrizia-painting-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/patrizia/patrizia_04/patrizia-painting-preview--hi-dpi.jpg'),
					imageLo: require('./../server/img/patrizia/patrizia_04/patrizia-painting--lo-dpi.jpg'),
					imageHi: require('./../server/img/patrizia/patrizia_04/patrizia-painting--hi-dpi.jpg'),
					price: 40,
					quantity: 7
				},
				patrizia_05: {
					id: 'p05',
					name: 'Patrizia Art',
					imagePreviewLo: require('./../server/img/patrizia/patrizia_05/patrizia-art-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/patrizia/patrizia_05/patrizia-art-preview--hi-dpi.jpg'),
					imageLo: require('./../server/img/patrizia/patrizia_05/patrizia-art--lo-dpi.jpg'),
					imageHi: require('./../server/img/patrizia/patrizia_05/patrizia-art--hi-dpi.jpg'),
					price: 40,
					quantity: 11
				},
				patrizia_06: {
					id: 'p06',
					name: 'Patrizia Aqua',
					imagePreviewLo: require('./../server/img/patrizia/patrizia_06/patrizia-aqua-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/patrizia/patrizia_06/patrizia-aqua-preview--hi-dpi.jpg'),
					imageLo: require('./../server/img/patrizia/patrizia_06/patrizia-aqua--lo-dpi.jpg'),
					imageHi: require('./../server/img/patrizia/patrizia_06/patrizia-aqua--hi-dpi.jpg'),
					price: 40,
					quantity: 2
				},
				patrizia_07: {
					id: 'p07',
					name: 'Patrizia Venice',
					imagePreviewLo: require('./../server/img/patrizia/patrizia_07/patrizia-venice-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/patrizia/patrizia_07/patrizia-venice-preview--hi-dpi.jpg'),
					imageLo: require('./../server/img/patrizia/patrizia_07/patrizia-venice--lo-dpi.jpg'),
					imageHi: require('./../server/img/patrizia/patrizia_07/patrizia-venice--hi-dpi.jpg'),
					price: 40,
					quantity: 8
				},
				patrizia_08: {
					id: 'p08',
					name: 'Patrizia U.S.',
					imagePreviewLo: require('./../server/img/patrizia/patrizia_08/patrizia-us-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/patrizia/patrizia_08/patrizia-us-preview--hi-dpi.jpg'),
					imageLo: require('./../server/img/patrizia/patrizia_08/patrizia-us--lo-dpi.jpg'),
					imageHi: require('./../server/img/patrizia/patrizia_08/patrizia-us--hi-dpi.jpg'),
					price: 40,
					quantity: 9
				},
				patrizia_09: {
					id: 'p09',
					name: 'Patrizia Cusco',
					imagePreviewLo: require('./../server/img/patrizia/patrizia_09/patrizia-cusco-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/patrizia/patrizia_09/patrizia-cusco-preview--hi-dpi.jpg'),
					imageLo: require('./../server/img/patrizia/patrizia_09/patrizia-cusco--lo-dpi.jpg'),
					imageHi: require('./../server/img/patrizia/patrizia_09/patrizia-cusco--hi-dpi.jpg'),
					price: 40,
					quantity: 14
				},
				patrizia_10: {
					id: 'p10',
					name: 'Patrizia Mandala',
					imagePreviewLo: require('./../server/img/patrizia/patrizia_10/patrizia-mandala-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/patrizia/patrizia_10/patrizia-mandala-preview--hi-dpi.jpg'),
					imageLo: require('./../server/img/patrizia/patrizia_10/patrizia-mandala--lo-dpi.jpg'),
					imageHi: require('./../server/img/patrizia/patrizia_10/patrizia-mandala--hi-dpi.jpg'),
					price: 40,
					quantity: 5
				}
			},
			olivia: {
				olivia_1: {
					name: 'Olivia Owl',
					imagePreviewLo: require('./../server/img/olivia/olivia_01/olivia-owl-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/olivia/olivia_01/olivia-owl-preview--hi-dpi.jpg'),
					price: 35,
					quantity: 6
				},
				olivia_2: {
					name: 'Olivia Love',
					imagePreviewLo: require('./../server/img/olivia/olivia_02/olivia-love-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/olivia/olivia_02/olivia-love-preview--hi-dpi.jpg'),
					price: 35,
					quantity: 8
				},
				olivia_3: {
					name: 'Olivia Crane',
					imagePreviewLo: require('./../server/img/olivia/olivia_03/olivia-crane-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/olivia/olivia_03/olivia-crane-preview--hi-dpi.jpg'),
					price: 35,
					quantity: 11
				},
				olivia_4: {
					name: 'Olivia Marilyn',
					imagePreviewLo: require('./../server/img/olivia/olivia_04/olivia-marilyn-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/olivia/olivia_04/olivia-marilyn-preview--hi-dpi.jpg'),
					price: 35,
					quantity: 1
				},
				olivia_5: {
					name: 'Olivia Cinquecento',
					imagePreviewLo: require('./../server/img/olivia/olivia_05/olivia-cinquecento-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/olivia/olivia_05/olivia-cinquecento-preview--hi-dpi.jpg'),
					price: 35,
					quantity: 9
				},
				olivia_6: {
					name: 'Olivia B&W',
					imagePreviewLo: require('./../server/img/olivia/olivia_06/olivia-bw-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/olivia/olivia_06/olivia-bw-preview--hi-dpi.jpg'),
					price: 35,
					quantity: 6
				},
				olivia_7: {
					name: 'Olivia Route 66',
					imagePreviewLo: require('./../server/img/olivia/olivia_07/olivia-route66-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/olivia/olivia_07/olivia-route66-preview--hi-dpi.jpg'),
					price: 35,
					quantity: 7
				}
			},
			melania: {
				melania_1: {
					name: 'Melania Military',
					imagePreviewLo: require('./../server/img/melania/melania_01/melania-military-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/melania/melania_01/melania-military-preview--hi-dpi.jpg'),
					price: 65,
					quantity: 12
				},
				melania_2: {
					name: 'Melania Pop Art',
					imagePreviewLo: require('./../server/img/melania/melania_02/melania-pop-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/melania/melania_02/melania-pop-preview--hi-dpi.jpg'),
					price: 65,
					quantity: 4
				},
				melania_3: {
					name: 'Melania Sneakers',
					imagePreviewLo: require('./../server/img/melania/melania_03/melania-sneakers--preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/melania/melania_03/melania-sneakers--preview--hi-dpi.jpg'),
					price: 65,
					quantity: 5
				},
				melania_4: {
					name: 'Melania Ballerina',
					imagePreviewLo: require('./../server/img/melania/melania_04/melania-ballerina-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/melania/melania_04/melania-ballerina-preview--hi-dpi.jpg'),
					price: 65,
					quantity: 3
				},
				melania_5: {
					name: 'Melania Vogue',
					imagePreviewLo: require('./../server/img/melania/melania_05/melania-vogue-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/melania/melania_05/melania-vogue-preview--hi-dpi.jpg'),
					price: 65,
					quantity: 11
				}
			},
			anna: {
				anna_1: {
					name: 'Anna Crane',
					imagePreviewLo: require('./../server/img/anna/anna_01/anna-crane-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/anna/anna_01/anna-crane-preview--hi-dpi.jpg'),
					price: 25,
					quantity: 9
				},
				anna_2: {
					name: 'Anna Cats',
					imagePreviewLo: require('./../server/img/anna/anna_02/anna-cats-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/anna/anna_02/anna-cats-preview--hi-dpi.jpg'),
					price: 25,
					quantity: 11
				},
				anna_3: {
					name: 'Anna Piano',
					imagePreviewLo: require('./../server/img/anna/anna_03/anna-piano-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/anna/anna_03/anna-piano-preview--hi-dpi.jpg'),
					price: 25,
					quantity: 7
				},
				anna_4: {
					name: 'Anna Sneakers',
					imagePreviewLo: require('./../server/img/anna/anna_04/anna-sneakers-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/anna/anna_04/anna-sneakers-preview--hi-dpi.jpg'),
					price: 25,
					quantity: 2
				},
				anna_5: {
					name: 'Anna B&W',
					imagePreviewLo: require('./../server/img/anna/anna_05/anna-bw-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/anna/anna_05/anna-bw-preview--hi-dpi.jpg'),
					price: 25,
					quantity: 3
				},
				anna_6: {
					name: 'Anna Pink Flowers',
					imagePreviewLo: require('./../server/img/anna/anna_06/anna-pinkflowers-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/anna/anna_06/anna-pinkflowers-preview--hi-dpi.jpg'),
					price: 25,
					quantity: 6
				},
				anna_7: {
					name: 'Anna Blue Flowers',
					imagePreviewLo: require('./../server/img/anna/anna_07/anna-blueflowers-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/anna/anna_07/anna-blueflowers-preview--hi-dpi.jpg'),
					price: 25,
					quantity: 1
				},
				anna_8: {
					name: 'Anna Route 66',
					imagePreviewLo: require('./../server/img/anna/anna_08/anna-route-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/anna/anna_08/anna-route-preview--hi-dpi.jpg'),
					price: 25,
					quantity: 11
				},
				anna_9: {
					name: 'Anna Black Flowers',
					imagePreviewLo: require('./../server/img/anna/anna_09/anna-blackflowers-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/anna/anna_09/anna-blackflowers-preview--hi-dpi.jpg'),
					price: 25,
					quantity: 2
				},
				anna_10: {
					name: 'Anna Black Cat',
					imagePreviewLo: require('./../server/img/anna/anna_10/anna-blackcat-preview--lo-dpi.jpg'),
					imagePreviewHi: require('./../server/img/anna/anna_10/anna-blackcat-preview--hi-dpi.jpg'),
					price: 25,
					quantity: 12
				}
			}
		},
		mutations: {},
		actions: {}
	}
});
