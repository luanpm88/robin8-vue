<template>
  <div class="panel default-panel">
    <div class="panel-body">
      <div class="campaign-create-process">
        <div
          :class="{
            'item': true,
            'active': renderData.current >= 0,
            'current': renderData.current == 0
          }"
        >
          <div class="num">1</div>
          <div class="title">活动基本信息</div>
        </div>
        <div
          :class="{
            'item': true,
            'active': renderData.current >= 1,
            'current': renderData.current == 1
          }"
        >
          <div class="num">2</div>
          <div class="title">KOL参与</div>
        </div>
        <div
          :class="{
            'item': true,
            'active': renderData.current >= 2,
            'current': renderData.current == 2
          }"
        >
          <div class="num">3</div>
          <div class="title">支付</div>
        </div>
        <div
          :class="{
            'item': true,
            'active': renderData.current >= 3,
            'current': renderData.current == 3
          }"
        >
          <div class="num">4</div>
          <div class="title">合作完成</div>
        </div>
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
.campaign-create-process {
  $color: nth($gray, 1);
  $active: nth($blue, 1);
  padding: 32px 0;
  text-align: center;
  font-size: 0;
  & > .item {
    display: inline-block;
    padding: 0 50px;
    font-size: 1.1rem;
    font-weight: 600;
    .num {
      display: inline-block;
      width: 24px;
      height: 24px;
      line-height: 24px;
      margin-right: 10px;
      border-radius: 50%;
      text-align: center;
      color: #fff;
      vertical-align: middle;
      background-color: $color;
    }
    .title {
      display: inline-block;
      vertical-align: middle;
      color: $color;
    }
    &.active.current {
      .num {
        background-color: $active;
      }
      .title {
        color: $active;
      }
    }
  }
}
</style>
