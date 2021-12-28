//index.js
//获取应用实例
var app = getApp()
var that;
Page({
  data: {

    tabIndex: 0,

    windowHeight: 0, //获取屏幕高度  
    currentSize: 1,
    words: [],
  },

  onLoad: function () {
    that = this;


    this.refresher = this.selectComponent("#refresher"); //组件的id

    //获取屏幕高度  
    wx.getSystemInfo({
      success: function (res) {

        var s_height = res.windowHeight - (80 / res.pixelRatio) - 40 - 200
        console.log("s_height: " + s_height)
        that.setData({
          windowHeight: s_height
        })
        console.log("屏幕高度: " + res.windowHeight)
        that.refresher.updateContentHeight(s_height);
      }
    })

    //获取words  
    this.doLoadData(1, 20);


  },
  doLoadData(currendSize, PAGE_SIZE) {
    wx.showLoading({
      title: 'loading...',
    });
    setTimeout(function () {
      var length = currendSize * PAGE_SIZE;
      var startSize = ( currendSize - 1 ) * PAGE_SIZE
      console.log("currentSize >>>> ",that.data.currentSize,"length>>",length,"startSize>>>",startSize)
      for (var i = startSize; i < length; i++) {
        that.data.words.push('内容' + i);
      }
      var words = that.data.words;
      that.data.currentSize += 1;
      that.setData({
        words: words
      });
      wx.hideLoading();
      that.refresher.loadFinish();
      console.log("currentSize >>>> ",that.data.currentSize)
      if (that.data.currentSize > 2) {
        //加载完成更新
        that.refresher.finishedLoadMore();
      }


    }, 2000);
  },

  //模拟刷新数据
  refresh: function () {

    this.setData({
      words: [],
      currentSize: 1
    });
    this.doLoadData(1, 20);
  },
  //模拟加载更多数据
  loadMore: function () {
    this.doLoadData(this.data.currentSize, 20);
  },



  // tab menu 切换
  changeTab: function (e) {
    var id = e.currentTarget.id;
    var that = this;

    if (id == 'myTask') {
      this.setData({
        tabIndex: 0
      })
    }

    if (id == 'hotTask') {
      this.setData({
        tabIndex: 1
      })
    }
  },




})