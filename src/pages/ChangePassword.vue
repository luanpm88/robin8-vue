<template>
  <div class="page">
    <div class="panel default-panel forget-panel">
      <div class="panel-head">
        <h5 class="title text-center">{{$t('lang.changePw.title')}}</h5>
      </div>
      <div class="panel-body">
        <div class="forget-container">
          <div class="form-horizontal default-form forget-form">
            <div class="form-group">
              <div class="col-sm-12">
                <input
                  type="password"
                  class="form-control input-sm"
                  :placeholder="$t('lang.changePw.password.placeholder')"
                >
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-12">
                <input
                  type="password"
                  class="form-control input-sm"
                  :placeholder="$t('lang.changePw.confirmPw.placeholder')"
                >
              </div>
            </div>
            <div class="form-group mt40 text-center">
              <button
                type="button"
                class="btn btn-cyan confirm-btn"
              >{{$t('lang.changePw.submit')}}</button>
            </div>
          </div>
        </div>
        <!-- <div class="change-password-success">
          <div class="success-tips">
            <div class="iconfont icon-success"></div>
            <div class="info">恭喜，帐号 188****8799 密码重置成功！</div>
          </div>
          <div class="btn-area mt30">
            <router-link to="/login" class="btn btn-cyan">立即登录</router-link>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChangePassword',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.change-password-success {
  padding-top: 80px;
  text-align: center;
  .success-tips {
    .iconfont {
      display: inline-block;
      margin: -2px 10px 0 0;
      vertical-align: middle;
      font-size: $font-lg;
      color: nth($blue, 1);
    }
    .info {
      display: inline-block;
      vertical-align: middle;
      font-weight: 500;
      color: #333;
    }
  }
}
</style>
