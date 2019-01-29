<template>
  <div class="page">
    <page-header></page-header>

    <div class="container mt50 clearfix">
      <main-nav class="pull-left"></main-nav>

      <div class="campaign-container pull-right">
        <!-- <router-view></router-view> -->
        <!-- kol search 页面 -->
        <kol-search></kol-search>
        <kol-data></kol-data>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@components/PageHeader'
import MainNav from '@components/MainNav'
import KolSearch from './KolSearch'
import KolData from './KolData'
export default {
  name: 'kolDetail',
  components: {
    PageHeader,
    MainNav,
    KolSearch,
    KolData
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
