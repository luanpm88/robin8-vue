<template>
  <div class="page">
    <page-header></page-header>

    <div class="container mt50 clearfix">
      <!-- <main-nav class="pull-left"></main-nav> -->
      <div class="ranking-container pull-right clearfix">
        <!-- left -->
        <div class="ranking-left col-sm-1">
          <h5>Industries</h5>
          <ul class="ranking-nav">
            <li
              v-for="(item, index) in rankSideList"
              :key="index"
              @click="listSearch(item, index)"
              :class="{rankingcur:iscur === index}"
            >
              <!-- <i class="iconfont icon" v-html="item.icon">&#xe71a;</i> -->
              {{item.label}}
            </li>
          </ul>
        </div>
        <!-- right -->
        <div class="ranking-right col-sm-11">
          <!-- top dec -->
          <div class="r-top clearfix">
            <p
              class="r-top-dec col-sm-8"
            >{{topTittle}} on {{topTittleIndustry}} ( 21 days analysis: {{endDate}} to {{startDate}})</p>
            <p class="r-top-right col-sm-4">
              <span>7 | 14 | 21</span>
              <span class="r-benchmark" @click="lookBenchmark()">Benchmark</span>
            </p>
          </div>
          <!-- top list -->
          <div class="r-right-topList clearfix">
            <div class="r8-loading" v-if="isTopLoading">
              <a-spin tip="Loading..."/>
            </div>
            <div v-if="!isTopLoading">
              <div class="col-sm-4" v-for="(item, index) in tableTopList" :key="index">
                <p class="r-right-topList-tit">{{item.fixedTit}}</p>
                <div class="r-right-topList-box clearfix">
                  <span class="r-right-topList-img col-sm-6" @click="openDetails(item)">
                    <img :src="item.avatar_url" alt>
                  </span>
                  <span class="r-right-topList-txt col-sm-4">
                    <b>{{item.profile_name}}</b>
                    <b>{{item.source}}</b>
                    <b>{{item.value}}</b>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <div class="r8-loading" v-if="isTableLoding">
              <a-spin tip="Loading..."/>
            </div>
            <a-table
            v-if="isTable" :columns="columns" :dataSource="tableThirtyList"
            @change="handleTableChange"
            :pagination="false" :scroll="{ y: 500 }">
              <template slot="profileDec" slot-scope="dec">
                <div class="r-tableThirtyList-name" 
                @click="rowClick(dec)">
                  <img :src="dec.img" alt="">
                  <p>{{dec.name}}</p>
                  <p>{{dec.id}}</p>
                </div>
              </template>
            </a-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import apiConfig from "@/config";
