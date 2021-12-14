// pages/record/record.js

var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    tabList: [{
        id: 0,
        title: "全部"
      },
      {
        id: 1,
        title: "健康"
      },
      {
        id: 2,
        title: "情感"
      },
      {
        id: 3,
        title: "职场"
      },
      {
        id: 4,
        title: "育儿"
      },
      {
        id: 5,
        title: "纠纷"
      },
      {
        id: 6,
        title: "青春"
      },
      {
        id: 7,
        title: "养生"
      },
      {
        id: 8,
        title: "其他"
      },
    ],
    //假数据
    expertList: [{
        img: "avatar.png",
        name: "欢顔",
        tag: "知名情感博主",
        answer: 134,
        listen: 2234
      },
      {
        img: "avatar.png",
        name: "欢顔",
        tag: "知名情感博主",
        answer: 134,
        listen: 2234
      },
      {
        img: "avatar.png",
        name: "欢顔",
        tag: "知名情感博主",
        answer: 134,
        listen: 2234
      },
      {
        img: "avatar.png",
        name: "欢顔",
        tag: "知名情感博主",
        answer: 134,
        listen: 2234
      },
      {
        img: "avatar.png",
        name: "欢顔",
        tag: "知名情感博主",
        answer: 134,
        listen: 2234
      },
      {
        img: "avatar.png",
        name: "欢顔",
        tag: "知名情感博主",
        answer: 134,
        listen: 2234
      },
      {
        img: "avatar.png",
        name: "欢顔",
        tag: "知名情感博主",
        answer: 134,
        listen: 2234
      },
      {
        img: "avatar.png",
        name: "欢顔",
        tag: "知名情感博主",
        answer: 134,
        listen: 2234
      },
      {
        img: "avatar.png",
        name: "欢顔",
        tag: "知名情感博主",
        answer: 134,
        listen: 2234
      },
    ]

  },

  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    // 高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  }




})