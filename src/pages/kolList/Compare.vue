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
          <div class="col-sm-6 compare-list" v-for="(item, index) in weiboData" :key='index'>
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
                <p>{{$t('lang.kolCompare.dec')}}:{{item.profileData.description_raw}}</p>
              </div>
            </div>
            <div class="panel default-panel">
              <div class="panel-head">
                <h5 class="title text-center">{{$t('lang.kolCompare.performance')}}</h5>
              </div>
              <div class="panel-body">
                
              </div>
            </div>
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
export default {
  name: 'kolCompare',
  components: {
    Echarts,
    PageHeader
  },
  data() {
    return {
      weiboData: []
    } 
  },
  created() {
    // console.log(this.$route.query)
    // console.log(this.$route.params)
    if (Number(this.$route.params.type) === 0) {
      // 调用微博相关接口
      // profile接口
      this.$route.query.list.forEach(element => {
        let params = {
          profile_id: element
        }
        this.kolWeiboInfo(params)
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
            console.log('woshiweixin', res)
          }
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
