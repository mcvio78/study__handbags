export default {
	methods: {
		timeStamp() {
			if (!Date.now) {
				return (Date.now = function() {
					return new Date().getTime();
				});
			}
			return Date.now();
		}
	}
};
