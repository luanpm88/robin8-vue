<template>
  <div class="page">
    <page-header></page-header>

    <div class="container mt50 clearfix">
      <main-nav class="pull-left"></main-nav>

      <div class="campaign-container pull-right">
        <!-- <router-view></router-view> -->
        <!-- kol search 页面 -->
        <kol-search></kol-search>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@components/PageHeader'
import MainNav from '@components/MainNav'
import KolSearch from './KolSearch'
export default {
  name: 'kolDetail',
  components: {
    PageHeader,
    MainNav,
    KolSearch
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.campaign-container {
  width: 980px;
}
</style>
