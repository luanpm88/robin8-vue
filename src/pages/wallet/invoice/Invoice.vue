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
            <div class="col-sm-3 control-label">{{$t('lang.wallet.invoicePage.info.invoiceTitle.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{invoiceSpecialData.title}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.wallet.invoicePage.info.taxpayerId.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{invoiceSpecialData.taxpayer_id}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.wallet.invoicePage.info.companyAddress.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{invoiceSpecialData.company_address}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.wallet.invoicePage.info.companyMobile.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{invoiceSpecialData.company_mobile}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.wallet.invoicePage.info.bankName.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{invoiceSpecialData.bank_name}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.wallet.invoicePage.info.bankAccount.title')}}：</div>
            <div class="col-sm-8">
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
            <div class="col-sm-3 control-label">{{$t('lang.wallet.invoicePage.receiver.name.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{invoiceReceiverData.name}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.wallet.invoicePage.receiver.phone_number.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{invoiceReceiverData.phone_number}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.wallet.invoicePage.receiver.address.title')}}：</div>
            <div class="col-sm-8">
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

  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import { mapState } from 'vuex'

export default {
  name: 'Invoice',
  components: {

  },
  data () {
    return {
      noInvoice: false,
      noReceiver: false,
      invoiceSpecialData: {},
      invoiceReceiverData: {}
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
    }
  },
  mounted () {
    this.getInvoiceData()
    this.getAddressData()
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
.create-btn {
  width: 150px;
}
</style>
