<template>
  <div class="page">
    <div class="panel default-panel login-panel">
      <div class="panel-body">
        <div class="banner">
          <img src="" alt="" class="banner-img" />
          <img src="@images/logo.png" alt="" class="logo" />
        </div>

        <div class="login-container">
          <div class="tabs">
            <div class="item">
              <router-link to="/login">登录</router-link>
            </div>
            <div class="item">
              <router-link to="/login">注册</router-link>
            </div>
          </div>

          <div class="default-form">
            <div class="form-group">
              <input type="text" class="form-control">
            </div>
            <div class="form-group">
              <input type="text" class="form-control">
            </div>
            <div class="form-group text-center">
              <button type="button" class="btn btn-cyan">登录</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.login-panel {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 440px;
  margin-top: -220px;
  margin-left: -250px;
  .panel-body {
    height: 100%;
  }
  .banner {
    position: relative;
    height: 140px;
    .banner-img {
      height: 100%;
    }
    .logo {
      position: absolute;
      z-index: 1;
      top: 50%;
      left: 50%;
      width: 160px;
      height: 38px;
      margin-top: -19px;
      margin-left: -80px;
    }
  }
  .login-container {
    width: 260px;
    margin: 40px auto 0;
    .tabs {
      font-size: 0;
      .item {
        display: inline-block;
        width: 50%;
        text-align: center;
        font-size: $font-sm;
      }
    }
  }
}
</style>
