<template>
  <div class="home-container">
    <!-- <home-banner></home-banner> -->
    <!-- <profile-panel></profile-panel> -->

    <div class="icon-grid-panel">
      <!-- <router-link to="/creations/create" tag="div" class="item">
        <div class="box">
          <div class="iconfont icon-create"></div>
          <h5 class="title">创建大V活动</h5>
          <h6 class="sub-title">Custom Content</h6>
          <div class="tips">
            <p>KOLS create custom content</p>
            <p>(e.g. article, video, live streaming, review, etc.)</p>
          </div>
        </div>
      </router-link> -->
      <router-link to="/campaigns/create" tag="div" class="item">
        <div class="box">
          <div class="iconfont icon-create-s"></div>
          <h5 class="title">创建小V活动</h5>
          <h6 class="sub-title">Consumer Content Amplification</h6>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import ProfilePanel from '@components/ProfilePanel'
import HomeBanner from './home/components/HomeBanner'
import { mapState } from 'vuex'

export default {
  name: 'Create',
  components: {
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
  padding: 40px 100px;
  @include respond-to(mobile) {
    padding: 30px;
  }
  .icon-grid-panel {
    @include display-flex;
    $height: 360px;
    $gap: 32px;
    @include respond-to(mobile) {
      display: block;
    }
    & > .item {
      @include display-flex;
      @include flex(1);
      height: $height;
      margin-right: $gap;
      border-radius: 5px;
      align-items: center;
      justify-content: center;
      background: linear-gradient(180deg, #2fccd3 0%, #75e6e9 100%);
      box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, .1);
      cursor: pointer;
      @include respond-to(mobile) {
        width: 100%;
        height: 300px;
        margin-right: 0;
        margin-bottom: 16px;
      }
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
        @include respond-to(mobile) {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
