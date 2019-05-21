<!-- detail.vue 中summary 模块 -->
<template>
  <div>
    <!-- Activity 和 analytics 目前这个不展示了-->
    <!-- <activity></activity> -->

    <!-- socialData -->
    <!-- <social></social> -->

    <!-- performance -->
    <!-- <best-posts></best-posts> -->

    <!-- most_relevant_post  暂时微信没有这个接口 -->
    <!-- <most-relevent v-if="type === 0" :keywords='currentKeywords'></most-relevent> -->

    <!-- Keywords -->
    <keywords :keywords='currentKeywords'></keywords>

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
import Activity from '@/pages/kolList/components/SumActivity'
// socialData 表格
import Social from '@/pages/kolList/components/SumSocial'
// SumBestPosts 最佳文章
import BestPosts from '@/pages/kolList/components/SumBestPosts'
// SumMostRelevent 最具相关度文章
import MostRelevent from '@/pages/kolList/components/SumMostRelevent'
// SumKeywords 关键字
import Keywords from '@/pages/kolList/components/SumKeywords'

export default {
  name: 'summaries',
  props: ['currentKeywords'],
  components: {
    Activity,
    Social,
    BestPosts,
    MostRelevent,
    Keywords
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
.kol-performance /deep/ {
  .com-brand-table {
    a,
    .purple {
      display: block;
      text-align: left;
      color: nth($purple, 1);
      @include limit-line(1);
      word-break: break-all;
    }
  }
}
</style>