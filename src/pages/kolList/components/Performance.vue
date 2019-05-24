<!-- compare.vue 的performance 模块 -->
<template>
  <div>
    <div class="panel default-panel" v-if="Number(currentType) === 0">
      <div class="panel-head">
        <h5 class="title text-center">{{$t('lang.kolCompare.performance.tit')}}</h5>
      </div>
      <div class="panel-body p30">
        <p>粉丝:{{socialData.fans_number}}</p>
        <p>头条分享数:{{socialData.total_shares}}</p>
        <p>平均分享数:{{socialData.avg_shares}}</p>
        <p>头条点赞数:{{socialData.total_likes}}</p>
        <p>平均点赞数:{{socialData.avg_likes}}</p>
        <p>头条评论数:{{socialData.total_comments}}</p>
        <p>平均评论数:{{socialData.avg_comments}}</p>
        <p>上载时间:{{socialData.data_date}}</p>
      </div>
    </div>
    <!-- weixin Performance -->
    <div class="panel default-panel mt20" v-if="Number(currentType) === 1">
      <div class="panel-head">
        <h5 class="title text-center">{{$t('lang.kolCompare.price.tit')}}</h5>
      </div>
      <div class="panel-body p30">
        <p>粉丝:{{socialData.fans_number}}</p>
        <p>头条阅读数:{{socialData.total_reads}}</p>
        <p>平均阅读数:{{socialData.avg_reads}}</p>
        <p>头条点赞数:{{socialData.total_likes}}</p>
        <p>平均点赞数:{{socialData.avg_likes}}</p>
        <p>上载时间:{{socialData.data_date}}</p>
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
  name: 'performance',
  props: ['currentType', 'currentId'],
  data() {
    return {
      socialData: {},
      socialParams: {
        profile_id: ''
      }
    };
  },
  created() {
    this.socialParams.profile_id = this.currentId
    if (Number(this.currentType) === 0) {
      // performance
      this.kolWeiboSocial(this.socialParams);
    }
    if (Number(this.currentType) === 1) {
      // 微信
      this.kolWeixinSocial(this.socialParams)
    }
  },
  methods: {
    // kolWeixinSocial weibo
    kolWeiboSocial(params) {
      const _that = this 
      axios
        .post(apiConfig.kolWeiboSocial, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('weibo', res)
            _that.socialData = {
              fans_number: 'N/A',
              total_shares: 'N/A',
              avg_shares: 'N/A',
              total_likes: 'N/A',
              avg_likes: 'N/A',
              total_comments: 'N/A',
              avg_comments: 'N/A',
              data_date: 'N/A',
            }
            _that.socialData.fans_number = res.data.fans_number
            _that.socialData.total_shares = res.data.stats.total_shares
            _that.socialData.avg_shares =  res.data.stats.avg_shares
            _that.socialData.total_likes =  res.data.stats.total_likes
            _that.socialData.avg_likes =  res.data.stats.avg_likes
            _that.socialData.total_comments =  res.data.stats.total_comments
            _that.socialData.avg_comments =  res.data.stats.avg_comments
            _that.socialData.data_date =  res.data.stats.data_date
            console.log(that.socialData);
          }
        })
        .catch(function(error) {
          // console.log(error) 
        }) 
    },
    // kolWeixinSocial
    kolWeixinSocial(params) {
      const _that = this 
      axios
        .post(apiConfig.kolWeixinSocial, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('weixin', res);
            _that.socialData = {
              fans_number: 'N/A',
              total_reads: 'N/A',
              avg_reads: 'N/A',
              total_likes: 'N/A',
              avg_likes: 'N/A',
              data_date: 'N/A',
            }
            _that.socialData.fans_number = res.data.fans_number
            _that.socialData.total_reads = res.data.stats.total_reads
            _that.socialData.avg_reads =  res.data.stats.avg_reads
            _that.socialData.total_likes =  res.data.stats.total_likes
            _that.socialData.avg_likes =  res.data.stats.avg_likes
            _that.socialData.data_date =  res.data.stats.data_date
          }
        })
        .catch(function(error) {
          // console.log(error) 
        }) 
    },
  },
  computed: {
    ...mapState(['authorization'])
  },
};
</script>
<style>
</style>