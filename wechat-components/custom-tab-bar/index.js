Component({
  data: {
    color: "#515151",
    selectedColor: "#DAA520",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: "/images/tabbar/home.png",
        selectedIconPath: "/images/tabbar/home_selected.png"
      },
      {
        pagePath: "/pages/chart/chart",
        text: "图表",
        iconPath: "/images/tabbar/chart.png",
        selectedIconPath: "/images/tabbar/chart-select.png"
      },
      {
        pagePath: "/pages/record/record",
        bulge:true,
        iconPath: "/images/tabbar/post.png",
        selectedIconPath: "/images/tabbar/post-select.png"
      },
      {
        pagePath: "/pages/message/message",
        text: "消息",
        iconPath: "/images/tabbar/message.png",
        selectedIconPath: "/images/tabbar/message-select.png"
      },
      {
        pagePath: "/pages/mine/index",
        text: "我的",
        iconPath: "/images/tabbar/mine.png",
        selectedIconPath: "/images/tabbar/mine_selected.png"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      console.log(e)
      const data = e.currentTarget.dataset
      var url = data.path

      //可以根据功能跳转新的页面 页面不要放到tabbar里面
      // if(data.bulge){
      //   console.log(url)
      //   wx.navigateTo({
      //     url: url,
      //   })
      //   return
      // }
      wx.switchTab({url}) 
    }
  }
})

// note: 在对应的xml文件实现以下方法，且此custom-tab-bar必须在一级目录下，selected  是对应的索引 0开始
// onShow: function () {
//   if (typeof this.getTabBar === 'function' && this.getTabBar()) {
//     this.getTabBar().setData({
//       selected: 4
//     })
//   }
// },