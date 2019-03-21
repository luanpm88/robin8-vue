<!--  -->
<template>
  <div>
    <!-- <div class="panel default-panel mt20" v-for="(item, index) in currentData" :key="index">
      <div class="panel-body p30">
        <p
          class="kol-cloumn mb10"
        >{{item.mode}} {{$t('lang.kolList.analyticVue.chat.tit')}} {{item.type}} {{$t('lang.kolList.analyticVue.chat.count')}} {{item.countParams.start_date}} - {{item.countParams.end_date}}</p>
        <div class="nonetip" v-if="item.isShow">
          <span>{{$t('lang.totalNoDataTip')}}</span>
        </div>
        <div class="r8-loading" v-if="item.isLoading">
          <a-spin tip="Loading..."/>
        </div>
        <div v-if="item.isChart">
          <Echarts :options="item.options" :chartsStyle="item.chartsStyle" :ref="item.ref"></Echarts>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style>
</style>