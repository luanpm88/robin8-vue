/**
 * 公用方法
 */
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

module.exports = {
  setLocalData,
  getLocalData,
  removeLocalData,
  clearLocalData,
  checkObj,
  isWeixin,
  isAndroid
}
