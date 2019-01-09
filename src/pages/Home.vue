<template>
  <div class="page">
    <page-header></page-header>

    <div class="container mt50 clearfix">
      <main-nav class="pull-left"></main-nav>

      <div class="home-container pull-right">
        <home-banner></home-banner>
        <div class="mt20"></div>
        <!-- analytics -->
        <div class="kols-container mt20">
          <home-analytic></home-analytic>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@components/PageHeader'
import MainNav from '@components/MainNav'
import HomeBanner from './components/HomeBanner'
import HomeAnalytic from './components/HomeContent/Analytics'

export default {
  name: 'Home',
  components: {
    PageHeader,
    MainNav,
    HomeBanner,
    HomeAnalytic
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  width: 980px;
  .kols-container {
    min-height: 500px;
    box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, .08);
    background-color: #fff;
  }
}

</style>
