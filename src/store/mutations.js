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
  setEmail (state, email) {
    console.log(email)
    state.email = email
    try {
      commonJs.setLocalData('robin8Email', email, 604700)
    } catch (e) {}
  },
  setAvatarImgUrl (state, avatarImgUrl) {
    console.log(avatarImgUrl)
    state.avatarImgUrl = avatarImgUrl
    try {
      commonJs.setLocalData('robin8AvatarImgUrl', avatarImgUrl, 604700)
    } catch (e) {}
  },
  setCompanyName (state, companyName) {
    console.log(companyName)
    state.companyName = companyName
    try {
      commonJs.setLocalData('robin8CompanyName', companyName, 604700)
    } catch (e) {}
  },
  setLanguage (state, language) {
    console.log(language)
    state.language = language
    try {
      commonJs.setLocalData('robin8Language', language, 604700)
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
  },
  removeEmail (state) {
    state.email = ''
    try {
      commonJs.removeLocalData('robin8Email')
    } catch (e) {}
  },
  removeAvatarImgUrl (state) {
    state.avatarImgUrl = ''
    try {
      commonJs.removeLocalData('robin8AvatarImgUrl')
    } catch (e) {}
  },
  removeCompanyName (state) {
    state.companyName = ''
    try {
      commonJs.removeLocalData('robin8CompanyName')
    } catch (e) {}
  },
  removeLanguage (state) {
    state.language = ''
    try {
      commonJs.removeLocalData('robin8Language')
    } catch (e) {}
  }
}
