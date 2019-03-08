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
            <div class="item active">
              <router-link to="/login">Log In</router-link>
            </div>
            <div class="item">
              <router-link to="/reg">Sign Up</router-link>
            </div>
          </div>

          <div class="default-form login-form">
            <div class="form-group">
              <input
                type="text"
                name="userName"
                class="form-control"
                v-model="userName"
                placeholder="Account"
              >
            </div>
            <div class="form-group">
              <input
                type="password"
                name="password"
                class="form-control"
                v-model="password"
                placeholder="Password"
              >
              <div class="form-tips text-right">
                <!-- <router-link to="/forget_password">Forgot Password？</router-link> -->
              </div>
            </div>
            <div class="form-group text-center">
              <button
                type="button"
                class="btn btn-cyan confirm-btn"
                @click="login"
                :disabled="loginStatus"
              >Sign In</button>
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
import { mapMutations } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      userName: '',
      password: '',
      loginStatus: false
    }
  },
  methods: {
    ...mapMutations(['setAccount', 'setAuthorization', 'setNickname', 'setMobile', 'setAvatarImgUrl', 'setCompanyName']),
    // login joggle
    loginUrl (params) {
      const _that = this
      axios
        .post(apiConfig.loginUrl, params)
        .then(function(res) {
          let resData = res.data
          console.log(resData)
          if (resData.error) {
            alert(resData.detail)
            _that.loginStatus = false
          } else {
            _that.setAuthorization(resData.access_token)
            _that.setAccount(params.login)
            _that.setNickname(resData.name)
            _that.setMobile(resData.mobile_number)
            _that.setAvatarImgUrl(resData.avatar_url)
            _that.setCompanyName(resData.campany_name)
            _that.loginStatus = false
            _that.$router.push('/')
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    login () {
      this.loginStatus = true
      let params = {
        login: this.userName,
        password: this.password
      }
      this.loginUrl(params)
    }
  }
}
</script>
