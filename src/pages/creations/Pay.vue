<template>
  <div class="campaign-pay-container">
    <create-process :renderData="processStatus"></create-process>

    <div class="campaign-pay-content">
      <div class="panel default-panel mt20">
        <div class="panel-head">
          <h5 class="title">{{$t('lang.creations.payment.title')}}</h5>
        </div>
        <div class="panel-body">
          <div class="order-info">
            <p>{{$t('lang.creations.payment.kolCount')}}: {{detailData.kols_count}}人</p>
            <p>{{$t('lang.creations.payment.kolTotalPrice')}}: ¥{{detailData.price}} | {{$t('lang.creations.payment.platformFee')}}: ¥{{detailData.fee}}</p>
            <p>{{$t('lang.creations.payment.amount')}}: <span class="price">¥<i class="num">{{detailData.amount}}</i></span></p>
          </div>

          <div class="pay-method">
            <h5 class="title">{{$t('lang.creations.payment.method.title')}}:</h5>
            <ul class="method-list">
              <li
                v-for="item in payMethods"
                :key="item.id"
                class="item"
              >
                <label class="media">
                  <div class="media-left media-middle">
                    <input
                      type="radio"
                      name="payMethod"
                      :value="item.val"
                      :checked="item.checked"
                    />
                  </div>
                  <div class="media-body media-middle">
                    <div
                      class="pay-icon iconfont "
                      :class="item.iconClass"
                    ></div>
                    <div class="info">
                      <div class="method">{{$t(`lang.${item.name}`)}}</div>
                      <div class="desc">{{$t(`lang.${item.desc}`)}}</div>
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
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import CreateProcess from './components/CreateProcess'
import { mapState } from 'vuex'

export default {
  name: 'CreationPay',
  components: {
    CreateProcess
  },
  data () {
    return {
      processStatus: {
        current: 3,
        index: 2
      },
      tenderId: this.$route.params.tenderId,
      detailData: {},
      payMethods: [
        {
          id: '0',
          val: 'alipay',
          name: 'creations.payment.method.alipay.title',
          desc: 'creations.payment.method.alipay.desc',
          iconClass: 'icon-alipay',
          checked: true
        },
        // {
        //   id: '1',
        //   val: 'wechatpay',
        //   name: '微信支付',
        //   desc: '使用微信支付线上支付安全放心',
        //   iconClass: 'icon-wechat',
        //   checked: false
        // }
      ],
      canSubmit: true
    }
  },
  methods: {
    getDetailData () {
      axios.get(apiConfig.showTenderUrl, {
        params: {
          'id': this.tenderId
        },
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleGetDetailDataSucc)
    },
    handleGetDetailDataSucc (res) {
      console.log(res)
      let resData = res.data
      this.detailData = resData
      if (resData.status == 'ended' || resData.status == 'finished' || resData.status == 'closed') {
        this.processStatus.current = 4
        this.processStatus.index = 3
      }
    },
    doPay () {
      if (!this.canSubmit) {
        return false
      }
      this.canSubmit = false
      axios.post(apiConfig.transactionsUrl, {
        'tender_id': this.tenderId,
        'pay_type': 'alipay'
      }, {
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
        window.location.href = resData.alipay_recharge_url
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
.campaign-pay-content {
  padding: 0 100px;
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
