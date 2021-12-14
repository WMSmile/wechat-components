//index.js
//获取应用实例
const util = require('../../../utils/util.js');
var network_util = require('../../../utils/network_util.js');
var app = getApp()

var that ;

Page({
  data: {
    list: [],
    page: 1,
    size: 20,
    hasMore: true,
    hasRefesh: false,
    scrollHeight: 300,
  },

  onLoad: function () {
    console.log('onLoad')
    that = this
    /**
     * 获取系统信息
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    // that.loadData();
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







})