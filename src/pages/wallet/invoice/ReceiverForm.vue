<template>
  <div class="wallet-container">
    <div class="panel default-panel invoice-panel mt20">
      <div class="panel-head">
        <div class="title-bar">
          <h5 class="title">{{$t('lang.wallet.invoicePage.receiver.title')}}</h5>
        </div>
      </div>
      <div class="panel-body">
        <div class="form-horizontal invoice-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.wallet.invoicePage.receiver.name.title')}}：</div>
            <div class="col-sm-8">
              <input
                type="text"
                name="name"
                class="form-control"
                :class="[errors.has('name') ? 'danger' : '']"
                v-model="submitData.name"
                :placeholder="$t('lang.wallet.invoicePage.receiver.name.placeholder')"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('name')"
              >
                {{$t('lang.wallet.invoicePage.receiver.name.errorTips')}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.wallet.invoicePage.receiver.phone_number.title')}}：</div>
            <div class="col-sm-8">
              <input
                type="text"
                name="phone_number"
                class="form-control"
                :class="[errors.has('phone_number') ? 'danger' : '']"
                v-model="submitData.phone_number"
                :placeholder="$t('lang.wallet.invoicePage.receiver.phone_number.placeholder')"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('phone_number')"
              >
                {{$t('lang.wallet.invoicePage.receiver.phone_number.errorTips')}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.wallet.invoicePage.receiver.address.title')}}：</div>
            <div class="col-sm-8">
              <input
                type="text"
                name="address"
                class="form-control"
                :class="[errors.has('address') ? 'danger' : '']"
                v-model="submitData.address"
                :placeholder="$t('lang.wallet.invoicePage.receiver.address.placeholder')"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('address')"
              >
                {{$t('lang.wallet.invoicePage.receiver.address.errorTips')}}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="text-center p30">
      <button
        type="button"
        class="btn btn-cyan submit-btn"
        @click="doConfirm"
        :disabled="canSubmit ? false : true"
      >{{$t('lang.submitBtn')}}</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import { mapState } from 'vuex'

export default {
  name: 'ReceiverForm',
  data () {
    return {
      noReceiver: false,
      submitData: {
        name: '',
        phone_number: '',
        address: '',
        id: ''
      },
      canSubmit: true
    }
  },
  methods: {
    getAddressData () {
      axios.get(apiConfig.invoiceReceiverUrl, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleGetAddressDataSucc)
    },
    handleGetAddressDataSucc (res) {
      let resData = res.data
      if (res.status == 200 && resData) {
        console.log(resData)
        if (!!resData.no_invoice_receiver && resData.no_invoice_receiver) {
          this.noReceiver = resData.no_invoice_receiver
        } else {
          this.submitData.name = resData.name
          this.submitData.phone_number = resData.phone_number
          this.submitData.address = resData.address
          this.submitData.id = resData.id
        }
      }
    },
    doSubmit () {
      let _self = this
      if (!_self.canSubmit) {
        return false
      }
      _self.canSubmit = false

      axios.post(apiConfig.invoiceReceiverUrl, this.submitData, {
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
        this.$router.push('/wallet/invoice')

      } else {
        alert('提交失败，请重新提交')
      }
      this.canSubmit = true
    },
    doConfirm () {
      console.log(this.submitData)
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
    let _type = this.$route.query.type
    if (_type == 'edit') {
      this.getAddressData()
    }
  },
  computed: {
    ...mapState(['authorization'])
  }
}
</script>

<style lang="scss" scoped>
.invoice-form {
  padding: 20px 60px;
  .form-group {
    margin-bottom: 20px;
  }
}
.submit-btn {
  width: 150px;
}
</style>
