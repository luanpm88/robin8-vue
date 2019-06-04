<!--  -->
<template>
  <div>
    <div class="panel default-panel mt20 detail-analytic-chart" v-for="(item, index) in currentData" :key="index">
      <div class="panel-body prl30">
        <h5 class="title">{{item.mode}} {{$t('lang.kolList.analyticVue.chat.tit')}} {{item.type}} {{$t('lang.kolList.analyticVue.chat.count')}} {{item.countParams.start_date}} - {{item.countParams.end_date}}</h5>
        <div class="nonetip" v-if="item.isShow">
          <span>{{$t('lang.totalNoDataTip')}}</span>
        </div>
        <div class="r8-loading" v-if="item.isLoading">
          <a-spin tip="Loading..."/>
        </div>
        <div v-if="item.isChart">
          <Echarts :options="item.options" :chartsStyle="item.chartsStyle" :ref="item.ref"></Echarts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import Echarts from '@components/Chart/GlobalEcharts'
import { mapState } from 'vuex'
export default {
  name: 'AnalyticChart',
  props: ['currentType', 'currentId', 'currentData'],
  components: {
    Echarts
  },
  data() {
    return {}
  },
  created() {
    this.currentData.forEach((element, index) => {
      element.countParams.profile_id = String(this.currentId)
      element.isLoading = true
      element.isShow = false
      element.isChart = false
      if (Number(this.currentType) === 0) {
        // 微博
        this.detailCountWeibo(element.countParams, index)
      }
      if (Number(this.currentType) === 1) {
        // 微信
        this.detailCountWeixin(element.countParams, index)
      }
    })
  },
  computed: {
    ...mapState(['authorization'])
  },
  methods: {
    // count 图表微博
    detailCountWeibo(params, num) {
      const _that = this
      axios
        .post(apiConfig.detailCountWeibo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('woshi cout weibo', num, res)
            _that.currentData[num].isLoading = false
            if (res.data.data.length > 0) {
              _that.currentData[num].isShow = false
              _that.currentData[num].isChart = true
              _that.currentData[num].options.xAxis.data = res.data.labels
              _that.currentData[num].options.series[0].data = res.data.data
              let curRef = 'weibo' + num
              _that.$refs.curRef.updateOptions(_that.currentData[num].options)
            } else {
              _that.currentData[num].isShow = true
              _that.currentData[num].isChart = false
            }
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // count 图表微信
    detailCountWeixin(params, num) {
      const _that = this
      axios
        .post(apiConfig.detailCountWeixin, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('woshi cout weixin', num, res)
            _that.currentData[num].isLoading = false
            if (res.data.data.length > 0) {
              _that.currentData[num].isShow = false
              _that.currentData[num].isChart = true
              _that.currentData[num].options.xAxis.data = res.data.labels
              _that.currentData[num].options.series[0].data = res.data.data
              let curRef = 'weixin' + num
              _that.$refs.curRef.updateOptions(_that.currentData[num].options)
            } else {
              _that.currentData[num].isShow = true
              _that.currentData[num].isChart = false
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
