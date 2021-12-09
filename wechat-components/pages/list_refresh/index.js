// pages/record/record.js

import list from './data.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    size: 10,
    loading: false,
    allloaded: false,
    list: []
  },

  // 加载更多
  loadmore({
    detail
  }) {
    this.getList().then(res => {
      detail.success();
    });
  },
  // 刷新
  refresh({
    detail
  }) {
    this.setData({
      list: [],
      loading: false,
      allloaded: false,
      page: 0
    })
    this.getList().then(res => {
      detail.success();
    });
  },
  getList() {
    return new Promise((resolve, reject) => {
      if (this.data.loading || this.data.allloaded) {
        resolve();
        return;
      }
      this.setData({
        loading: true
      })
      setTimeout(() => {
        let resData = [].concat(JSON.parse(JSON.stringify(list)));
        let addList = resData.slice(this.data.size * this.data.page, (this.data.page + 1) * this.data.size);
        let newList = this.data.list.concat(addList)
        if (addList.length < this.data.size) {
          this.setData({
            allloaded: true
          })
        }
        this.setData({
          list: newList,
          loading: false,
          page: this.data.page + 1
        })
        resolve();
      }, 500)
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
    this.getList();
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