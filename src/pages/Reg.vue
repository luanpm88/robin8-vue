<template>
  <div class="page">
    <div class="panel default-panel login-panel">
      <div class="panel-body">
        <div class="banner">
          <img src="@images/login_banner.jpg" alt class="banner-img">
          <img src="@images/logo.png" alt class="logo">
        </div>

        <div class="login-container">
          <div class="tabs">
            <div class="item">
              <router-link to="/login">Log In</router-link>
            </div>
            <div class="item active">
              <router-link to="/reg">Sign Up</router-link>
            </div>
          </div>

          <div class="form-horizontal default-form login-form">
            <div class="form-group">
              <div class="col-sm-12">
                <input
                  v-if="flag"
                  type="text"
                  name="typeVal"
                  class="form-control"
                  v-model="typeVal"
                  placeholder="Enter your mobile number"
                  ref="type1"
                >
                <input
                  v-else
                  type="text"
                  name="typeVal"
                  class="form-control"
                  v-model="typeVal"
                  placeholder="Enter your email"
                >
                <div class="form-tips text-right" v-if="flag">or
                  <span class="link" @click="checkType">sign up with email</span>
                </div>
                <div class="form-tips text-right" v-else>or
                  <span class="link" @click="checkType">sign up with mobile number</span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-6">
                <input
                  type="text"
                  name="code"
                  class="form-control"
                  v-model="code"
                  placeholder="Enter valid code"
                >
              </div>
              <div class="col-sm-6">
                <button class="btn btn-block btn-cyan" :disabled="disabled" @click="codeUrl">{{btntxt}}</button>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-12">
                <input
                  type="password"
                  name="password"
                  class="form-control"
                  v-model="password"
                  placeholder="Enter your password"
                >
              </div>
            </div>
            <div class="form-group text-center">
              <button type="button" class="btn btn-cyan confirm-btn" @click="reg" :disabled="loginStatus">Sign Up</button>
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
import { mapMutations } from 'vuex'

export default {
  name: 'Reg',
  data() {
    return {
      flag: true,
      typeVal: '',
      code: '',
      password: '',
      btntxt: 'Get valid code',
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
    ...mapMutations(['setAccount', 'setAuthorization', 'setNickname', 'setMobile', 'setAvatarImgUrl']),
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
        this.btntxt = 'Get valid code again' + this.time
        setTimeout(this.timer, 1000)
      } else {
        this.time = 0
        this.btntxt = 'Get valid code'
        this.disabled = false
      }
    },
    // reg joggle
    regUrl (params) {
      const _that = this
      axios
        .post(apiConfig.regUrl, params)
        .then(function(res) {
          if (res.data.error) {
            alert(res.data.detail)
          } else {
            _that.setAuthorization(res.data.access_token)
            _that.setAvatarImgUrl(res.data.avatar_url)
            if (params.type === 'email') {
              _that.setAccount(params.login)
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
          if (res.data.error) {
            _that.time = 0
            _that.btntxt = 'Get valid code'
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
          if (res.data.error) {
            _that.time = 0
            _that.btntxt = 'Get valid code'
            _that.disabled = false
            alert(res.data.detail)
          }
        })
        .catch(function(error) {
          console.log('woshierror', error)
        })
    },
    reg () {
      let params = {
        login: this.typeVal,
        code: this.code,
        password: this.password
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
