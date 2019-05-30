<template>
  <div class="campaign-pay-container">
    <div class="panel default-panel">
      <div class="panel-head">
        <h5 class="title">{{$t('lang.campaigns.payment.title')}}</h5>
      </div>
      <div class="panel-body">
        <div class="order-info">
          <p>{{$t('lang.campaigns.payment.name')}}: {{detailData.name}}</p>
          <p>{{$t('lang.campaigns.payment.desc')}}: {{detailData.description}}</p>
          <p>{{$t('lang.campaigns.payment.date')}}: {{detailData.time_range}}</p>
          <p>{{$t('lang.campaigns.payment.amount')}}: <span class="price">¥<i class="num">{{detailData.need_pay_amount}}</i></span></p>
        </div>

        <div class="pay-method">
          <h5 class="title">{{$t('lang.campaigns.payment.method.title')}}:</h5>
          <ul class="method-list">
            <li class="item">
              <label class="media">
                <div class="media-left media-middle">
                  <input
                    type="radio"
                    name="payMethod"
                    value="alipay"
                    v-model="payMethod"
                    @change="methodChange"
                  />
                </div>
                <div class="media-body media-middle">
                  <div class="pay-icon iconfont icon-alipay"></div>
                  <div class="info">
                    <div class="method">{{$t('lang.campaigns.payment.method.alipay.title')}}</div>
                    <div class="desc">{{$t('lang.campaigns.payment.method.alipay.desc')}}</div>
                  </div>
                </div>
              </label>
            </li>
            <li class="item">
              <label class="media">
                <div class="media-left media-middle">
                  <input
                    type="radio"
                    name="payMethod"
                    value="balance"
                    v-model="payMethod"
                    @change="methodChange"
                  />
                </div>
                <div class="media-body media-middle">
                  <div class="info">
                    <div class="method">{{$t('lang.campaigns.payment.method.balance.title')}}</div>
                    <div class="desc">{{$t('lang.campaigns.payment.method.balance.desc')}}(￥{{availAmount}})</div>
                  </div>
                </div>
              </label>
            </li>
          </ul>
        </div>

        <div class="pay-operation-area">
          <button
            type="button"
            class="btn btn-cyan"
            @click="doPay"
          >{{$t('lang.payBtn')}}</button>
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
  name: 'CampaignPay',
  data () {
    return {
      detailData: {},
      availAmount: '',
      payMethod: 'alipay',
      payPostUrl: '',
      paySubmitData: {
        'campaign_id': this.$route.params.id
      },
      canSubmit: true
    }
  },
  methods: {
    getDetailData () {
      axios.get(apiConfig.campaignsUrl + '/' + this.$route.params.id, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleGetDetailDataSucc)
    },
    handleGetDetailDataSucc (res) {
      console.log(res)
      let resData = res.data
      this.detailData = resData
      this.availAmount = resData.user.avail_amount
    },
    methodChange () {
      console.log(this.payMethod)
    },
    doPay () {
      if (!this.canSubmit) {
        return false
      }
      this.canSubmit = false
      console.log(this.payMethod)
      if (this.payMethod == 'alipay') {
        this.payPostUrl = apiConfig.campaignPayByAlipayUrl
      } else if (this.payMethod == 'balance') {
        this.payPostUrl = apiConfig.campaignPayByBalanceUrl
        this.paySubmitData.pay_way = 'balance'
      }
      axios.post(this.payPostUrl, this.paySubmitData, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleDoPaySucc)
    },
    handleDoPaySucc (res) {
      let resData = res.data
      console.log(res)
      this.canSubmit = true
      if (res.status == 201) {
        if (this.payMethod == 'alipay') {
          window.location.href = resData.alipay_recharge_url
        } else if (this.payMethod == 'balance') {
          if (resData.error == 1) {
            alert(resData.detail)
            return false
          } else {
            this.$router.push('/campaigns/' + this.$route.params.id)
          }
        }
      }
    }
  },
  mounted () {
    this.getDetailData()
  },
  computed: {
    ...mapState(['authorization'])
  }
}
</script>

<style lang="scss" scoped>
.campaign-pay-container {
  padding: 0 100px 30px;
}
.order-info {
  line-height: 40px;
  padding: 20px 100px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  font-size: $font-nm-s;
  color: #4a4a4a;
  .price {
    color: nth($blue, 1);
    .num {
      font-size: $font-lg;
      font-style: normal;
    }
  }
}
.pay-method {
  padding: 20px 100px;
  font-size: $font-nm-s;
  color: #4a4a4a;
  .title {
    line-height: 40px;
    font-weight: 600;
  }
}
.method-list {
  & > .item {
    padding: 10px 0;
    label {
      cursor: pointer;
    }
    .pay-icon {
      display: inline-block;
      width: auto;
      margin-right: 10px;
      font-size: 4rem;
      &.icon-alipay {
        color: #1296db;
      }
      &.icon-wechat {
        color: #53e05b;
      }
    }
    .info {
      display: inline-block;
      width: auto;
      .method {
        margin-bottom: 4px;
        font-weight: 600;
        color: #575962;
      }
    }
  }
}
.pay-operation-area {
  padding: 20px;
  text-align: center;
}
</style>
