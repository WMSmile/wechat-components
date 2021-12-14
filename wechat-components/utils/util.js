const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * js对象合法性判断
 */
function isBlank(obj, expectType) {
  if (obj == null || typeof obj == "undefined") {
    console.log("obj 未指定");
    return true;
  }

  if (expectType != null && typeof expectType != "undefined") {
    if (!(obj instanceof expectType)) {
      console.log("obj 类型不对");
      return true;
    }
  }

  return false;

}

/**
 *null underfined empty判断
 */
function isBlankOrEmpty(obj) {
  if (obj == null || typeof obj == "undefined" || obj == "") {
    console.log("obj 未指定 " + obj);
    return true;
  }
  return false;

}

function isTelephone(phone) {
  //手机号正则  
  var phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
  //电话  
  if (!phoneReg.test(phone)) {
    return false;
  } else {
    return true;
  }
}

function isCardNum(card) {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (reg.test(card) === false) {
    return false;
  } else {
    return true;
  }
}
/**
 * 获取当前时间的日期部分 yyyy-MM-dd
 */
function getDate() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  return [year, month, day].map(formatNumber).join('-');
}
/**
 * /Date(1915151515)/格式转为 yyyy-MM-dd
 */
function getDateFromDateTime(datetime) {
  var times = parseInt(datetime.replace("/Date(", "").replace(")/", ""));
  var date = new Date(times);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return [year, month, day].map(formatNumber).join('-');
}

function getTimestamp() {
  return Date.parse(new Date());
}


/**
 * opt  object | string
 * to_url object | string
 * 例:
 * this.tips('/pages/test/test'); 跳转不提示
 * this.tips({title:'提示'},'/pages/test/test'); 提示并跳转
 * this.tips({title:'提示'},{tab:1,url:'/pages/index/index'}); 提示并跳转值table上
 * tab=1 一定时间后跳转至 table上
 * tab=2 一定时间后跳转至非 table上
 * tab=3 一定时间后返回上页面
 * tab=4 关闭所有页面跳转至非table上
 * tab=5 关闭当前页面跳转至table上
 */
const tips = function (opt, to_url) {
  if (typeof opt == 'string') {
    to_url = opt;
    opt = {};
  }
  var title = opt.title || '',
    icon = opt.icon || 'none',
    endtime = opt.endtime || 2000;
  if (title) wx.showToast({
    title: title,
    icon: icon,
    duration: endtime
  })
  if (to_url != undefined) {
    if (typeof to_url == 'object') {
      var tab = to_url.tab || 1,
        url = to_url.url || '';
      switch (tab) {
        case 1:
          //一定时间后跳转至 table
          setTimeout(function () {
            wx.switchTab({
              url: url
            })
          }, endtime);
          break;
        case 2:
          //跳转至非table页面
          setTimeout(function () {
            wx.navigateTo({
              url: url,
            })
          }, endtime);
          break;
        case 3:
          //返回上页面
          setTimeout(function () {
            wx.navigateBack({
              delta: parseInt(url),
            })
          }, endtime);
          break;
        case 4:
          //关闭当前所有页面跳转至非table页面
          setTimeout(function () {
            wx.reLaunch({
              url: url,
            })
          }, endtime);
          break;
        case 5:
          //关闭当前页面跳转至非table页面
          setTimeout(function () {
            wx.redirectTo({
              url: url,
            })
          }, endtime);
          break;
      }

    } else if (typeof to_url == 'function') {
      setTimeout(function () {
        to_url && to_url();
      }, endtime);
    } else {
      //没有提示时跳转不延迟
      setTimeout(function () {
        wx.navigateTo({
          url: to_url,
        })
      }, title ? endtime : 0);
    }
  }
}

/**
 * 移除数组中的某个数组并组成新的数组返回
 * @param array array 需要移除的数组
 * @param int index 需要移除的数组的键值
 * @param string | int 值
 * @return array
 * 
 */
const arrayRemove = (array, index, value) => {
  const valueArray = [];
  if (array instanceof Array) {
    for (let i = 0; i < array.length; i++) {
      if (typeof index == 'number' && array[index] != i) {
        valueArray.push(array[i]);
      } else if (typeof index == 'string' && array[i][index] != value) {
        valueArray.push(array[i]);
      }
    }
  }
  return valueArray;
}
/*
 * 合并数组
 */
const splitArray = function (list, sp) {
  if (typeof list != 'object') return [];
  if (sp === undefined) sp = [];
  for (var i = 0; i < list.length; i++) {
    sp.push(list[i]);
  }
  return sp;
}


/**
 * 获取格式化日期  
 * in: 20161002
 * out: 10月2日 星期几
 */
function getFormatDate_mdw(str) {

  // 拆分日期为年 月 日
  var YEAR = str.substring(0, 4),
    MONTH = str.substring(4, 6),
    DATE = str.slice(-2);

  // 拼接为 2016/10/02 可用于请求日期格式
  var dateDay = YEAR + "/" + MONTH + "/" + DATE;

  // 获取星期几
  var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    day = new Date(dateDay).getDay();

  // 获取前一天日期 根据今天日期获取前一天的日期
  // var dateBefore = new Date( new Date( dateDay ) - 1000 * 60 * 60 * 24 ).toLocaleDateString();
  // var dateBefore = dateBefore.split('/');
  // if( dateBefore[1] < 10 ) {
  //     dateBefore[1] = '0' + dateBefore[1];
  // }
  // if( dateBefore[2] < 10 ) {
  //     dateBefore[2] = '0' + dateBefore[2];
  // }
  // dateBefore = dateBefore.join('');

  return {
    "dateDay": MONTH + "月" + DATE + "日 " + week[day]
  }

}

// 格式化时间戳
function getTime( timestamp ) {
  var time = arguments[ 0 ] || 0;
  var t, y, m, d, h, i, s;
  t = time ? new Date( time * 1000 ) : new Date();
  y = t.getFullYear();    // 年
  m = t.getMonth() + 1;   // 月
  d = t.getDate();        // 日

  h = t.getHours();       // 时
  i = t.getMinutes();     // 分
  s = t.getSeconds();     // 秒

  return [ y, m, d ].map( formatNumber ).join('-') + ' ' + [ h, i, s ].map( formatNumber ).join(':');
  
}



module.exports = {
  formatTime: formatTime,
  isBlank: isBlank,
  isBlankOrEmpty: isBlankOrEmpty,
  isTelephone: isTelephone,
  isCardNum: isCardNum,
  getDate: getDate,
  getDateFromDateTime: getDateFromDateTime,
  getTimestamp: getTimestamp,
  getTime:getTime,

  tips: tips,
  arrayRemove: arrayRemove,
  splitArray: splitArray,
  getFormatDate_mdw: getFormatDate_mdw
}