<template>
  <div class="campaign-kols-container">
    <campaign-create-process
      :renderData="processStatus"
      class="mt20"
    ></campaign-create-process>

    <div class="panel default-panel mt20">
      <div class="panel-body">
        <campaign-status-area></campaign-status-area>
      </div>
    </div>

    <div class="panel default-panel kols-select-panel mt20">
      <div class="panel-body">
        <div class="select-tags-area text-center">
          <div class="select-tags btn-group">
            <div class="btn btn-outline btn-blue">待合作</div>
            <div class="btn btn-outline btn-blue">合作中</div>
            <div class="btn btn-outline btn-blue">已完成</div>
          </div>
        </div>
        <div class="kols-list-container">
          <kol-item></kol-item>
          <kol-item></kol-item>
          <kol-item></kol-item>
          <kol-item></kol-item>
          <kol-item></kol-item>
          <kol-item></kol-item>
        </div>
      </div>
      <div class="panel-foot clearfix">
        <div class="select-statistics pull-left">微博总曝光值：<span class="num">9999</span> | 微信总曝光值：<span class="num">9999</span> | 总报价：<span class="num">9999</span></div>
        <button type="button" class="btn btn-cyan pull-right" @click="doPay">确认合作，立即支付</button>
      </div>
    </div>

  </div>
</template>

<script>
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import CampaignCreateProcess from './components/CampaignCreateProcess'
import CampaignStatusArea from './components/CampaignStatusArea'
import KolItem from './components/KolItem'

export default {
  name: 'ChooseKols',
  components: {
    CampaignCreateProcess,
    CampaignStatusArea,
    KolItem
  },
  data () {
    return {
      processStatus: {
        current: 2,
        index: 1
      }
    }
  },
  methods: {
    doPay () {
      this.$router.push('/campaigns/1/pay')
    }
  },
  mounted () {
    console.log(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
.kols-select-panel {
  .select-tags-area {
    padding: 26px 0;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    .select-tags {
      & > .btn:first-child {
        border-top-left-radius: 16px;
        border-bottom-left-radius: 16px;
      }
      & > .btn:last-child {
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
      }
    }
  }
  .panel-foot {
    padding: 30px;
    .select-statistics {
      height: 32px;
      line-height: 32px;
      .num {
        color: nth($blue, 1);
      }
    }
  }
}
.kols-list-container {
  .kol-item {
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
