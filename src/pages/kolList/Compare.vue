<template>
  <div class="page">
    <page-header></page-header>
    <div class="container mt50 clearfix">
      <div class="top-control-area">
        <button type="button" class="btn btn-purple" @click="pageBack">
          <span class="iconfont icon-arrow-left"></span>
          Back
        </button>
      </div>
      <!-- content -->
      <div class="compare-wrap mt20">
        <div class="compare-content clearfix" >
          <div class="compare-list" v-for="(item, index) in weiboData" :key='index'>
            <div class="media compare-info">
              <div class="media-left media-middle">
                <img
                  :src="item.profileData.avatar_url"
                  alt
                >
              </div>
              <div class="media-body media-middle">
                <p>{{$t('lang.kolCompare.name')}}: <b>{{item.profileData.profile_name}}</b></p>
                <p>{{$t('lang.kolCompare.id')}}:{{item.profileData.profile_id}}</p>
                  <a-tooltip placement="topLeft" :title="item.profileData.description_raw">
                  <p class="desc">{{$t('lang.kolCompare.dec')}}:{{item.profileData.description_raw}}</p>
                </a-tooltip>
              </div>
            </div>
            <!-- weibo Performance -->
            <!-- <div class="panel default-panel" v-if="Number(type) === 0">
              <div class="panel-head">
                <h5 class="title text-center">{{$t('lang.kolCompare.performance.tit')}}</h5>
              </div>
              <div class="panel-body p30">
                <p>粉丝:{{item.socialData.fans_number}}</p>
                <p>头条分享数:{{item.socialData.stats.total_shares}}</p>
                <p>平均分享数:{{item.socialData.stats.avg_shares}}</p>
                <p>头条点赞数:{{item.socialData.stats.total_likes}}</p>
                <p>平均点赞数:{{item.socialData.stats.avg_likes}}</p>
                <p>头条评论数:{{item.socialData.stats.total_comments}}</p>
                <p>平均评论数:{{item.socialData.stats.avg_comments}}</p>
                <p>上载时间:{{item.socialData.stats.data_date}}</p>
              </div>
            </div> -->
            <!-- weixin Performance -->
            <!-- <div class="panel default-panel mt20" v-if="Number(type) === 1">
              <div class="panel-head">
                <h5 class="title text-center">{{$t('lang.kolCompare.price.tit')}}</h5>
              </div>
              <div class="panel-body p30">
                <p>粉丝:{{item.socialData.fans_number}}</p>
                <p>头条阅读数:{{item.socialData.stats.total_reads}}</p>
                <p>平均阅读数:{{item.socialData.stats.avg_reads}}</p>
                <p>头条点赞数:{{item.socialData.stats.total_likes}}</p>
                <p>平均点赞数:{{item.socialData.stats.avg_likes}}</p>
                <p>上载时间:{{item.socialData.stats.data_date}}</p>
              </div>
            </div> -->

            <!-- distribution -->
            <distribution :currentType="type" :currentId="item.profileData.profile_id"></distribution>

            <!-- 微信media -->
            <div v-if="Number(type) === 1">
              <media :currentId="item.profileData.profile_id"></media>
            </div>

            <!-- Radar -->
            <radar :currentType="type" :currentId="item.profileData.profile_id"></radar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import PageHeader from '@components/PageHeader'
import Echarts from '@components/Chart/GlobalEcharts'
import ChartOption from '@components/Chart/GlobalChartOption'
import commonJs from '@javascripts/common.js'
import { mapState } from 'vuex'
import distribution from '@/pages/kolList/components/Distribution'
import media from '@/pages/kolList/components/Media'
import radar from '@/pages/kolList/components/Radar'
export default {
  name: 'kolCompare',
  components: {
    Echarts,
    PageHeader,
    distribution,
    media,
    radar
  },
  data() {
    return {
      type: 0,
      weiboData: []
    } 
  },
  created() {
    // console.log(this.$route.query)
    // console.log(this.$route.params)
    this.type = Number(this.$route.params.type);
    if (Number(this.$route.params.type) === 0) {
      // 调用微博相关接口
      // profile接口
      this.$route.query.list.forEach((element, index) => {
        let params = {
          profile_id: element
        }
        // top detail
        this.kolWeiboInfo(params)
        // performance
        this.kolWeiboSocial(params, index);

      }) 
    } else {

    }
  },
  computed: {
    ...mapState(['authorization'])
  },
  methods: {
    // weibo info
    kolWeiboInfo(params) {
      const _that = this 
      axios
        .post(apiConfig.kolWeiboInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('woshiweibo', res)
            let currentData = {
              profileData: {}
            }
            currentData.profileData = res.data
            _that.weiboData.push(currentData)
          }
        })
    },
    // weixin info
    kolWeiXinInfo(params) {
      const _that = this 
      axios
        .post(apiConfig.kolWeiXinInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('woshiweixin', res)
          }
        })
    },
    // kolWeixinSocial weibo
    kolWeiboSocial(params, currentIndex) {
      const _that = this 
      axios
        .post(apiConfig.kolWeiboSocial, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('weibo', res)
            _that.weiboData[currentIndex].socialData = res.data
          }
        })
        .catch(function(error) {
          // console.log(error) 
        }) 
    },
    // kolWeixinSocial
    kolWeixinSocial(params) {
      const _that = this 
      axios
        .post(apiConfig.kolWeixinSocial, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('weixin', res);
          }
        })
        .catch(function(error) {
          // console.log(error) 
        }) 
    },
    pageBack() {
      this.$router.go(-1)
    }
  }
} 
</script>
<style lang="scss" scoped>

</style>
