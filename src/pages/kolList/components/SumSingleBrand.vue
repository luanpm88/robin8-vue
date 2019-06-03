<!-- detail.vue 中summary的 single Brand  tag  -->
<template>
  <div>
    <!-- SumSingleBrand -->
		<div class="panel default-panel mt20" v-if="isSingleBrand">
      <div class="panel-head">
        <h5 class="title">{{$t('lang.kolList.detail.allBrandTag')}}
          - {{brandName}}
          </h5>
      </div>
      <div class="panel-body prl30">
        <div class="nonetip" v-if="isbrandDisShow">
          <span>{{$t('lang.brandDisNoDataTip')}}</span>
        </div>
        <div class="r8-loading" v-if="isbrandDisLoading">
          <a-spin tip="Loading..."/>
        </div>
        <cloud v-if="isbrandDisTag" :defaultWords="parentbrandDisTags" :height="wordHeight"></cloud>
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
  name: 'SumSingleBrand',
  props: ['brandKey', 'brandName'],
  components: {
    cloud
  },
  data() {
    return {
      brandNameParams: {
        profile_id: '',
        start_date: commonJs.cPastYears,
        end_date: commonJs.cPastOneday,
        brand_keywords: '',
        type: '',
        language: 'en'
      },
      isSingleBrand: true,
      isbrandDisShow: false,
      isbrandDisLoading: true,
      isbrandDisTag: false,
      parentbrandDisTags: [],
      wordHeight: '400px',
      keywords: ''
    }
  },
  created() {
  },
  methods: {
		// 切换中英文 单独环keyword
    changeKeyWord(language) {
      this.InitParams(language)
    },
    // 初始化参数
    InitParams (language) {
      if (this.brandKey != '') {
          // console.log('1 我是刚进来有brandKey', this.brandKey)
          let newKey = ""
          this.brandKey.split(",").forEach(item => {
            newKey += '"' + item + '" '
          })
          if (language) {
            // 当 有 langue 的时候 证明是在 切换中英文
            this.brandNameParams.language = language
            this.isSingleBrand = true
            this.isbrandDisLoading = true
            this.isbrandDisTag = false
            this.isbrandDisShow = false
          } else {
            if (this.$i18n.locale === 'zh-CN') {
              this.brandNameParams.language = 'zh'
            }
            if (this.$i18n.locale === 'en-US') {
              this.brandNameParams.language = 'en'
            }
          }
          this.brandNameParams.brand_keywords = newKey
          this.brandNameParams.profile_id = this.$route.params.id
          if (Number(this.$route.query.type) === 0) {
            // 调用微博 all 品牌 标签接口
            this.detailWeiboBrandName(this.brandNameParams)
          }
          if (Number(this.$route.query.type) === 1) {
            // 调用微信品牌名字接口
            this.detailWeixinBrandName(this.brandNameParams)
          }
        } else {
          // console.log('1 我是刚进来没有brandKey', this.brandKey)
          this.isbrandDisTag = false
          this.isbrandDisShow = false
          this.isSingleBrand = false
        }
    },
		// 获取My brandname 单个品牌标签 微博页面
    detailWeiboBrandName(params) {
      // console.log('weibo', params)
      const _that = this
      axios
        .post(apiConfig.detailWeiboBrandName, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          // console.log('weibo bran dis', res)
          if (res.status === 200) {
            _that.isbrandDisLoading = false
            if (res.data.data.length > 0) {
              _that.isbrandDisTag = true
              _that.isbrandDisShow = false
              _that.parentbrandDisTags = []
              res.data.data.forEach(item => {
                item.name = item.text
                item.value = item.weight
              })
              _that.parentbrandDisTags = res.data.data.slice(0, 100)
            } else {
              _that.isbrandDisTag = false
              _that.isbrandDisShow = true
              _that.isSingleBrand = false
            }
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    // 获取My brandname 单个品牌标签 微信页面
    detailWeixinBrandName(params) {
      // console.log('weixin', params)
      const _that = this
      axios
        .post(apiConfig.detailWeixinBrandName, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.isbrandDisLoading = false
            if (res.data.data.length > 0) {
              _that.isbrandDisTag = true
              _that.isbrandDisShow = false
              _that.parentbrandDisTags = []
              res.data.data.forEach(item => {
                item.name = item.text
                item.value = item.weight
              })
              _that.parentbrandDisTags = res.data.data.slice(0, 100)
            } else {
              _that.isbrandDisTag = false
              _that.isbrandDisShow = true
              _that.isSingleBrand = false
            }
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
  },

	watch: {
    brandKey: {
      handler () {
        this.InitParams()
      }
    },
    listenLangue: function(old, newd) {
      if (old === 'zh-CN') {
        this.changeKeyWord('zh')
      }
      if (old === 'en-US') {
        this.changeKeyWord('en')
      }
    },
  },
  computed: {
		...mapState(['authorization', 'language']),
		listenLangue() {
      return this.language
    },
  }
}
</script>
<style>
</style>
