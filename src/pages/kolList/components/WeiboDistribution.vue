<!-- distribution -->
<template>
  <table class="com-brand-table">
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
    <tr v-for="(key, index) in distributionData" :key="index">
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
</template>
<script>
export default {
  name: "WeiboDistribution",
  props: ["distributionData"],
  data() {
    return {};
  }
};
</script>
<style>
</style>