<!--  -->
<template>
  <div>
    <div class="media compare-info">
      <div class="media-left media-middle">
        <img
          :src="profileData.avatar_url"
          alt
        >
      </div>
      <div class="media-body media-middle">
        <p>{{$t('lang.kolCompare.name')}}: <b>{{profileData.profile_name}}</b></p>
        <p>{{$t('lang.kolCompare.id')}}:{{profileData.profile_id}}</p>
          <a-tooltip placement="topLeft" :title="profileData.description_raw">
          <p class="desc">{{$t('lang.kolCompare.dec')}}:{{profileData.description_raw}}</p>
        </a-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import { mapState } from 'vuex'
export default {
  name: 'kolInfo',
  props: ['currentType', 'currentId'],
  data() {
    return {
      profileData: [],
      infoParams: {
        profile_id: ''
      }
    };
  },
  created() {
    this.infoParams.profile_id = this.currentId
    if (Number(this.currentType) === 0) {
      // performance
      this.kolWeiboInfo(this.infoParams);
    }
    if (Number(this.currentType) === 1) {
      // 微信
      this.kolWeiXinInfo(this.infoParams)
    }
  },
  computed: {
    ...mapState(['authorization'])
  },
  methods: {
    // weibo info
    kolWeiboInfo(params) {
      const _that = this;
      axios
        .post(apiConfig.kolWeiboInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('weibo', res)
            _that.profileData = res.data;
          }
        });
    },
    // weixin info
    kolWeiXinInfo(params) {
      const _that = this;
      axios
        .post(apiConfig.kolWeiXinInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('woshiweixin', res)
            _that.profileData = res.data;
          }
        });
    }
  }
};
</script>
<style>
</style>