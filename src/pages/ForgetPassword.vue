<template>
  <div class="page">
    <div class="panel default-panel forget-panel">
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
                  class="form-control input-sm"
                  :placeholder="$t('lang.forgetPw.account.placeholder')"
                >
                <div class="form-tips text-right">
                  <router-link to="/login">{{$t('lang.forgetPw.login')}}</router-link>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-6 col-xs-6">
                <input
                  type="text"
                  class="form-control"
                  :placeholder="$t('lang.forgetPw.code.placeholder')"
                >
              </div>
              <div class="col-sm-6 col-xs-6">
                <button type="button" class="btn btn-block btn-cyan">获取验证码</button>
              </div>
            </div>
            <div class="form-group mt40 text-center">
              <button
                type="button"
                class="btn btn-cyan confirm-btn"
                >{{$t('lang.forgetPw.submit')}}</button>
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
