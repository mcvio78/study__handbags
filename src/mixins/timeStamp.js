export const timeStamp = {
	methods: {
		createTimeStamp() {
			if (!Date.now) {
				return (Date.now = function() {
					return new Date().getTime();
				});
			}
			return Date.now();
		},

		convertToDate(timeStamp) {
			return new Date(Number(timeStamp)).toLocaleDateString('en-US');
		},

		convertToTime(timeStamp) {
			return new Date(Number(timeStamp)).toLocaleTimeString('en-US');
		}
	}
};
