/**
 * 公用方法
 */
// 初始化时间
const moment = require('moment')
// 获取过去36小时
let cPastOneday = moment(new Date(new Date().getTime() - 36 * 60 * 60 * 1000)).format("YYYY-MM-DD");
let cNow = new Date(cPastOneday.replace(/\-/g, "/"));
// 获取过去一个月
let cPastOneMonth = moment(new Date(cNow.setMonth(cNow.getMonth() - 1))).format("YYYY-MM-DD");
// 获取当天日子
let cCurrentDay = moment(new Date()).format("YYYY-MM-DD");
// 获取过去七天
let cPastSevenDays = moment(new Date(new Date().getTime() - 168 * 60 * 60 * 1000)).format("YYYY-MM-DD");
// 获取过去14天
let cPastFourteenDays = moment(new Date(new Date().getTime() - 336 * 60 * 60 * 1000)).format("YYYY-MM-DD");
// 获取过去21天
let cPastTwentyOneDays = moment(new Date(new Date().getTime() - 504 * 60 * 60 * 1000)).format("YYYY-MM-DD");
// 获取过去的一年
let cPastYears = moment(new Date(cNow.setFullYear(cNow.getFullYear() - 1))).format("YYYY-MM-DD");

// 格式化数字
function formatNumber (n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// storage 相关操作
const postfix = '_deadtime'
function setLocalData(key, value, time) {
  let storage = window.localStorage
  let seconds = parseInt(time)

  storage.setItem(key, value)
  if (seconds > 0) {
    let timestamp = Date.parse(new Date())
    timestamp = timestamp / 1000 + seconds
    storage.setItem(key + postfix, timestamp + '')
  } else {
    storage.removeItem(key + postfix)
  }
}

function getLocalData(key, def) {
  let storage = window.localStorage
  let deadtime = parseInt(storage.getItem(key + postfix))
  if (deadtime) {
    if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
      if (def) {
        return def
      } else {
        return
      }
    }
  }
  let res = storage.getItem(key)
  if (res) {
    return res
  } else {
    return def
  }
}

function removeLocalData(key) {
  let storage = window.localStorage
  storage.removeItem(key)
  storage.removeItem(key + postfix)
}

function clearLocalData() {
  let storage = window.localStorage
  storage.clear()
}

// 判断是否为微信
function isWeixin() {
  let ua = navigator.userAgent.toLowerCase()
  return ua.match(/MicroMessenger/i) == 'micromessenger'
}

const isAndroid = /(android)/i.test(navigator.userAgent)

function checkObj (obj) {
  for (let i in obj) {
    return true
  }
  return false
}

const verifyPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|19[89])[0-9]{8}$/

function buildObjData(key, value) {
  var obj = {}
  obj[key] = value
  return obj
}

// 计算数字 3位逗号分割
function threeFormatter(num, digits) {
  var enabled = false;
  if (!enabled) {
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }
  num = "" + num;
  // alert("current locale = "+ _current_locale);
  if (_current_locale == "zh") {
    num = num.replace(/,/g, "");
    var si = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "千" },
      { value: 1e4, symbol: "万" },
      { value: 1e6, symbol: "百万" },
      { value: 1e7, symbol: "千万" },
      { value: 1e8, symbol: "亿" },
      { value: 1e10, symbol: "百亿" },
      { value: 1e11, symbol: "千亿" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (
      (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol
    );
  } else {
    num = num.replace(/,/g, "");
    var si = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (
      (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol
    );
  }
}

function sortByProperty(property) {
  return function (obj1, obj2) {
    var value1 = obj1[property]
    var value2 = obj2[property]
    return value1 - value2
  }
}

// 计算日期

module.exports = {
  setLocalData,
  getLocalData,
  removeLocalData,
  clearLocalData,
  checkObj,
  isWeixin,
  isAndroid,
  verifyPhone,
  buildObjData,
  threeFormatter,
  cPastOneday,
  cPastOneMonth,
  cCurrentDay,
  cPastSevenDays,
  cPastFourteenDays,
  cPastTwentyOneDays,
  cPastYears,
  sortByProperty
}
