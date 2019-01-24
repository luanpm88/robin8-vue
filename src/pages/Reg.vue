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
            <div class="item active">
              <router-link to="/reg">注册</router-link>
            </div>
          </div>

          <div class="form-horizontal default-form login-form">
            <div class="form-group">
              <div class="col-sm-12">
                <input
                  type="text"
                  class="form-control input-sm"
                  placeholder="输入邮箱或手机号"
                >
                <div class="form-tips text-right">
                  或使用<span class="link">邮箱注册</span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-6">
                <input
                  type="text"
                  class="form-control"
                  placeholder="输入短信验证码"
                >
              </div>
              <div class="col-sm-6">
                <button type="button" class="btn btn-block btn-cyan">获取验证码</button>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-12">
                <input
                  type="password"
                  class="form-control"
                  placeholder="输入您的密码"
                >
              </div>
            </div>
            <div class="form-group text-center">
              <button type="button" class="btn btn-cyan confirm-btn">注册</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reg',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
