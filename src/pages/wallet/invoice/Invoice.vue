<template>
  <div class="wallet-container">
    <div class="panel default-panel invoice-panel mt20">
      <div class="panel-head">
        <div class="title-bar">
          <h5 class="title">{{$t('lang.wallet.invoicePage.info.title')}}</h5>
          <div v-if="!noInvoice" class="tail-area">
            <router-link to="/wallet/invoice/form?type=edit">{{$t('lang.wallet.invoicePage.info.edit')}}</router-link>
          </div>
        </div>
      </div>
      <div class="panel-body">
        <div v-if="!noInvoice" class="form-horizontal invoice-form">
          <div class="form-group">
            <div class="col-sm-3 col-xs-12 control-label">{{$t('lang.wallet.invoicePage.info.invoiceTitle.title')}}:</div>
            <div class="col-sm-8 col-xs-12">
              <p class="form-control-static">{{invoiceSpecialData.title}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 col-xs-12 control-label">{{$t('lang.wallet.invoicePage.info.taxpayerId.title')}}:</div>
            <div class="col-sm-8 col-xs-12">
              <p class="form-control-static">{{invoiceSpecialData.taxpayer_id}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 col-xs-12 control-label">{{$t('lang.wallet.invoicePage.info.companyAddress.title')}}:</div>
            <div class="col-sm-8 col-xs-12">
              <p class="form-control-static">{{invoiceSpecialData.company_address}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 col-xs-12 control-label">{{$t('lang.wallet.invoicePage.info.companyMobile.title')}}:</div>
            <div class="col-sm-8 col-xs-12">
              <p class="form-control-static">{{invoiceSpecialData.company_mobile}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 col-xs-12 control-label">{{$t('lang.wallet.invoicePage.info.bankName.title')}}:</div>
            <div class="col-sm-8 col-xs-12">
              <p class="form-control-static">{{invoiceSpecialData.bank_name}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 col-xs-12 control-label">{{$t('lang.wallet.invoicePage.info.bankAccount.title')}}:</div>
            <div class="col-sm-8 col-xs-12">
              <p class="form-control-static">{{invoiceSpecialData.bank_account}}</p>
            </div>
          </div>
        </div>

        <div v-else class="p30 text-center">
          <router-link to="/wallet/invoice/form?type=create" class="btn btn-cyan create-btn">
            {{$t('lang.wallet.invoicePage.info.create')}}
          </router-link>
        </div>
      </div>
    </div>

    <div class="panel default-panel invoice-panel mt20">
      <div class="panel-head">
        <div class="title-bar">
          <h5 class="title">{{$t('lang.wallet.invoicePage.receiver.title')}}</h5>
          <div v-if="!noReceiver" class="tail-area">
            <router-link to="/wallet/invoice/receiver_form?type=edit">{{$t('lang.wallet.invoicePage.receiver.edit')}}</router-link>
          </div>
        </div>
      </div>
      <div class="panel-body">
        <div v-if="!noReceiver" class="form-horizontal invoice-form">
          <div class="form-group">
            <div class="col-sm-3 col-xs-12 control-label">{{$t('lang.wallet.invoicePage.receiver.name.title')}}:</div>
            <div class="col-sm-8 col-xs-12">
              <p class="form-control-static">{{invoiceReceiverData.name}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 col-xs-12 control-label">{{$t('lang.wallet.invoicePage.receiver.phone_number.title')}}:</div>
            <div class="col-sm-8 col-xs-12">
              <p class="form-control-static">{{invoiceReceiverData.phone_number}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 col-xs-12 control-label">{{$t('lang.wallet.invoicePage.receiver.address.title')}}:</div>
            <div class="col-sm-8 col-xs-12">
              <p class="form-control-static">{{invoiceReceiverData.address}}</p>
            </div>
          </div>
        </div>

        <div v-else class="p30 text-center">
          <router-link to="/wallet/invoice/receiver_form?type=create" class="btn btn-cyan create-btn">
            {{$t('lang.wallet.invoicePage.receiver.create')}}
          </router-link>
        </div>
      </div>
    </div>

    <div class="panel default-panel invoice-panel mt20">
      <div class="panel-head">
        <div class="title-bar">
          <h5 class="title">{{$t('lang.wallet.invoicePage.invoiceSubmit.title')}}</h5>
        </div>
      </div>
      <div class="panel-body">
        <div class="invoice-history-list">
          <table class="default-table">
            <thead>
              <tr>
                <th class="text-center">{{$t('lang.wallet.invoicePage.invoiceList.amount')}}</th>
                <th class="text-center">{{$t('lang.wallet.invoicePage.invoiceList.type')}}</th>
                <th class="text-center">{{$t('lang.wallet.invoicePage.invoiceList.title')}}</th>
                <th class="text-center">{{$t('lang.wallet.invoicePage.invoiceList.address')}}</th>
                <th class="text-center">{{$t('lang.wallet.invoicePage.invoiceList.createDate')}}</th>
                <th class="text-center">{{$t('lang.wallet.invoicePage.invoiceList.status')}}</th>
                <th class="text-center">{{$t('lang.wallet.invoicePage.invoiceList.tracking')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in invoiceHistory"
                :key="item.id"
              >
                <td class="text-center">{{item.credits}}</td>
                <td class="text-center">{{item.type_text}}</td>
                <td class="text-center">{{item.title}}</td>
                <td class="text-center">{{item.address}}</td>
                <td class="text-center">{{item.created_at}}</td>
                <td class="text-center">{{item.status_zh}}</td>
                <td class="text-center">{{item.tracking_number}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="form-horizontal invoice-form">
          <div class="form-group">
            <div class="col-sm-4 col-xs-12 control-label">{{$t('lang.wallet.invoicePage.invoiceSubmit.credits.title')}}:</div>
            <div class="col-sm-5 col-xs-12">
              <a-input-number
                name="credits"
                class="form-control"
                :class="[errors.has('credits') || invoiceSubmitData.credits < creditsMin ? 'danger' : '']"
                :min="creditsMin"
                :step="1"
                v-model.number="invoiceSubmitData.credits"
                v-validate="'required'"
              />
              <div
                class="form-tips danger"
                v-show="errors.has('credits') || invoiceSubmitData.credits < creditsMin"
              >
                最小金额为{{creditsMin}}元
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-4 col-xs-12 control-label">{{$t('lang.wallet.invoicePage.invoiceSubmit.type.title')}}:</div>
            <div class="col-sm-6 col-xs-12">
              <div class="row">
                <div class="col-sm-5 col-xs-6">
                  <label class="ctrl-label">
                    <input
                      name="type"
                      type="radio"
                      value="common"
                      v-model="invoiceSubmitData.type"
                      v-validate="'required'"
                    />
                    <span>{{$t('lang.wallet.invoicePage.invoiceSubmit.type.common')}}</span>
                  </label>
                </div>
                <div class="col-sm-5 col-xs-6">
                  <label class="ctrl-label">
                    <input
                      name="type"
                      type="radio"
                      value="special"
                      v-model="invoiceSubmitData.type"
                      v-validate="'required'"
                    />
                    <span>{{$t('lang.wallet.invoicePage.invoiceSubmit.type.special')}}</span>
                  </label>
                </div>
              </div>

              <div
                class="form-tips danger"
                v-show="errors.has('type')"
              >
                {{$t('lang.wallet.invoicePage.invoiceSubmit.type.errorTips')}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-4 col-xs-12 control-label">{{$t('lang.wallet.invoicePage.invoiceSubmit.price_sheet.title')}}:</div>
            <div class="col-sm-6 col-xs-12">
              <div class="row">
                <div class="col-sm-5 col-xs-6">
                  <label class="ctrl-label">
                    <input
                      name="price_sheet"
                      type="radio"
                      value="true"
                      v-model="invoiceSubmitData.price_sheet"
                      v-validate="'required'"
                    />
                    <span>{{$t('lang.yes')}}</span>
                  </label>
                </div>
                <div class="col-sm-5 col-xs-6">
                  <label class="ctrl-label">
                    <input
                      name="price_sheet"
                      type="radio"
                      value="false"
                      v-model="invoiceSubmitData.price_sheet"
                      v-validate="'required'"
                    />
                    <span>{{$t('lang.no')}}</span>
                  </label>
                </div>
              </div>

              <div
                class="form-tips danger"
                v-show="errors.has('price_sheet')"
              >
                {{$t('lang.wallet.invoicePage.invoiceSubmit.price_sheet.errorTips')}}
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
  name: 'Invoice',
  data () {
    return {
      noInvoice: false,
      noReceiver: false,
      creditsMin: 500,
      invoiceSpecialData: {},
      invoiceReceiverData: {},
      invoiceSubmitData: {
        credits: 500,
        type: '',
        price_sheet: ''
      },
      invoiceHistory: [],
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
          this.invoiceSpecialData = resData
        }
      }
    },
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
          this.invoiceReceiverData = resData
        }
      }
    },
    getInvoiceHistoryData () {
      axios.get(apiConfig.invoiceHistoriesUrl, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleGetInvoiceHistoryDataSucc)
    },
    handleGetInvoiceHistoryDataSucc (res) {
      let resData = res.data
      if (res.status == 200 && resData) {
        console.log(resData)
        let _listData = resData.items
        _listData.forEach(item => {
          switch(item.invoice_type) {
            case 'special':
              item.type_text = '增值税发票'
              break;
            case 'common':
              item.type_text = '普通发票'
              break;
            default:
              item.type_text = '普通发票'
          }
        })
        this.invoiceHistory = _listData
      }
    },
    doSubmit () {
      let _self = this
      if (!_self.canSubmit) {
        return false
      }
      _self.canSubmit = false

      axios.post(apiConfig.invoiceHistoriesUrl, this.invoiceSubmitData, {
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
        if (resData.error == 1) {
          alert(resData.detail)
        } else {
          this.getInvoiceHistoryData()
        }
      } else {
        alert('提交失败，请重新提交')
      }
      this.invoiceSubmitData.credits = 500
      this.invoiceSubmitData.type = ''
      this.invoiceSubmitData.price_sheet = ''
      this.canSubmit = true
    },
    doConfirm () {
      console.log(this.invoiceSubmitData)
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
    this.getInvoiceData()
    this.getAddressData()
    this.getInvoiceHistoryData()
  },
  computed: {
    ...mapState(['authorization'])
  }
}
</script>

<style lang="scss" scoped>
.wallet-container {
  padding: 0 100px 30px;
  @include respond-to(mobile) {
    padding: 16px;
  }
}
.invoice-form {
  padding: 20px 60px;
  @include respond-to(mobile) {
    padding: 16px;
  }
  .form-group {
    margin-bottom: 20px;
    @include respond-to(mobile) {
      margin-bottom: 10px;
    }
  }
}
.invoice-history-list {
  padding: 20px;
  border-bottom: 1px solid $bg-color;
}
.create-btn, .submit-btn {
  width: 150px;
}
</style>
