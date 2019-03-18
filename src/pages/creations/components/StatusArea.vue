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
      switch (status) {
        case 'pending':
          this.status.title = this.$t('lang.statusAreaVue.oneTit')
          this.status.desc = this.$t('lang.statusAreaVue.oneSmallTit')
          break
        case 'unpassed':
          this.status.title = this.$t('lang.statusAreaVue.twoTit')
          this.status.desc = this.$t('lang.statusAreaVue.twoSmallTit')
          break
        case 'passed':
          this.status.title = this.$t('lang.statusAreaVue.threeTit')
          this.status.desc = ''
          break
        case 'ended':
          this.status.title = this.$t('lang.statusAreaVue.FourTit')
          this.status.desc = ''
          break
        case 'finished':
          this.status.title = this.$t('lang.statusAreaVue.FiveTit')
          this.status.desc = ''
          break
        case 'closed':
          this.status.title = this.$t('lang.statusAreaVue.sixTit')
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
