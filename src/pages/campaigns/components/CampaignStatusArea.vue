<template>
  <div class="campaign-status-area">
    <div class="iconfont icon-success success"></div>
    <div class="info">
      <h5 class="title">活动提交审核成功</h5>
      <p>正在审核中，我们将在24小时之内完成审核</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CampaignStatusArea'
}
</script>

<style lang="scss" scoped>
.campaign-status-area {
  padding: 40px 100px;
  text-align: center;
  .iconfont {
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
    font-size: 5rem;
    &.success {
      color: nth($blue, 1);
    }
  }
  .info {
    display: inline-block;
    vertical-align: middle;
    text-align: left;
    font-size: $font-nm-s;
    .title {
      font-size: $font-nm-l;
      font-weight: 600;
      color: #4a4a4a;
    }
  }
}
</style>
