<template>
  <div class="campaign-status-area">
    <div class="iconfont icon-success success"></div>
    <div class="info">
      <h5 class="title">{{$t(`lang.creations.statusArea.${status.title}`)}}</h5>
      <p>{{$t(`lang.creations.statusArea.${status.desc}`)}}</p>
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
      switch (status) {
        case 'pending':
          this.status.title = 'pending.title'
          this.status.desc = 'pending.desc'
          break
        case 'unpassed':
          this.status.title = 'rejected.title'
          this.status.desc = 'rejected.desc'
          break
        case 'passed':
          this.status.title = 'passed.title'
          this.status.desc = 'passed.desc'
          break
        case 'ended':
          this.status.title = 'ended.title'
          this.status.desc = 'ended.desc'
          break
        case 'finished':
          this.status.title = 'finished.title'
          this.status.desc = 'finished.desc'
          break
        case 'closed':
          this.status.title = 'closed.title'
          this.status.desc = 'closed.desc'
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
  border-bottom: 2px solid #c8d6da;
  .iconfont {
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
    font-size: 5rem;
    &.success {
      color: nth($cyan, 1);
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
