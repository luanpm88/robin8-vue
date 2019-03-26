<template>
  <div class="page">
    <page-header></page-header>
    <div class="container mt50 clearfix">
      <div class="top-control-area">
        <button type="button" class="btn btn-purple" @click="pageBack">
          <span class="iconfont icon-arrow-left"></span>
          Back
        </button>
      </div>
      <!-- content -->
      <div class="compare-wrap mt20">
        <div class="compare-content clearfix" >
          <div class="compare-list" v-for="(item, index) in weiboData" :key='index'>
            <!-- kolinfo -->
            <kolinfo :currentType="type" :currentId="item.profile_id"></kolinfo>

            <!-- Performance -->
            <performance :currentType="type" :currentId="item.profile_id"></performance>

            <!-- distribution -->
            <div class="mt20">
              <distribution :currentType="type" :currentId="item.profile_id" :titleType='1'></distribution>
            </div>

            <!-- 微信media -->
            <div v-if="Number(type) === 1">
              <media :currentId="item.profile_id" :titleType='1'></media>
            </div>

            <!-- Radar -->
            <radar :currentType="type" :currentId="item.profile_id"></radar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import PageHeader from '@components/PageHeader'
import Echarts from '@components/Chart/GlobalEcharts'
import ChartOption from '@components/Chart/GlobalChartOption'
import commonJs from '@javascripts/common.js'
import { mapState } from 'vuex'
import kolinfo from '@/pages/kolList/components/Kolinfo'
import performance from '@/pages/kolList/components/Performance'
import distribution from '@/pages/kolList/components/Distribution'
import media from '@/pages/kolList/components/Media'
import radar from '@/pages/kolList/components/Radar'
export default {
  name: 'kolCompare',
  components: {
    Echarts,
    PageHeader,
    kolinfo,
    performance,
    distribution,
    media,
    radar
  },
  data() {
    return {
      type: 0,
      weiboData: []
    } 
  },
  created() {
    this.type = this.$route.params.type
    this.$route.query.list.forEach((element, index) => {
      let params = {
        profile_id: element
      }
      // top detail
      this.weiboData.push(params)
    }) 
  },
  computed: {
    ...mapState(['authorization'])
  },
  methods: {
    pageBack() {
      this.$router.go(-1)
    }
  }
} 
</script>
<style lang="scss" scoped>

</style>
