// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperitems: [
      // text标题，hint介绍，url跳转页面，icon图标，tips备注，tap点击事件(与url二选一)
      { text: '下拉刷新', hint: '自定义下拉刷新', url: '../error/update', icon: '../../images/home/home-test.png', tips: '', tap: '' },
      { text: '文字语音转换', hint: '语音转文字、文字转语音', url: '../error/update', icon: '../../images/home/home-test.png', tips: '', tap: '' },
      { text: '图片转换', hint: '图片转ASCII字符图片', url: '../error/update', icon: '../../images/home/home-test.png', tips: '', tap: '' },
      { text: '聊天机器人', hint: '聊天机器人陪聊', url: '../imRobot/chat', icon: '../../images/home/home-test.png', tips: '', tap: '' }
    ],
    menuitems: [
      // text标题，hint介绍，url跳转页面，icon图标，tips备注，tap点击事件(与url二选一)
      { text: '下拉刷新', hint: '自定义下拉刷新', url: '../list_refresh/index', icon: '../../images/home/home-test.png', tips: '', tap: '' },
      { text: '下拉刷新2', hint: '自定义下拉刷新2', url: '../list_refresh_a/index', icon: '../../images/home/home-test.png', tips: '', tap: '' },
      { text: '文字语音转换', hint: '语音转文字、文字转语音', url: '../error/update', icon: '../../images/home/home-test.png', tips: '', tap: '' },
      { text: '图片转换', hint: '图片转ASCII字符图片', url: '../error/update', icon: '../../images/home/home-test.png', tips: '', tap: '' },
      { text: '聊天机器人', hint: '聊天机器人陪聊', url: '../imRobot/chat', icon: '../../images/home/home-test.png', tips: '', tap: '' }
    ],
 

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
        selected: 0
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