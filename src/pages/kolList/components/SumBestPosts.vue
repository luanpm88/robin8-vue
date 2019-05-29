<!-- detail.vue 中summary的 Best Performance Posts  -->
<template>
  <div>
    <!-- performance -->
    <div class="panel default-panel mt20 kol-performance">
      <div class="panel-head">
        <h5 class="title">{{$t('lang.kolList.detail.bestPosts.title')}}</h5>
      </div>
      <div class="panel-body prl30">
        <table class="com-brand-table" v-if="isPer">
          <tr>
            <th>{{$t('lang.kolList.detail.bestPosts.tableTitle')}}</th>
            <th>{{$t('lang.kolList.detail.bestPosts.date')}}</th>
            <th v-if="type === 1">{{$t('lang.kolList.detail.bestPosts.readCount')}}</th>
            <th v-if="type === 0">{{$t('lang.kolList.detail.bestPosts.engagement')}}</th>
          </tr>
          <tr v-for="(key, index) in performanceList" :key="index">
            <td>
              <a :href="key.url" target="blank" class="purple">{{key.title}}</a>
            </td>
            <td style="min-width:200px">{{key.post_time}}</td>
            <td v-if="type === 0">{{key.influence_sum_engagement}}</td>
            <td v-if="type === 1">{{key.influence_reads}}</td>
          </tr>
        </table>
        <div class="nonetip" v-if="isPerShow">
          <span>{{$t('lang.totalNoDataTip')}}</span>
        </div>
        <div class="r8-loading" v-if="isPerLoading">
          <a-spin tip="Loading..."/>
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
  name: 'SumBestPosts',
  data() {
    return {
      type: 0,
      performanceList: [],
      performanceParams: {
        start_date: commonJs.cPastTwentyOneDays,
        end_date: commonJs.cPastOneday,
        profile_id: '',
        order_type: 'read'
      },
      isPer: false,
      isPerShow: false,
      isPerLoading: true,
    }
  },
  created() {
    this.type = Number(this.$route.query.type)
    if (Number(this.$route.query.type) === 0) {
      // best performance 参数
        this.performanceParams.profile_id = String(this.$route.params.id)
        this.performanceParams.order_type = 'sum_engagement'
        this.performanceWeibo(this.performanceParams)
    }
    if (Number(this.$route.query.type) === 1) {
      // best performance 参数
      this.performanceParams.profile_id = this.$route.params.id
      this.performanceParams.order_type = 'read'
      this.performanceWeixin(this.performanceParams)
    }
  },
  methods: {
    // Best Performance Posts weibo
    performanceWeibo(params) {
      const _that = this
      axios
        .post(apiConfig.performanceWeibo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('wobo 微博', res)
            _that.isPerLoading = false
            if (res.data.data.length > 0) {
              _that.isPerShow = false
              _that.isPer = true
              res.data.data.forEach(item => {
                if (Number(item.influence_sum_engagement) !== 0) {
                  item.influence_sum_engagement =
                    commonJs.threeFormatter(item.influence_sum_engagement, 2) +
                    '+'
                } else {
                  item.influence_sum_engagement = commonJs.threeFormatter(
                    item.influence_sum_engagement,
                    2
                  )
                }
              })
              _that.performanceList = res.data.data
            } else {
              _that.isPerShow = true
              _that.isPer = false
            }
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // Best Performance Posts weixin
    performanceWeixin(params) {
      const _that = this
      axios
        .post(apiConfig.performanceWeixin, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('woshi weixin', res)
            _that.isPerLoading = false
            if (res.data.data.length > 0) {
              _that.isPerShow = false
              _that.isPer = true
              res.data.data.forEach(item => {
                if (Number(item.influence_reads) !== 0) {
                  item.influence_reads =
                    commonJs.threeFormatter(item.influence_reads, 2) + '+'
                } else {
                  item.influence_reads = commonJs.threeFormatter(
                    item.influence_reads,
                    2
                  )
                }
              })
              _that.performanceList = res.data.data
            } else {
              _that.isPerShow = true
              _that.isPer = false
            }
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
  },
  computed: {
    ...mapState(['authorization'])
  }
}
</script>
<style lang="scss" scoped>
a.purple {
  display: block;
  text-align: left;
  @include limit-line(1);
  color: nth($purple, 1);
  word-break: break-all;
}
</style>
