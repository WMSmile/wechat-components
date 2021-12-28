// 获取应用实例
const app = getApp()
//计数器
var interval = null;
//值越大旋转时间越长  即旋转速度
var intime = 50;
Page({
  data: {
    resultList:[],
    luckPosition:5,
    drawLuck:true,
    list:[
      {phone: "130****3126", name: "抽中巴啦啦能量"},
      {phone: "130****3126", name: "抽中巴啦啦能量"},
      {phone: "130****3126", name: "抽中巴啦啦能量"},
      {phone: "130****3126", name: "抽中巴啦啦能量"},
      {phone: "130****3126", name: "抽中巴啦啦能量"},
      {phone: "130****3126", name: "抽中巴啦啦能量"},
      {phone: "130****3126", name: "抽中巴啦啦能量"},
      {phone: "130****3126", name: "抽中巴啦啦能量"},
      {phone: "130****3126", name: "抽中巴啦啦能量"},
      {phone: "130****3126", name: "抽中巴啦啦能量"},
      {phone: "130****3126", name: "抽中巴啦啦能量"},
      {phone: "130****3126", name: "抽中巴啦啦能量"},
      {phone: "130****3126", name: "抽中巴啦啦能量抽中巴啦啦能量抽中巴啦啦能量抽中巴啦啦能量"},
    ],
    prize:[
      {id: "1", name: "mac口红", img:'https://i.postimg.cc/NGN7JqRB/222.webp',is_prize:'1',status:false},
      {id: "2", name: "纪梵希小猪皮", img:'https://i.postimg.cc/NGN7JqRB/222.webp',is_prize:'1',status:false},
      {id: "3", name: "苹果电脑", img:'https://i.postimg.cc/LX9LDNXJ/333.jpg',is_prize:'1',status:false},
      {id: "4", name: "谢谢惠顾", img:'https://i.postimg.cc/Bn1XpkSn/susu.jpg',is_prize:'0',status:false},
      {id: "5", name: "DW粉底液", img:'https://i.postimg.cc/d16mcgXR/11.webp',is_prize:'1',status:false},
      {id: "6", name: "雅诗兰黛粉底", img:'https://i.postimg.cc/d16mcgXR/11.webp',is_prize:'1',status:false},
      {id: "7", name: "dior999", img:'https://i.postimg.cc/NGN7JqRB/222.webp',is_prize:'1',status:false},
      {id: "8", name: "谢谢惠顾", img:'https://i.postimg.cc/Bn1XpkSn/susu.jpg',is_prize:'0',status:false},
    ],
    draw_time:'5',
   
  },
  // 事件处理函数
 
  onLoad() {
    
  },
  drawLuck(){
    if(this.data.draw_time==0){
      wx.showToast({
        title: '您的抽奖次数已经用光了',
        icon:'none'
      })
      return false
    }
    this.setData({
      drawLuck:false
    })
    let that=this;
    //定时器
    clearInterval(interval)
    var index=0;
    interval=setInterval(function(){
      if(index>7){
        index=0;
        that.data.prize[7].status = false
      }else if (index != 0) {
        that.data.prize[index - 1].status = false
      }
      that.data.prize[index].status = true
      that.setData({
        prize: that.data.prize,
      })
      index++;
    },intime)
    console.log(this.data.prize)
     //模拟网络请求时间  设为两秒
     var stoptime = 2000;
     setTimeout(function () {
       that.stop(that.data.luckPosition);
     }, stoptime)
  },
  stop: function (which){
    var e = this;
    //清空计数器
    clearInterval(interval);
    //初始化当前位置
    var current = -1;
    var prize = e.data.prize;
    for (var i = 0; i < prize.length; i++) {
      if (prize[i] == 1) {
        current = i;
      }
    }
    //下标从1开始
    var index = current + 1;
    e.stopLuck(which, index, intime, 10);
  },
  stopLuck: function (which, index, time, splittime) {
    var that = this;
    //值越大出现中奖结果后减速时间越长
    var prize = that.data.prize;
    setTimeout(function () {
      //重置前一个位置
      if (index > 7) {
        index = 0;
        prize[7].status = false
      } else if (index != 0) {
        prize[index - 1].status = false
      }
      //当前位置为选中状态
      prize[index].status = true
      that.setData({
        prize: prize,
      })
      //如果旋转时间过短或者当前位置不等于中奖位置则递归执行
      //直到旋转至中奖位置
      if (time < 400 || index != which) {
        //越来越慢
        splittime++;
        time += splittime;
        //当前位置+1
        index++;
        that.stopLuck(which, index, time, splittime);
      } else {
        //1秒后显示弹窗
        setTimeout(function () {
          let prize_info = that.data.prize[which];
          let title = '';
          if (prize_info.is_prize == 1) {
            title = '恭喜你抽中了' + prize_info.name;
            let resultList=[]
            resultList.push(prize_info)
            that.setData({
              resultList:that.data.resultList.concat(resultList)
            })
            console.log(that.data.resultList)
          } else {
            title = '很遗憾未中奖';
          }
          wx.showModal({
            title: '提示',
            content: title,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                let draw_time=that.data.draw_time;
                draw_time--;
                console.log(draw_time)
                that.setData({
                  drawLuck: true,
                  luckPosition: 0,
                  draw_time:draw_time
                })
              }
            }
          })
        }, 1000);
      }
    }, time);
  },

  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },
})
