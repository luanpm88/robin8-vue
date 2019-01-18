<template>
  <div>
    <campaign-create-process
      :renderData="processStatus"
      class="mt20"
    ></campaign-create-process>

    <div class="panel default-panel mt20">
      <div class="panel-body">
        <div class="campaign-status-panel">
          <div class="iconfont icon-success success"></div>
          <div class="info">
            <h5 class="title">活动提交审核成功</h5>
            <p>正在审核中，我们将在24小时之内完成审核</p>
          </div>
        </div>
      </div>
    </div>

    <div class="panel default-panel mt20">
      <div class="panel-body">
        <div class="btn-group">
          <div class="btn btn-outline btn-purple"></div>
          <div class="btn btn-outline btn-purple"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import CampaignCreateProcess from './components/CampaignCreateProcess'
import KolsListItem from './components/KolsListItem'

export default {
  name: 'ChooseKols',
  components: {
    CampaignCreateProcess,
    KolsListItem
  },
  data () {
    return {
      processStatus: {
        current: 2,
        index: 1
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
