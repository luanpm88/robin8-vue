
<template>
  <div>
    <div class="kol-card">
      <p class="kol-cloumn mb10">Industries Distribution</p>
      <div class="nonetip" v-if="isAnalyOneShow">
        <span>{{$t('lang.totalNoDataTip')}}</span>
      </div>
      <div class="r8-loading" v-if="isAnalyOneLoading">
        <a-spin tip="Loading..."/>
      </div>
      <div class="activity-table" v-if="isAnalyOne">
        <table class="com-brand-table" v-if="Number(this.$route.params.type) === 0">
          <tr>
            <th>Industry</th>
            <th>Doc <br> Count</th>
            <th>Doc <br> Count %	</th>
            <th>Total <br> Like <br> Count</th>
            <th>Total <br> Share <br> Count</th>
            <th>Total <br> Comment <br> Count</th>
            <th>Avg <br> Like <br> Count</th>
            <th>Avg <br> Share <br> Count</th>
            <th>Avg <br> Comment <br> Count</th>
            <th>Max <br> Like <br> Count</th>
            <th>Max <br> Share <br> Count</th>
            <th>Max <br> Comment <br> Count</th>
          </tr>
          <tr v-for="(key, index) in analyOne" :key="index">
            <td><p v-html="key.industry"></p></td>
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
        <table class="com-brand-table" v-if="Number(this.$route.params.type) === 1">
          <tr>
            <th>Industry</th>
            <th>Doc Count</th>
            <th>Doc Count %	</th>
            <th>Total Reads	</th>
            <th>Avg Reads</th>
            <th>Max Reads</th>
            <th>Total Likes</th>
            <th>Likes To Reads %</th>
          </tr>
          <tr v-for="(key, index) in analyOne" :key="index">
            <td><p v-html="key.industry"></p></td>
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
    <div class="kol-card" v-if="Number(type) === 1">
      <p class="kol-cloumn mb10">Media Distribution</p>
      <div class="nonetip" v-if="isMediaShow">
        <span>{{$t('lang.totalNoDataTip')}}</span>
      </div>
      <div class="r8-loading" v-if="isMediaLoading">
        <a-spin tip="Loading..."/>
      </div>
      <div class="activity-table" v-if="isMedia">
        <table class="com-brand-table">
          <tr>
            <th>Type</th>
            <th>Doc Count</th>
            <th>Doc Count %	</th>
            <th>Total Reads	</th>
            <th>Avg Reads</th>
            <th>Max Reads</th>
            <th>Total Likes</th>
            <th>Likes To Reads %</th>
          </tr>
          <tr v-for="(key, index) in media" :key="index">
            <td><p v-html="key.media_type"></p></td>
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
</template>

<script>
import axios from "axios";
import apiConfig from "@/config";
import DefaultTabs from "@components/DefaultTabs";
import PageHeader from '@components/PageHeader'
import Echarts from "@components/Chart/GlobalEcharts";
import ChartOption from "@components/Chart/GlobalChartOption";
import commonJs from '@javascripts/common.js';
import { Table } from "ant-design-vue";
import TagCharts from "@components/Chart/chartTagsTwo";
import { mapState } from "vuex";
export default {
  name: "detailAnalytic",
  components: { 
    TagCharts, 
    Echarts,
    PageHeader,
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
    };
  },
  computed: {
    ...mapState(["authorization"])
  },
  created() {
    this.analyOneParams.profile_id = String(this.$route.params.id);
    this.type = Number(this.$route.params.type);
    if (Number(this.$route.params.type) === 0) {
      // 微博
      // Industries Distribution
      this.detailAnalyOneWeibo(this.analyOneParams);
    } else {
      // 微信
      // Industries Distribution
      this.detailAnalyOneWeixin(this.analyOneParams);
      // Media Distribution
      this.detailMediaWeixin(this.analyOneParams);
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
  }
};
</script>
<style>
</style>