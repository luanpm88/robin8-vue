<template>
  <div class="page">
    <page-header></page-header>
    <div class="container mt50 clearfix">
      <div class="kol-detail clearfix">
        <div class="kol-detail-side">
          <!-- info -->
          <div class="panel default-panel kol-infobox">
            <div class="panel-body">
              <p class="kol-info-topbg"></p>
              <div class="kol-small-avatar">
                <img :src="infoList.avatar_url" alt>
              </div>
              <div class="kol-info">
                <p>
                  {{infoList.profile_name}}
                  <i class="iconfont icon-female" v-if="infoList.gender == 'm' || infoList.gender == 'M'"></i>
                  <i class="iconfont icon-male" v-if="infoList.gender == 'f' || infoList.gender == 'F'"></i>
                  <button
                    type="button"
                    class="btn btn-xs btn-purple"
                    @click="doAddCart(infoList)"
                  >
                    <span
                      class="iconfont icon-cart"
                      @click="doAddCart(infoList)"
                    ></span>
                    Add to cart
                  </button>
                </p>
                <p>{{infoList.age}}</p>
                <p>
                  <i class="iconfont icon-location"></i>
                  {{infoList.region}}
                </p>
              </div>
              <ul class="clearfix">
                <li v-for="(item, index) in dec" :key="index">{{item}}</li>
              </ul>
              <div class="kol-brand" v-if="type === 0 || type === 1">
                <p class="clearfix">
                  <span>
                    {{$t('lang.kolList.detail.currentBrandName')}}
                  </span>
                  <b>{{currentBrandName}}</b>
                </p>
                <p class="clearfix" v-if="type === 0 || type === 1">
                  <span>
                    <a-tooltip placement="topLeft" :title="$t('lang.kolList.detail.mentionsTip')">
                      {{$t('lang.kolList.detail.mentions')}}
                    </a-tooltip>
                  </span>
                  <b>{{MentionsNum}}</b>
                </p>
                <p class="clearfix" v-if="type === 0 || type === 1">
                  <span>
                    <a-tooltip placement="topLeft" :title="$t('lang.kolList.detail.sentimentTip')">
                      {{$t('lang.kolList.detail.sentiment')}}
                    </a-tooltip>
                  </span>
                  <b>{{Sentiment}}</b>
                </p>
              </div>
            </div>
          </div>
          <div class="panel default-panel mt20">
            <!-- <div class="panel-head">
              <h5 class="title text-center">{{$t('lang.kolList.detail.industries')}}</h5>
            </div> -->
            <div class="panel-body prl30">
              <p class="kol-cloumn">{{$t('lang.kolList.detail.industries')}}</p>
              <div v-if="type === 0 || type === 1">
                <Echarts
                  :options="competitorList.options"
                  :chartsStyle="competitorList.chartsStyle"
                  ref="competitorEChart"
                ></Echarts>
              </div>
              <div v-else>
                <div class="nonetip">
                  <span>{{$t('lang.totalNoDataTip')}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="panel default-panel mt20" >
            <div class="panel-body prl30">
              <p class="kol-cloumn">
                {{$t('lang.kolList.detail.brandDistribution')}}
              </p>
              <div v-if="type === 0 || type === 1">
                <div class="nonetip" v-if="isbrandDisShow">
                  <span>{{$t('lang.totalNoDataTip')}}</span>
                </div>
                <div class="r8-loading" v-if="isbrandDisLoading">
                  <a-spin tip="Loading..."/>
                </div>
                <tag-charts v-if="isbrandDisTag" :width="240" :height="180" :taglist="parentbrandDisTags" class="mt20"></tag-charts>
              </div>
              <div v-else>
                <div class="nonetip">
                  <span>{{$t('lang.totalNoDataTip')}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="panel default-panel mt20" >
            <!-- <div class="panel-head">
              <h5 class="title text-center">
                <a-tooltip placement="topLeft" :title="$t('lang.kolList.detail.keywordsTip')">
                  {{$t('lang.kolList.detail.keywords')}}
                </a-tooltip>
              </h5>
            </div> -->
            <div class="panel-body prl30">
              <p class="kol-cloumn">
                <a-tooltip placement="topLeft" :title="$t('lang.kolList.detail.keywordsTip')">
                  {{$t('lang.kolList.detail.keywords')}}
                </a-tooltip>
              </p>
              <div v-if="type === 0 || type === 1">
                <div class="nonetip" v-if="isShow">
                  <span>{{$t('lang.totalNoDataTip')}}</span>
                </div>
                <div class="r8-loading" v-if="isLoading">
                  <a-spin tip="Loading..."/>
                </div>
                <tag-charts v-if="isTag" :width="240" :height="180" :taglist="parentTags" class="mt20"></tag-charts>
              </div>
              <div v-else>
                <div class="nonetip">
                  <span>{{$t('lang.totalNoDataTip')}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="kol-detail-con" v-if="type === 0 || type === 1">
          <div class="top-control-area">
            <button type="button" class="btn btn-purple" @click="goback">
              <span class="iconfont icon-arrow-left"></span>
              {{$t('lang.kolList.detail.btn')}}
            </button>
          </div>
          <default-tabs
            :tabList="tabList"
            :tabIndex="tabIndex"
            @changeTab="changeTab"
            class="panel-tab mt20"
          ></default-tabs>
          <div class="mt20" v-if="tabIndex === 0">
            <div class="panel default-panel mt20" v-if="isActivity">
              <!-- <div class="panel-head">
                <h5 class="title text-center">{{$t('lang.kolList.detail.activity')}}</h5>
              </div> -->
              <div class="panel-body prl30">
                <p class="kol-cloumn mb10">{{$t('lang.kolList.detail.activity')}}</p>
                <div class="activity-table">
                  <table class="com-brand-table">
                    <tr>
                      <th>{{$t('lang.kolList.detail.activityData.id')}}</th>
                      <th>{{$t('lang.kolList.detail.activityData.title')}}</th>
                      <th>{{$t('lang.kolList.detail.activityData.date')}}</th>
                      <th>{{$t('lang.kolList.detail.activityData.performance')}}</th>
                    </tr>
                    <tr v-for="(key, index) in activeList.creations_list" :key="index">
                      <td>{{key.id}}</td>
                      <td>{{key.title}}</td>
                      <td>{{key.date}}</td>
                      <td>{{key.amount}}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <div class="panel default-panel mt20" v-if="isAnalytics">
              <!-- <div class="panel-head">
                <h5 class="title text-center">{{$t('lang.kolList.detail.analytics')}}</h5>
              </div> -->
              <div class="panel-body prl30">
                <p class="kol-cloumn">{{$t('lang.kolList.detail.analytics')}}</p>
                <div class="activity-contable">
                  <table class="com-brand-table">
                    <tr>
                      <th></th>
                      <th>{{$t('lang.kolList.detail.analyticsData.campaigns')}}</th>
                      <th>
                        <a-tooltip placement="topLeft" :title="$t('lang.kolList.detail.analyticsData.performTip')">
                          {{$t('lang.kolList.detail.analyticsData.performance')}}
                        </a-tooltip>
                      </th>
                      <th>

                        <a-tooltip placement="topLeft" :title="$t('lang.kolList.detail.analyticsData.clientTip')">
                          {{$t('lang.kolList.detail.analyticsData.clients')}}
                        </a-tooltip>
                        </th>
                    </tr>
                    <tr>
                      <td>{{$t('lang.kolList.detail.analyticsTotal')}}</td>
                      <td v-for="(item, index) in activeList.total_info" :key="index">
                        <p class="activity-border">{{item}}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>{{$t('lang.kolList.detail.analyticsDay')}}</td>
                      <td v-for="(item, index) in activeList.last_30_days_info" :key="index">
                        <p class="activity-border">{{item}}</p>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <div class="panel default-panel mt20">
              <!-- <div class="panel-head">
                <h5 class="title text-center">{{$t('lang.kolList.detail.socialData.title')}}</h5>
              </div> -->
              <div class="panel-body prl30">
                <p class="kol-cloumn">{{$t('lang.kolList.detail.socialData.title')}}</p>
                <div class="activity-table">
                  <table class="com-brand-table">
                    <tr>
                      <th>{{$t('lang.kolList.detail.socialData.platform')}}</th>
                      <th>{{$t('lang.kolList.detail.socialData.price')}}</th>
                      <th>{{$t('lang.kolList.detail.socialData.followers')}}</th>
                      <th>{{$t('lang.kolList.detail.socialData.likes')}}</th>
                      <th>{{$t('lang.kolList.detail.socialData.shares')}}</th>
                      <th>{{$t('lang.kolList.detail.socialData.comments')}}</th>
                      <th>{{$t('lang.kolList.detail.socialData.postLast')}}</th>
                      <th>{{$t('lang.kolList.detail.socialData.influence')}}</th>
                    </tr>
                    <tr>
                      <td>{{dataListBox.platform}}</td>
                      <td>{{dataListBox.pricing.direct_price}}</td>
                      <td>{{dataListBox.fans_number}}</td>
                      <td>{{dataListBox.stats.avg_likes}}</td>
                      <td>{{dataListBox.stats.avg_shares}}</td>
                      <td>{{dataListBox.stats.avg_comments}}</td>
                      <td>{{dataListBox.stats.avg_daily_posts}}</td>
                      <td>
                        <!-- {{dataListBox.stats.avg_post_influences}} -->
                        Coming Soon
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <div class="panel default-panel mt20 kol-performance">
              <!-- <div class="panel-head">
                <h5 class="title text-center">{{$t('lang.kolList.detail.bestPosts.title')}}</h5>
              </div> -->
              <div class="panel-body prl30">
                 <p class="kol-cloumn mb10">{{$t('lang.kolList.detail.bestPosts.title')}}</p>
                <table class="com-brand-table" v-if="isPer">
                  <tr>
                    <th>{{$t('lang.kolList.detail.bestPosts.tableTitle')}}</th>
                    <th>{{$t('lang.kolList.detail.bestPosts.date')}}</th>
                    <th v-if="type === 1">{{$t('lang.kolList.detail.bestPosts.readCount')}}</th>
                    <th v-if="type === 0">{{$t('lang.kolList.detail.bestPosts.engagement')}}</th>
                  </tr>
                  <tr v-for="(key, index) in performanceList" :key="index">
                    <td  v-if="type === 0"><p class="purple">{{key.title}}</p></td>
                    <td  v-if="type === 1"><a :href="key.url" target="blank">{{key.title}}</a></td>
                    <td style="min-width:200px">{{key.post_time}}</td>
                    <td v-if="type === 0">{{key.influence_sum_engagement}} </td>
                    <td v-if="type === 1">{{key.influence_reads}}</td>
                  </tr>
                </table>
                <div class="nonetip" v-if="isPerShow">
                  <span>{{$t('lang.totalNoDataTip')}}</span>
                </div>
                <div class="r8-loading" v-if="isPerLoading">
                  <a-spin tip="Loading..."/>
                </div>
              </div>
            </div>
          </div>
          <div class="mt20" v-if="tabIndex === 1">
            <analytics></analytics>
          </div>
          <div class="mt20" v-if="tabIndex === 2">
            <posts></posts>
          </div>
        </div>
        <!-- 除了微信和微博  其他平台只展示 socialData -->
        <div class="kol-detail-con" v-else>
          <div class="top-control-area">
            <button type="button" class="btn btn-purple" @click="goback">
              <span class="iconfont icon-arrow-left"></span>
              {{$t('lang.kolList.detail.btn')}}
            </button>
          </div>
          <div class="panel default-panel mt20">
            <div class="panel-body prl30">
              <p class="kol-cloumn">{{$t('lang.kolList.detail.otherSocialData.title')}}</p>
              <div class="activity-table">
                <table class="com-brand-table">
                  <tr>
                    <th>{{$t('lang.kolList.detail.otherSocialData.platform')}}</th>
                    <th>{{$t('lang.kolList.detail.otherSocialData.gender')}}</th>
                    <th>{{$t('lang.kolList.detail.otherSocialData.price')}}</th>
                    <th>{{$t('lang.kolList.detail.otherSocialData.followers')}}</th>
                    <th>{{$t('lang.kolList.detail.otherSocialData.tagsDescription')}}</th>
                  </tr>
                  <tr>
                    <td>{{otherSocialData.platform}}</td>
                    <td v-if="otherSocialData.gender">{{otherSocialData.gender}}</td>
                    <td v-else> N/A </td>
                    <td>{{otherSocialData.price}}</td>
                    <td>{{otherSocialData.followers}}</td>
                    <td>{{otherSocialData.tagsDescription}}</td>
                  </tr>
                </table>
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
import DefaultTabs from '@components/DefaultTabs'
import PageHeader from '@components/PageHeader'
import Echarts from '@components/Chart/GlobalEcharts'
import ChartOption from '@components/Chart/GlobalChartOption'
import commonJs from '@javascripts/common.js'
import { Tooltip } from 'ant-design-vue'
import TagCharts from '@components/Chart/chartTagsTwo'
import { mapState } from 'vuex'
// analytics
import Analytics from '@/pages/kolList/analytic/Index'
// posts
import Posts from '@/pages/kolList/posts/Index'
export default {
  name: 'KolDetail',
  components: {
    TagCharts,
    Echarts,
    PageHeader,
    DefaultTabs,
    Analytics,
    Posts,
    ATooltip: Tooltip,
  },
  data() {
    return {
      isShow: false,
      isLoading: true,
      isTag: false,
      isActivity: false,
      isAnalytics: false,
      Sentiment: 0,
      competitorList: {
        options: ChartOption.detaiOptions,
        chartsStyle: {
          height: '180px'
        }
      },
      infoList: {
        avatar_url: '',
        profile_name: '-',
        profile_id: '',
        description_raw: '',
        age: 'N/A',
        region: 'N/A',
      },
      dec: [],
      decValue: [],
      decKey: [],
      parentTags: [],
      dataListBox: {
        fans_number: 'N/A',
        stats: {
          avg_shares: 'N/A',
          avg_likes: 'N/A',
          avg_reads: 'N/A',
          avg_daily_posts: 'N/A',
          avg_post_influences: 'N/A',
          avg_comments: 'N/A'
        },
        pricing: {
          direct_price: 'N/A'
        }
      },
      activeList: {},
      sentimentParams: {
        start_date: commonJs.cPastFourteenDays,
        end_date: commonJs.cPastOneday,
        brand_keywords: 'BMW'
      },
      trendParams: {
        start_date: commonJs.cPastFourteenDays,
        end_date: commonJs.cPastOneday,
        brand_keywords: 'BMW',
        type: 'doc'
      },
      brandNameParams: {
        profile_id: '',
        start_date: commonJs.cPastYears,
        end_date: commonJs.cPastOneday,
        brand_keywords: 'BMW',
        type: 'doc',
        language: 'en'
      },
      MentionsList: [],
      MentionsNum: 0,
      tabIndex: 0,
      tabList: [
        {
          index: 0,
          name: ('kolList.detail.summary')
        },
        {
          index: 1,
          name: ('kolList.detail.analytics')
        },
        {
          index: 2,
          name: ('kolList.detail.post')
        }
      ],
      performanceList: [],
      performanceParams: {
        start_date: commonJs.cPastTwentyOneDays,
        end_date: commonJs.cPastOneday,
        profile_id: 'MzAwMDAyMzY3OA==',
        order_type: 'read'
      },
      isPer: false,
      isPerShow: false,
      isPerLoading: true,
      cartParams: {},
      currentBrandName: '',
      otherSocialData: {
        platform: 'N/A',
        gender: 'N/A',
        price: 'N/A',
        followers: 'N/A',
        tagsDescription: 'N/A'
      },
      isbrandDisShow: false,
      isbrandDisLoading: true,
      isbrandDisTag: false,
      parentbrandDisTags: []
    }
  },
  created() {
    // console.log(this.$route.params)
    // console.log(this.$route.query)
    let newKey = ''
    this.$route.query.brand_keywords.split(',').forEach(item => {
      newKey += '"' + item + '" '
    })
    this.trendParams.brand_keywords = newKey
    this.sentimentParams.brand_keywords = newKey
    this.brandNameParams.brand_keywords = newKey
    this.type = Number(this.$route.query.type)
    this.tabIndexOneInit()
  },
  computed: {
    ...mapState(['authorization'])
  },
  methods: {
    // summary
    tabIndexOneInit() {
      let totalParams = {}
      // // 优先调用春明大佬给的kol info 当数据为空的时候调用fergus的接口
      // this.kolActivityUrl(totalParams)
      this.infoJoggle(totalParams)
      // 获取brandName
      this.getBaseData()
      totalParams.language = 'en'
      if (Number(this.$route.query.type) === 0) {
        // 微博相关接口
        totalParams.profile_id = Number(this.$route.params.id)
        this.kolWeiboIndustry(totalParams)
        this.kolWeiboKeyword(totalParams)
        this.kolWeiboSocial(totalParams)
        // 计算sentiment
        this.sentimentWeibo(this.sentimentParams)
        // 计算Mentions
        this.trendsWeibo(this.trendParams)
        // best performance 参数
        this.performanceParams.profile_id = String(this.$route.params.id)
        this.performanceParams.order_type = 'sum_engagement'
        this.performanceWeibo(this.performanceParams)
        // 调用微博品牌名字接口
        this.brandNameParams.profile_id = Number(this.$route.params.id)
        this.detailWeiboBrandName(this.brandNameParams)
      } else {
        if (Number(this.$route.query.type) === 1) {
          // 微信相关接口
          totalParams.profile_id = this.$route.params.id
          this.kolWeiXinIndustry(totalParams)
          this.kolWeiXinKeyword(totalParams)
          this.kolWeixinSocial(totalParams)
          // 计算sentiment
          this.sentimentWeixin(this.sentimentParams)
          // 计算Mentions
          this.trendsWeixin(this.trendParams)
          // best performance 参数
          this.performanceParams.profile_id = this.$route.params.id
          this.performanceWeixin(this.performanceParams)
          // 调用微信品牌名字接口
          this.brandNameParams.profile_id = this.$route.params.id
          this.detailWeixinBrandName(this.brandNameParams)
        } else {
          // console.log(this.$route.params.id)
          totalParams.profile_id = decodeURIComponent(decodeURIComponent(this.$route.params.id))
          // console.log(totalParams.profile_id)
        }
      }

    },
    changeTab(tab) {
      this.tabIndex = tab.index
    },
    // info 接口初始化
    infoDataInit(type, res) {
      // console.log(type, res)
      const _that = this
      // type = 0 微博
      // type = 1 微信
      // type = 2 xiaohongshu
      // type = 3 kuaishou
      // type = 4 bilibili
      // type = 5 douyin
      // type = 6 Instagram
      // type = 7 Youtube
      // type = 8 Facebook
      if (type === 1) {
        _that.infoList.avatar_url = res.data.avatar_url
        _that.infoList.profile_name = res.data.profile_name
        _that.infoList.profile_id = res.data.profile_id
        _that.infoList.description_raw = res.data.description_raw
        _that.infoList.gender = '-'
      } else {
        _that.infoList.avatar_url = res.data.avatar_url
        _that.infoList.profile_name = res.data.profile_name
        _that.infoList.profile_id = res.data.profile_id
        _that.infoList.description_raw = res.data.description_raw
        _that.infoList.gender = res.data.gender
        _that.decValue =  Object.values(res.data.industries)
        _that.decKey = Object.keys(res.data.industries)
        _that.decValue.forEach((item, index) => {
          item.keyName = _that.decKey[index]
        })
        _that.decValue.forEach((item, index) => {
          if (item.n_posts === 1) {
            _that.dec.push(item.keyName)
          }
        })

        if(type !== 0) {
          // 其他平台与微信微博的social data的数据不一样
          _that.otherSocialData.gender = res.data.gender
          if (res.data.pricing.ref_price) {
            _that.otherSocialData.price = '¥ ' + commonJs.threeFormatter(res.data.pricing.ref_price, 2)
          }
          if (res.data.fans_number) {
            _that.otherSocialData.followers = res.data.fans_number
          }
          if (res.data.tags_description) {
            _that.otherSocialData.tagsDescription = res.data.tags_description
          }
        }
      }
    },
    // info 微博的接口
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
            // 处理数据
            _that.infoDataInit(0, res)
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // info weixin的接口
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
            // 处理数据
            _that.infoDataInit(1, res)
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // info xiaohongshu的接口
    kolXiaohongshuInfo(params) {
      const _that = this
      axios
        .post(apiConfig.kolXiaohongshuInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // 处理数据
            _that.infoDataInit(2, res)
            // 操作social data 数据
            _that.otherSocialData.platform = 'xiaohongshu'

          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // info kolKuaishouInfo的接口
    kolKuaishouInfo(params) {
      const _that = this
      axios
        .post(apiConfig.kolKuaishouInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          // console.log('kolKuaishouInfo', res)
          if (res.status === 200) {
            // 处理数据
            _that.infoDataInit(3, res)
            // 操作social data 数据
            _that.otherSocialData.platform = 'kuaishou'
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // info kolBilibiliInfo的接口
    kolBilibiliInfo(params) {
      const _that = this
      axios
        .post(apiConfig.kolBilibiliInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // 处理数据
            _that.infoDataInit(4, res)
            // 操作social data 数据
            _that.otherSocialData.platform = 'bilibili'
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // info kolDouyinInfo的接口
    kolDouyinInfo(params) {
      const _that = this
      axios
        .post(apiConfig.kolDouyinInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.infoDataInit(5, res)
            // 操作social data 数据
            _that.otherSocialData.platform = 'douyin'
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // info kolInstagramInfo的接口
    kolInstagramInfo(params) {
      const _that = this
      axios
        .post(apiConfig.kolInstagramInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.infoDataInit(6, res)
            // 操作social data 数据
            _that.otherSocialData.platform = 'instagram'
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // info kolYoutubeInfo的接口
    kolYoutubeInfo(params) {
      const _that = this
      axios
        .post(apiConfig.kolYoutubeInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.infoDataInit(7, res)
            // 操作social data 数据
            _that.otherSocialData.platform = 'youtube'
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // info kolFacebookInfo的接口
    kolFacebookInfo(params) {
      const _that = this
      axios
        .post(apiConfig.kolFacebookInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.infoDataInit(8, res)
            // 操作social data 数据
            _that.otherSocialData.platform = 'facebook'
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
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
            // console.log('我是微博', res)
            _that.competitorList.options.yAxis.data = res.data.labels.reverse()
            _that.competitorList.options.series[0].data = res.data.data.reverse()
            _that.$refs.competitorEChart.updateOptions(_that.competitorList.options)
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
            _that.competitorList.options.yAxis.data = res.data.labels.reverse()
            _that.competitorList.options.series[0].data = res.data.data.reverse()
            _that.$refs.competitorEChart.updateOptions(_that.competitorList.options)
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // Keyword weibo
    kolWeiboKeyword(params) {
      const _that = this
      axios
        .post(apiConfig.kolWeiboKeyword, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.isLoading = false
            if (res.data.length > 0) {
              _that.isTag = true
              _that.isShow = false
              _that.parentTags = []
              _that.parentTags = res.data.slice(0, 25)
            } else {
              _that.isTag = false
              _that.isShow = true
            }
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    kolWeiXinKeyword(params) {
      const _that = this
      axios
        .post(apiConfig.kolWeiXinKeyword, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.isLoading = false
            if (res.data.length > 0) {
              _that.isTag = true
              _that.isShow = false
              _that.parentTags = []
              _that.parentTags = res.data.slice(0, 25)
            } else {
              _that.isTag = false
              _that.isShow = true
            }
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // kolWeixinSocial weibo
    kolWeiboSocial(params) {
      const _that = this
      axios
        .post(apiConfig.kolWeiboSocial, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.dataListBox = res.data
            if (!_that.dataListBox.pricing) {
              _that.dataListBox.pricing = {}
              _that.dataListBox.pricing.direct_price = ' N/A'
            }
            if (_that.dataListBox.fans_number === '') {
              _that.dataListBox.fans_number = ' N/A'
            }
            if (_that.dataListBox.stats.avg_shares === '') {
              _that.dataListBox.stats.avg_shares = ' N/A'
            }
            if (_that.dataListBox.stats.avg_likes === '') {
              _that.dataListBox.stats.avg_likes = ' N/A'
            }
            if (_that.dataListBox.stats.avg_comments === '') {
              _that.dataListBox.stats.avg_comments = ' N/A'
            }
            if (_that.dataListBox.stats.avg_daily_posts === '') {
              _that.dataListBox.stats.avg_daily_posts = ' N/A'
            }
            if (_that.dataListBox.stats.avg_post_influences === '') {
              _that.dataListBox.stats.avg_post_influences = ' N/A'
            }
            _that.dataListBox.platform = 'weibo'
            _that.dataListBox.pricing.direct_price = '¥' + commonJs.threeFormatter(_that.dataListBox.pricing.direct_price, 2)
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
            // console.log('wishiweixn', res)
            _that.dataListBox = res.data
            if (!_that.dataListBox.pricing) {
              _that.dataListBox.pricing = {}
              _that.dataListBox.pricing.direct_price = ' N/A'
            }
            if (_that.dataListBox.status === 'error') {
              _that.dataListBox.stats = {}
              _that.dataListBox.stats.avg_shares = ' N/A'
              _that.dataListBox.stats.avg_likes = ' N/A'
              _that.dataListBox.stats.avg_reads = ' N/A'
              _that.dataListBox.stats.avg_daily_posts = ' N/A'
              _that.dataListBox.stats.avg_post_influences = ' N/A'
              _that.dataListBox.stats.avg_comments = ' N/A'
            }
            if (_that.dataListBox.fans_number === '') {
              _that.dataListBox.fans_number = ' N/A'
            }
            if (!_that.dataListBox.stats.avg_shares) {
              _that.dataListBox.stats.avg_shares = ' N/A'
            }
            if (_that.dataListBox.stats.avg_likes === '') {
              _that.dataListBox.stats.avg_likes = ' N/A'
            }
            if (!_that.dataListBox.stats.avg_comments) {
              _that.dataListBox.stats.avg_comments = ' N/A'
            }
            if (_that.dataListBox.stats.avg_daily_posts === '') {
              _that.dataListBox.stats.avg_daily_posts = ' N/A'
            }
            if (_that.dataListBox.stats.avg_post_influences === '') {
              _that.dataListBox.stats.avg_post_influences = ' N/A'
            }
            _that.dataListBox.platform = 'weixin'
            _that.dataListBox.pricing.direct_price = '¥' + commonJs.threeFormatter(_that.dataListBox.pricing.direct_price, 2)
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // 初始化 fergus的info 接口
    infoJoggle(params) {
      const _that = this
      if (Number(_that.$route.query.type) === 0) {
        // 调用Fergus 微博info
        _that.kolWeiboInfo(params)
      }
      if (Number(_that.$route.query.type) === 1) {
        // 调用Fergus weixin info
        _that.kolWeiXinInfo(params)
      }
      if (Number(_that.$route.query.type) === 2) {
        // 调用Fergus xiaohongshu
        _that.kolXiaohongshuInfo(params)
      }
      if (Number(_that.$route.query.type) === 3) {
        // 调用Fergus kolKuaishouInfo
        _that.kolKuaishouInfo(params)
      }
      if (Number(_that.$route.query.type) === 4) {
        // 调用Fergus bilibili
        _that.kolBilibiliInfo(params)
      }
      if (Number(_that.$route.query.type) === 5) {
        // 调用Fergus douyin
        _that.kolDouyinInfo(params)
      }
      if (Number(_that.$route.query.type) === 6) {
        // 调用Fergus instagram
        _that.kolInstagramInfo(params)
      }
      if (Number(_that.$route.query.type) === 7) {
        // 调用Fergus Youtube
        _that.kolYoutubeInfo(params)
      }
      if (Number(_that.$route.query.type) === 8) {
        // 调用Fergus Facebook
        _that.kolFacebookInfo(params)
      }
    },
    // activity analytics 还有info 假如没有info 调用 Fergus的info 接口 ---- 目前平台没有在这边，所以只用了 fergus初始化的接口
    kolActivityUrl(params) {
      const _that = this
      console
      axios
        .get(
          apiConfig.kolActivityUrl +
            '/' +
            this.$route.params.id.replace(/\./g , '\\/') +
            '/big_v_details',
          params,
          {
            headers: {
              Authorization: _that.authorization
            }
          }
        )
        .then(function(res) {
          if (res.status === 200) {
            _that.activeList = res.data
            if (_that.activeList.total_info.length === 0) {
              _that.activeList.total_info[0] = 'N/A'
              _that.activeList.total_info[1] = 'N/A'
              _that.activeList.total_info[2] = 'N/A'
            }
            if (_that.activeList.creations_list.length === 0) {
              _that.activeList.creations_list[0] = {}
              _that.activeList.creations_list[0].id = 'N/A'
              _that.activeList.creations_list[0].title = 'N/A'
              _that.activeList.creations_list[0].date = 'N/A'
              _that.activeList.creations_list[0].amount = 'N/A'
            }
            if (res.data.data === null) {
              _that.isActivity = false
              _that.isAnalytics = false
              if (Number(_that.$route.query.type) === 0) {
                // 调用Fergus 微博info
                _that.kolWeiboInfo(params)
              }
              if (Number(_that.$route.query.type) === 1) {
                // 调用Fergus weixin info
                _that.kolWeiXinInfo(params)
              }
              if (Number(_that.$route.query.type) === 2) {
                // 调用Fergus xiaohongshu
                _that.kolXiaohongshuInfo(params)
              }
              if (Number(_that.$route.query.type) === 3) {
                // 调用Fergus kolKuaishouInfo
                _that.kolKuaishouInfo(params)
              }
              if (Number(_that.$route.query.type) === 4) {
                // 调用Fergus bilibili
                _that.kolBilibiliInfo(params)
              }
              if (Number(_that.$route.query.type) === 5) {
                // 调用Fergus douyin
                _that.kolDouyinInfo(params)
              }
              if (Number(_that.$route.query.type) === 6) {
                // 调用Fergus instagram
                _that.kolInstagramInfo(params)
              }
              if (Number(_that.$route.query.type) === 7) {
                // 调用Fergus Youtube
                _that.kolYoutubeInfo(params)
              }
              if (Number(_that.$route.query.type) === 8) {
                // 调用Fergus Facebook
                _that.kolFacebookInfo(params)
              }
            } else {
              _that.isActivity = true
              _that.isAnalytics = true
              _that.infoList.img = res.data.data.avatar_url
              _that.infoList.name = res.data.data.profile_name
              _that.infoList.gender = '-'
              _that.dec = res.data.data.industries
            }
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // Best Performance Posts weibo
    performanceWeibo(params) {
      const _that = this
      axios
        .post(apiConfig.performanceWeibo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('wobo 微博', res)
            _that.isPerLoading = false
            if (res.data.data.length > 0) {
              _that.isPerShow = false
              _that.isPer = true
              res.data.data.forEach(item => {
                if (Number(item.influence_sum_engagement) !== 0) {
                  item.influence_sum_engagement = commonJs.threeFormatter(item.influence_sum_engagement, 2) + '+'
                } else {
                  item.influence_sum_engagement = commonJs.threeFormatter(item.influence_sum_engagement, 2)
                }
              })
              _that.performanceList = res.data.data
            } else {
              _that.isPerShow = true
              _that.isPer = false
            }
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // Best Performance Posts weixin
    performanceWeixin(params) {
      const _that = this
      axios
        .post(apiConfig.performanceWeixin, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('woshi weixin', res)
            _that.isPerLoading = false
            if (res.data.data.length > 0) {
              _that.isPerShow = false
              _that.isPer = true
              res.data.data.forEach(item => {
                if (Number(item.influence_reads) !== 0) {
                  item.influence_reads = commonJs.threeFormatter(item.influence_reads, 2) + '+'
                } else {
                  item.influence_reads = commonJs.threeFormatter(item.influence_reads, 2)
                }
              })
              _that.performanceList = res.data.data
            } else {
              _that.isPerShow = true
              _that.isPer = false
            }
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
          _that.Sentiment = res.data.data[0]
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
          _that.Sentiment = res.data.data[0]
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // trend 微博
    trendsWeibo(params) {
      const _that = this
      axios
        .post(apiConfig.trendsWeibo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.MentionsList = res.data.data.slice(
                res.data.data.length - 8,
                res.data.data.length - 1
              )
            _that.MentionsList.forEach(item => {
              _that.MentionsNum += parseInt(item)
            })
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // trend 微信
    trendsWeixin(params) {
      const _that = this
      axios
        .post(apiConfig.trendsWeixin, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.MentionsList = res.data.data.slice(
              res.data.data.length - 8,
              res.data.data.length - 1
            )
            _that.MentionsList.forEach(item => {
              _that.MentionsNum += parseInt(item)
            })
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // 返回上一级
    goback() {
      this.$router.go(-1)
    },
    // 加入购物车
    doAddCart (data) {
      this.cartParams.profile_id = data.profile_id
      this.cartParams.profile_name = data.profile_name
      this.cartParams.avatar_url = data.avatar_url
      this.cartParams.description_raw = data.description_raw
      axios.post(apiConfig.kolCollectUrl, this.cartParams, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleDoAddCartSucc)
    },
    handleDoAddCartSucc (res) {
      let resData = res.data
      if (res.status == 201) {
        if (!!resData.error && resData.error == 1) {
          alert(resData.detail)
          return false
        }
        alert('您已成功添加至购物车')
      }
    },
    // 获取My brandname 微博页面
    detailWeiboBrandName(params) {
      const _that = this
      axios
        .post(apiConfig.detailWeiboBrandName, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          // console.log('weibo bran dis', res)
          if (res.status === 200) {
            _that.isbrandDisLoading = false
            if (res.data.data.length > 0) {
              _that.isbrandDisTag = true
              _that.isbrandDisShow = false
              _that.parentbrandDisTags = []
              _that.parentbrandDisTags = res.data.data.slice(0, 25)
            } else {
              _that.parentbrandDisTags = false
              _that.isbrandDisShow = true
            }
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // 获取My brandname 微信页面
    detailWeixinBrandName(params) {
      const _that = this
      axios
        .post(apiConfig.detailWeixinBrandName, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.isbrandDisLoading = false
            if (res.data.data.length > 0) {
              _that.isbrandDisTag = true
              _that.isbrandDisShow = false
              _that.parentbrandDisTags = []
              _that.parentbrandDisTags = res.data.data.slice(0, 25)
            } else {
              _that.parentbrandDisTags = false
              _that.isbrandDisShow = true
            }
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // 获取keyword brand name
    getBaseData () {
      const _that = this
      axios.get(apiConfig.baseInfosUrl, {
        headers: {
          'Authorization': _that.authorization
        }
      }).then(function(res) {
        if (res.status === 200) {
          if (!res.data.competitors.length == 0) {
            res.data.trademarks_list.forEach(element => {
              if (element.status === 1) {
                _that.currentBrandName = element.name
              }
            })
          }
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.kol-performance{
  .com-brand-table{
    a, .purple{
      display: block;
      text-align: left;
      color: nth($purple, 1);
      word-break: break-all;
    }
  }
}
</style>
