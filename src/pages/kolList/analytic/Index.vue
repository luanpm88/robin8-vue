
<template>
  <div>
    <!-- distribution -->
    <distribution :currentType="this.$route.query.type" :currentId="this.$route.params.id"></distribution>

    <!-- weixin Media  微博没有 Media-->
    <div v-if="Number(type) === 1">
      <media :currentId="this.$route.params.id"></media>
    </div>

    <!-- 微博图表渲染模版  -->
    <div v-if="Number(type) === 0">
      <analytic-chart :currentType="this.$route.query.type" :currentId="this.$route.params.id" :currentData="countWeiboList"></analytic-chart>
    </div>
    <!-- 微信图表渲染模版 -->
    <div v-if="Number(type) === 1">
      <analytic-chart :currentType="this.$route.query.type" :currentId="this.$route.params.id" :currentData="countWeixinList"></analytic-chart>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import ChartOption from '@components/Chart/GlobalChartOption'
import DefaultTabs from '@components/DefaultTabs'
import commonJs from '@javascripts/common.js'
import { mapState } from 'vuex'
import distribution from '@/pages/kolList/components/Distribution'
import media from '@/pages/kolList/components/Media'
import analyticChart from '@/pages/kolList/components/AnalyticChart'
export default {
  name: 'detailAnalytic',
  components: {
    DefaultTabs,
    distribution,
    media,
    analyticChart
  },
  data() {
    return {
      type: 0,
      countWeixinList: [{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count0Options,
        chartsStyle: {
          height: '180px'
        },
        ref: 'weixin0',
        type: 'Doc',
        mode: 'Daily',
        countParams: {
          type: 'doc',
          mode: 'daily',
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          auto_adjust: 1,
          profile_id: 'MzAwMDAyMzY3OA=='
        }
      },{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count1Options,
        chartsStyle: {
          height: '180px'
        },
        ref: 'weixin1',
        type: 'Read',
        mode: 'Daily',
        countParams: {
          type: 'read',
          mode: 'daily',
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          auto_adjust: 1,
          profile_id: 'MzAwMDAyMzY3OA=='
        }
      },{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count2Options,
        chartsStyle: {
          height: '180px'
        },
        ref: 'weixin2',
        type: 'Like',
        mode: 'Daily',
        countParams: {
          type: 'like',
          mode: 'daily',
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          profile_id: 'MzAwMDAyMzY3OA=='
        }
      },{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count3Options,
        chartsStyle: {
          height: '180px'
        },
        ref: 'weixin3',
        type: 'Doc',
        mode: 'Hourly',
        countParams: {
          type: 'doc',
          mode: 'hourly',
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          auto_adjust: 1,
          profile_id: 'MzAwMDAyMzY3OA=='
        }
      },{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count4Options,
        chartsStyle: {
          height: '180px'
        },
        ref: 'weixin4',
        type: 'Read',
        mode: 'Hourly',
        countParams: {
          type: 'read',
          mode: 'hourly',
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          auto_adjust: 1,
          profile_id: 'MzAwMDAyMzY3OA=='
        }
      },{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count5Options,
        chartsStyle: {
          height: '180px'
        },
        ref: 'weixin5',
        type: 'Like',
        mode: 'Hourly',
        countParams: {
          type: 'like',
          mode: 'hourly',
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          auto_adjust: 1,
          profile_id: 'MzAwMDAyMzY3OA=='
        }
      }],
      // weibo count
      countWeiboList: [{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count0Options,
        chartsStyle: {
          height: '180px'
        },
        ref: 'weibo0',
        type: 'Doc',
        mode: 'Daily',
        countParams: {
          type: 'doc',
          mode: 'daily',
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          profile_id: 'MzAwMDAyMzY3OA=='
        }
      },{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count1Options,
        chartsStyle: {
          height: '180px'
        },
        ref: 'weibo1',
        type: 'Comment',
        mode: 'Daily',
        countParams: {
          type: 'comment',
          mode: 'daily',
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          profile_id: 'MzAwMDAyMzY3OA=='
        }
      },{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count2Options,
        chartsStyle: {
          height: '180px'
        },
        ref: 'weibo2',
        type: 'Share',
        mode: 'Daily',
        countParams: {
          type: 'share',
          mode: 'daily',
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          profile_id: 'MzAwMDAyMzY3OA=='
        }
      },{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count3Options,
        chartsStyle: {
          height: '180px'
        },
        ref: 'weibo3',
        type: 'Like',
        mode: 'Daily',
        countParams: {
          type: 'like',
          mode: 'daily',
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          profile_id: 'MzAwMDAyMzY3OA=='
        }
      },{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count4Options,
        chartsStyle: {
          height: '180px'
        },
        ref: 'weibo4',
        type: 'Doc',
        mode: 'Hourly',
        countParams: {
          type: 'doc',
          mode: 'hourly',
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          profile_id: 'MzAwMDAyMzY3OA=='
        }
      },{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count5Options,
        chartsStyle: {
          height: '180px'
        },
        ref: 'weibo5',
        type: 'Comment',
        mode: 'Hourly',
        countParams: {
          type: 'comment',
          mode: 'hourly',
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          profile_id: 'MzAwMDAyMzY3OA=='
        }
      },{
        isShow: false,
        isLoading: true,
        isChart: false,
        options: ChartOption.count6Options,
        chartsStyle: {
          height: '180px'
        },
        ref: 'weibo6',
        type: 'Share',
        mode: 'Hourly',
        countParams: {
          type: 'share',
          mode: 'hourly',
          start_date: commonJs.cPastTwentyOneDays,
          end_date: commonJs.cPastOneday,
          profile_id: 'MzAwMDAyMzY3OA=='
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
    } 
  },
  computed: {
    ...mapState(['authorization'])
  },
  created() {
    this.type = Number(this.$route.query.type) 
  }
} 
</script>
<style lang="scss" scoped>

</style>