<!-- detail.vue 中 其他平台social data 表格数据  -->
<template>
  <div>
    <!-- OtherPlatformSocical -->
    <div class="panel default-panel mt20">
      <div class="panel-body prl30">
        <p class="kol-cloumn">{{$t('lang.kolList.detail.otherSocialData.title')}}</p>
        <div class="activity-table">
          <table class="com-brand-table">
            <tr>
              <th>{{$t('lang.kolList.detail.otherSocialData.platform')}}</th>
              <th>{{$t('lang.kolList.detail.otherSocialData.gender')}}</th>
              <th>{{$t('lang.kolList.detail.otherSocialData.price')}}</th>
              <th>{{$t('lang.kolList.detail.otherSocialData.followers')}}</th>
              <th>{{$t('lang.kolList.detail.otherSocialData.tagsDescription')}}</th>
            </tr>
            <tr>
              <td>{{otherSocialData.platform}}</td>
              <td v-if="otherSocialData.gender">{{otherSocialData.gender}}</td>
              <td v-else>N/A</td>
              <td>{{otherSocialData.price}}</td>
              <td>{{otherSocialData.followers}}</td>
              <td>{{otherSocialData.tagsDescription}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonJs from '@javascripts/common.js'
export default {
  name: 'OtherPlatformSocical',
  props: ['socialData'],
  data() {
    return {
      otherSocialData: {
        platform: "N/A",
        gender: "N/A",
        price: "N/A",
        followers: "N/A",
        tagsDescription: "N/A"
      },
    }
  },
  created() {},
  watch: {
    socialData: {
      handler() {
        // console.log(this.socialData)
        this.rendering(this.socialData)
      }
    }
  },
  methods: {
    // 将detail。vue 页面传过来的值 渲染到页面上面
    rendering(res) {
      this.otherSocialData.gender = res.data.gender
      if (res.data.pricing.ref_price) {
        this.otherSocialData.price =
          "¥ " + commonJs.threeFormatter(res.data.pricing.ref_price, 2)
      }
      if (res.data.fans_number) {
        this.otherSocialData.followers = res.data.fans_number
      }
      if (res.data.tags_description) {
        this.otherSocialData.tagsDescription = res.data.tags_description
      }
    }
  }
}
</script>
<style>
</style>