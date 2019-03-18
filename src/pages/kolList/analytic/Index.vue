
<template>
  <div>
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
          <table class="com-brand-table" v-if="Number(this.$route.query.type) === 0">
            <tr>
              <th>{{$t('lang.kolList.analyticVue.weibo.industryTable.industry')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weibo.industryTable.DocCount')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weibo.industryTable.DocCountPercent')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weibo.industryTable.totalLike')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weibo.industryTable.totalShare')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weibo.industryTable.totalCommet')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weibo.industryTable.avgLike')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weibo.industryTable.avgShare')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weibo.industryTable.avgCommet')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weibo.industryTable.maxLike')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weibo.industryTable.maxShare')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weibo.industryTable.maxCommet')}}</th>
            </tr>
            <tr v-for="(key, index) in analyOne" :key="index">
              <td>
                <p v-html="key.industry"></p>
              </td>
              <td>{{key.doc_count}}</td>
              <td>{{ Number(key.doc_count_width_percentage)}}%</td>
              <td>{{key.total_like_count}}</td>
              <td>{{key.total_share_count}}</td>
              <td>{{key.total_comment_count}}</td>
              <td>{{key.avg_like_count}}</td>
              <td>{{key.avg_share_count}}</td>
              <td>{{key.avg_comment_count}}</td>
              <td>{{key.max_like_count}}</td>
              <td>{{key.max_share_count}}</td>
              <td>{{key.max_comment_count}}</td>
            </tr>
          </table>
          <table class="com-brand-table" v-if="Number(this.$route.query.type) === 1">
            <tr>
              <th>{{$t('lang.kolList.analyticVue.weixin.industryTable.industry')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weixin.industryTable.DocCount')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weixin.industryTable.DocCountPercent')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weixin.industryTable.totalRead')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weixin.industryTable.avgRead')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weixin.industryTable.maxRead')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weixin.industryTable.totalLike')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weixin.industryTable.likeRead')}}</th>
            </tr>
            <tr v-for="(key, index) in analyOne" :key="index">
              <td>
                <p v-html="key.industry"></p>
              </td>
              <td>{{key.doc_count}}</td>
              <td>{{ Number(key.doc_count_width_percentage)}}%</td>
              <td>{{key.total_reads}}</td>
              <td>{{key.avg_reads}}</td>
              <td>{{key.max_reads}}</td>
              <td>{{key.total_likes}}</td>
              <td>{{key.total_likes_percentage}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <!-- 微博没有 Media-->
    <div class="panel default-panel mt20" v-if="Number(type) === 1">
      <div class="panel-body">
        <p class="kol-cloumn mb10">{{$t('lang.kolList.analyticVue.weixin.Media.title')}}</p>
        <div class="nonetip" v-if="isMediaShow">
          <span>{{$t('lang.totalNoDataTip')}}</span>
        </div>
        <div class="r8-loading" v-if="isMediaLoading">
          <a-spin tip="Loading..."/>
        </div>
        <div class="activity-table" v-if="isMedia">
          <table class="com-brand-table">
            <tr>
              <th>{{$t('lang.kolList.analyticVue.weixin.Media.Type')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weixin.Media.DocCount')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weixin.Media.DocCountPercent')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weixin.Media.totalRead')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weixin.Media.avgRead')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weixin.Media.maxRead')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weixin.Media.totalLike')}}</th>
              <th>{{$t('lang.kolList.analyticVue.weixin.Media.likeRead')}}</th>
            </tr>
            <tr v-for="(key, index) in media" :key="index">
              <td>
                <p v-html="key.media_type"></p>
              </td>
              <td>{{key.doc_count}}</td>
              <td>{{ Number(key.doc_count_width_percentage)}}%</td>
              <td>{{key.total_reads}}</td>
              <td>{{key.avg_reads}}</td>
              <td>{{key.max_reads}}</td>
              <td>{{key.total_likes}}</td>
              <td>{{key.total_likes_percentage}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <!-- 微博图表渲染模版  -->
    <div v-if="Number(type) === 0">
      <div class="panel default-panel mt20" v-for="(item, index) in countWeiboList" :key="index">
        <div class="panel-body">
          <p class="kol-cloumn mb10">{{item.mode}} {{$t('lang.kolList.analyticVue.chat.tit')}}  {{item.type}} {{$t('lang.kolList.analyticVue.chat.count')}}  {{item.countParams.start_date}} - {{item.countParams.end_date}}</p>
          <div class="nonetip" v-if="item.isShow">
            <span>{{$t('lang.totalNoDataTip')}}</span>
          </div>
          <div class="r8-loading" v-if="item.isLoading">
            <a-spin tip="Loading..."/>
          </div>
          <div v-if="item.isChart">
            
            <Echarts
              :options="item.options"
              :chartsStyle="item.chartsStyle"
              :ref='item.ref'
            ></Echarts>

          </div>
        </div>
      </div>
    </div>
    <!-- 微信图表渲染模版 -->
    <div v-if="Number(type) === 1">
      <div class="panel default-panel mt20" v-for="(item, index) in countWeixinList" :key="index">
        <div class="panel-body">
          <p class="kol-cloumn mb10">{{item.mode}} {{$t('lang.kolList.analyticVue.chat.tit')}} {{item.type}} {{$t('lang.kolList.analyticVue.chat.count')}} {{item.countParams.start_date}} - {{item.countParams.end_date}}</p>
          <div class="nonetip" v-if="item.isShow">
            <span>{{$t('lang.totalNoDataTip')}}</span>
          </div>
          <div class="r8-loading" v-if="item.isLoading">
            <a-spin tip="Loading..."/>
          </div>
          <div v-if="item.isChart">
            <Echarts
              :options="item.options"
              :chartsStyle="item.chartsStyle"
              :ref='item.ref'
            ></Echarts>
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
import ChartOption from "@components/Chart/GlobalChartOption";
import commonJs from "@javascripts/common.js";
import Echarts from "@components/Chart/GlobalEcharts";
import { Table } from "ant-design-vue";
import { mapState } from "vuex";
export default {
  name: "detailAnalytic",
  components: {
    Echarts,
    DefaultTabs
  },
  data() {
    return {
      type: 0,
      analyOne: [],
      isAnalyOne: false,
      isAnalyOneShow: false,
      isAnalyOneLoading: true,
      analyOneParams: {
        start_date: commonJs.cPastTwentyOneDays,
        end_date: commonJs.cPastOneday,
        profile_id: "MzAwMDAyMzY3OA=="
      },
      // Media
      media: [],
      isMedia: false,
      isMediaShow: false,
      isMediaLoading: true,
      // weixin count
      countWeixinList: [{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count0Options,
        chartsStyle: {
          height: "180px"
        },
        ref: 'weixin0',
        type: "Doc",
        mode: "Daily",
        countParams: {
          type: "doc",
          mode: "daily",
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          profile_id: "MzAwMDAyMzY3OA=="
        }
      },{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count1Options,
        chartsStyle: {
          height: "180px"
        },
        ref: 'weixin1',
        type: "Read",
        mode: "Daily",
        countParams: {
          type: "read",
          mode: "daily",
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          profile_id: "MzAwMDAyMzY3OA=="
        }
      },{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count2Options,
        chartsStyle: {
          height: "180px"
        },
        ref: 'weixin2',
        type: "Like",
        mode: "Daily",
        countParams: {
          type: "like",
          mode: "daily",
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          profile_id: "MzAwMDAyMzY3OA=="
        }
      },{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count3Options,
        chartsStyle: {
          height: "180px"
        },
        ref: 'weixin3',
        type: "Doc",
        mode: "Hourly",
        countParams: {
          type: "doc",
          mode: "hourly",
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          profile_id: "MzAwMDAyMzY3OA=="
        }
      },{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count4Options,
        chartsStyle: {
          height: "180px"
        },
        ref: 'weixin4',
        type: "Read",
        mode: "Hourly",
        countParams: {
          type: "read",
          mode: "hourly",
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          profile_id: "MzAwMDAyMzY3OA=="
        }
      },{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count5Options,
        chartsStyle: {
          height: "180px"
        },
        ref: 'weixin5',
        type: "Like",
        mode: "Hourly",
        countParams: {
          type: "like",
          mode: "hourly",
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          profile_id: "MzAwMDAyMzY3OA=="
        }
      }],
      // weibo count
      countWeiboList: [{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count0Options,
        chartsStyle: {
          height: "180px"
        },
        ref: 'weibo0',
        type: "Doc",
        mode: "Daily",
        countParams: {
          type: "doc",
          mode: "daily",
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          profile_id: "MzAwMDAyMzY3OA=="
        }
      },{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count1Options,
        chartsStyle: {
          height: "180px"
        },
        ref: 'weibo1',
        type: "Comment",
        mode: "Daily",
        countParams: {
          type: "comment",
          mode: "daily",
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          profile_id: "MzAwMDAyMzY3OA=="
        }
      },{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count2Options,
        chartsStyle: {
          height: "180px"
        },
        ref: 'weibo2',
        type: "Share",
        mode: "Daily",
        countParams: {
          type: "share",
          mode: "daily",
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          profile_id: "MzAwMDAyMzY3OA=="
        }
      },{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count3Options,
        chartsStyle: {
          height: "180px"
        },
        ref: 'weibo3',
        type: "Like",
        mode: "Daily",
        countParams: {
          type: "like",
          mode: "daily",
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          profile_id: "MzAwMDAyMzY3OA=="
        }
      },{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count4Options,
        chartsStyle: {
          height: "180px"
        },
        ref: 'weibo4',
        type: "Doc",
        mode: "Hourly",
        countParams: {
          type: "doc",
          mode: "hourly",
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          profile_id: "MzAwMDAyMzY3OA=="
        }
      },{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count5Options,
        chartsStyle: {
          height: "180px"
        },
        ref: 'weibo5',
        type: "Comment",
        mode: "Hourly",
        countParams: {
          type: "comment",
          mode: "hourly",
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          profile_id: "MzAwMDAyMzY3OA=="
        }
      },{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count6Options,
        chartsStyle: {
          height: "180px"
        },
        ref: 'weibo6',
        type: "Share",
        mode: "Hourly",
        countParams: {
          type: "share",
          mode: "hourly",
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          profile_id: "MzAwMDAyMzY3OA=="
        }
      },{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count7Options,
        chartsStyle: {
          height: "180px"
        },
        ref: 'weibo7',
        type: "Like",
        mode: "Hourly",
        countParams: {
          type: "like",
          mode: "hourly",
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          profile_id: "MzAwMDAyMzY3OA=="
        }
      }],
    };
  },
  computed: {
    ...mapState(["authorization"])
  },
  created() {
    this.analyOneParams.profile_id = String(this.$route.params.id);
    this.type = Number(this.$route.query.type);
    if (Number(this.$route.query.type) === 0) {
      // 微博
      // Industries Distribution
      this.detailAnalyOneWeibo(this.analyOneParams);
      this.countWeiboList.forEach((element, index) => {
        element.countParams.profile_id = String(this.$route.params.id);
        element.isLoading = true;
        element.isShow = false;
        element.isChart = false;
        this.detailCountWeibo(element.countParams, index);
      });
    } else {
      // 微信
      // Industries Distribution
      this.detailAnalyOneWeixin(this.analyOneParams);
      // Media Distribution
      this.detailMediaWeixin(this.analyOneParams);
      // count weixin
      this.countWeixinList.forEach((element, index) => {
        element.countParams.profile_id = String(this.$route.params.id);
        element.isLoading = true;
        element.isShow = false;
        element.isChart = false;
        this.detailCountWeixin(element.countParams, index);
      });
    }
  },
  methods: {
    // Industries Distribution weibo
    detailAnalyOneWeibo(params) {
      const _that = this;
      axios
        .post(apiConfig.detailAnalyOneWeibo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('wobo 微博', res);
            _that.isAnalyOneLoading = false;
            if (res.data.length > 0) {
              _that.isAnalyOneShow = false;
              _that.isAnalyOne = true;
              _that.analyOne = res.data;
            } else {
              _that.isAnalyOneShow = true;
              _that.isAnalyOne = false;
            }
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // Industries Distribution weixin
    detailAnalyOneWeixin(params) {
      const _that = this;
      axios
        .post(apiConfig.detailAnalyOneWeixin, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('woshi weixin', res)
            _that.isAnalyOneLoading = false;
            if (res.data.length > 0) {
              _that.isAnalyOneShow = false;
              _that.isAnalyOne = true;
              _that.analyOne = res.data;
            } else {
              _that.isAnalyOneShow = true;
              _that.isAnalyOne = false;
            }
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // Media Distribution weixin
    detailMediaWeixin(params) {
      const _that = this;
      axios
        .post(apiConfig.detailMediaWeixin, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('woshi weixin', res)
            _that.isMediaLoading = false;
            if (res.data.length > 0) {
              _that.isMediaShow = false;
              _that.isMedia = true;
              _that.media = res.data;
            } else {
              _that.isMediaShow = true;
              _that.isMedia = false;
            }
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // count 图表微博
    detailCountWeibo(params, num) {
      const _that = this;
      axios
        .post(apiConfig.detailCountWeibo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('woshi cout weibo', num, res);
            _that.countWeiboList[num].isLoading = false;
            if (res.data.data.length > 0) {
              _that.countWeiboList[num].isShow = false;
              _that.countWeiboList[num].isChart = true;
              _that.countWeiboList[num].options.xAxis.data = res.data.labels;
              _that.countWeiboList[num].options.series[0].data = res.data.data;
              let curRef = 'weibo' + num;
              _that.$refs.curRef.updateOptions(_that.countWeiboList[num].options);
            } else {
              _that.countWeiboList[num].isShow = true;
              _that.countWeiboList[num].isChart = false;
            }
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // count 图表微信
    detailCountWeixin(params, num) {
      const _that = this;
      axios
        .post(apiConfig.detailCountWeixin, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('woshi cout weixin', num, res);
            _that.countWeixinList[num].isLoading = false;
            if (res.data.data.length > 0) {
              _that.countWeixinList[num].isShow = false;
              _that.countWeixinList[num].isChart = true;
              _that.countWeixinList[num].options.xAxis.data = res.data.labels;
              _that.countWeixinList[num].options.series[0].data = res.data.data;
              let curRef = 'weixin' + num;
              _that.$refs.curRef.updateOptions(_that.countWeixinList[num].options);
            } else {
              _that.countWeixinList[num].isShow = true;
              _that.countWeixinList[num].isChart = false;
            }
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
  }
};
</script>
<style lang="scss" scoped>

</style>