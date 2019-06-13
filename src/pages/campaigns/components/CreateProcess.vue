<template>
  <div class="process-container">
    <div class="campaign-create-process">
      <div
        :class="{
          'item': true,
          'active': renderData.index >= 0,
          'current': renderData.current == 1
        }"
      >
        <div class="num">
          <span class="dot">1</span>
        </div>
        <div class="title">{{$t('lang.campaigns.campaignInfo')}}</div>
      </div>
      <div
        :class="{
          'item': true,
          'active': renderData.index >= 1,
          'current': renderData.current == 2
        }"
      >
        <div class="num">
          <span class="dot">2</span>
        </div>
        <div class="title">{{$t('lang.campaigns.kolParticipate')}}</div>
      </div>
      <div
        :class="{
          'item': true,
          'active': renderData.index >= 2,
          'current': renderData.current == 3
        }"
      >
        <div class="num">
          <span class="dot">3</span>
        </div>
        <div class="title">{{$t('lang.payment')}}</div>
      </div>
      <div
        :class="{
          'item': true,
          'active': renderData.index >= 3,
          'current': renderData.current == 4
        }"
      >
        <div class="num">
          <span class="dot">4</span>
        </div>
        <div class="title">{{$t('lang.campaigns.collaborationCompleted')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CampaignCreateProcess',
  props: {
    renderData: Object
  }
}
</script>

<style lang="scss" scoped>
.process-container {
  padding: 0 100px 30px;
  background-color: #fff;
  @include respond-to(mobile) {
    padding: 0 30px 30px;
  }
}
.campaign-create-process {
  $color: #a9b1b3;
  $active: #262625;
  padding: 8px 0;
  border-radius: 5px;
  text-align: center;
  font-size: 0;
  background-color: #e7edef;
  @include respond-to(mobile) {
    text-align: left;
    background-color: transparent;
  }
  & > .item {
    display: inline-block;
    width: 25%;
    text-align: center;
    font-size: 1.1rem;
    font-weight: 600;
    @include respond-to(mobile) {
      display: block;
      width: 100%;
      padding: 8px;
      margin-bottom: 2px;
      border-radius: 5px;
      text-align: left;
      background-color: #e7edef;
    }
    .num {
      display: inline-block;
      padding: 4px;
      margin-right: 10px;
      border: 2px solid transparent;
      border-radius: 50%;
      vertical-align: middle;
      .dot {
        display: inline-block;
        width: 40px;
        height: 40px;
        line-height: 36px;
        border: 2px solid #fff;
        border-radius: 50%;
        text-align: center;
        color: #739495;
        background: #f6f7f7;
      }
    }
    .title {
      display: inline-block;
      vertical-align: middle;
      color: $color;
    }
    &.active, &.current {
      .num {
        .dot {
          color: #fff;
          border-color: rgba(255, 255, 255, .36);
          background-color: rgba(56, 208, 213, 1);
        }
      }
      .title {
        color: $active;
      }
    }
    &.active {
      .num {
        border-color: transparent;
      }
    }
    &.current {
      .num {
        border-color: #38d0d5;
      }
    }
    &:last-child {
      @include respond-to(mobile) {
        margin-bottom: 0;
      }
    }
  }
}
</style>
