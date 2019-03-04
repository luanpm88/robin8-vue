<template>
  <div class="wallet-container">
    <div class="panel default-panel mt20">
      <div class="panel-head">
        <div class="title-bar">
          <h5 class="title">{{$t('lang.wallet.rechargePage.profileTitle')}}</h5>
          <div class="tail-area">
            <router-link to="/settings/company_info">{{$t('lang.wallet.rechargePage.profileChange')}}</router-link>
          </div>
        </div>
      </div>
      <div class="panel-body">
        <div class="media user-info-panel">
          <div class="media-left">
            <div class="cover">
              <img :src="profileData.avatar_url" alt="" class="cover-img" />
            </div>
          </div>
          <div class="media-body media-middle content">
            <h5 class="title">{{$t('lang.profile.name')}}：{{profileData.name}}</h5>
            <p>{{$t('lang.profile.companyName')}}：{{profileData.campany_name}}</p>
            <p>{{$t('lang.profile.availAmount')}}：{{profileData.avail_amount}} 元</p>
            <!-- <p>剩余积分：{{profileData.avail_amount}} 积分</p> -->
          </div>
        </div>
      </div>
    </div>

    <div class="panel default-panel recharge-panel mt20">
      <div class="panel-head">
        <div class="title-bar">
          <h5 class="title">{{$t('lang.wallet.rechargePage.recharge.title')}}</h5>
        </div>
      </div>
      <div class="panel-body">
        <div class="form-horizontal recharge-form">
          <div class="form-group">
            <div class="col-sm-4 control-label">{{$t('lang.wallet.rechargePage.recharge.method.title')}}：</div>
            <div class="col-sm-4">
              <p class="form-control-static">{{$t('lang.wallet.rechargePage.recharge.method.value')}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-4 control-label">{{$t('lang.wallet.rechargePage.recharge.credits.title')}}：</div>
            <div class="col-sm-4">
              <a-input-number
                name="credits"
                class="form-control"
                :class="[errors.has('credits') || rechargeSubmit.credits < creditsMin ? 'danger' : '']"
                :min="creditsMin"
                :step="1"
                v-model.number="rechargeSubmit.credits"
                v-validate="'required'"
              />
              <div
                class="form-tips danger"
                v-show="errors.has('credits') || rechargeSubmit.credits < creditsMin"
              >
                充值最低金额为{{creditsMin}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-4 control-label">{{$t('lang.wallet.rechargePage.recharge.invite_code.title')}}：</div>
            <div class="col-sm-4">
              <input
                type="text"
                name="invite_code"
                class="form-control"
                v-model="rechargeSubmit.invite_code"
                :placeholder="$t('lang.wallet.rechargePage.recharge.invite_code.placeholder')"
              >
            </div>
          </div>

          <div class="text-center p30">
            <button
              type="button"
              class="btn btn-cyan recharge-btn"
              @click="doConfirm"
              :disabled="canSubmit ? false : true"
            >{{$t('lang.submitBtn')}}</button>
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
import { mapState } from 'vuex'

export default {
  name: 'Recharge',
  data () {
    return {
      profileData: {},
      creditsMin: 500,
      rechargeSubmit: {
        credits: 500,
        invite_code: ''
      },
      canSubmit: true
    }
  },
  methods: {
    getProfileData () {
      axios.get(apiConfig.profileUrl, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleGetProfileDataSucc)
    },
    handleGetProfileDataSucc (res) {
      let resData = res.data
      if (res.status == 200 && resData) {
        console.log(resData)
        this.profileData = resData
      }
    },
    doSubmit () {
      let _self = this
      if (!_self.canSubmit) {
        return false
      }
      _self.canSubmit = false

      axios.post(apiConfig.rechargeUrl, this.rechargeSubmit, {
        headers: {
          'Authorization': _self.authorization
        }
      })
      .then(_self.handleDoSubmitSucc)
      .catch(function(error) {
        console.log(error)
        alert('提交失败，请重新提交')
        _self.canSubmit = true
      })
    },
    handleDoSubmitSucc (res) {
      console.log(res)
      if (res.status == 201) {
        let resData = res.data
        console.log(resData)
        window.location.href = resData.alipay_recharge_url
      } else {
        alert('提交失败，请重新提交')
      }
      this.canSubmit = true
    },
    doConfirm () {
      console.log(this.rechargeSubmit)

      this.$validator.validateAll().then((msg) => {
        console.log(msg)
        if (msg) {
          console.log('验证通过')
          this.doSubmit()
        }
      })
    }
  },
  mounted () {
    this.getProfileData()
  },
  computed: {
    ...mapState(['authorization'])
  }
}
</script>

<style lang="scss" scoped>
.user-info-panel {
  padding: 30px;
  .cover {
    position: relative;
    width: 120px;
    padding-bottom: 100%;
    overflow: hidden;
    .cover-img {
      position: absolute;
      top: 0;
      @include center(x);
      height: 100%;
    }
  }
  .content {
    padding: 20px;
    font-size: $font-nm;
    .title {
      margin-bottom: 10px;
      font-size: $font-lg-s;
      font-weight: normal;
    }
  }
}
.recharge-form {
  padding: 60px;
  .form-group {
    margin-bottom: 20px;
  }
}
.recharge-btn {
  width: 150px;
}
</style>
