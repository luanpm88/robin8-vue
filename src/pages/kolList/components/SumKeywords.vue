<!-- detail.vue 中summary的 Keywords  -->
<template>
  <div>
    <!-- Keywords-->
		<div class="panel default-panel mt20">
			<div class="panel-head">
				<h5 class="title">
					<a-tooltip placement="topLeft" :title="$t('lang.kolList.detail.keywordsTip')">
						{{$t('lang.kolList.detail.keywords')}}
					</a-tooltip>
				</h5>
			</div>
			<div class="panel-body prl30">
				<div class="nonetip" v-if="isShow">
					<span>{{$t('lang.totalNoDataTip')}}</span>
				</div>
				<div class="r8-loading" v-if="isLoading">
					<a-spin tip="Loading..."/>
				</div>
				<cloud v-if="isTag" :defaultWords="parentTags" :height="wordHeight"></cloud>
			</div>
		</div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import { mapState } from 'vuex'
import commonJs from '@javascripts/common.js'
import cloud from "@components/Chart/chatCloud"
export default {
	name: 'SumKeywords',
  components: {
    cloud
  },
  data() {
    return {
			isShow: false,
      isLoading: true,
			isTag: false,
			parentTags: [],
			wordHeight: '400px'
    }
  },
  created() {
		let totalParams = {}
		totalParams.profile_id = this.$route.params.id
		if (this.$i18n.locale === 'zh-CN') {
			totalParams.language = 'zh'
		}
		if (this.$i18n.locale === 'en-US') {
			totalParams.language = 'en'
		}
    if (Number(this.$route.query.type) === 0) {
			this.kolWeiboKeyword(totalParams)
		}
		if (Number(this.$route.query.type) === 1) {
			this.kolWeiXinKeyword(totalParams)
    }
  },
  methods: {
		// 切换中英文 单独环keyword
    changeKeyWord(language) {
      let totalParams = {}
      totalParams.language = language
      this.isLoading = true
      this.isTag = false
      this.isShow = false
      if (Number(this.$route.query.type) === 0) {
        // 微博相关接口
        totalParams.profile_id = Number(this.$route.params.id)
        this.kolWeiboKeyword(totalParams)
      }
      if (Number(this.$route.query.type) === 1) {
        // 微信相关接口
        totalParams.profile_id = this.$route.params.id
        this.kolWeiXinKeyword(totalParams)
      }
    },
		// Keyword weibo
    kolWeiboKeyword(params) {
      const _that = this
      axios
        .post(apiConfig.kolWeiboKeyword, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.isLoading = false
            if (res.data.length > 0) {
              _that.isTag = true
              _that.isShow = false
              _that.parentTags = []
              res.data = res.data.slice(0, 100)
              res.data.forEach(item => {
                item.name = item.text
                item.value = item.weight
              })
              _that.parentTags = res.data
            } else {
              _that.isTag = false
              _that.isShow = true
            }
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    kolWeiXinKeyword(params) {
      const _that = this
      axios
        .post(apiConfig.kolWeiXinKeyword, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.isLoading = false
            if (res.data.length > 0) {
              _that.isTag = true
              _that.isShow = false
              _that.parentTags = []
              res.data = res.data.slice(0, 100)
              res.data.forEach(item => {
                item.name = item.text
                item.value = item.weight
              })
              _that.parentTags = res.data
            } else {
              _that.isTag = false
              _that.isShow = true
            }
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    }
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
