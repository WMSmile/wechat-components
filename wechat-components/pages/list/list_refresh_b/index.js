// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 注意获取时机，等组件渲染完成后再获取，避免拿到的是null
    this.arefresher = this.selectComponent('#arefresherid');
    const list = this.getList(20, []);
    this.setData({
      list
    });
  },
  onRefresh() {
    console.log('on refresh');
    setTimeout(() => {
      const list = this.getList(20, []);
      this.setData({
        list
      });
      this.arefresher.stopRefresh();
    }, 3000);
  },
  onLoadMore() {
    console.log('on load more');
    if (this.data.list.length >= 100) {
      this.arefresher.setNoMore();
      return;
    }
    setTimeout(() => {
      const newList = this.getList(20, this.data.list.slice(0));
      if (newList.length <= 100) {
        this.setData({
          list: newList
        });
      }
      this.arefresher.stopLoadMore();
    }, 2000);
  },
  getList(count, list) {
    const length = list.length;
    const range = length + count;
    const newList = [];
    for (let i = length; i < range; i++) {
      newList.push({
        text: i,
        color: this.randomColor()
      });
    }
    return list.concat(newList);
  },
  randomColor() {
    const colorStr = Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase();
    const length = colorStr.length;
    const prefixStr = '000000'.substring(0, 6 - length);
    return `#${prefixStr}${colorStr}`;
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