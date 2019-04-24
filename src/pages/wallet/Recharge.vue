<template>
  <div class="wallet-container">
    <profile-panel class="mt20"></profile-panel>

    <div class="panel default-panel recharge-panel mt20">
      <div class="panel-head">
        <div class="title-bar">
          <h5 class="title">{{$t('lang.wallet.rechargePage.recharge.title')}}</h5>
        </div>
      </div>
      <div class="panel-body">
        <div class="form-horizontal recharge-form">
          <div class="form-group">
            <div class="col-sm-4 control-label">{{$t('lang.wallet.rechargePage.recharge.credits.title')}}:</div>
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
                Số tiền là bắt buộc nhập
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-4 control-label">{{$t('lang.wallet.rechargePage.recharge.invite_code.title')}}:</div>
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
          <div class="form-group">
            <div class="col-sm-4 control-label">{{$t('lang.wallet.rechargePage.recharge.method.title')}}:</div>
            <div class="col-sm-4">
              <p class="form-control-static">
                <img class="payment-service-icon" src="@images/one-pay.jpg" />
              </p>
            </div>
          </div>

          <div class="form-group text-center">
            <p>
              OnePay is the No. #1 secured payment gateway, we accept payments by credit cards or Internet Banking
            </p>
          </div>

          <div class="form-group">
            <div class="col-sm-4 control-label">
              <input
                name="platform"
                type="radio"
                value="global"
                v-model="rechargeSubmit.onepay_type"
                v-validate="'required'"
              />
              <div
                class="form-tips danger"
                v-show="errors.has('onepay_type')"
              >
                Chọn loại thanh toán
              </div>
            </div>
            <div class="col-sm-4">
              <label class="control-label">By your credit / debit / prepaid card</label>
              <p class="form-control-static">
                <img width="250" class="" src="@images/onepay_global.png" />
              </p>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-4 control-label">
              <input
                name="platform"
                type="radio"
                value="local"
                v-model="rechargeSubmit.onepay_type"
                v-validate="'required'"
              />
              <div
                class="form-tips danger"
                v-show="errors.has('onepay_type')"
              >
                Chọn loại thanh toán
              </div>
            </div>
            <div class="col-sm-8">
              <label class="control-label">By your Internet Banking</label>
              <p class="form-control-static">
                <img width="250" class="" src="@images/onepay_local.png" />
              </p>
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
import ProfilePanel from '@components/ProfilePanel'
import { mapState } from 'vuex'

export default {
  name: 'Recharge',
  components: {
    ProfilePanel
  },
  data () {
    return {
      creditsMin: 500,
      rechargeSubmit: {
        credits: 500,
        invite_code: '',
        onepay_type: ''
      },
      canSubmit: true
    }
  },
  methods: {
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
        // window.location.href = resData.onepay_recharge_url
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
        } else {
          alert('Bạn vui lòng chọn số tiền và hình thức thanh toán!');
        }
      })
    }
  },
  computed: {
    ...mapState(['authorization'])
  }
}
</script>

<style lang="scss" scoped>
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
