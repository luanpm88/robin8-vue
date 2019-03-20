<!-- distribution 
*props: ['currentType', 'currentId'],
currentType 0 代表微博 ， 1代表微信
currentId 当前数据的Id
-->
<template>
  <div class="panel default-panel">
    <div class="panel-body">
      <p class="kol-cloumn mb10">{{$t('lang.kolList.analyticVue.weibo.industryTable.Tit')}}</p>
      <div class="nonetip" v-if="isAnalyOneShow">
        <span>{{$t('lang.totalNoDataTip')}}</span>
      </div>
      <div class="r8-loading" v-if="isAnalyOneLoading">
        <a-spin tip="Loading..."/>
      </div>
      <div class="activity-table" v-if="isAnalyOne">
        <div v-if="Number(currentType) === 0">
          <!-- weibo 组件 -->
          <weibo-distribution :distributionData="analyOne"></weibo-distribution>
        </div>
        <div v-if="Number(currentType) === 1">
          <!-- 微信 组件 -->
          <weixin-distribution :distributionData="analyOne"></weixin-distribution>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import { mapState } from 'vuex'
// 微信行业分布
import weixinDistribution from '@/pages/kolList/components/WeixinDistribution'
// 微博行业分布
import weiboDistribution from '@/pages/kolList/components/WeiboDistribution'
export default {
  name: 'distribution',
  props: ['currentType', 'currentId'],
  components: {
    weiboDistribution,
    weixinDistribution
  },
  data() {
    return {
      analyOne: [],
      isAnalyOne: false,
      isAnalyOneShow: false,
      isAnalyOneLoading: true,
      analyOneParams: {
        start_date: commonJs.cPastTwentyOneDays,
        end_date: commonJs.cPastOneday,
        profile_id: 'MzAwMDAyMzY3OA=='
      },
    } 
  },
  created() {
    this.analyOneParams.profile_id = String(this.currentId) 
    if (Number(this.currentType) === 0) {
      // 微博Industries Distribution
      this.detailAnalyOneWeibo(this.analyOneParams) 
    } 
    if (Number(this.currentType) === 1) {
      // 微信Industries Distribution
      this.detailAnalyOneWeixin(this.analyOneParams) 
    }
  },
  computed: {
    ...mapState(['authorization'])
  },
  methods: {
    // Industries Distribution weibo
    detailAnalyOneWeibo(params) {
      const _that = this 
      axios
        .post(apiConfig.detailAnalyOneWeibo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('wobo 微博', res) 
            _that.isAnalyOneLoading = false 
            if (res.data.length > 0) {
              _that.isAnalyOneShow = false 
              _that.isAnalyOne = true 
              _that.analyOne = res.data 
            } else {
              _that.isAnalyOneShow = true 
              _that.isAnalyOne = false 
            }
          }
        })
        .catch(function(error) {
          // console.log(error) 
        }) 
    },
    // Industries Distribution weixin
    detailAnalyOneWeixin(params) {
      const _that = this 
      axios
        .post(apiConfig.detailAnalyOneWeixin, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('woshi weixin', res)
            _that.isAnalyOneLoading = false 
            if (res.data.length > 0) {
              _that.isAnalyOneShow = false 
              _that.isAnalyOne = true 
              _that.analyOne = res.data 
            } else {
              _that.isAnalyOneShow = true 
              _that.isAnalyOne = false 
            }
          }
        })
        .catch(function(error) {
          // console.log(error) 
        }) 
    }
  }
} 
</script>
<style>
</style>