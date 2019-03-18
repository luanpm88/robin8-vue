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
              <img :src="infoList.avatar_url" alt>
              <div class="kol-info">
                <p>
                  {{infoList.profile_name}}
                  <i class="iconfont icon-female" v-if="infoList.gender == 'm'"></i>
                  <i class="iconfont icon-male" v-if="infoList.gender == 'f'"></i>
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
              <div class="kol-brand">
                <p class="clearfix">
                  <span>
                    <a-tooltip placement="topLeft" :title="$t('lang.kolList.detail.mentionsTip')">
                      {{$t('lang.kolList.detail.mentions')}}
                    </a-tooltip>
                  </span>
                  <b>{{MentionsNum}}</b>
                </p>
                <p class="clearfix">
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
            <div class="panel-body">
              <p class="kol-cloumn">{{$t('lang.kolList.detail.industries')}}</p>
              <Echarts
                :options="competitorList.options"
                :chartsStyle="competitorList.chartsStyle"
                ref="competitorEChart"
              ></Echarts>
            </div>
          </div>
          <div class="panel default-panel mt20">
            <div class="panel-body">
              <p class="kol-cloumn">
                <a-tooltip placement="topLeft" :title="$t('lang.kolList.detail.keywordsTip')">
                  {{$t('lang.kolList.detail.keywords')}}
                </a-tooltip>
              </p>
              <div class="nonetip" v-if="isShow">
                <span>{{$t('lang.totalNoDataTip')}}</span>
              </div>
              <div class="r8-loading" v-if="isLoading">
                <a-spin tip="Loading..."/>
              </div>
              <tag-charts v-if="isTag" :width="240" :height="180" :taglist="parentTags" class="mt20"></tag-charts>
            </div>
          </div>
        </div>
        <div class="kol-detail-con">
          <span class="kol-back-btn" @click="goback">{{$t('lang.kolList.detail.btn')}}</span>
          <default-tabs
            :tabList="tabList"
            :tabIndex="tabIndex"
            @changeTab="changeTab"
            class="panel-tab"
          ></default-tabs>
          <div class="mt20" v-if="tabIndex === 0">
            <div class="panel default-panel mt20" v-if="isActivity">
              <div class="panel-body">
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
              <div class="panel-body">
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
              <div class="panel-body">
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
                      <th>{{$t('lang.kolList.detail.socialData.comments')}}</th>
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
                      <td>{{dataListBox.stats.avg_post_influences}}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <div class="panel default-panel mt20 kol-performance">
              <div class="panel-body">
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
                    <td>{{key.post_time}}</td>
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import apiConfig from "@/config";
import DefaultTabs from "@components/DefaultTabs";
import PageHeader from '@components/PageHeader'
import Echarts from "@components/Chart/GlobalEcharts";
import ChartOption from "@components/Chart/GlobalChartOption";
import commonJs from '@javascripts/common.js';
import { Table, Tooltip } from "ant-design-vue";
import TagCharts from "@components/Chart/chartTagsTwo";
import { mapState } from "vuex";
// analytics
import Analytics from "../kolList/analytic/Index";
// posts
import Posts from "../kolList/posts/Index";
export default {
  name: "KolDetail",
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
      isActivity: true,
      isAnalytics: true,
      Sentiment: 0,
      competitorList: {
        options: ChartOption.detaiOptions,
        chartsStyle: {
          height: "180px"
        }
      },
      infoList: {
        avatar_url: "",
        profile_name: "-",
        profile_id: '',
        description_raw: '',
        age: "N/A",
        region: "N/A"
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
        brand_keywords: "BMW"
      },
      trendParams: {
        start_date: commonJs.cPastFourteenDays,
        end_date: commonJs.cPastOneday,
        brand_keywords: "BMW",
        type: "doc"
      },
      MentionsList: [],
      MentionsNum: 0,
      tabIndex: 0,
      tabList: [
        {
          index: 0,
          name: () => this.$t('lang.kolList.detail.summary')
        },
        {
          index: 1,
          name: () => this.$t('lang.kolList.detail.analytics')
        },
        {
          index: 2,
          name: () => this.$t('lang.kolList.detail.post')
        }
      ],
      performanceList: [],
      performanceParams: {
        start_date: commonJs.cPastTwentyOneDays,
        end_date: commonJs.cPastOneday,
        profile_id: "MzAwMDAyMzY3OA==",
        order_type: "read"
      },
      isPer: false,
      isPerShow: false,
      isPerLoading: true,
      cartParams: {}
    };
  },
  created() {
    // console.log(this.$route.params)
    // console.log(this.$route.query)
    let newKey = '';
    this.$route.query.brand_keywords.split(",").forEach(item => {
      newKey += '"' + item + '"'
    });
    this.trendParams.brand_keywords = newKey;
    this.sentimentParams.brand_keywords = newKey;
    this.type = Number(this.$route.query.type);
    this.tabIndexOneInit();
  },
  computed: {
    ...mapState(["authorization"])
  },
  methods: {
    // summary
    tabIndexOneInit() {
      let totalParams = {};
      // console.log('woshi totalParams', totalParams);
      this.kolActivityUrl(totalParams);
      if (Number(this.$route.query.type) === 0) {
        // 微博相关接口
        totalParams.profile_id = Number(this.$route.params.id);
        totalParams.language = "en";
        this.kolWeiboIndustry(totalParams);
        this.kolWeiboKeyword(totalParams);
        this.kolWeiboSocial(totalParams);
        // 计算sentiment
        this.sentimentWeibo(this.sentimentParams);
        // 计算Mentions
        this.trendsWeibo(this.trendParams);
        // best performance 参数
        this.performanceParams.profile_id = String(this.$route.params.id);
        this.performanceParams.order_type = 'sum_engagement'
        this.performanceWeibo(this.performanceParams);
      } else {
        // 微信相关接口
        totalParams.profile_id = this.$route.params.id;
        totalParams.language = "en";
        this.kolWeiXinIndustry(totalParams);
        this.kolWeiXinKeyword(totalParams);
        this.kolWeixinSocial(totalParams);
        // 计算sentiment
        this.sentimentWeixin(this.sentimentParams);
        // 计算Mentions
        this.trendsWeixin(this.trendParams);
        // best performance 参数
        this.performanceParams.profile_id = this.$route.params.id;
        this.performanceWeixin(this.performanceParams);
      }
    },
    changeTab(tab) {
      this.tabIndex = tab.index;
    },
    // info 微博的接口
    kolWeiboInfo(params) {
      const _that = this;
      axios
        .post(apiConfig.kolWeiboInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.infoList.avatar_url = res.data.avatar_url;
            _that.infoList.profile_name = res.data.profile_name;
            _that.infoList.profile_id = res.data.profile_id;
            _that.infoList.description_raw = res.data.description_raw;
            _that.infoList.gender = res.data.gender;
            _that.decValue =  Object.values(res.data.industries);
            _that.decKey = Object.keys(res.data.industries);
            _that.decValue.forEach((item, index) => {
              item.keyName = _that.decKey[index];
            });
            _that.decValue.forEach((item, index) => {
              if (item.n_posts === 1) {
                _that.dec.push(item.keyName);
              }
            });
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // info weixin的接口
    kolWeiXinInfo(params) {
      const _that = this;
      axios
        .post(apiConfig.kolWeiXinInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.infoList.avatar_url = res.data.avatar_url;
            _that.infoList.profile_name = res.data.profile_name;
            _that.infoList.profile_id = res.data.profile_id;
            _that.infoList.description_raw = res.data.description_raw;
            _that.infoList.gender = "-";
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
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
            _that.competitorList.options.yAxis.data = res.data.labels.reverse();
            _that.competitorList.options.series[0].data = res.data.data.reverse();
            _that.$refs.competitorEChart.updateOptions(_that.competitorList.options);
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    kolWeiXinIndustry(params) {
      const _that = this;
      axios
        .post(apiConfig.kolWeiXinIndustry, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.competitorList.options.yAxis.data = res.data.labels.reverse();
            _that.competitorList.options.series[0].data = res.data.data.reverse();
            _that.$refs.competitorEChart.updateOptions(_that.competitorList.options);
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // Keyword weibo
    kolWeiboKeyword(params) {
      const _that = this;
      axios
        .post(apiConfig.kolWeiboKeyword, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.isLoading = false;
            if (res.data.length > 0) {
              _that.isTag = true;
              _that.isShow = false;
              _that.parentTags = [];
              _that.parentTags = res.data.slice(0, 25);
            } else {
              _that.isTag = false;
              _that.isShow = true;
            }
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    kolWeiXinKeyword(params) {
      const _that = this;
      axios
        .post(apiConfig.kolWeiXinKeyword, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.isLoading = false;
            if (res.data.length > 0) {
              _that.isTag = true;
              _that.isShow = false;
              _that.parentTags = [];
              _that.parentTags = res.data.slice(0, 25);
            } else {
              _that.isTag = false;
              _that.isShow = true;
            }
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // kolWeixinSocial weibo
    kolWeiboSocial(params) {
      const _that = this;
      axios
        .post(apiConfig.kolWeiboSocial, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.dataListBox = res.data;
            if (!_that.dataListBox.pricing) {
              _that.dataListBox.pricing = {};
              _that.dataListBox.pricing.direct_price = " N/A";
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
            _that.dataListBox.platform = "weibo";
            _that.dataListBox.pricing.direct_price = '¥' + commonJs.threeFormatter(_that.dataListBox.pricing.direct_price, 2);
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // kolWeixinSocial
    kolWeixinSocial(params) {
      const _that = this;
      axios
        .post(apiConfig.kolWeixinSocial, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('wishiweixn', res)
            _that.dataListBox = res.data;
            if (!_that.dataListBox.pricing) {
              _that.dataListBox.pricing = {};
              _that.dataListBox.pricing.direct_price = " N/A";
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
            _that.dataListBox.platform = "weixin";
            _that.dataListBox.pricing.direct_price = '¥' + commonJs.threeFormatter(_that.dataListBox.pricing.direct_price, 2);
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // activity analytics 还有info 假如没有info 调用 Fergus的info 接口
    kolActivityUrl(params) {
      const _that = this;
      axios
        .get(
          apiConfig.kolActivityUrl +
            "/" +
            this.$route.params.id +
            "/big_v_details",
          params,
          {
            headers: {
              Authorization: _that.authorization
            }
          }
        )
        .then(function(res) {
          if (res.status === 200) {
            _that.activeList = res.data;
            if (_that.activeList.total_info.length === 0) {
              _that.activeList.total_info[0] = "N/A";
              _that.activeList.total_info[1] = "N/A";
              _that.activeList.total_info[2] = "N/A";
            }
            if (_that.activeList.creations_list.length === 0) {
              _that.activeList.creations_list[0] = {};
              _that.activeList.creations_list[0].id = "N/A";
              _that.activeList.creations_list[0].title = "N/A";
              _that.activeList.creations_list[0].date = "N/A";
              _that.activeList.creations_list[0].amount = "N/A";
            }
            if (res.data.data === null) {
              _that.isActivity = false;
              _that.isAnalytics = false;
              if (Number(_that.$route.query.type) === 0) {
                // 调用Fergus 微博info
                _that.kolWeiboInfo(params);
              } else {
                // 调用Fergus weixin info
                _that.kolWeiXinInfo(params);
              }
            } else {
              _that.isActivity = true;
              _that.isAnalytics = true;
              _that.infoList.img = res.data.data.avatar_url;
              _that.infoList.name = res.data.data.profile_name;
              _that.infoList.gender = "-";
              _that.dec = res.data.data.industries;
            }
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // Best Performance Posts weibo
    performanceWeibo(params) {
      const _that = this;
      axios
        .post(apiConfig.performanceWeibo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('wobo 微博', res);
            _that.isPerLoading = false;
            if (res.data.data.length > 0) {
              _that.isPerShow = false;
              _that.isPer = true;
              res.data.data.forEach(item => {
                if (Number(item.influence_sum_engagement) !== 0) {
                  item.influence_sum_engagement = commonJs.threeFormatter(item.influence_sum_engagement, 2) + '+';
                } else {
                  item.influence_sum_engagement = commonJs.threeFormatter(item.influence_sum_engagement, 2)
                }
              })
              _that.performanceList = res.data.data;
            } else {
              _that.isPerShow = true;
              _that.isPer = false;
            }
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // Best Performance Posts weixin
    performanceWeixin(params) {
      const _that = this;
      axios
        .post(apiConfig.performanceWeixin, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('woshi weixin', res)
            _that.isPerLoading = false;
            if (res.data.data.length > 0) {
              _that.isPerShow = false;
              _that.isPer = true;
              res.data.data.forEach(item => {
                if (Number(item.influence_reads) !== 0) {
                  item.influence_reads = commonJs.threeFormatter(item.influence_reads, 2) + '+';
                } else {
                  item.influence_reads = commonJs.threeFormatter(item.influence_reads, 2);
                }
              })
              _that.performanceList = res.data.data;
            } else {
              _that.isPerShow = true;
              _that.isPer = false;
            }
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // sentiment 微博
    sentimentWeibo(params) {
      const _that = this;
      axios
        .post(apiConfig.sentimentWeibo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          _that.Sentiment = res.data.data[0];
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // sentiment 微信
    sentimentWeixin(params) {
      const _that = this;
      axios
        .post(apiConfig.sentimentWeixin, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          _that.Sentiment = res.data.data[0];
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // trend 微博
    trendsWeibo(params) {
      const _that = this;
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
              );
            _that.MentionsList.forEach(item => {
              _that.MentionsNum += parseInt(item);
            });
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // trend 微信
    trendsWeixin(params) {
      const _that = this;
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
            );
            _that.MentionsList.forEach(item => {
              _that.MentionsNum += parseInt(item);
            });
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    goback() {
      this.$router.go(-1);
    },
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
  }
};
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
