import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import commonJs from '@javascripts/common.js'

// 配置中文
Validator.addLocale(zh_CN)

const config = {
  locale: 'zh_CN'
};

Vue.use(VeeValidate, config)

// 自定义validate
const dictionary = {
  zh_CN: {
    messages: {
      email: () => '请输入正确的邮箱格式',
      required: ( field ) => {
        // return field
        switch (field) {
          case '活动平台':
            return '请选择' + field
            break
          case '活动图片':
            return '请上传' + field
            break
          default:
            return '请输入' + field
        }
      }
    },
    attributes:{
      email:'邮箱',
      password:'密码',
      username: '姓名',
      smscode: '验证码',
      phone: '手机号码',
      terrace: '活动平台',
      img_url: '活动图片'
    }
  }
}

Validator.updateDictionary(dictionary)

Validator.extend('phone', {
  messages: {
    zh_CN: field => field + '格式不正确',
  },
  validate: value => {
    return commonJs.verifyPhone.test(value)
  }
})

Validator.extend('number', {
  messages: {
    zh_CN: field => field + '格式不正确',
  },
  validate: value => {
    return /^\d+$/.test(value)
  }
})
