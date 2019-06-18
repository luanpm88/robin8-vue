<template>
  <div class="panel default-panel login-panel">
    <div class="panel-body">
      <div class="login-container">
        <div class="tabs">
          <div class="item">
            <router-link to="/login">{{$t('lang.login.title')}}</router-link>
          </div>
          <div class="item active">
            <router-link to="/reg">{{$t('lang.signUp.title')}}</router-link>
          </div>
        </div>

        <div class="form-horizontal default-form login-form">
          <div class="form-group">
            <div class="col-sm-12">
              <input
                v-if="flag"
                type="tel"
                name="typeVal"
                class="form-control"
                v-model.trim="typeVal"
                :placeholder="$t('lang.signUp.phone.placeholder')"
                ref="type1"
              >
              <input
                v-else
                type="email"
                name="typeVal"
                class="form-control"
                v-model.trim="typeVal"
                :placeholder="$t('lang.signUp.email.placeholder')"
              >
              <div class="form-tips text-right" v-if="flag">or
                <span class="link" @click="checkType">{{$t('lang.signUp.toggleTips.email')}}</span>
              </div>
              <div class="form-tips text-right" v-else>or
                <span class="link" @click="checkType">{{$t('lang.signUp.toggleTips.phone')}}</span>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-6 col-xs-6">
              <input
                type="text"
                name="code"
                class="form-control"
                v-model.trim="code"
                :placeholder="$t('lang.signUp.code.placeholder')"
              >
            </div>
            <div class="col-sm-6 col-xs-6">
              <button
                class="btn btn-block btn-cyan"
                :disabled="disabled"
                @click="codeUrl"
              >{{$t('lang.signUp.codeBtn')}}</button>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-12">
              <input
                type="password"
                name="password"
                class="form-control"
                v-model="password"
                :placeholder="$t('lang.signUp.password.placeholder')"
              >
            </div>
          </div>
          <div class="form-group text-center">
            <button
              type="button"
              class="btn btn-cyan confirm-btn"
              @click="reg"
              :disabled="loginStatus"
            >{{$t('lang.signUp.submit')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import { mapMutations } from 'vuex'

export default {
  name: 'Reg',
  data() {
    return {
      flag: true,
      typeVal: '',
      code: '',
      password: '',
      btntxt: '',
      isCheck: false,
      disabled: true,
      time: 0,
      loginStatus: false
    }
  },
  watch:{
   typeVal:{
    handler:function(){
      if (this.typeVal) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    deep:true
   }
  },
  methods: {
    ...mapMutations(['setAccount', 'setEmail', 'setAuthorization', 'setNickname', 'setMobile', 'setAvatarImgUrl', 'setCompany', 'setCompanyName', 'setCompanyLogo', 'setAdvancedSearchShow']),
    // 邮箱和手机注册切换
    checkType () {
      if (this.flag === true) {
        this.typeVal = ''
        this.flag = false
      } else {
        this.typeVal = ''
        this.flag = true
      }
    },
    timer: function() {
      if (this.time > 0) {
        this.time--
        if (this.$i18n.locale === 'zh-CN') {
          this.btntxt = this.time + '秒后重新获取'
        }
        if (this.$i18n.locale === 'en-US') {
          this.btntxt = 'Get valid code again' + this.time
        }
        setTimeout(this.timer, 1000)
      } else {
        this.time = 0
        if (this.$i18n.locale === 'zh-CN') {
          this.btntxt = '获取验证码'
        }
        if (this.$i18n.locale === 'en-US') {
          this.btntxt = 'Get valid code'
        }
        this.disabled = false
      }
    },
    // reg joggle
    regUrl (params) {
      const _that = this
      axios
        .post(apiConfig.regUrl, params)
        .then(function(res) {
          if (res.data.error == 1) {
            alert(res.data.detail)
          } else {
            _that.setAuthorization(res.data.access_token)
            _that.setAvatarImgUrl(res.data.avatar_url)
            _that.setCompanyName(res.data.campany_name)
            _that.setAccount(params.login)
            _that.setAdvancedSearchShow(res.data.level_rights.advanced_search)

            let regTag = !!_that.$route.query.reg_tag && _that.$route.query.reg_tag != '' ? _that.$route.query.reg_tag : ''
            console.log(regTag)
            if (!!regTag && regTag != '' && !!res.data.company && res.data.company != '') {
              _that.setCompany(res.data.company)
              _that.setCompanyLogo(res.data.partner_logo)
            }

            if (params.type === 'email') {
              _that.setEmail(params.login)
            } else {
              _that.setMobile(params.login)
            }
            _that.$router.push('/')
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    // phoneCodeUrl
    phoneCodeUrl (params) {
      const _that = this
      axios
        .get(apiConfig.phoneCodeUrl, {params})
        .then(function(res) {
          if (res.data.error == 1) {
            _that.time = 0
            if (_that.$i18n.locale === 'zh-CN') {
              _that.btntxt = '获取验证码'
            }
            if (_that.$i18n.locale === 'en-US') {
              _that.btntxt = 'Get valid code'
            }
            _that.disabled = false
            alert(res.data.detail)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    // emailCodeUrl
    emailCodeUrl (params) {
      const _that = this
      axios
        .get(apiConfig.emailCodeUrl, {params})
        .then(function(res) {
          if (res.data.error == 1) {
            _that.time = 0
            if (_that.$i18n.locale === 'zh-CN') {
              _that.btntxt = '获取验证码'
            }
            if (_that.$i18n.locale === 'en-US') {
              _that.btntxt = 'Get valid code'
            }
            _that.disabled = false
            alert(res.data.detail)
          }
        })
        .catch(function(error) {
          console.log('woshierror', error)
        })
    },
    reg () {
      let regTag = !!this.$route.query.reg_tag && this.$route.query.reg_tag != '' ? this.$route.query.reg_tag : ''
      let params = {
        login: this.typeVal,
        code: this.code,
        password: this.password,
        reg_tag: regTag
      }
      if (this.flag) {
        params.type = 'mobile_number'
      } else {
        params.type = 'email'
      }
      console.log(params)
      // 调用注册接口
      this.regUrl(params)
    },
    codeUrl () {
      this.time = 60
      this.disabled = true
      this.timer()
      let params = {
        login_type: 'sign_up'
      }
      if (this.flag) {
        params.mobile_number = this.typeVal
        // 调用手机的接口
        this.phoneCodeUrl(params)
      } else {
        params.email = this.typeVal
        // 调用邮箱的接口
        this.emailCodeUrl(params)
      }
    }
  },
  mounted () {
    if (this.$i18n.locale === 'zh-CN') {
      this.btntxt = '获取验证码'
    }
    if (this.$i18n.locale === 'en-US') {
      this.btntxt = 'Get valid code'
    }
  }
}
</script>

<style lang="scss" scoped>
.text-right {
  .link {
    cursor: pointer;
    margin-left: 3px;
  }
}
</style>
