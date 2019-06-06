<!-- compare.vue 和detail.vue 微信、微博平台的 media 模块表格  -->
<template>
  <div class="panel default-panel mt20">
    <div class="panel-body prl30">
      <h5 class="title">{{$t('lang.kolList.analyticVue.weixin.Media.title')}}</h5>
      <div class="nonetip" v-if="isMediaShow">
        <span>{{$t('lang.totalNoDataTip')}}</span>
      </div>
      <div class="r8-loading" v-if="isMediaLoading">
        <a-spin tip="Loading..."/>
      </div>
      <div class="activity-table" v-if="isMedia">
        <table class="com-brand-table">
          <tr>
            <th>{{$t('lang.kolList.analyticVue.weixin.Media.Type')}}</th>
            <th>{{$t('lang.kolList.analyticVue.weixin.Media.DocCount')}}</th>
            <th>{{$t('lang.kolList.analyticVue.weixin.Media.DocCountPercent')}}</th>
            <th>{{$t('lang.kolList.analyticVue.weixin.Media.totalRead')}}</th>
            <th>{{$t('lang.kolList.analyticVue.weixin.Media.avgRead')}}</th>
            <th>{{$t('lang.kolList.analyticVue.weixin.Media.maxRead')}}</th>
            <th>{{$t('lang.kolList.analyticVue.weixin.Media.totalLike')}}</th>
            <th>{{$t('lang.kolList.analyticVue.weixin.Media.likeRead')}}</th>
          </tr>
          <tr v-for="(key, index) in media" :key="index">
            <td>
              <p v-html="key.media_type"></p>
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import { mapState } from 'vuex'
export default {
  name: 'Media',
  props: ['currentId', 'titleType'],
  data () {
    return {
      // Media
      analyOneParams: {
        start_date: commonJs.cPastTwentyOneDays,
        end_date: commonJs.cPastOneday,
        profile_id: 'MzAwMDAyMzY3OA=='
      },
      media: [],
      isMedia: false,
      isMediaShow: false,
      isMediaLoading: true,
    }
  },
  created() {
    // Media Distribution
    this.analyOneParams.profile_id = String(this.currentId)
    this.detailMediaWeixin(this.analyOneParams)
  },
  methods: {
    // Media Distribution weixin
    detailMediaWeixin(params) {
      const _that = this
      axios
        .post(apiConfig.detailMediaWeixin, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('woshi weixin', res)
            _that.isMediaLoading = false
            if (res.data.length > 0) {
              _that.isMediaShow = false
              _that.isMedia = true
              _that.media = res.data
            } else {
              _that.isMediaShow = true
              _that.isMedia = false
            }
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
  }
}

</script>
<style>
</style>
