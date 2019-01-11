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
        <div class="home-show">
          <el-row :gutter="20" class="h-analytic-con">
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
              <div class="kols-container">
                <home-recommended-kols></home-recommended-kols>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
              <div class="kols-container">
                <home-top-posts></home-top-posts>
              </div>
            </el-col>
          </el-row>
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
import HomeRecommendedKols from './components/HomeContent/RecommendedKols'
import HomeTopPosts from './components/HomeContent/TopPosts'
export default {
  name: 'Home',
  components: {
    PageHeader,
    MainNav,
    HomeBanner,
    HomeAnalytic,
    HomeRecommendedKols,
    HomeTopPosts
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