import PageHeader from "@components/PageHeader";
import MainNav from "@components/MainNav";
import { mapState } from "vuex";
import totalDataJS from "@components/Chart/GlobalChartOption";
import commonJs from "@javascripts/common.js";
import { Spin, Table } from "ant-design-vue";
let totalParams = {
  industry: "airline",
  no_of_days: 21
};
export default {
  name: "Home",
  components: {
    ASpin: Spin,
    PageHeader,
    MainNav,
    ATable: Table
  },
  computed: {
    ...mapState(["authorization"])
  },
  data() {
    return {
      rankSideList: totalDataJS.ranking.rankSideList,
      iscur: 0,
      refreshDate: "",
      endDate: commonJs.cPastTwentyOneDays,
      startDate: commonJs.cPastOneday,
      topTittle: "Top 30 KOLs",
      topTittleIndustry: '',
      tableTopList: [],
      tableThirtyList: [],
      isTopLoading: true,
      isTableLoding: true,
      isTable: false,
      columns: totalDataJS.ranking.thirtyColums,
      TableData: [],
      totalKeywords: ''
    };
  },
  created() {
    this.topTittleIndustry = totalParams.industry;
    this.rankSideList.forEach((item, index) => {
      if (item.value === this.topTittleIndustry) {
        this.iscur = index;
      }
    })
    // 获取最新的report_date
    this.RankingDate(totalParams);
  },
  methods: {
    // ranking 升降序函数
    handleTableChange(pagination, filters, sorter) {
      if (sorter.order === 'ascend') {
        this.tableThirtyList.sort(this.ascendCompare(sorter.columnKey));
      } else {
        this.tableThirtyList.sort(this.descendCompare(sorter.columnKey));
      }
    },
    // ranking 升序排列
    ascendCompare (property){
      return function(a,b){
          var value1 = a[property];
          var value2 = b[property];
          return value1 - value2;
      }
    },
    // ranking 降序排列
    descendCompare (property){
      return function(a,b){
          var value1 = a[property];
          var value2 = b[property];
          return value2 - value1;
      }
    },
    // 获取keyword
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
                _that.totalKeywords = element.name;
              }
            });
          }
        }
      })
    },
    beforeRouteLeave(to, from, next) {
      // 判断是下一个路由是不是进入到详情页
      if (to.name === 'KolDetail') {
        this.$route.meta.keepAlive = true
      } else {
        this.$route.meta.keepAlive = false
      }
      next();
    },
    // ranking 在调用right 两个列表之前 获取最新的report_date
    RankingDate(params) {
      const _that = this;
      axios
        .post(apiConfig.RankingDate, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          // console.log('头部data', res);
          if ((res.status = 200)) {
            _that.refreshDate = res.data.available_report_dates[0];
            totalParams.report_date = _that.refreshDate;
            // right top list
            _that.WeChatTopList(totalParams);
            // 30 list
            _that.WeChatThirtyList(totalParams);
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // top list
    WeChatTopList(params) {
      const _that = this;
      axios
        .post(apiConfig.WeChatTopList, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          // console.log('topList', res);
          _that.tableTopList = [];
          if ((res.status = 200)) {
            _that.isTopLoading = false;
            _that.tableTopList.push(
              res.data.most_likes_summary,
              res.data.most_post_influence_summary,
              res.data.top_count_summary
            );
            _that.tableTopList[0].fixedTit = "Most Active Profile";
            _that.tableTopList[1].fixedTit = "Most Like Profile";
            _that.tableTopList[2].fixedTit = "Most Influential Profile";
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // right 30 list
    WeChatThirtyList(params) {
      const _that = this;
      axios
        .post(apiConfig.WeChatThirtyList, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          // console.log('30', res);
          if ((res.status === 200)) {
             _that.isTable = true;
            _that.isTableLoding = false;
            res.data.forEach((element, index) => {
              element.profileDec = {
                img: '',
                name: '',
                id: '',
                profile_id: ''
              }
              element.profileDec.img = element.avatar_url;
              element.profileDec.name = element.profile_name;
              element.profileDec.id = element.weixin_id;
              element.profileDec.profile_id = element.profile_id;
            });
            _that.tableThirtyList = res.data;
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    listSearch(currentList, index) {
      this.iscur = index;
      totalParams.industry = currentList.value;
      this.topTittleIndustry = currentList.value;
      this.tableTopList = [];
      this.tableThirtyList = [];
      this.isLoding = true;
      this.isTable = false;
      this.isTableLoding = true;
      // 获取最新的report_date
      this.RankingDate(totalParams);
    },
    // 跳转benchmark页面
    lookBenchmark() {
      this.$router.push({
        path: '/ranking/BenchMark',
        name: 'benchMark',
        params: {
          industry: totalParams.industry,
          no_of_days: totalParams.no_of_days,
          // report_date: this.refreshDate
          report_date: totalParams.report_date
        },
      });
    },
    // 跳转detail
    openDetails(item) {
      this.$router.push({
        path: '/kol/',
        name: 'KolDetail',
        params: {
          id: item.profile_id,
          type: 1,
          brand_keywords: this.totalKeywords
        }
      });
    },
    // 行点击跳转detail
    rowClick(dec) {
      this.$router.push({
        path: '/kol/',
        name: 'KolDetail',
        params: {
          id: dec.profile_id,
          type: 1,
          brand_keywords: this.totalKeywords
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
