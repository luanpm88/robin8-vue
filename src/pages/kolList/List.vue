<template>
  <div class="container mt50 clearfix">
    <main-nav class="pull-left"></main-nav>

    <div class="campaign-container pull-right">
      <!-- <router-view></router-view> -->
      <!-- kol search 页面 -->
      <kol-search :keyWord="keyList"></kol-search>
    </div>
  </div>
</template>

<script>
import MainNav from '@components/MainNav'
import KolSearch from './KolSearch'

export default {
  name: 'KolList',
  components: {
    MainNav,
    KolSearch  
  },
  created() {
    this.$route.meta.keepAlive = false
  },
  data () {
    return {
      keyList: {
        brand_keywords: this.$route.params.brand_keywords,
        type: this.$route.params.type
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.campaign-container {
  width: 980px;
}
</style>
