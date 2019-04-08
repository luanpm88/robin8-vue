<template>
  <div class="page">
    <page-header></page-header>

    <div class="container mt50 clearfix">
      <main-nav class="pull-left"></main-nav>

      <div class="home-container pull-right">
        <!-- <home-banner></home-banner> -->
        <!-- <profile-panel></profile-panel> -->

        <div class="icon-grid-panel">
          <router-link to="/creations/create" tag="div" class="item">
            <div class="box">
              <div class="iconfont icon-doc"></div>
              <h5 class="title">创建大V活动</h5>
              <h6 class="sub-title">Custom Content</h6>
              <div class="tips">
                <p>KOLS create custom content</p>
                <p>(e.g. article, video, live streaming, review, etc.)</p>
              </div>
            </div>
          </router-link>
          <router-link to="/campaigns/create" tag="div" class="item">
            <div class="box">
              <div class="iconfont icon-doc"></div>
              <h5 class="title">创建小V活动</h5>
              <h6 class="sub-title">Consumer Content Amplification</h6>
            </div>
          </router-link>
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
import ProfilePanel from '@components/ProfilePanel'
import HomeBanner from './components/HomeBanner'
import { mapState } from 'vuex'

export default {
  name: 'HomeCreate',
  components: {
    PageHeader,
    MainNav,
    ProfilePanel,
    HomeBanner
  },
  computed: {
     ...mapState(['authorization'])
  },
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.home-container {
  width: 980px;
  .icon-grid-panel {
    @include display-flex;
    $height: 360px;
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
      .tips {
        font-size: $font-sm;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
