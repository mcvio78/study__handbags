export default {
	methods: {
		findId(value) {
			if (value) {
				let itemNumberInCart = Object.keys(value).map(item => Number(item.split('_')[1]));

				for (let i = 0; i <= itemNumberInCart.length; i++) {
					if (itemNumberInCart.indexOf(i) === -1) {
						return `item_${i}`;
					}
				}
			} else {
				return 'item_0';
			}
		}
	}
};
