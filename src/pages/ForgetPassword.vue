<template>
  <div>
    <div v-if="canChange" class="panel default-panel forget-panel">
      <div class="panel-head">
        <h5 class="title text-center">{{$t('lang.changePw.title')}}</h5>
      </div>
      <div class="panel-body">
        <div v-if="changeSuccess" class="change-password-success">
          <div class="success-tips">
            <div class="iconfont icon-success"></div>
            <div class="info">恭喜，帐号 {{successAccount}} 密码重置成功！</div>
          </div>
          <div class="mt30">
            <router-link to="/login" class="btn btn-cyan">{{$t('lang.changePw.login')}}</router-link>
          </div>
        </div>

        <div v-else class="forget-container">
          <div class="form-horizontal default-form forget-form">
            <div class="form-group">
              <div class="col-sm-12">
                <input
                  type="password"
                  name="password"
                  class="form-control"
                  :class="[errors.has('password') ? 'danger' : '']"
                  :placeholder="$t('lang.changePw.password.placeholder')"
                  v-model="new_password"
                  v-validate="'required'"
                >
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-12">
                <input
                  type="password"
                  name="confirmPw"
                  class="form-control"
                  :class="[errors.has('confirmPw') || new_password !== new_password_confirmation ? 'danger' : '']"
                  :placeholder="$t('lang.changePw.confirmPw.placeholder')"
                  v-model="new_password_confirmation"
                  v-validate="'required'"
                >
              </div>
            </div>
            <div class="form-group mt40 text-center">
              <button
                type="button"
                class="btn btn-cyan btn-outline mr10"
                @click="prev"
              >{{$t('lang.changePw.prev')}}</button>
              <button
                type="button"
                class="btn btn-cyan confirm-btn"
                @click="submit"
              >{{$t('lang.changePw.submit')}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="panel default-panel forget-panel">
      <div class="panel-head">
        <h5 class="title text-center">{{$t('lang.forgetPw.title')}}</h5>
      </div>
      <div class="panel-body">
        <div class="forget-container">
          <div class="form-horizontal default-form forget-form">
            <div class="form-group">
              <div class="col-sm-12">
                <input
                  type="text"
                  name="account"
                  class="form-control"
                  :class="[errors.has('account') ? 'danger' : '']"
                  :placeholder="$t('lang.forgetPw.account.placeholder')"
                  v-model.trim="account"
                  v-validate="'required'"
                >
                <div class="form-tips text-right">
                  <router-link to="/login">{{$t('lang.forgetPw.login')}}</router-link>
                  or
                  <router-link to="/reg">{{$t('lang.forgetPw.reg')}}</router-link>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-6 col-xs-6">
                <input
                  type="text"
                  name="code"
                  class="form-control"
                  :class="[errors.has('code') ? 'danger' : '']"
                  :placeholder="$t('lang.forgetPw.code.placeholder')"
                  v-model.trim="code"
                  v-validate="'required|alpha_num'"
                >
              </div>
              <div class="col-sm-6 col-xs-6">
                <button
                  type="button"
                  class="btn btn-block btn-cyan"
                  @click="getCode"
                >{{codeBtn.content}}</button>
              </div>
            </div>
            <div class="form-group mt40 text-center">
              <button
                type="button"
                class="btn btn-cyan confirm-btn"
                @click="next"
                >{{$t('lang.forgetPw.submit')}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'

export default {
  name: 'ForgetPassword',
  data () {
    return {
      codeBtn: {
        content: '发送验证码',
        countDown: 60,
        canClick: true
      },
      account: '',
      code: '',
      new_password: '',
      new_password_confirmation: '',
      canChange: false,
      changeSuccess: false,
      successAccount: ''
    }
  },
  methods: {
    getCode() {
      if (!this.codeBtn.canClick) {
        return false
      }
      this.$validator.validate('account').then((msg) => {
        if (msg) {
          this.codeBtn.canClick = false
          let codeUrl = ''
          let params = {
            'login_type': 'update_password'
          }
          if (commonJs.verifyPhone.test(this.account)) {
            codeUrl = apiConfig.phoneCodeUrl
            params.mobile_number = this.account
          } else if (commonJs.verifyEmail.test(this.account)) {
            codeUrl = apiConfig.emailCodeUrl
            params.email = this.account
          }
          console.log(params)
          axios.get(codeUrl, {
            params: params
          })
          .then(this.handleGetCodeSucc)
          .catch(function(error) {
            console.log(error)
          })
        }
      })
    },
    handleGetCodeSucc (res) {
      let resData = res.data
      console.log(resData)

      if (resData.error == 1) {
        alert(resData.detail)
        return false
      }

      this.codeBtn.content = this.codeBtn.countDown + 's后重新发送'
      let clock = window.setInterval(() => {
        this.codeBtn.countDown--
        this.codeBtn.content = this.codeBtn.countDown + 's后重新发送'
        if (this.codeBtn.countDown < 0) {
          window.clearInterval(clock)
          this.codeBtn.content = '重新发送验证码'
          this.codeBtn.countDown = 60
          this.codeBtn.canClick = true
        }
      }, 1000)
    },
    doChangePw () {
      axios.post(apiConfig.updatePwUrl, {
        'login': this.account,
        'code': this.code,
        'new_password': this.new_password,
        'new_password_confirmation': this.new_password_confirmation
      })
      .then(this.handleDoChangePwSucc)
      .catch(function(error) {
        console.log(error)
      })
    },
    handleDoChangePwSucc (res) {
      let resData = res.data
      console.log(resData)
      if (resData.error == 1) {
        alert(resData.detail)
        return false
      }
      this.successAccount = resData.private_mobile_number
      this.changeSuccess = true
    },
    next () {
      this.$validator.validate('code').then((msg) => {
        console.log(msg)
        if (msg) {
          console.log('验证通过')
          this.canChange = true
        }
      })
    },
    prev () {
      this.canChange = false
    },
    submit () {
      this.$validator.validateAll().then((msg) => {
        console.log(msg)
        if (msg) {
          console.log('验证通过')
          this.doChangePw()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.change-password-success {
  padding-top: 80px;
  text-align: center;
  .success-tips {
    .iconfont {
      display: inline-block;
      margin: -2px 10px 0 0;
      vertical-align: middle;
      font-size: $font-lg;
      color: nth($blue, 1);
    }
    .info {
      display: inline-block;
      vertical-align: middle;
      font-weight: 500;
      color: #333;
    }
  }
}
</style>
