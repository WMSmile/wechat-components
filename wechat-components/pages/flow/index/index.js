//index.js
//获取应用实例
const util = require('../../../utils/util.js');
var network_util = require('../../../utils/network_util.js');
var app = getApp()

var that ;

Page({
  data: {
    /**
     * 页面配置
     */
    winWidth: 0,
    winHeight: 0,
    // 精选数据
    datalist: [],
    // 日报数据
    dataThemes: [],

    dataListDateCurrent: 20161106, // 当前日期current
    dataListDateCount: 0,
    imagesHeightList: []
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
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
    that.loadData();
  },
  loadData: function () {
    this.requestDataList(true);
  },

  /**
   * 事件处理
   * scrolltolower 自动加载更多
   */
  scrolltolower: function (e) {

    var that = this;

    // 加载更多 loading
    that.setData({
      hothidden: true
    })

    // 如果加载数据超过10条
    if (this.data.dataListDateCount >= 8) {

      // 加载更多 loading
      that.setData({
        hothidden: false
      });

    } else {

      this.requestDataList(false);

    }
  },

      /**
     * 发送请求数据
     */
  requestDataList: function(isheader){

    var currentDate = this.data.dataListDateCurrent;

    var url = 'http://news-at.zhihu.com/api/4/' + "news/before/" + currentDate;
    network_util._get(url,
      function (res) {
        console.log(res);
        var arr = res.data;
        console.log(arr);
        var format = util.getFormatDate_mdw(arr.date);
  
        // 格式化日期方便加载指定日期数据
        // 格式化日期获取星期几方便显示
        arr["dateDay"] = format.dateDay;
  
        // 获取当前数据进行保存
        if(isheader){
          that.data.datalist = [arr];
        }else{
          that.data.datalist = that.data.datalist.concat(arr) 
        }

        // 然后重新写入数据
        that.setData({
          datalist: that.data.datalist, // 存储数据
          dataListDateCurrent: arr.date,
          dataListDateCount: that.data.dataListDateCount + 1 // 统计加载次数
        });
      },
      function (err) {
        console.log(err);
      });

  },




  WxMasonryImageLoad: function (e) {
    var that = this;
    console.log(e.detail.height);
    // var colWidth = (that.data.winWidth - 20) / 2;
    // var imageId = e.target.id;
    // var imageOWidth = e.detail.width;
    // var imageOHeight = e.detail.height;

    // var colImageHeight = imageOWidth * colWidth / imageOHeight;
    // var temImagesHeightList = that.imagesHeightList;
    // temImagesHeightList[imageId] = { width: colWidth, height: colImageHeight }
    // that.setData({
    //   imagesHeightList: temImagesHeightList
    // });

  }

})