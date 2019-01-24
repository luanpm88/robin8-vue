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
                class="form-control"
                placeholder="输入邮箱或手机号"
              >
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="输入您的密码"
              >
              <div class="form-tips text-right">
                <router-link to="/forget_password">忘记密码？</router-link>
              </div>
            </div>
            <div class="form-group text-center">
              <button type="button" class="btn btn-cyan confirm-btn">登录</button>
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

</style>
