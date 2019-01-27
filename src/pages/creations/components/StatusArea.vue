<template>
  <div class="campaign-status-area">
    <div class="iconfont icon-success success"></div>
    <div class="info">
      <h5 class="title">{{status.title}}</h5>
      <p>{{status.desc}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreationStatusArea',
  props: {
    statusData: String
  },
  data () {
    return {
      status: {
        title: '',
        desc: ''
      }
    }
  },
  methods: {
    renderData (status) {
      console.log(status)
      switch (status) {
        case 'pending':
          this.status.title = '您提交的活动待审核'
          this.status.desc = '我们将在24小时之内完成审核'
          break
        case 'unpassed':
          this.status.title = '您提交的活动未通过审核'
          this.status.desc = '请编辑后重新提交'
          break
        case 'passed':
          this.status.title = '活动提交审核成功'
          this.status.desc = ''
          break
        case 'ended':
          this.status.title = '活动已结束'
          this.status.desc = ''
          break
        case 'finished':
          this.status.title = '活动已完成'
          this.status.desc = ''
          break
        case 'closed':
          this.status.title = '活动已关闭'
          this.status.desc = ''
          break
        default:
          this.status.title = ''
          this.status.desc = ''
      }
    }
  },
  watch: {
    statusData (newVal, oldVal) {
      this.renderData(newVal)
    }
  }
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
