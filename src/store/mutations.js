import commonJs from '@javascripts/common.js'

export default {
  setAuthorization (state, token) {
    console.log(token)
    state.authorization = token
    try {
      commonJs.setLocalData('robin8Authorization', token, 604700)
    } catch (e) {}
  },
  setNickname (state, nickname) {
    console.log(nickname)
    state.nickname = nickname
    try {
      commonJs.setLocalData('robin8UserName', nickname, 604700)
    } catch (e) {}
  },
  setMobile (state, mobile) {
    console.log(mobile)
    state.mobile = mobile
    try {
      commonJs.setLocalData('robin8Mobile', mobile, 604700)
    } catch (e) {}
  },
  setAccount (state, account) {
    console.log(account)
    state.account = account
    try {
      commonJs.setLocalData('robin8Account', account, 604700)
    } catch (e) {}
  },
  removeAuthorization (state) {
    state.authorization = ''
    try {
      commonJs.removeLocalData('robin8Authorization')
    } catch (e) {}
  },
  removeNickname (state) {
    state.nickname = ''
    try {
      commonJs.removeLocalData('robin8UserName')
    } catch (e) {}
  },
  removeMobile (state) {
    state.mobile = ''
    try {
      commonJs.removeLocalData('robin8Mobile')
    } catch (e) {}
  },
  removeAccount (state) {
    state.account = ''
    try {
      commonJs.removeLocalData('robin8Account')
    } catch (e) {}
  }
}
