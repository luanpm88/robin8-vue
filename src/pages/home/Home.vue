<template>
  <div class="page">
    <page-header></page-header>

    <div class="container mt50 clearfix">
      <main-nav class="pull-left"></main-nav>

      <div class="home-container pull-right">
        <home-banner></home-banner>
        <div class="mt20"></div>
        <div class="icon-grid-panel mt20">
          <router-link to="/kol/list" tag="div" class="item">
            <div class="box">
              <div class="iconfont icon-search"></div>
              <h5 class="title">查找KOL</h5>
              <h6 class="sub-title">Search Engine</h6>
            </div>
          </router-link>
          <router-link to="/creations/create" tag="div" class="item">
            <div class="box">
              <div class="iconfont icon-doc"></div>
              <h5 class="title">创建新活动</h5>
              <h6 class="sub-title">Create Campaign</h6>
            </div>
          </router-link>
          <router-link to="/creations" tag="div" class="item">
            <div class="box">
              <div class="iconfont icon-trophy"></div>
              <h5 class="title">活动列表</h5>
              <h6 class="sub-title">Campaign List</h6>
            </div>
          </router-link>
        </div>
        <!-- analytics -->
        <home-analytic class="mt20"></home-analytic>

        <div class="home-show row mt20">
          <div class="col-xs-6">
            <home-recommended-kols></home-recommended-kols>
          </div>
          <div  class="col-xs-6">
            <home-top-posts></home-top-posts>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@components/PageHeader'
import MainNav from '@components/MainNav'
import HomeBanner from './components/HomeBanner'
import HomeAnalytic from './components/Analytics'
import HomeRecommendedKols from './components/RecommendedKols'
import HomeTopPosts from './components/TopPosts'
import { mapState } from 'vuex'
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
  computed: {
     ...mapState(['authorization'])
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
  .icon-grid-panel {
    @include display-flex;
    $height: 200px;
    $gap: 10px;
    & > .item {
      @include display-flex;
      @include flex(1);
      height: $height;
      margin-right: $gap;
      align-items: center;
      justify-content: center;
      background-color: nth($cyan, 1);
      cursor: pointer;
      .box {
        text-align: center;
        color: #fff;
      }
      .iconfont {
        height: 100px;
        line-height: 100px;
        font-size: 6rem;
      }
      .title {
        font-size: 1.9rem;
        color: $white;
      }
      .sub-title {
        font-size: 1.4rem;
        color: $white;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
