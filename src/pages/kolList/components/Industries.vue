<!-- detail.vue 中左侧详情的 Industries 图表  -->
<template>
  <div>
    <!-- SumIndustries -->
    <div class="panel default-panel mt20">
      <div class="panel-head">
        <h5 class="title">{{$t('lang.kolList.detail.industries')}}</h5>
      </div>
      <div class="panel-body prl30">
        <div v-if="type === 0 || type === 1">
          <div class="nonetip" v-if="isShow">
            <span>{{$t('lang.totalNoDataTip')}}</span>
          </div>
          <div class="r8-loading" v-if="isLoading">
            <a-spin tip="Loading..."/>
          </div>
          <div v-if="isChart">
            <Echarts
              :options="competitorList.options"
              :chartsStyle="competitorList.chartsStyle"
              ref="competitorEChart"
            ></Echarts>
          </div>
        </div>
        <div v-else>
          <div class="nonetip">
            <span>{{$t('lang.totalNoDataTip')}}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import { mapState } from 'vuex'
import commonJs from '@javascripts/common.js'
import Echarts from "@components/Chart/GlobalEcharts";
import ChartOption from "@components/Chart/GlobalChartOption";
export default {
  name: 'Industries',
  components: {
    Echarts
  },
  data() {
    return {
      type: 0,
      competitorList: {
        options: ChartOption.detaiOptions,
        chartsStyle: {
          height: '180px'
        }
      },
      isLoading: true,
      isShow: false,
      isChart: false,
    }
  },
  created() {
    this.type = Number(this.$route.query.type)
    let totalParams = {}
    totalParams.profile_id = this.$route.params.id
    if (Number(this.$route.query.type) === 0) {
      // 微博相关接口
      this.kolWeiboIndustry(totalParams)
    }
    if (Number(this.$route.query.type) === 1) {
      this.kolWeiXinIndustry(totalParams)
    }
  },
  methods: {
    // industry weibo
    kolWeiboIndustry(params) {
      const _that = this;
      axios
        .post(apiConfig.kolWeiboIndustry, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('我是微博', res)
            _that.isLoading = false
            if (res.data.data.length > 0) {
              _that.isChart = true
              _that.isShow = false
              _that.competitorList.options.yAxis.data = res.data.labels.reverse();
              _that.competitorList.options.series[0].data = res.data.data.reverse();
              _that.$refs.competitorEChart.updateOptions(
                _that.competitorList.options
              );
            } else {
              _that.isChart = false
              _that.isShow = true
            }
          }
        })
        .catch(function(error) {
          // console.log("kolWeiboIndustry error", error);
          // console.log(error)
        });
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
            _that.isLoading = false
            if (res.data.data.length > 0) {
              _that.isChart = true
              _that.isShow = false
              _that.competitorList.options.yAxis.data = res.data.labels.reverse()
              _that.competitorList.options.series[0].data = res.data.data.reverse()
              _that.$refs.competitorEChart.updateOptions(
                _that.competitorList.options
              )
            } else {
              _that.isChart = false
              _that.isShow = true
            }
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
  },
  computed: {
		...mapState(['authorization'])
  }
}
</script>
<style>
</style>
