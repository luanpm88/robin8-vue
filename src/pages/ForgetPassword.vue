<template>
  <div class="page">
    <div class="panel default-panel forget-panel">
      <div class="panel-head">
        <h5 class="title text-center">找回帐号密码</h5>
      </div>
      <div class="panel-body">
        <div class="forget-container">
          <div class="form-horizontal default-form forget-form">
            <div class="form-group">
              <div class="col-sm-3 control-label">登录名：</div>
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control input-sm"
                  placeholder="输入邮箱或手机号"
                >
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-3 control-label">验证码：</div>
              <div class="col-sm-9">
                <div class="row">
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="输入验证码"
                    >
                  </div>
                  <div class="col-sm-6">
                    <button type="button" class="btn btn-block btn-cyan">获取验证码</button>
                  </div>
                </div>
              </div>

            </div>
            <div class="form-group mt40 text-center">
              <button type="button" class="btn btn-cyan confirm-btn">下一步</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgetPassword',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
