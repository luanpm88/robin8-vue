<!-- compare.vue的radar 模块 -->
<template>
  <div>
    <div class="panel default-panel mt20">
      <div class="panel-head">
        <h5 class="title text-center">{{$t('lang.radarVue.tit')}}</h5>
      </div>
      <div class="panel-body p30">
        <div class="nonetip" v-if="isShow">
          <span>{{$t('lang.totalNoDataTip')}}</span>
        </div>
        <div class="r8-loading" v-if="isLoading">
          <a-spin tip="Loading..."/>
        </div>
        <div v-if="isChart">
          <Echarts :options="radarOption" :chartsStyle="radarStyle" ref="radarRef"></Echarts>
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
  components: {
    Echarts
  },
  data() {
    return {
      isShow: false,
      isLoading: true,
      isChart: false,
      radarOption: ChartOption.compareRadarOptions,
      radarStyle: {
        height: '280px'
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
    this.isLoading = true
    this.isShow = false
    this.isChart = false
    this.radarParams.profile_id = this.currentId
    this.radarOption.radar[0].indicator = []
    this.radarOption.series[0].data[0].value = []
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
            _that.isLoading = false
            // console.log('我是微博 industry', res)
            if (res.data.data.length === 0 || !res.data.length) {
              _that.isShow = true
              _that.isChart = false
            }
            if (res.data.data.length > 0) {
              _that.isShow = false
              _that.isChart = true
              let currentData = []
              res.data.labels.forEach((element, index) => {
                let newLabel = {
                  text: '',
                  max: 100
                }
                newLabel.text = element
                currentData.push(newLabel)
              });
              _that.radarOption.radar[0].indicator = currentData
              _that.radarOption.series[0].data[0].value = res.data.data
              _that.$refs.radarRef.updateOption(_that.radarOption)
            }
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
            _that.isLoading = false
            if (res.data.data.length === 0 || !res.data.length) {
              _that.isShow = true
              _that.isChart = false
            }
            if (res.data.data.length > 0) {
              _that.isShow = false
              _that.isChart = true
              let currentData = []
              res.data.labels.forEach((element, index) => {
                let newLabel = {
                  text: '',
                  max: 100
                }
                newLabel.text = element
                currentData.push(newLabel)
              });
              _that.radarOption.radar[0].indicator = currentData
              _that.radarOption.series[0].data[0].value = res.data.data
              _that.$refs.radarRef.updateOption(_that.radarOption)
            }
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