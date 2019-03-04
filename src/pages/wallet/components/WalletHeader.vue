<template>
  <div class="container-header">
    <div class="container-title">{{title}}</div>
    <breadcrumb separator="-"></breadcrumb>
  </div>
</template>

<script>
import Breadcrumb from '@components/Breadcrumb'

export default {
  name: 'WalletHeader',
  components: {
    Breadcrumb
  },
  data () {
    return {
      title: ''
    }
  },
  created () {
    this.getTitle()
  },
  methods: {
    getTitle () {
      let routes = this.$route.matched
      this.title = routes[routes.length - 1].meta.title
    }
  },
  watch: {
    $route () {
      this.getTitle()
    }
  }
}
</script>

<style lang="scss" scoped>
.container-header {
  .container-title {
    display: inline-block;
    height: 28px;
    line-height: 28px;
    padding-right: 20px;
    margin-right: 20px;
    border-right: 1px solid #979797;
    vertical-align: middle;
    font-size: $font-lg-s;
    font-weight: 600;
    color: #4a4a4a;
  }
  .breadcrumb {
    display: inline-block;
    height: 28px;
    line-height: 28px;
    vertical-align: middle;
  }
}
</style>
