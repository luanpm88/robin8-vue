<template>
  <div class="campaign-pay-container">
    <create-process
      :renderData="processStatus"
      class="mt20"
    ></create-process>

    <div class="panel default-panel mt20">
      <div class="panel-head">
        <h5 class="title text-center">支付订单</h5>
      </div>
      <div class="panel-body">
        <div class="order-info">
          <p>邀请KOL人数：{{detailData.kols_count}}人</p>
          <p>KOL总价：¥{{detailData.price}} | 平台服务费：¥{{detailData.fee}}</p>
          <p>支付总额：<span class="price">¥<i class="num">{{detailData.amount}}</i></span></p>
        </div>

        <div class="pay-method">
          <h5 class="title">支付方式：</h5>
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
                    <div class="method">{{item.name}}</div>
                    <div class="desc">{{item.desc}}</div>
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
          >立即付款</button>
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
          name: '支付宝',
          desc: '使用支付宝线上支付安全放心',
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
