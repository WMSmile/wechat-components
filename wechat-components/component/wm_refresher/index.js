Component({
  properties: {
    contentHeight: {
      type: Number,
      value: 200,
    },

    // 下拉刷新 
    refreshStartStr: {
      type: String,
      value: "下拉刷新"
    },
    refreshShowStr: {
      type: String,
      value: "释放立即刷新"
    },
    refreshLoadingStr: {
      type: String,
      value: "正在刷新中..."
    },
    // 上拉加载更多
    loadStartStr: {
      type: String,
      value: "上拉加载更多"
    },
    loadShowStr: {
      type: String,
      value: "释放加载更多"
    },
    loadLoadingStr: {
      type: String,
      value: "正在加载更多中..."
    },

    loadFinishStr: {
      type: String,
      value: "已经加载全部数据"
    },


  },
  data: {
    loading: false, //是否在加载中  
    pull: true, //下拉刷新状态 false释放刷新状态  上拉加载更多状态   false释放加载更多状态
    refreshing_text: "下拉刷新",
    loading_text: "上拉加载更多",
    loadingHeight: 90, //正在加载时高度
    refreshHeight: 0, //刷新布局高度  
    loadMoreHeight: 0, //加载更多布局高度
    // scrolling:false,//滚动中
    isUpper: true, //scroll-view 滚动条默认在最上
    isLower: false,
    downY: 0, //触摸时Y轴坐标  
    isLoadFinished: false,


  },
  methods: {

    //下拉  滚动条 滚动顶底部时触发
    upper: function () {
      console.log("upper....");
      this.data.isUpper = true;
    },
    //上拉  滚动条 滚动到底部时触发
    lower: function () {

      if (this.data.isLoadFinished) {
        this.data.isLower = false;
        return
      }
      console.log("lower...")
      this.data.isLower = true;

    },
    start: function (e) {
      console.log('start ');
      if (this.data.loading) {
        return;
      }
      var startPoint = e.touches[0]
      var clientY = startPoint.clientY;
      this.setData({
        downY: clientY,
        refreshHeight: 0,
        loadMoreHeight: 0,
        pull: true,
        refreshing_text: this.properties.refreshStartStr,
        loading_text: this.properties.loadStartStr
      });
    },
    end: function (e) {
      if (this.data.refreshing) {
        return;
      }
      console.log('end');
      //释放开始刷新
      var height = this.data.loadingHeight;
      if (this.data.refreshHeight > this.data.loadingHeight) {
        this.setData({
          refreshHeight: height,
          loading: true,
          pull: false,
          refreshing_text: this.properties.refreshLoadingStr
        });
        this.updateFinishStatua(false);
        this.triggerEvent("pullToRefresh")
      } else if (this.data.loadMoreHeight > height) {
        this.setData({
          loadMoreHeight: height,
          loading: true,
          pull: false,
          loading_text: this.properties.loadLoadingStr
        });
        this.triggerEvent("pushToLoadMore")
      } else {
        this.setData({
          refreshHeight: 0,
          loadMoreHeight: 0,
          loading: false,
          pull: true
        })
      }

    },
    loadFinish: function () {
      var that = this;
      setTimeout(function () {
        console.log("loadFinish >>>>>> ")
        //2s后刷新结束
        that.setData({
          refreshHeight: 0,
          loadMoreHeight: 0,
          loading: false
        })
      }, 1000);
    },
    move: function (e) {
      // console.log("move...", 'loading:' + this.data.loading + 'isLower:' + this.data.isLower);
      if (this.data.loading) {
        return;
      }
      var movePoint = e.changedTouches[0]
      var moveY = (movePoint.clientY - this.data.downY) * 0.6;
      //1.下拉刷新
      if (this.data.isUpper && moveY > 0) {
        console.log("下拉...dy:", moveY);
        this.setData({
          refreshHeight: moveY
        })
        if (moveY > this.data.loadingHeight) {
          this.setData({
            pull: false,
            refreshing_text: this.properties.refreshShowStr
          })
        } else {
          this.setData({
            pull: true,
            refreshing_text: this.properties.refreshStartStr
          })
        }
      } else if (this.data.isLower && moveY < 0) { //2上拉加载更多
        console.log("上拉...dy:", moveY);
        this.setData({
          loadMoreHeight: Math.abs(moveY)
        })
        if (moveY > this.data.loadingHeight) {
          this.setData({
            pull: false,
            loading_text: this.properties.loadShowStr
          })
        } else {
          this.setData({
            pull: true,
            refreshing_text: this.properties.loadStartStr
          })
        }
      }
    },
    updateContentHeight: function (height) {
      this.setData({
        contentHeight: height
      })
    },
    updateFinishStatua: function (isFinished) {
      this.setData({
        isLoadFinished: isFinished
      })
    },
    finishedLoadMore(){
      this.updateFinishStatua(true);
    },



  }
})

//使用实例