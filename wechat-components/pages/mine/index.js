// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerList: [{
        title: '我的任务',
        count: 1,
        path: '/pages/info/info'
      },
      {
        title: '我的订单',
        count: 2,
        path: '/pages/info/info'
      },
      {
        title: '我的收入',
        count: 3,
        path: '/pages/info/info'
      },
    ],
    dataList: [{
        displayName: '个人信息',
        isShow:true,
        order: 1,
        path: '/pages/info/info'
      },

      {
        displayName: '我的客服',
        isShow:false,
        order: 2,

      },
      {
        displayName: '我的统计',
        isShow:true,
        order: 3
      },
      {
        displayName: '绑定资产',
        isShow:true,
        order: 4,
        path: '/pages/service/service'
      },
      {
        displayName: '退出登录',
        isShow:true,
        order: 5,
        path: '/pages/user/login/login'
      }
    ]

  },
  // 点击下面的item触发
  clickItem: function (e) {
    let {
      path,
      order
    } = e.currentTarget.dataset

    wx.showToast({
      icon:"none",
      title: order + '点击了',
      duration: 1 * 1000
    })

    console.log(e)
    if (order === 5) {
      wx.clearStorage()
      wx.clearStorageSync();
      wx.reLaunch({
        url: path,
      })
      return

    }
    wx.redirectTo({
      url: path,
    });
  },

  // 点击头像可以修改数据
  clickInfo: function () {
    wx.showToast({
      icon:"none",
      title: '头像点击了',
      duration: 1 * 1000
    })
    wx.navigateTo({
      url: '/pages/info/info'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
        selected: 4
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

  }
})