<template>
  <div class="page">
    <page-header></page-header>

    <div class="container mt50 clearfix">
      <main-nav class="pull-left"></main-nav>

      <div class="campaign-container pull-right">
        <!-- <router-view></router-view> -->
        <!-- kol search 页面 -->
        <kol-search :keyWord='keyList' ></kol-search>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@components/PageHeader'
import MainNav from '@components/MainNav'
import KolSearch from './KolSearch'
export default {
  name: 'KolList',
  components: {
    PageHeader,
    MainNav,
    KolSearch
  },
  beforeRouteLeave(to, from, next) {
    // console.log(to)
    // console.log(from)
    // console.log(next)
    // 判断是下一个路由是不是进入到详情页
    if (to.name === 'KolDetail') {
      this.$route.meta.keepAlive = true
    } else {
      this.$route.meta.keepAlive = false
    }
    next();
  },
  created() {
    console.log(90)
    this.$route.meta.keepAlive = false;
    // console.log(this.$route.params.brand_keywords);
    // console.log(this.$route.params.type);
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
