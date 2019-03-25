<template>
  <div class="panel default-panel">
    <div class="panel-head">
      <h5 class="title purple">
        <span class="iconfont icon-target"></span>
        {{$t('lang.homePage.anlytics.title')}}
        <tab :tabList="topTab" :tabIndex="topTabCur" @changeTab="topTabClick" class="panel-tab"></tab>
      </h5>
    </div>
    <div class="panel-body list-content">
      <div class="mt30">
        <div class="analytic-box">
          <div class="analytic-chart">
            <div class="r8-loading" v-if="isLoading">
              <a-spin tip="Loading..."/>
            </div>
            <div class="nonetip" v-if="isShow">
              <span>{{$t('lang.totalNoDataTip')}}</span>
            </div>
            <div v-if="cur === 0" class="analytic-chart-box">
              <div class="nonetip" v-if="isTrendShow">
                <span>{{$t('lang.homePage.noBrand')}}</span>
              </div>
              <div v-if="isTrend">
                <p class="analytic-chart-title">Mentions over past 7 days for {{trendTitle}}</p>
                <Echarts
                  :options="trendsList.options"
                  :chartsStyle="trendsList.chartsStyle"
                  ref="tendsEChart"
                ></Echarts>
              </div>
            </div>
            <div v-if="cur === 1">
              <div v-if="isConcept">
                <p class="analytic-chart-title">Top keywords</p>
                <tag-charts :width="830" :height="480" :taglist="parentTags"></tag-charts>
              </div>
            </div>
            <div v-if="cur === 2" class="analytic-chart-box">
              <div v-if="isCompetitor">
                <p class="analytic-chart-title">Top {{competitorsNum}} competitors</p>
                <Echarts
                  :options="competitorList.options"
                  :chartsStyle="competitorList.chartsStyle"
                  ref="competitorEChart"
                ></Echarts>
              </div>
            </div>
            <div v-if="cur === 3">
              <div v-if="isSentiment">
                <p class="analytic-chart-title">Sentiment for {{trendTitle}}</p>
                <Echarts
                  :options="SentimentList.options"
                  :chartsStyle="SentimentList.chartsStyle"
                  ref="sentimentChart"
                  v-if="cur === 3"
                ></Echarts>
              </div>
            </div>
          </div>
        </div>
      </div>
      <tab
        :tabList="tabList"
        :tabIndex="cur"
        @changeTab="tabClick"
        class="analytic-bottom-tab mt10"
      ></tab>
      <p class="analytic-type">&nbsp;</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import Echarts from '@components/Chart/GlobalEcharts'
