<!-- detail.vue 页面summary的 Activity和Analytics 表格 -->
<template>
  <div>
    <!-- Activity -->
    <div class="panel default-panel mt20">
      <div class="panel-body prl30">
        <h5 class="title">{{$t('lang.kolList.detail.activity')}}</h5>
        <div class="activity-table">
          <table class="com-brand-table">
            <tr>
              <th>{{$t('lang.kolList.detail.activityData.id')}}</th>
              <th>{{$t('lang.kolList.detail.activityData.title')}}</th>
              <th>{{$t('lang.kolList.detail.activityData.date')}}</th>
              <th>{{$t('lang.kolList.detail.activityData.performance')}}</th>
            </tr>
            <tr v-for="(key, index) in activeList.creations_list" :key="index">
              <td>{{key.id}}</td>
              <td>{{key.title}}</td>
              <td>{{key.date}}</td>
              <td>{{key.amount}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <!-- Analytics -->
    <div class="panel default-panel mt20">
      <div class="panel-head">
        <h5 class="title">{{$t('lang.kolList.detail.analytics')}}</h5>
      </div>
      <div class="panel-body prl30">
        <div class="activity-contable">
          <table class="com-brand-table">
            <tr>
              <th></th>
              <th>{{$t('lang.kolList.detail.analyticsData.campaigns')}}</th>
              <th>
                <a-tooltip
                  placement="topLeft"
                  :title="$t('lang.kolList.detail.analyticsData.performTip')"
                >{{$t('lang.kolList.detail.analyticsData.performance')}}</a-tooltip>
              </th>
              <th>
                <a-tooltip
                  placement="topLeft"
                  :title="$t('lang.kolList.detail.analyticsData.clientTip')"
                >{{$t('lang.kolList.detail.analyticsData.clients')}}</a-tooltip>
              </th>
            </tr>
            <tr>
              <td>{{$t('lang.kolList.detail.analyticsTotal')}}</td>
              <td v-for="(item, index) in activeList.total_info" :key="index">
                <p class="activity-border">{{item}}</p>
              </td>
            </tr>
            <tr>
              <td>{{$t('lang.kolList.detail.analyticsDay')}}</td>
              <td v-for="(item, index) in activeList.last_30_days_info" :key="index">
                <p class="activity-border">{{item}}</p>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import { mapState } from 'vuex'
import commonJs from '@javascripts/common.js'
export default {
  name: 'SummaryActivity',
  data() {
    return {
      activeList: {}
    }
  },
  created() {
    this.kolActivityUrl()
  },
  methods: {
    // activity analytics 还有info 假如没有info 调用 Fergus的info 接口 ---- 目前平台没有在这边，所以只用了 fergus初始化的接口
    kolActivityUrl() {
      const _that = this
      console
      axios
        .get(
          apiConfig.kolActivityUrl +
            '/' +
            this.$route.params.id.replace(/\./g, '\\/') +
            '/big_v_details',
          {
            headers: {
              Authorization: _that.authorization
            }
          }
        )
        .then(function(res) {
          if (res.status === 200) {
            _that.activeList = res.data
            if (_that.activeList.total_info.length === 0) {
              _that.activeList.total_info[0] = 'N/A'
              _that.activeList.total_info[1] = 'N/A'
              _that.activeList.total_info[2] = 'N/A'
            }
            if (_that.activeList.creations_list.length === 0) {
              _that.activeList.creations_list[0] = {}
              _that.activeList.creations_list[0].id = 'N/A'
              _that.activeList.creations_list[0].title = 'N/A'
              _that.activeList.creations_list[0].date = 'N/A'
              _that.activeList.creations_list[0].amount = 'N/A'
            }
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    }
  },
  computed: {
    ...mapState(['authorization'])
  }
}
</script>
<style>
</style>
