<template>
  <div class="ranking-container clearfix ranking-weibo">
    <div class="top-control-area">
      <button type="button" class="btn btn-cyan" @click="pageBack">
        <span class="iconfont icon-arrow-left"></span>
        Back
      </button>
    </div>

    <div class="mt20 clearfix">
      <!-- left -->
      <div class="ranking-left col-sm-2">
        <h5>{{$t(`lang.ranking.weiboside.title`)}}</h5>
        <ul class="ranking-nav">
          <li
            v-for="(item, index) in rankSideList"
            :key="index"
            @click="listSearch(item, index)"
            :class="{rankingcur:iscur === index}"
          >
            <span><i class="iconfont icon" v-html="item.icon"></i>
            </span>
            <!-- {{item.label}} -->
            {{$t(`lang.${item.label}`)}}
          </li>
        </ul>
      </div>
      <!-- right -->
      <div class="ranking-right col-sm-10">
        <!-- 头部三条和 和 beachmark 先隐藏 -->
        <!-- top dec -->
        <!-- <div class="r-top clearfix">
          <p
            class="r-top-dec col-sm-7"
          >{{topTittle}} on {{topTittleIndustry}} ( 21 days analysis: {{endDate}} to {{refreshDate}})</p>
          <p class="r-top-right col-sm-5">
            <span>7 | 14 | 21</span>
            <span class="r-benchmark" @click="lookBenchmark()">
              <i class="iconfont icon-rank"></i> &nbsp;Benchmark
            </span>
          </p>
        </div> -->
        <!-- top list -->
        <!-- <div class="r-right-topList clearfix">
          <div class="r8-loading" v-if="isTopLoading">
            <a-spin tip="Loading..."/>
          </div>
          <div v-if="!isTopLoading">
            <div class="col-sm-4" v-for="(item, index) in tableTopList" :key="index">
              <p class="r-right-topList-tit">{{item.fixedTit}}</p>
              <div class="r-right-topList-box clearfix">
                <span class="r-right-topList-img col-sm-5">
                  <router-link target="_blank" :to="{path: '/kol/',
                    name: 'KolDetail',
                    params: {
                      id: item.profile_id,
                    },
                    query: {
                      type: 0,
                      brand_keywords: totalKeywords
                    }
                  }">
                    <img :src="item.avatar_url" alt>
                  </router-link>
                </span>
                <span class="iconfont icon-cart active col-sm-1" @click="doAddCart(item)"></span>
                <span class="r-right-topList-txt col-sm-6">
                  <b>{{item.profile_name}}</b>
                  <b>{{item.source}}</b>
                  <b>{{item.value}}</b>
                </span>
              </div>
            </div>
          </div>
        </div> -->
        <div>
          <div class="r8-loading" v-if="isTableLoding">
            <a-spin tip="Loading..."/>
          </div>
          <a-table
            v-if="isTable"
            :columns="columns" 
            :dataSource="tableThirtyList"
            @change="handleTableChange"
            :pagination="false"
            :scroll="{ y: 620 }"
          >
            <template slot="profileDec" slot-scope="dec">
              <div class="r-tableThirtyList-name">
                <router-link target="_blank" :to="{path: '/kol/',
                    name: 'KolDetail',
                    params: {
                      id: dec.profile_id,
                    },
                    query: {
                      type: 0,
                      brand_keywords: totalKeywords
                    }
                  }">
                  <img :src="dec.avatar_url">
                </router-link>
                <span class="iconfont icon-cart active" @click="doAddCart(dec)"></span>
                <p>{{dec.profile_name}}</p>
                <!-- <p>{{dec.id}}</p> -->
              </div>
            </template>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import { mapState } from 'vuex'
