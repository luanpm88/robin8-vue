<template>
  <div class="wallet-container">
    <div class="panel default-panel invoice-panel mt20">
      <div class="panel-head">
        <div class="title-bar">
          <h5 class="title">{{$t('lang.wallet.invoicePage.info.title')}}</h5>
        </div>
      </div>
      <div class="panel-body">
        <div class="form-horizontal invoice-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.wallet.invoicePage.info.invoiceTitle.title')}}：</div>
            <div class="col-sm-8">
              <input
                type="text"
                name="title"
                class="form-control"
                :class="[errors.has('title') ? 'danger' : '']"
                v-model="submitData.title"
                :placeholder="$t('lang.wallet.invoicePage.info.invoiceTitle.placeholder')"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('title')"
              >
                {{$t('lang.wallet.invoicePage.info.invoiceTitle.errorTips')}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.wallet.invoicePage.info.taxpayerId.title')}}：</div>
            <div class="col-sm-8">
              <input
                type="text"
                name="taxpayer_id"
                class="form-control"
                :class="[errors.has('taxpayer_id') ? 'danger' : '']"
                v-model="submitData.taxpayer_id"
                :placeholder="$t('lang.wallet.invoicePage.info.taxpayerId.placeholder')"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('taxpayer_id')"
              >
                {{$t('lang.wallet.invoicePage.info.taxpayerId.errorTips')}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.wallet.invoicePage.info.companyAddress.title')}}：</div>
            <div class="col-sm-8">
              <input
                type="text"
                name="company_address"
                class="form-control"
                :class="[errors.has('company_address') ? 'danger' : '']"
                v-model="submitData.company_address"
                :placeholder="$t('lang.wallet.invoicePage.info.companyAddress.placeholder')"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('company_address')"
              >
                {{$t('lang.wallet.invoicePage.info.companyAddress.errorTips')}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.wallet.invoicePage.info.companyMobile.title')}}：</div>
            <div class="col-sm-8">
              <input
                type="text"
                name="company_mobile"
                class="form-control"
                :class="[errors.has('company_mobile') ? 'danger' : '']"
                v-model="submitData.company_mobile"
                :placeholder="$t('lang.wallet.invoicePage.info.companyMobile.placeholder')"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('company_mobile')"
              >
                {{$t('lang.wallet.invoicePage.info.companyMobile.errorTips')}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.wallet.invoicePage.info.bankName.title')}}：</div>
            <div class="col-sm-8">
              <input
                type="text"
                name="bank_name"
                class="form-control"
                :class="[errors.has('bank_name') ? 'danger' : '']"
                v-model="submitData.bank_name"
                :placeholder="$t('lang.wallet.invoicePage.info.bankName.placeholder')"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('bank_name')"
              >
                {{$t('lang.wallet.invoicePage.info.bankName.errorTips')}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.wallet.invoicePage.info.bankAccount.title')}}：</div>
            <div class="col-sm-8">
              <input
                type="text"
                name="bank_account"
                class="form-control"
                :class="[errors.has('bank_account') ? 'danger' : '']"
                v-model="submitData.bank_account"
                :placeholder="$t('lang.wallet.invoicePage.info.bankAccount.placeholder')"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('bank_account')"
              >
                {{$t('lang.wallet.invoicePage.info.bankAccount.errorTips')}}
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
  name: 'InvoiceForm',
  data () {
    return {
      noInvoice: false,
      submitData: {
        title: '',
        invoice_type: 'special',
        taxpayer_id: '',
        company_address: '',
        company_mobile: '',
        bank_name: '',
        bank_account: '',
        id: ''
      },
      canSubmit: true
    }
  },
  methods: {
    getInvoiceData () {
      axios.get(apiConfig.invoiceSpecialUrl, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleGetInvoiceDataSucc)
    },
    handleGetInvoiceDataSucc (res) {
      let resData = res.data
      if (res.status == 200 && resData) {
        console.log(resData)
        if (!!resData.no_invoice && resData.no_invoice) {
          this.noInvoice = resData.no_invoice
        } else {
          this.submitData.title = resData.title
          this.submitData.invoice_type = resData.invoice_type
          this.submitData.taxpayer_id = resData.taxpayer_id
          this.submitData.company_address = resData.company_address
          this.submitData.company_mobile = resData.company_mobile
          this.submitData.bank_name = resData.bank_name
          this.submitData.bank_account = resData.bank_account
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

      axios.post(apiConfig.invoiceSpecialUrl, this.submitData, {
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
      this.getInvoiceData()
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
