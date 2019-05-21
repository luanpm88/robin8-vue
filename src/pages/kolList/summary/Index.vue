
<template>
  <div>
    <!-- Activity 和 analytics 目前这个不展示了-->
    <!-- <activity></activity> -->

    <!-- socialData -->
    <social></social>

    <!-- 从analytics 复制出来的-->
    <!-- distribution -->
    <!-- <distribution :currentType="this.$route.query.type" :currentId="this.$route.params.id" :titleType='0'></distribution> -->

    <!-- weixin Media  微博没有 Media-->
    <!-- <div v-if="Number(type) === 1">
      <media :currentId="this.$route.params.id" :titleType='0'></media>
    </div> -->

    <!-- 微博图表渲染模版  -->
    <!-- <div v-if="Number(type) === 0">
      <analytic-chart :currentType="this.$route.query.type" :currentId="this.$route.params.id" :currentData="countWeiboList"></analytic-chart>
    </div> -->
    <!-- 微信图表渲染模版 -->
    <!-- <div v-if="Number(type) === 1">
      <analytic-chart :currentType="this.$route.query.type" :currentId="this.$route.params.id" :currentData="countWeixinList"></analytic-chart>
    </div> -->
  </div>
</template>
<script>
import axios from 'axios'
import apiConfig from '@/config'
import ChartOption from '@components/Chart/GlobalChartOption'
import DefaultTabs from '@components/DefaultTabs'
import commonJs from '@javascripts/common.js'
import { mapState } from 'vuex'
// antivity 和 analytics 两个表格
import Activity from '@/pages/kolList/components/SummaryActivity'
// socialData 表格
import Social from '@/pages/kolList/components/SummarySocial'

export default {
  name: 'summaries',
  components: {
    Activity,
    Social
  },
  data() {
    return {

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