import totalDataJS from '@components/Chart/GlobalChartOption'
import commonJs from '@javascripts/common.js'
import { Spin, Table } from 'ant-design-vue'
let totalParams = {
  industry: 'fashion',
  no_of_days: 21
}
export default {
  name: 'wechatRanking',
  components: {
    ASpin: Spin,
    ATable: Table
  },
  computed: {
    ...mapState(['authorization'])
  },
  data() {
    return {
      rankSideList: totalDataJS.ranking.rankWeiboSideList,
      iscur: 7,
      refreshDate: '',
      endDate: commonJs.cPastTwentyOneDays,
      startDate: commonJs.cPastOneday,
      topTittle: 'Top 30 KOLs',
      topTittleIndustry: '',
      tableTopList: [],
      tableThirtyList: [],
      isTopLoading: true,
      isTableLoding: true,
      isTable: false,
      columns: totalDataJS.ranking.weibothirtyColums,
      TableData: [],
      totalKeywords: '',
      cartParams: {}
    }
  },
  created() {
    this.topTittleIndustry = totalParams.industry
    this.rankSideList.forEach((item, index) => {
      if (item.value === this.topTittleIndustry) {
        this.iscur = index
      }
    })
    // 获取最新的report_date
    this.RankingDate(totalParams)
    this.getBaseData()
  },
  methods: {
    // ranking 升降序函数
    handleTableChange(pagination, filters, sorter) {
      if (sorter.order === 'ascend') {
        this.tableThirtyList.sort(this.ascendCompare(sorter.columnKey))
      } else {
        this.tableThirtyList.sort(this.descendCompare(sorter.columnKey))
      }
    },
    // ranking 升序排列
    ascendCompare(property) {
      return function(a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value1 - value2
      }
    },
    // ranking 降序排列
    descendCompare(property) {
      return function(a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value2 - value1
      }
    },
    // 获取keyword
    getBaseData() {
      const _that = this
      axios
        .get(apiConfig.baseInfosUrl, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            if (!res.data.competitors.length == 0) {
              res.data.trademarks_list.forEach(element => {
                if (Number(element.status) === 1) {
                  _that.totalKeywords = element.keywords
                }
              })
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
      next()
    },
    // ranking 在调用right 两个列表之前 获取最新的report_date
    RankingDate(params) {
      const _that = this
      axios
        .post(apiConfig.WeboRankingDate, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          // console.log('最新的data 数据', res)
          if ((res.status = 200)) {
            _that.refreshDate = res.data.available_report_dates[0]
            totalParams.report_date = _that.refreshDate
            // right top list
            _that.WeboTopList(totalParams)
            // 30 list
            totalParams.sort_col = 'total_sum_engagement'
            _that.WeboThirtyList(totalParams)
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // top list
    WeboTopList(params) {
      const _that = this
      axios
        .post(apiConfig.WeboTopList, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          // console.log('topList res', res)
          _that.tableTopList = []
          if ((res.status = 200)) {
            _that.isTopLoading = false
            _that.tableTopList.push(
              res.data.top_count_summary,
              res.data.most_likes_summary,
              res.data.most_post_influence_summary
            )
            _that.tableTopList[0].fixedTit = 'Most Active Profile'
            _that.tableTopList[0].value =
              _that.tableTopList[0].value + ' Posts'
            _that.tableTopList[1].fixedTit = 'Most Like Profile'
            _that.tableTopList[1].value =
              _that.tableTopList[1].value + ' Likes'
            _that.tableTopList[2].fixedTit = 'Most Influential Profile'
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // right 30 list
    WeboThirtyList(params) {
      const _that = this
      axios
        .post(apiConfig.WeboThirtyList, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          console.log('WeboThirtyList', res)
          if (res.status === 200) {
            _that.isTable = true
            _that.isTableLoding = false
            res.data.forEach((element, index) => {
              element.profileDec = {
                avatar_url: '',
                profile_name: '',
                id: '',
                profile_id: ''
              }
              element.profileDec.avatar_url = element.avatar_url
              element.profileDec.profile_name = element.profile_name
              element.profileDec.id = element.profile_id
              element.profileDec.profile_id = element.profile_id
              element.doc_count = commonJs.threeFormatter(element.doc_count, 2)
              element.total_sum_engagement = commonJs.threeFormatter(
                element.total_sum_engagement,
                2
              )
              element.max_sum_engagement = commonJs.threeFormatter(
                element.max_sum_engagement,
                2
              )
              element.avg_sum_engagement = commonJs.threeFormatter(
                element.avg_sum_engagement,
                2
              )
              element.total_comments = commonJs.threeFormatter(
                element.total_comments,
                2
              )
              element.max_comments = commonJs.threeFormatter(
                element.max_comments,
                2
              )
              element.avg_comments = commonJs.threeFormatter(
                element.avg_comments,
                2
              )
              element.total_likes = commonJs.threeFormatter(
                element.total_likes,
                2
              )
              element.max_likes = commonJs.threeFormatter(element.max_likes, 2)
              element.avg_likes = commonJs.threeFormatter(element.avg_likes, 2)
              element.kol_influence = commonJs.threeFormatter(element.kol_influence, 2)
              element.fans_number = element.fans_number
              element.avg_comments = commonJs.threeFormatter(element.avg_comments, 2)
              element.relevance = commonJs.threeFormatter(element.relevance, 2)
              element.industry = commonJs.threeFormatter(element.industry, 2)
            })
            _that.tableThirtyList = res.data
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    listSearch(currentList, index) {
      this.iscur = index
      totalParams.industry = currentList.value
      this.topTittleIndustry = currentList.value
      this.tableTopList = []
      this.tableThirtyList = []
      this.isLoding = true
      this.isTable = false
      this.isTableLoding = true
      // 获取最新的report_date
      this.RankingDate(totalParams)
    },
    // 跳转benchmark页面
    lookBenchmark() {
      this.$router.push({
        path: '/ranking/BenchMark',
        name: 'benchMark',
        params: {
          type: 0
        },
        query: {
          industry: totalParams.industry,
          no_of_days: totalParams.no_of_days,
          report_date: totalParams.report_date
        }
      })
    },
    // 跳转detail
    openDetails(item) {
      this.$router.push({
        path: '/kol/',
        name: 'KolDetail',
        params: {
          id: item.profile_id
        },
        query: {
          type: 0,
          brand_keywords: this.totalKeywords
        }
      })
    },
    doAddCart(data) {
      this.cartParams.profile_id = data.profile_id
      this.cartParams.profile_name = data.profile_name
      this.cartParams.avatar_url = data.avatar_url
      this.cartParams.description_raw = ''
      axios
        .post(apiConfig.kolCollectUrl, this.cartParams, {
          headers: {
            Authorization: this.authorization
          }
        })
        .then(this.handleDoAddCartSucc)
    },
    handleDoAddCartSucc(res) {
      // console.log(res)
      let resData = res.data
      // console.log(resData)
      if (res.status == 201) {
        if (resData.error == 1) {
          alert(resData.detail)
          return false
        }
        alert(this.$t('lang.cartSuccess'))
      }
    },
    pageBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-cart {
  &.active {
    cursor: pointer;
    float: none;
    display: inline-block;
    vertical-align: top;
    padding: 0px;
    color: nth($cyan, 1) !important;
  }
}
</style>
