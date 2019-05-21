<!-- detail.vue 中summary的 socialData 表格 -->
<template>
  <div>
    <!-- socialData -->
    <div class="panel default-panel mt20">
      <div class="panel-head">
        <h5 class="title text-center">{{$t('lang.kolList.detail.socialData.title')}}</h5>
      </div>
      <div class="panel-body prl30">
        <div class="activity-table">
          <table class="com-brand-table">
            <tr>
              <th>{{$t('lang.kolList.detail.socialData.platform')}}</th>
              <th>{{$t('lang.kolList.detail.socialData.price')}}</th>
              <th>{{$t('lang.kolList.detail.socialData.followers')}}</th>
              <th>{{$t('lang.kolList.detail.socialData.likes')}}</th>
              <th>{{$t('lang.kolList.detail.socialData.shares')}}</th>
              <th>{{$t('lang.kolList.detail.socialData.comments')}}</th>
              <th>{{$t('lang.kolList.detail.socialData.postLast')}}</th>
              <th>{{$t('lang.kolList.detail.socialData.influence')}}</th>
            </tr>
            <tr>
              <td>{{dataListBox.platform}}</td>
              <td>{{dataListBox.pricing.direct_price}}</td>
              <td>{{dataListBox.fans_number}}</td>
              <td>{{dataListBox.stats.avg_likes}}</td>
              <td>{{dataListBox.stats.avg_shares}}</td>
              <td>{{dataListBox.stats.avg_comments}}</td>
              <td>{{dataListBox.stats.avg_daily_posts}}</td>
              <td v-if="type === 0">{{dataListBox.stats.avg_post_influences}}</td>
              <td v-else>Coming Soon</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import apiConfig from '@/config';
import { mapState } from 'vuex';
import commonJs from '@javascripts/common.js';
export default {
  name: 'SummarySocial',
  data() {
    return {
      type: 0,
      dataListBox: {
        fans_number: 'N/A',
        stats: {
          avg_shares: 'N/A',
          avg_likes: 'N/A',
          avg_reads: 'N/A',
          avg_daily_posts: 'N/A',
          avg_post_influences: 'N/A',
          avg_comments: 'N/A'
        },
        pricing: {
          direct_price: 'N/A'
        }
      },
    };
  },
  created() {
    let totalParams = {}
    this.type = Number(this.$route.query.type)
    totalParams.profile_id = this.$route.params.id
    if (Number(this.$route.query.type) === 0) {
      // kolWeixinSocial weibo
      this.kolWeiboSocial(totalParams)
    }
    if (Number(this.$route.query.type) === 1) {
      // kolWeixinSocial
      this.kolWeixinSocial(totalParams);
    }
  },
  methods: {
    // kolWeixinSocial
    kolWeiboSocial(params) {
      const _that = this;
      axios
        .post(apiConfig.kolWeiboSocial, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.dataListBox = res.data;
            if (!_that.dataListBox.pricing) {
              _that.dataListBox.pricing = {};
              _that.dataListBox.pricing.direct_price = ' N/A';
            }
            if (_that.dataListBox.fans_number === '') {
              _that.dataListBox.fans_number = ' N/A';
            }
            if (_that.dataListBox.stats.avg_shares === '') {
              _that.dataListBox.stats.avg_shares = ' N/A';
            }
            if (_that.dataListBox.stats.avg_likes === '') {
              _that.dataListBox.stats.avg_likes = ' N/A';
            }
            if (_that.dataListBox.stats.avg_comments === '') {
              _that.dataListBox.stats.avg_comments = ' N/A';
            }
            if (_that.dataListBox.stats.avg_daily_posts === ' N/A') {
              _that.dataListBox.stats.avg_daily_posts = ' N/A';
            }
            if (_that.dataListBox.stats.avg_post_influences === '') {
              _that.dataListBox.stats.avg_post_influences = ' N/A';
            }
            _that.dataListBox.platform = 'weibo';
            _that.dataListBox.pricing.direct_price =
              '¥' +
              commonJs.threeFormatter(
                _that.dataListBox.pricing.direct_price,
                2
              );
          }
        })
        .catch(function(error) {
          // console.log(error)
        });
    },
    // kolWeixinSocial
    kolWeixinSocial(params) {
      const _that = this;
      axios
        .post(apiConfig.kolWeixinSocial, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('wishiweixn', res)
            _that.dataListBox = res.data;
            if (!_that.dataListBox.pricing) {
              _that.dataListBox.pricing = {};
              _that.dataListBox.pricing.direct_price = ' N/A';
            }
            if (_that.dataListBox.status === 'error') {
              _that.dataListBox.stats = {};
              _that.dataListBox.stats.avg_shares = ' N/A';
              _that.dataListBox.stats.avg_likes = ' N/A';
              _that.dataListBox.stats.avg_reads = ' N/A';
              _that.dataListBox.stats.avg_daily_posts = ' N/A';
              _that.dataListBox.stats.avg_post_influences = ' N/A';
              _that.dataListBox.stats.avg_comments = ' N/A';
            }
            if (_that.dataListBox.fans_number === '') {
              _that.dataListBox.fans_number = ' N/A';
            }
            if (!_that.dataListBox.stats.avg_shares) {
              _that.dataListBox.stats.avg_shares = ' N/A';
            }
            if (_that.dataListBox.stats.avg_likes === '') {
              _that.dataListBox.stats.avg_likes = ' N/A';
            }
            if (!_that.dataListBox.stats.avg_comments) {
              _that.dataListBox.stats.avg_comments = ' N/A';
            }
            if (_that.dataListBox.stats.avg_daily_posts === '') {
              _that.dataListBox.stats.avg_daily_posts = ' N/A';
            }
            if (_that.dataListBox.stats.avg_post_influences === '') {
              _that.dataListBox.stats.avg_post_influences = ' N/A';
            }
            _that.dataListBox.platform = 'weixin';
            _that.dataListBox.pricing.direct_price =
              '¥' +
              commonJs.threeFormatter(
                _that.dataListBox.pricing.direct_price,
                2
              );
          }
        })
        .catch(function(error) {
          // console.log(error)
        });
    },
  },
  computed: {
    ...mapState(['authorization'])
  }
};
</script>
<style>
</style>