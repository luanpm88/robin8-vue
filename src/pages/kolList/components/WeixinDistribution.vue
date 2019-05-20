<!-- compare.vue 和detail.vue 微信平台distribution 模块表格-->
<template>
  <table class="com-brand-table">
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
    <tr v-for="(key, index) in distributionData" :key="index">
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
</template>
<script>
export default {
  name: "WeixinDistribution",
  props: ["distributionData"],
  data() {
    return {} 
  }
} 
</script>
<style>
</style>