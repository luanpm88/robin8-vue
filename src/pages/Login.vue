<template>
  <div class="page">
    <div class="panel default-panel login-panel">
      <div class="panel-body">
        <div class="banner">
          <img src alt class="banner-img">
          <img src="@images/logo.png" alt class="logo">
        </div>

        <div class="login-container">
          <div class="tabs">
            <div class="item active">
              <router-link to="/login">登录</router-link>
            </div>
            <div class="item">
              <router-link to="/reg">注册</router-link>
            </div>
          </div>

          <div class="default-form login-form">
            <div class="form-group">
              <input
                type="text"
                name="userName"
                class="form-control"
                v-model="userName"
                placeholder="输入邮箱或手机号"
              >
            </div>
            <div class="form-group">
              <input
                type="password"
                name="password"
                class="form-control"
                v-model="password"
                placeholder="输入您的密码"
              >
              <div class="form-tips text-right">
                <router-link to="/forget_password">忘记密码？</router-link>
              </div>
            </div>
            <div class="form-group text-center">
              <button
                type="button"
                class="btn btn-cyan confirm-btn"
                @click="login"
                :disabled="loginStatus"
              >登录</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import apiConfig from "@/config";
import commonJs from "@javascripts/common.js";
import { mapMutations } from 'vuex'

export default {
  name: "Login",
  data() {
    return {
      userName: "",
      password: "",
      loginStatus: false
    };
  },
  methods: {
    ...mapMutations(["setAccount", "setAuthorization", "setNickname", "setMobile"]),
    // login joggle
    loginUrl(params) {
      const _that = this;
      axios
        .post(apiConfig.loginUrl, params)
        .then(function(res) {
          let resData = res.data;
          console.log(resData)
          if (res.data.error) {
            alert(res.data.detail)
            _that.loginStatus = false
          } else {
            _that.setAuthorization(resData.access_token)
            _that.setAccount(params.login)
            _that.loginStatus = false
            _that.$router.push("/")
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    login() {
      this.loginStatus = true;
      let params = {
        login: this.userName,
        password: this.password
      };
      this.loginUrl(params);
    }
  }
};
</script>