import ChartOption from '@components/Chart/GlobalChartOption'
import TagCharts from '@components/Chart/chartTags'
import Tab from '@components/DefaultTabs'
import { mapState } from 'vuex'
let key = "&application_id=local-001&application_key=vue-001"
import commonJs from '@javascripts/common.js'
let colorList = [
  'rgba(179,127,235,0.5)',
  'rgba(179,127,235,0.4)',
  'rgba(179,127,235,0.3)',
  'rgba(179,127,235,0.2)',
  'rgba(179,127,235,0.1)'
]
let colorTwoList = ['#7DCEA0', '#F5B7B1']
export default {
  props: ['childKeyList', 'isSelectBrand'],
  components: {
    TagCharts,
    Tab,
    Echarts
  },
  data() {
    return {
      competitorsNum: '',
      topTabCur: 0,
      cur: 0,
      isLoading: true,
      isTrendShow: true,
      isTrend: false,
      isConcept: false,
      isCompetitor: false,
      isSentiment: false,
      isShow: false,
      trendTitle: '',
      trendsList: {
        options: ChartOption.trendOptions,
        chartsStyle: {
          height: '400px'
        }
      },
      competitorList: {
        options: ChartOption.competitorsOptions,
        chartsStyle: {
          height: '400px'
        }
      },
      SentimentList: {
        options: ChartOption.SentimentOptions,
        chartsStyle: {
          height: '400px'
        }
      },
      trendParams: {
        start_date: commonJs.cPastSevenDays,
        end_date: commonJs.cPastOneday,
        brand_keywords: 'BMW',
        type: 'doc'
      },
      competitorParams: {
        start_date: commonJs.cPastSevenDays,
        end_date: commonJs.cPastOneday,
        cb_names: ['C1 BMW', 'C2 Audi', 'C3 Honda'],
        cb_keywords: ['BMW', 'Audi', 'Honda']
      },
      sentimentParams: {
        start_date: commonJs.cPastSevenDays,
        end_date: commonJs.cPastOneday,
        brand_keywords: 'BMW'
      },
      conceptParams: {
        start_date: commonJs.cPastSevenDays,
        end_date: commonJs.cPastOneday,
        brand_keywords: 'BMW',
        language: 'en'
      },
      topTab: [
        {
          index: 0,
          name: 'weibo'
        },
        {
          index: 1,
          name: 'wechat'
        }
      ],
      tabList: [
        {
          index: 0,
          name: 'homePage.anlytics.trend'
        },
        {
          index: 1,
          name: 'homePage.anlytics.concept'
        },
        {
          index: 2,
          name: 'homePage.anlytics.competitors'
        },
        {
          index: 3,
          name: 'homePage.anlytics.sentiments'
        }
      ],
      trendsWeiboList: {
        labels: [],
        dataList: []
      },
      competiteWeiboList: {
        labels: [],
        dataList: []
      },
      sentimentWeiboList: {
        data: [],
        labels: []
      },
      parentTags: [],
      labelList: [],
      tagColor: 'purple'
    } 
  },
  watch: {
    childKeyList: {
      handler() {
        if (this.isSelectBrand) {
          this.isTrendShow = false
          this.pramsInit() 
          if (this.cur === 0) {
            // trend 微博
            this.isTrend = false 
            this.trendsWeibo(this.trendParams) 
          } else {
            this.isCompetitor = false 
            // competitor 微博
            this.competitorWeibo(this.competitorParams) 
          }
        } else {
          this.isTrend = false
          this.isTrendShow = true
          this.isLoading = false
        }
      },
      deep: true
    }
  },
  created() {
    if (this.isSelectBrand) {
      this.isTrendShow = false
      this.pramsInit() 
      if (this.cur === 0) {
        // trend 微博
        this.isTrend = false 
        this.trendsWeibo(this.trendParams) 
      } else {
        this.isCompetitor = false 
        // competitor 微博
        this.competitorWeibo(this.competitorParams) 
      }
    } else {
      this.isTrend = false
      this.isTrendShow = true
      this.isLoading = false
    }
    
  },
  computed: {
    ...mapState(["authorization"])
  },
  methods: {
    pramsInit() {
      this.trendTitle = this.childKeyList.name
      this.cur = this.childKeyList.tabIndex
      let newKey = ''
      this.childKeyList.brand_keywords.split(',').forEach(item => {
        newKey += '\\"' + item.replace(/^\s+|\s+$/g, '') + '\\"'
      }) 
      this.trendParams.brand_keywords = newKey
      this.sentimentParams.brand_keywords = newKey
      this.conceptParams.brand_keywords = newKey
      this.competitorParams.cb_names = this.childKeyList.cb_names
      this.competitorParams.cb_keywords = this.childKeyList.cb_keywords
      // 操作竞争者的cb_keywords
      let _arr = []
      this.competitorParams.cb_keywords.forEach(element => {
        let twoKey = []
        let _items = element.split(',')
        if (_items.length > 1) {
          _items.forEach(item => {
            twoKey.push('\\"' + item.replace(/^\s+|\s+$/g, '') + '\\"')
          }) 
        } else {
          _items.forEach(item => {
            twoKey.push(item.replace(/^\s+|\s+$/g, ''))
          }) 
        }
        twoKey = twoKey.join(" ")
        _arr.push(twoKey) 
      })
      _arr.push(newKey)
      this.competitorParams.cb_names = this.competitorParams.cb_names.slice(0, this.competitorParams.cb_names.length)
      this.competitorParams.cb_names.push(this.trendTitle)
      this.competitorParams.cb_keywords = _arr
    },
    topTabClick(topTab) {
      this.topTabCur = topTab.index
      this.isLoading = true
      this.isShow = false
      if (this.cur === 0 && topTab.index === 0) {
        this.isTrend = false 
        // // trend 微博
        // this.trendsWeibo(this.trendParams) 
        if (this.isSelectBrand) {
          // trend 微博
          this.trendsWeibo(this.trendParams) 
        } else {
          this.isTrend = false
          this.isTrendShow = true
          this.isLoading = false
        }
      }
      if (this.cur === 0 && topTab.index === 1) {
        this.isTrend = false 
        // trend 微信
        // this.trendsWeixin(this.trendParams) 
        if (this.isSelectBrand) {
          // trend 微博
          this.trendsWeixin(this.trendParams) 
        } else {
          this.isTrend = false
          this.isTrendShow = true
          this.isLoading = false
        }
      }
      if (this.cur === 1 && topTab.index === 0) {
        this.isConcept = false 
        // concept 微博
        this.conceptWeibo(this.conceptParams) 
      }
      if (this.cur === 1 && topTab.index === 1) {
        this.isConcept = false 
        // concept 微信
        this.conceptWeixin(this.conceptParams) 
      }
      if (this.cur === 2 && topTab.index === 0) {
        this.isCompetitor = false 
        // competitor 微博
        this.competitorWeibo(this.competitorParams) 
      }
      if (this.cur === 2 && topTab.index === 1) {
        this.isCompetitor = false 
        // competitor 微信
        this.competitorWeixin(this.competitorParams) 
      }
      if (this.cur === 3 && topTab.index === 0) {
        this.isSentiment = false 
        // sentiment 微博
        this.sentimentWeibo(this.sentimentParams) 
      }
      if (this.cur === 3 && topTab.index === 1) {
        this.isSentiment = false 
        // sentiment 微信
        this.sentimentWeixin(this.sentimentParams) 
      }
    },
    tabClick(tab) {
      this.cur = tab.index 
      // this.topTabCur = 0
      this.isLoading = true
      this.isShow = false
      if (tab.index === 0 && this.topTabCur === 0) {
        this.isTrend = false 
        if (this.isSelectBrand) {
          // trend 微博
          this.trendsWeibo(this.trendParams) 
        } else {
          this.isTrend = false
          this.isTrendShow = true
          this.isLoading = false
        }
      }
      if (tab.index === 0 && this.topTabCur === 1) {
        this.isTrend = false 
        if (this.isSelectBrand) {
          // trend 微博
          this.trendsWeixin(this.trendParams) 
        } else {
          this.isTrend = false
          this.isTrendShow = true
          this.isLoading = false
        }
      }
      if (tab.index === 1 && this.topTabCur === 0) {
        this.isConcept = false 
        // concept 微博
        this.conceptWeibo(this.conceptParams) 
      }
      if (tab.index === 1 && this.topTabCur === 1) {
        this.isConcept = false 
        // concept 微信
        this.conceptWeixin(this.conceptParams) 
      }
      if (tab.index === 2 && this.topTabCur === 0) {
        this.isCompetitor = false 
        // competitor 微博
        this.competitorWeibo(this.competitorParams) 
      }
      if (tab.index === 2 && this.topTabCur === 1) {
        this.isCompetitor = false 
        // competitor 微信
        this.competitorWeixin(this.competitorParams) 
      }
      if (tab.index === 3 && this.topTabCur === 0) {
        this.isSentiment = false 
        // sentiment 微博
        this.sentimentWeibo(this.sentimentParams) 
      }
      if (tab.index === 3 && this.topTabCur === 1) {
        this.isSentiment = false 
        // sentiment 微信
        this.sentimentWeixin(this.sentimentParams) 
      }
    },
    // trend 微博
    trendsWeibo(params) {
      const _that = this 
      this.trendsList.options.xAxis.data = [] 
      this.trendsList.options.series[0].data = [] 
      axios
        .post(apiConfig.trendsWeibo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.isLoading = false 
            _that.isTrend = true 
            _that.trendsList.options.xAxis.data = res.data.labels.slice(0, 7) 
            _that.trendsList.options.series[0].data = res.data.data.slice(0, 7) 
            _that.$refs.tendsEChart.updateOptions(_that.trendsList.options) 
          }
        })
        .catch(function(error) {
          // console.log(error)
        }) 
    },
    // trend 微信
    trendsWeixin(params) {
      this.trendsList.options.xAxis.data = [] 
      this.trendsList.options.series[0].data = [] 
      const _that = this 
      axios
        .post(apiConfig.trendsWeixin, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          _that.isLoading = false 
          _that.isTrend = true 
          _that.trendsList.options.xAxis.data = res.data.labels.slice(0, 7) 
          _that.trendsList.options.series[0].data = res.data.data.slice(0, 7) 
          _that.$refs.tendsEChart.updateOptions(_that.trendsList.options) 
        })
        .catch(function(error) {
          // console.log(error)
        }) 
    },
    // concept 微博
    conceptWeibo(params) {
      const _that = this 
      axios
        .post(apiConfig.conceptWeibo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          _that.isLoading = false 
            if (res.data.length === 0 || !res.data.length) {
              _that.isShow = true
              _that.isConcept = false
            } else {
              _that.isShow = false
              _that.isConcept = true
              _that.parentTags = []
              _that.parentTags = res.data.slice(0, 100) 
            }
        })
        .catch(function(error) {
          // console.log(error)
        }) 
    },
    // concept 微信
    conceptWeixin(params) {
      const _that = this 
      axios
        .post(apiConfig.conceptWeixin, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.isLoading = false 
            if (res.data.length === 0 || !res.data.length) {
              _that.isShow = true
              _that.isConcept = false
            } else {
              _that.isShow = false
              _that.isConcept = true
              _that.parentTags = []
              _that.parentTags = res.data.slice(0, 100) 
            }
          }
          // console.log('我是微信', res)
        })
        .catch(function(error) {
          // console.log(error)
        }) 
    },
    // competitor 微博
    competitorWeibo(params) {
      const _that = this 
      this.competitorList.options.yAxis.data = [] 
      this.competitorList.options.series[0].data = [] 
      this.labelList = [] 
      axios
        .post(apiConfig.competitorWeibo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.isLoading = false 
            _that.isCompetitor = true 
            _that.competitorsNum = res.data.data.length 
            res.data.data.forEach((element, index) => {
              let json = {
                label: '',
                data: ''
              } 
              json.data = element 
              json.label = res.data.labels[index] 
              _that.labelList.push(json) 
            }) 
            _that.labelList.forEach(element => {
              _that.competitorList.options.yAxis.data.push(element.label) 
              _that.competitorList.options.series[0].data.push(element.data) 
            }) 
            _that.$refs.competitorEChart.updateOptions(
              _that.competitorList.options
            ) 
          }
        })
        .catch(function(error) {
          // console.log(error)
        }) 
    },
    // competitor 微信
    competitorWeixin(params) {
      this.competitorList.options.yAxis.data = [] 
      this.competitorList.options.series[0].data = [] 
      this.labelList = [] 
      const _that = this 
      axios
        .post(apiConfig.competitorWeixin, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.isLoading = false 
            _that.isCompetitor = true 
            _that.competitorsNum = res.data.data.length 
            res.data.data.forEach((element, index) => {
              let json = {
                label: '',
                data: ''
              } 
              json.data = element 
              json.label = res.data.labels[index] 
              _that.labelList.push(json) 
            }) 
            _that.labelList.forEach(element => {
              _that.competitorList.options.yAxis.data.push(element.label) 
              _that.competitorList.options.series[0].data.push(element.data)
            }) 
            _that.$refs.competitorEChart.updateOptions(
              _that.competitorList.options
            ) 
          }
        })
        .catch(function(error) {
          // console.log(error)
        }) 
    },
    // sentiment 微博
    sentimentWeibo(params) {
      const _that = this 
      axios
        .post(apiConfig.sentimentWeibo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.isLoading = false 
            _that.isSentiment = true 
            let newArr = res.data.labels.map((item, index) => {
              let json = {} 
              json.name = item 
              json.value = res.data.data[index] 
              json.itemStyle = { color: colorTwoList[index] } 
              return json 
            }) 
            _that.SentimentList.options.series[0].data = newArr 
            _that.$refs.sentimentChart.updateOptions(
              _that.SentimentList.options
            ) 
          }
        })
        .catch(function(error) {
          // console.log(error)
        }) 
    },
    // sentiment 微信
    sentimentWeixin(params) {
      const _that = this 
      axios
        .post(apiConfig.sentimentWeixin, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.isLoading = false 
            _that.isSentiment = true 
            _that.SentimentList.options.series[0].data = [] 
            let newArr = res.data.labels.map((item, index) => {
              let json = {} 
              json.name = item 
              json.value = res.data.data[index] 
              json.itemStyle = { color: colorTwoList[index] } 
              return json 
            }) 
            _that.SentimentList.options.series[0].data = newArr 
            _that.$refs.sentimentChart.updateOptions(
              _that.SentimentList.options
            ) 
          }
        })
        .catch(function(error) {
          // console.log(error)
        }) 
    },
    // competitor 排序函数
    compare(property) {
      return function(a, b) {
        var value1 = a[property] 
        var value2 = b[property] 
        return value1 - value2 
      } 
    }
  }
} 
</script>
<style lang="scss" scoped>
.analytic-chart-box /deep/ {
  width: 70% ;
  margin: 0px auto;
}
.analytic-chart /deep/ {
  #line-chart,
  #horizontalbar-chart {
    height: 464px !important;
  }
  #line-chart {
    margin-bottom: 10px;
  }
  #pie-chart {
    margin: 0px auto $font-sm;
    width: 390px !important;
    height: 375px !important;
  }
  .chart-tag {
    width: 940;
    margin: 0px auto 25px;
  }
}
.list-content {
  padding: 20px;
}
.source-tab {
  overflow: hidden;
  & > .btn {
    padding: 4px 12px;
  }
  & > .btn:first-child {
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
  }
  & > .btn:last-child {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
  }
}
.analytic-chart {
  // width: 70%;
  margin: 0px auto;
}
.h-analytic-type {
  text-align: center;
  color: nth($purple, 1);
}
.panel-head {
  position: relative;
}
.panel-tab {
  position: absolute;
  right: 30px;
  top: 15px;
}
.analytic-bottom-tab {
  text-align: center;
}
.analytic-chart-title {
  line-height: 35px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 18px;
  color: #7b7878;
  font-weight: bold;
}
</style>
