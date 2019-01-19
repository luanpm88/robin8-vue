<template>
  <div>
    <campaign-create-process
      :renderData="processStatus"
      class="mt20"
    ></campaign-create-process>

    <div class="panel default-panel mt20">
      <div class="panel-head">
        <h5 class="title text-center">支付订单</h5>
      </div>
      <div class="panel-body">
        <div class="order-info">
          <p>邀请KOL人数：10人</p>
          <p>KOL总价：¥20000.00 | 平台服务费：¥20000.00</p>
          <p>支付总额：<span class="price">¥<i class="num">20000.00</i></span></p>
        </div>

        <div class="pay-method">
          <h5 class="title">支付方式：</h5>
          <ul class="method-list">
            <li class="item media">
              <div class="media-left media-middle">
                <input type="radio" name="payMethod" value="alipay" />
              </div>
              <div class="media-body media-middle">
                <div class="pay-icon iconfont icon-alipay"></div>
                <div class="info">
                  <div class="method">支付宝</div>
                  <div class="desc">使用支付宝线上支付安全放心</div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="pay-operation-area">
          <button type="button" class="btn btn-cyan">立即付款</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import CampaignCreateProcess from './components/CampaignCreateProcess'

export default {
  name: 'CampaignPay',
  components: {
    CampaignCreateProcess
  },
  data () {
    return {
      processStatus: {
        current: 3,
        index: 2
      }
    }
  },
  methods: {

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
    .pay-icon {
      display: inline-block;
      width: auto;
      margin-right: 10px;
      font-size: 4rem;
      &.icon-alipay {
        color: #1296db;
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
