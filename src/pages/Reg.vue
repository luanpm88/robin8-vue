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
            <div class="item">
              <router-link to="/login">登录</router-link>
            </div>
            <div class="item active">
              <router-link to="/reg">注册</router-link>
            </div>
          </div>

          <div class="form-horizontal default-form login-form">
            <div class="form-group">
              <div class="col-sm-12">
                <a-input v-if="flag" placeholder="输入手机号" v-model="typeVal"/>
                <a-input v-else placeholder="输入邮箱" v-model="typeVal"/>
                <div class="form-tips text-right" v-if="flag">或使用
                  <span class="link" @click="checkType">邮箱注册</span>
                </div>
                <div class="form-tips text-right" v-else>或使用
                  <span class="link" @click="checkType">手机注册</span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-6">
                <a-input placeholder="输入短信验证码" v-model="code"/>
              </div>
              <div class="col-sm-6">
                <button class="btn btn-block btn-cyan" :disabled="disabled" @click="codeUrl">{{btntxt}}</button>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-12">
                <a-input placeholder="输入您的密码" v-model="password"/>
              </div>
            </div>
            <div class="form-group text-center">
              <button type="button" class="btn btn-cyan confirm-btn" @click="reg" :disabled="loginStatus">注册</button>
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
import { Input, Button } from "ant-design-vue";
export default {
  name: "Reg",
  components: { AInput: Input, AButton: Button },
  data() {
    return {
      flag: true,
      typeVal: "",
      code: "",
      password: "",
      btntxt: "获取验证码",
      isCheck: false,
      disabled: false,
      time: 0,
      loginStatus: false
    };
  },
  methods: {
    // 邮箱和手机注册切换
    checkType() {
      if (this.flag === true) {
        this.typeVal = "";
        this.flag = false;
      } else {
        this.typeVal = "";
        this.flag = true;
      }
    },
    timer: function() {
      if (this.time > 0) {
        this.time--;
        this.btntxt = "重获验证码" + this.time;
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.disabled = false;
      }
    },
    // reg joggle
    regUrl(params) {
      const _that = this;
      axios
        .post(apiConfig.regUrl, params)
        .then(function(res) {
          if (res.data.error) {
            alert(res.data.detail)
          } else {
            _that.$router.push("/");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // phoneCodeUrl
    phoneCodeUrl(params) {
      const _that = this;
      axios
        .get(apiConfig.phoneCodeUrl, {params})
        .then(function(res) {
          if (res.data.error) {
            alert(res.data.detail)
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // emailCodeUrl
    emailCodeUrl(params) {
      const _that = this;
      axios
        .get(apiConfig.emailCodeUrl, {params})
        .then(function(res) {
          if (res.data.error) {
            alert(res.data.detail)
          }
        })
        .catch(function(error) {
          console.log('woshierror', error);
        });
    },
    reg() {
      let params = {
        login: this.typeVal,
        code: this.code,
        password: this.password
      };
      if (this.flag) {
        params.type = "mobile";
      } else {
        params.type = "email";
      }
      console.log(params);
      // 调用注册接口
      this.regUrl(params);
    },
    codeUrl() {
      this.time = 60;
      this.disabled = true;
      this.timer();
      let params = {};
      if (this.flag) {
        params.mobile_number = this.typeVal;
        // 调用手机的接口
        this.phoneCodeUrl(params);
      } else {
        params.email = this.typeVal;
        // 调用邮箱的接口
        this.emailCodeUrl(params);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.text-right {
  .link {
    cursor: pointer;
    margin-left: 3px;
  }
}
</style>
