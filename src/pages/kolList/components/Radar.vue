<!--  -->
<template>
  <div>
    <div class="panel default-panel mt20" v-for="(item, index) in radarData" :key="index">
      <div class="panel-body p30">
        <div class="nonetip" v-if="item.isShow">
          <span>{{$t('lang.totalNoDataTip')}}</span>
        </div>
        <div class="r8-loading" v-if="item.isLoading">
          <a-spin tip="Loading..."/>
        </div>
        <div v-if="item.isChart">
          <Echarts :options="item.radarOption" :chartsStyle="radarStyle" ref="radarRef"></Echarts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import Echarts from '@components/Chart/GlobalEcharts'
import ChartOption from '@components/Chart/GlobalChartOption'
import { mapState } from 'vuex'
import commonJs from '@javascripts/common.js'
export default {
  name: 'radar',
  props: ['currentType', 'currentId'],
  data() {
    return {
      radarData: [],
      isShow: false,
      isLoading: true,
      isChart: false,
      radarOption: ChartOption.compareRadarOptions,
      radarStyle: {
        height: '400px'
      },
      radarParams: {
        profile_id: '',
        type: 'radar'
      }
    };
  },
  computed: {
    ...mapState(['authorization'])
  },
  created() {
    this.radarParams.profile_id = this.currentId
    if (Number(this.currentType) === 0) {
      // 微博
      this.kolWeiboIndustry(this.radarParams)
    }
    if (Number(this.currentType) === 1) {
      // 微信
      this.kolWeiXinIndustry(this.radarParams)
    }
  },
  methods: {
    // industry weibo
    kolWeiboIndustry(params) {
      const _that = this 
      axios
        .post(apiConfig.kolWeiboIndustry, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            console.log('我是微博 industry', res)
          }
        })
        .catch(function(error) {
          // console.log(error) 
        }) 
    },
    kolWeiXinIndustry(params) {
      const _that = this 
      axios
        .post(apiConfig.kolWeiXinIndustry, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('woshi weixin industry')
          }
        })
        .catch(function(error) {
          // console.log(error) 
        }) 
    },
  }
};
</script>
<style>
</style>