// pages/record/record.js

var network_util = require('../../../utils/network_util.js');
var json_util = require('../../../utils/json_util.js');
var md5 = require('../../../utils/md5.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    list: [],
    page: 1,
    size: 20,
    hasMore: true,
    hasRefesh: false,
    scrollHeight: 300,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
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

    // 获取屏幕高度
    let window_height = wx.getSystemInfoSync().windowHeight
    this.setData({
      scrollHeight: window_height
    })
    this.requestListData(true);

  },
  // 上拉加载更多
  loadMore: function (e) {
    console.log("loadMore>>>>>>")
    this.requestListData(false)
  },
  //下来刷新
  refesh: function (e) {
    console.log("refesh>>>>>>")
    this.requestListData(true);
  },
  // 请求数据 网易新闻
  requestListData: function (isheader) {
    that.setData({
      hasRefesh: true,
    });
    
    if (isheader) {
      that.data.page = 1;
    } else {
      if (!this.data.hasMore) {
        return;
      }
      ++that.data.page;
    }
    var url = 'https://api.apiopen.top/getWangYiNews?page=' + (that.data.page) + '&count=10';
    network_util._get(url,
      function (res) {
        console.log(res);
        if (isheader) {
          that.data.list = res.data.result
        } else {
          that.data.list = that.data.list.concat(res.data.result)
        }
        console.log(that.data.list.length,that.data.list)
        that.setData({
          list: that.data.list,
          hasRefesh: false,
        });
      },
      function (err) {
        console.log(err);
      })



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