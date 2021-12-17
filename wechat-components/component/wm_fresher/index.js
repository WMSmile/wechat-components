Component({
	properties: {
		height: {
			type: Number,
			value: 0
		},
		upperThreshold: {
			type: Number,
			value: 80
		},
		lowerThreshold: {
			type: Number,
			value: 30
		},
		refreshText: {
			type: String,
			value: '下拉刷新'
		},
		noMoreText: {
			type: String,
			value: '数据已全部加载'
		},
		empty: {
			type: Boolean,
			value: false
		}
	},

	data: {
		refresherH: 0,
		refreshing: false,
		noMore: false,
		upperText: '下拉刷新',
		trackData: {
			refresherH: 60,
			upperDistance: 80,
			lowerDistance: 30,
			operation: {}
		}
	},

	observers: {
		height(height) {
			if (typeof height !== 'number' || height < 60) {
				throw new Error('height is expected a number and can not be less than 60.');
			}
			this.setData({
				refresherH: height,
				'trackData.refresherH': height,
				'trackData.operation': {}
			});
		},
		upperThreshold(threshold) {
			if (typeof threshold !== 'number' || threshold < 60) {
				throw new Error('upperThreshold is expected a number and can not be less than 60.');
			}
			this.setData({
				'trackData.upperDistance': threshold,
				'trackData.operation': {}
			});
		},
		lowerThreshold(threshold) {
			if (typeof threshold !== 'number' || threshold < 0) {
				throw new Error('lowerThreshold is expected a number and can not be less than 0.');
			}
			this.setData({
				'trackData.lowerDistance': threshold,
				'trackData.operation': {}
			});
		}
	},

	ready() {
		const { height } = this.data;
		if (height < 1) {
			const { windowHeight } = wx.getSystemInfoSync();
			this.setData({
				refresherH: windowHeight,
				'trackData.refresherH': windowHeight,
				'trackData.operation': {}
			});
		}
	},
	methods: {
		onRefreshing() {
			this.refreshingStartTime = Date.now();
			this.setData({
				refreshing: true,
				upperText: '正在刷新'
			});
		},
		stopRefresh() {
			Promise.resolve()
				.then(() => {
					return new Promise((resolve) => {
						const duration = Date.now() - this.refreshingStartTime;
						if (duration > 500) {
							return resolve();
						} else {
							setTimeout(() => {
								return resolve();
							}, 500 - duration);
						}
					});
				})
				.then(() => {
					this.setData({
						'trackData.operation': {
							stopRefresh: true
						},
						refreshing: false,
						upperText: this.data.refreshText
					});
				});
		},
		setNoMore() {
			this.setData({
				'trackData.operation': {
					setNoMore: true
				},
				noMore: true
			});
		},
		resetNoMore(args) {
			const { noMore } = args;
			this.setData({
				noMore: noMore
			});
		},
		stopLoadMore() {
			this.setData({
				'trackData.operation': {
					stopLoadingMore: true
				}
			});
		}
	}
});
