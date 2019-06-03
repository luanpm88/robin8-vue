<!-- detail.vue 中summary的 all Brand  tag  -->
<template>
  <div>
    <!-- all Brand  tag-->
		<div class="panel default-panel mt20" v-if=" allBrand">
      <div class="panel-head">
        <h5 class="title">{{$t('lang.kolList.detail.allBrandTag')}}</h5>
      </div>
      <div class="panel-body prl30">
        <div class="nonetip" v-if="isAllbrandDisShow">
          <span>{{$t('lang.totalNoDataTip')}}</span>
        </div>
        <div class="r8-loading" v-if="isAllbrandDisLoading">
          <a-spin tip="Loading..."/>
        </div>
        <cloud v-if="isAllbrandDisTag" :defaultWords="allbrandDisTags" :height="wordHeight"></cloud>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import { mapState } from 'vuex'
import commonJs from '@javascripts/common.js'
import cloud from '@components/Chart/chatCloud'
export default {
	name: 'SumAllBrand',
  components: {
    cloud
  },
  data() {
    return {
      allBrandTagParams: {
        start_date: commonJs.cPastYears,
        end_date: commonJs.cPastOneday,
        profile_id: '',
        language: 'en'
      },
      allBrand: true,
      isAllbrandDisLoading: true,
      isAllbrandDisShow: false,
      isAllbrandDisTag: false,
      allbrandDisTags: [],
			wordHeight: '400px'
    }
  },
  created() {
		if (this.$i18n.locale === 'zh-CN') {
			this.allBrandTagParams.language = 'zh'
		}
		if (this.$i18n.locale === 'en-US') {
			this.allBrandTagParams.language = 'en'
		}
    if (Number(this.$route.query.type) === 0) {
			// 调用微博 all 品牌 标签接口
      this.allBrandTagParams.profile_id = Number(this.$route.params.id)
      this.detailWeiboTotalTag(this.allBrandTagParams)
		}
		if (Number(this.$route.query.type) === 1) {
			// 调用weixin all 品牌 标签接口
      this.allBrandTagParams.profile_id = this.$route.params.id
      this.detailWeixinTotalTag(this.allBrandTagParams)
    }
  },
  methods: {
		// 切换中英文 单独环keyword
    changeKeyWord(language) {
      this.allBrandTagParams.language = language
      this.allBrand = true
      this.isAllbrandDisLoading = true
      this.isAllbrandDisTag = false
      this.isAllbrandDisShow = false
      if (Number(this.$route.query.type) === 0) {
        // 调用微博 all 品牌 标签接口
        this.allBrandTagParams.profile_id = Number(this.$route.params.id)
        this.detailWeiboTotalTag(this.allBrandTagParams)
      }
      if (Number(this.$route.query.type) === 1) {
        // 调用weixin all 品牌 标签接口
        this.allBrandTagParams.profile_id = this.$route.params.id
        this.detailWeixinTotalTag(this.allBrandTagParams)
      }
    },
		// 获取Weibo total品牌标签接口
    detailWeiboTotalTag(params) {
      const _that = this
      axios
        .post(apiConfig.detailWeiboTotalTag, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.isAllbrandDisLoading = false
            if (res.data.data.length > 0) {
              _that.isAllbrandDisTag = true
              _that.isAllbrandDisShow = false
              _that.allbrandDisTags = []
              res.data.data.forEach(item => {
                item.name = item.text
                item.value = item.weight
              })
              _that.allbrandDisTags = res.data.data.slice(0, 100)
            } else {
              _that.isAllbrandDisTag = false
              _that.isAllbrandDisShow = true
              _that.allBrand = false
            }
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },

    // 获取Weixin total品牌标签接口
    detailWeixinTotalTag(params) {
      const _that = this
      axios
        .post(apiConfig.detailWeixinTotalTag, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.isAllbrandDisLoading = false
            if (res.data.data.length > 0) {
              _that.isAllbrandDisTag = true
              _that.isAllbrandDisShow = false
              _that.allbrandDisTags = []
              res.data.data.forEach(item => {
                item.name = item.text
                item.value = item.weight
              })
              _that.allbrandDisTags = res.data.data.slice(0, 100)
            } else {
              _that.isAllbrandDisTag = false
              _that.isAllbrandDisShow = true
              _that.allBrand = false
            }
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
	},
	watch: {
    listenLangue: function(old, newd) {
      if (old === 'zh-CN') {
        this.changeKeyWord('zh')
      }
      if (old === 'en-US') {
        this.changeKeyWord('en')
      }
    }
  },
  computed: {
		...mapState(['authorization', 'language']),
		listenLangue() {
      return this.language
    }
  }
}
</script>
<style>
</style>
