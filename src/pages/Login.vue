<template>
  <div class="page">
    <div class="panel default-panel login-panel">
      <div class="panel-head">
        <h5 class="title text-center">{{$t('lang.login.title')}}</h5>
      </div>
      <div class="panel-body">
        <div class="login-container">
          <div class="tabs">
            <div class="item active">
              <router-link to="/login">{{$t('lang.login.title')}}</router-link>
            </div>
            <div class="item">
              <router-link to="/reg">{{$t('lang.signUp.title')}}</router-link>
            </div>
          </div>

          <div class="form-horizontal default-form login-form">
            <div class="form-group">
              <div class="col-sm-12">
                <input
                  type="text"
                  name="userName"
                  class="form-control"
                  v-model.trim="userName"
                  :placeholder="$t('lang.login.account.placeholder')"
                >
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-12">
                <input
                  type="password"
                  name="password"
                  class="form-control"
                  v-model="password"
                  :placeholder="$t('lang.login.password.placeholder')"
                >
                <div class="form-tips text-right">
                  <router-link to="/forget_password">{{$t('lang.login.forget')}}</router-link>
                </div>
              </div>
            </div>
            <div class="form-group text-center">
              <button
                type="button"
                class="btn btn-cyan confirm-btn"
                @click="login"
                :disabled="loginStatus"
              >{{$t('lang.login.submit')}}</button>
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
    ...mapMutations(['setAccount', 'setEmail', 'setAuthorization', 'setNickname', 'setMobile', 'setAvatarImgUrl', 'setCompany', 'setCompanyName', 'setCompanyLogo', 'setAdvancedSearch']),
    // login joggle
    loginUrl (params) {
      const _that = this
      axios
        .post(apiConfig.loginUrl, params)
        .then(function(res) {
          let resData = res.data
          console.log(resData)

          if (resData.error == 0) {
            alert(resData.alert)
            _that.loginStatus = false
            _that.$router.push('/forget_password')
          } else if (resData.error == 1) {
            alert(resData.detail)
            _that.loginStatus = false
          } else {
            _that.setAuthorization(resData.access_token)
            _that.setAccount(params.login)
            _that.setNickname(resData.name)
            _that.setMobile(resData.mobile_number)
            _that.setEmail(resData.email)
            _that.setAvatarImgUrl(resData.avatar_url)
            _that.setCompanyName(resData.campany_name)
            _that.setAdvancedSearch(resData.level_rights.advanced_search)
            if (!!resData.company && resData.company != '') {
              _that.setCompany(resData.company)
              _that.setCompanyLogo(resData.partner_logo)
            }
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
