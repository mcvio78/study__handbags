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
					image: require('./../server/img/patrizia_01/patrizia-london--preview-lo-dpi.jpg'),
					quantity: 3
				},
				patrizia_02: {
					id: 'p02',
					name: 'Patrizia Dots',
					price: 40,
					quantity: 1
				},
				patrizia_03: {
					id: 'p03',
					name: 'Patrizia Flowers',
					price: 40,
					quantity: 5
				},
				patrizia_04: {
					id: 'p04',
					name: 'Patrizia Painting',
					price: 40,
					quantity: 7
				},
				patrizia_05: {
					id: 'p05',
					name: 'Patrizia Art',
					price: 40,
					quantity: 11
				},
				patrizia_06: {
					id: 'p06',
					name: 'Patrizia Aqua',
					price: 40,
					quantity: 2
				},
				patrizia_07: {
					id: 'p07',
					name: 'Patrizia Venice',
					price: 40,
					quantity: 8
				},
				patrizia_08: {
					id: 'p08',
					name: 'Patrizia U.S.',
					price: 40,
					quantity: 9
				},
				patrizia_09: {
					id: 'p09',
					name: 'Patrizia Cuzco',
					price: 40,
					quantity: 14
				},
				patrizia_10: {
					id: 'p10',
					name: 'Patrizia Mandala',
					price: 40,
					quantity: 5
				}
			},
			olivia: {
				olivia_1: {
					name: 'Olivia Owl',
					price: 35,
					quantity: 6
				},
				olivia_2: {
					name: 'Olivia Love',
					price: 35,
					quantity: 8
				},
				olivia_3: {
					name: 'Olivia Crane',
					price: 35,
					quantity: 11
				},
				olivia_4: {
					name: 'Olivia Marilyn',
					price: 35,
					quantity: 1
				},
				olivia_5: {
					name: 'Olivia Cinquecento',
					price: 35,
					quantity: 9
				},
				olivia_6: {
					name: 'Olivia B&W',
					price: 35,
					quantity: 6
				},
				olivia_7: {
					name: 'Olivia Route 66',
					price: 35,
					quantity: 7
				}
			},
			melania: {
				melania_1: {
					name: 'Melania Military',
					price: 65,
					quantity: 12
				},
				melania_2: {
					name: 'Melania Pop Art',
					price: 65,
					quantity: 4
				},
				melania_3: {
					name: 'Melania Sneakers',
					price: 65,
					quantity: 5
				},
				melania_4: {
					name: 'Melania Ballerina',
					price: 65,
					quantity: 3
				},
				melania_5: {
					name: 'Melania Vogue',
					price: 65,
					quantity: 11
				}
			},
			anna: {
				anna_1: {
					name: 'Anna Crane',
					price: 25,
					quantity: 9
				},
				anna_2: {
					name: 'Anna Cats',
					price: 25,
					quantity: 11
				},
				anna_3: {
					name: 'Anna Piano',
					price: 25,
					quantity: 7
				},
				anna_4: {
					name: 'PatriziAnna Sneakers',
					price: 25,
					quantity: 2
				},
				anna_5: {
					name: 'Anna B&W',
					price: 25,
					quantity: 3
				},
				anna_6: {
					name: 'Annaa Pink Flowers',
					price: 25,
					quantity: 6
				},
				anna_7: {
					name: 'Anna Blue Flowers',
					price: 25,
					quantity: 1
				},
				anna_8: {
					name: 'Anna Route 66',
					price: 25,
					quantity: 11
				},
				anna_9: {
					name: 'Anna Black Flowers',
					price: 25,
					quantity: 2
				},
				anna_10: {
					name: 'Anna Black Cat',
					price: 25,
					quantity: 12
				}
			}
		},
		mutations: {},
		actions: {}
	}
});
