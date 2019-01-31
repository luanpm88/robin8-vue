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
        <!-- 假如有品牌渲染图表 -->
        <div v-if="isCompetitors">
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
        <!-- 没有品牌渲染提交接口 -->
        <div v-else>
          <brand-submit :status='isHomeStatus'></brand-submit>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import PageHeader from '@components/PageHeader'
import MainNav from '@components/MainNav'
import HomeBanner from './components/HomeBanner'
import HomeAnalytic from './components/Analytics'
import HomeRecommendedKols from './components/RecommendedKols'
import HomeTopPosts from './components/TopPosts'
import brandSubmit from '@/pages/settings/myCompetitionBrands/Create'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    PageHeader,
    MainNav,
    HomeBanner,
    HomeAnalytic,
    HomeRecommendedKols,
    HomeTopPosts,
    brandSubmit
  },
  computed: {
     ...mapState(['authorization'])
  },
  data () {
    return {
      isCompetitors: true,
      isHomeStatus: 'Yes'
    }
  },
  created() {
    this.getBaseData();
  },
  methods: {
    getBaseData () {
      const _that = this
      axios.get(apiConfig.baseInfosUrl, {
        headers: {
          'Authorization': _that.authorization
        }
      }).then(function(res) {
        // console.log('我是competition', res);
        if (res.status === 200) {
          if (res.data.competitors) {
            // console.log(1)
            _that.isCompetitors = true;
          } else {
            _that.isCompetitors = false;
          }
        }
      })
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
