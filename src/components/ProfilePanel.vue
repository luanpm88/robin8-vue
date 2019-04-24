<template>
  <div class="panel default-panel">
    <div class="panel-head">
      <div class="title-bar">
        <h5 class="title">{{$t('lang.wallet.rechargePage.profileTitle')}}</h5>
        <div class="tail-area">
          <router-link to="/settings/company_info">{{$t('lang.wallet.rechargePage.profileChange')}}</router-link>
        </div>
      </div>
    </div>
    <div class="panel-body">
      <div class="media user-info-panel">
        <div class="media-left">
          <div class="cover">
            <img :src="profileData.avatar_url" alt="" class="cover-img" />
          </div>
        </div>
        <div class="media-body media-middle content">
          <h5 class="title">{{$t('lang.profile.name')}}: {{profileData.name}}</h5>
          <p>{{$t('lang.profile.companyName')}}: {{profileData.campany_name}}</p>
          <p>{{$t('lang.profile.availAmount')}}: {{profileData.avail_amount}} ₫</p>
          <!-- <p>剩余积分: {{profileData.avail_amount}} 积分</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import { mapState } from 'vuex'

export default {
  name: 'ProfilePanel',
  data () {
    return {
      profileData: {}
    }
  },
  methods: {
    getProfileData () {
      axios.get(apiConfig.profileUrl, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleGetProfileDataSucc)
    },
    handleGetProfileDataSucc (res) {
      let resData = res.data
      if (res.status == 200 && resData) {
        console.log(resData)
        this.profileData = resData
      }
    }
  },
  mounted () {
    this.getProfileData()
  },
  computed: {
    ...mapState(['authorization'])
  }
}
</script>

<style lang="scss" scoped>
.user-info-panel {
  padding: 30px;
  .cover {
    position: relative;
    width: 120px;
    padding-bottom: 100%;
    overflow: hidden;
    .cover-img {
      position: absolute;
      top: 0;
      @include center(x);
      height: 100%;
    }
  }
  .content {
    padding: 20px;
    font-size: $font-nm;
    .title {
      margin-bottom: 10px;
      font-size: $font-lg-s;
      font-weight: normal;
    }
  }
}
</style>
