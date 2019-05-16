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
  // beforeRouteEnter(to, from, next){
  //   console.log(from)
  //  if (from.name !== 'KolDetail') {
  //    to.meta.keepAlive = false
  //    console.log(999)
  //     // if (!from.meta.keepAlive) {

  //     //   console.log(999)
  //     // }
  //   } 
  //   // else {
  //   //   console.log(889)
  //   //   to.meta.keepAlive = true
  //   // }
  //   next()
  // },
  beforeRouteLeave(to, from, next) {
    // 判断是下一个路由是不是进入到详情页
    if (to.name === 'KolDetail') {
      // console.log('我是详情页面')
      // console.log('1', this.$route.meta.keepAlive)
      if (!from.meta.keepAlive) {
        this.$route.meta.keepAlive = true
        // console.log('2', this.$route.meta.keepAlive)
      }
      next()
    } else {
      this.$route.meta.keepAlive = false
      // console.log('3', from.meta.keepAlive)
      this.$destroy()
      next()
    }
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
