<template>
  <div class="benchmark-container">
    <div class="top-control-area">
      <button type="button" class="btn btn-purple" @click="pageBack">
        <span class="iconfont icon-arrow-left"></span>
        Back
      </button>
    </div>
    <div class="bench-card mt20">
      <div class="r8-loading" v-if="oneLoading">
        <a-spin tip="Loading..."/>
      </div>
      <Echarts
        v-else
        :options="benchOne.options"
        :chartsStyle="benchOne.chartsStyle"
        ref="benchOneChart"
      ></Echarts>
    </div>
    <div class="bench-card mt20">
      <div class="r8-loading" v-if="twoLoading">
        <a-spin tip="Loading..."/>
      </div>
      <Echarts
        v-else
        :options="benchTwo.options"
        :chartsStyle="benchTwo.chartsStyle"
        ref="benchTwoChart"
      ></Echarts>
    </div>
    <div class="bench-card mt20">
      <div class="r8-loading" v-if="threeLoading">
        <a-spin tip="Loading..."/>
      </div>
      <Echarts
        v-else
        :options="benchThree.options"
        :chartsStyle="benchThree.chartsStyle"
        ref="benchThreeChart"
      ></Echarts>
    </div>
  </div>
</template>

<script>
import axios from 'axios' 
import apiConfig from '@/config' 
import Echarts from '@components/Chart/GlobalEcharts' 
import ChartOption from '@components/Chart/GlobalChartOption' 
import { mapState } from 'vuex' 
export default {
  name: 'benchMark',
  components: {
    Echarts
  },
  computed: {
    ...mapState(['authorization'])
  },
  created() {
    this.totalParams.industry = this.$route.query.industry
    this.totalParams.report_date = this.$route.query.report_date 
    this.totalParams.no_of_days = this.$route.query.no_of_days 

    this.totalTwoParams.industry = this.$route.query.industry 
    this.totalTwoParams.report_date = this.$route.query.report_date 
    this.totalTwoParams.no_of_days = this.$route.query.no_of_days 
    if (Number(this.$route.params.type) === 1) {
      // 微信 图表一
      this.weixinBeachOne(this.totalParams) 
      // 微信 图表二
      this.weixinBeachTwo(this.totalTwoParams) 
      // 微信 图表三
      this.weixinBeachThree(this.totalTwoParams) 
    }
    if (Number(this.$route.params.type) === 0) {
      // 微博 图表一
      this.weiboBeachOne(this.totalParams) 
      // 微博 图表二
      this.weiboBeachTwo(this.totalTwoParams) 
      // 微博 图表三
      this.weiboBeachThree(this.totalTwoParams) 
    }
  },
  data() {
    return {
      oneLoading: true,
      twoLoading: true,
      threeLoading: true,
      totalParams: {
        industry: '',
        no_of_days: '',
        report_date: '',
        raw: 1
      },
      totalTwoParams: {
        industry: '',
        no_of_days: '',
        report_date: ''
      },
      benchOneColorList: ChartOption.benchmarkColor.blue_top_20_colors,
      benchTwoColorList: ChartOption.benchmarkColor.blue_top_20_colors,
      benchOne: {
        options: ChartOption.benchOneOptions,
        chartsStyle: {
          height: '600px'
        }
      },
      benchTwo: {
        options: ChartOption.benchTwoOptions,
        chartsStyle: {
          height: '600px'
        }
      },
      benchThree: {
        options: ChartOption.benchThreeOptions,
        chartsStyle: {
          height: '600px'
        }
      }
    } 
  },
  methods: {
    // 微信Benchmark top 21 KOLs
    weixinBeachOne(params) {
      const _that = this 
      axios
        .post(apiConfig.weixinBeachOne, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          _that.benchOne.options.series = [] 
          _that.benchOne.options.title.text =
            'Top 21 KOLs on ' +
            _that.totalParams.industry +
            ' benchmarking (average Likes vs average Reads)' 
          _that.benchOne.options.xAxis.name = 'Reads' 
          if (res.status === 200) {
            _that.oneLoading = false 
            res.data.forEach((element, index) => {
              let json = {
                name: '',
                data: [],
                type: 'scatter',
                symbolSize: function(data) {
                  return Math.sqrt(data[2]) / 150 
                },
                label: {
                  emphasis: {
                    show: true,
                    borderWidth: 0,
                    padding: [8, 8, 8, 8],
                    color: '#fff',
                    align: 'left',
                    fontSize: 16,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    borderRadius: 5,
                    formatter: function(param) {
                      param =
                        'Doc Count: ' +
                        param.data[5] +
                        ' \n #' +
                        param.data[3] +
                        ': \n Likes: ' +
                        param.data[0] +
                        '\n Reads: ' +
                        param.data[1] 
                      return param 
                    },
                    position: 'top'
                  }
                },
                itemStyle: {
                  normal: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0)',
                    shadowOffsetY: 5,
                    color: '',
                    opacity: 0.8
                  }
                }
              } 
              let x,
                y,
                size,
                maxBubbleSize,
                maxCount = 0,
                currentData = [] 
              x = element.total_reads / element.doc_count 
              y = element.total_likes / element.doc_count 
              maxBubbleSize = res.data.length * 100 * document.body.clientWidth 
              if (maxCount < element.doc_count) {
                maxCount = element.doc_count 
              }
              size = 5 + element.doc_count * maxBubbleSize 
              json.name = '#' + element.rank_no + element.profile_name 
              currentData.push(
                x,
                y,
                size,
                element.profile_name,
                element.profile_name,
                element.doc_count
              ) 
              json.data.push(currentData) 
              json.itemStyle.normal.color = _that.benchOneColorList[index] 
              _that.benchOne.options.series.push(json) 
            }) 
            _that.$refs.benchOneChart.updateOptions(_that.benchOne.options) 
          }
        })
        .catch(function(error) {
          // console.log(error) 
        }) 
    },
    weixinBeachTwo(params) {
      const _that = this 
      axios
        .post(apiConfig.weixinBeachTwo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          _that.benchTwo.options.series = [] 
          _that.benchTwo.options.title.text =
            'Share of Voice over time - Top 30 KOLs on Fashion when comparing to Top 20 KOLs on ' +
            _that.totalParams.industry +
            '\n - Share of Voice over time' 
          if (res.status === 200) {
            _that.twoLoading = false 
            res.data.data.forEach((element, index) => {
              let json = {
                name: '',
                type: 'bar',
                stack: '总量',
                color: '',
                label: {
                  normal: {
                    show: false,
                    position: 'insideRight'
                  }
                },
                data: []
              } 
              json.name = res.data.profile_names[index] 
              json.data = element 
              json.color = _that.benchOneColorList[index] 
              _that.benchTwo.options.series.push(json) 
            }) 
            _that.benchTwo.options.xAxis.data = res.data.date_labels 
            _that.$refs.benchTwoChart.updateOptions(_that.benchTwo.options) 
          }
        })
        .catch(function(error) {
          // console.log(error) 
        }) 
    },
    weixinBeachThree(params) {
      const _that = this 
      axios
        .post(apiConfig.weixinBeachThree, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          _that.benchThree.options.series = [] 
          _that.benchThree.options.title.text =
            'Share of Voice over time - Top 30 KOLs on ' +
            _that.totalParams.industry +
            ' when comparing to overall market voice' 
          if (res.status === 200) {
            _that.threeLoading = false 
            res.data.data.forEach((element, index) => {
              let json = {
                name: '',
                type: 'bar',
                stack: '总量',
                color: '',
                label: {
                  normal: {
                    show: false,
                    position: 'insideRight'
                  }
                },
                data: []
              } 
              json.name = res.data.profile_names[index] 
              json.data = element 
              json.color = _that.benchOneColorList[index] 
              _that.benchThree.options.series.push(json) 
            }) 
            _that.benchThree.options.xAxis.data = res.data.date_labels 
            _that.$refs.benchThreeChart.updateOptions(_that.benchThree.options) 
          }
        })
        .catch(function(error) {
          // console.log(error) 
        }) 
    },
    // weiboBenchmark top 21 KOLs
    weiboBeachOne(params) {
      const _that = this 
      axios
        .post(apiConfig.weiboBeachOne, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          _that.benchOne.options.series = [] 
          _that.benchOne.options.title.text =
            'Top 21 KOLs on ' +
            _that.totalParams.industry +
            ' benchmarking (average Likes vs average Reads)' 
          _that.benchOne.options.xAxis.name = 'Total Sum Engagement' 
          if (res.status === 200) {
            _that.oneLoading = false 
            res.data.forEach((element, index) => {
              let json = {
                name: '',
                data: [],
                type: 'scatter',
                symbolSize: function(data) {
                  return Math.sqrt(data[2]) / 150 
                },
                label: {
                  emphasis: {
                    show: true,
                    borderWidth: 0,
                    padding: [8, 8, 8, 8],
                    color: '#fff',
                    align: 'left',
                    fontSize: 16,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    borderRadius: 5,
                    formatter: function(param) {
                      // return param.data[3]  
                      param =
                        'Doc Count: ' +
                        param.data[5] +
                        ' \n #' +
                        param.data[3] +
                        ': \n Likes: ' +
                        param.data[0] +
                        '\n Total Sum Engagement: ' +
                        param.data[1] 
                      return param 
                    },
                    position: 'top'
                  }
                },
                itemStyle: {
                  normal: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0)',
                    shadowOffsetY: 5,
                    color: '',
                    opacity: 0.8
                  }
                }
              } 
              let x,
                y,
                size,
                maxBubbleSize,
                maxCount = 0,
                currentData = [] 
              x = element.total_sum_engagement / element.doc_count 
              y = element.total_likes / element.doc_count 
              maxBubbleSize = res.data.length * 50 * document.body.clientWidth 
              if (maxCount < element.doc_count) {
                maxCount = element.doc_count 
              }
              size = 5 + element.doc_count * maxBubbleSize 
              json.name = '#' + element.rank_no + element.profile_name 
              currentData.push(
                x,
                y,
                size,
                element.profile_name,
                element.profile_name,
                element.doc_count
              ) 
              json.data.push(currentData) 
              json.itemStyle.normal.color = _that.benchOneColorList[index] 
              _that.benchOne.options.series.push(json) 
            }) 
            _that.$refs.benchOneChart.updateOptions(_that.benchOne.options) 
          }
        })
        .catch(function(error) {
          // console.log(error) 
        }) 
    },
    weiboBeachTwo(params) {
      const _that = this 
      axios
        .post(apiConfig.weiboBeachTwo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          _that.benchTwo.options.series = [] 
          _that.benchTwo.options.title.text =
            'Share of Voice over time - Top 30 KOLs on Fashion when comparing to Top 20 KOLs on ' +
            _that.totalParams.industry +
            '\n - Share of Voice over time' 
          if (res.status === 200) {
            _that.twoLoading = false 
            res.data.data.forEach((element, index) => {
              let json = {
                name: '',
                type: 'bar',
                stack: '总量',
                color: '',
                label: {
                  normal: {
                    show: false,
                    position: 'insideRight'
                  }
                },
                data: []
              } 
              json.name = res.data.profile_names[index] 
              json.data = element 
              json.color = _that.benchOneColorList[index] 
              _that.benchTwo.options.series.push(json) 
            }) 
            _that.benchTwo.options.xAxis.data = res.data.date_labels 
            _that.$refs.benchTwoChart.updateOptions(_that.benchTwo.options) 
          }
        })
        .catch(function(error) {
          // console.log(error) 
        }) 
    },
    weiboBeachThree(params) {
      const _that = this 
      axios
        .post(apiConfig.weiboBeachThree, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          _that.benchThree.options.series = [] 
          _that.benchThree.options.title.text =
            'Share of Voice over time - Top 30 KOLs on ' +
            _that.totalParams.industry +
            ' when comparing to overall market voice' 
          if (res.status === 200) {
            _that.threeLoading = false 
            res.data.data.forEach((element, index) => {
              let json = {
                name: '',
                type: 'bar',
                stack: '总量',
                color: '',
                label: {
                  normal: {
                    show: false,
                    position: 'insideRight'
                  }
                },
                data: []
              } 
              json.name = res.data.profile_names[index] 
              json.data = element 
              json.color = _that.benchOneColorList[index] 
              _that.benchThree.options.series.push(json) 
            }) 
            _that.benchThree.options.xAxis.data = res.data.date_labels 
            _that.$refs.benchThreeChart.updateOptions(_that.benchThree.options) 
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
.bench-card {
  background: $white;
  padding: 30px;
  box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.08);
}
</style>
