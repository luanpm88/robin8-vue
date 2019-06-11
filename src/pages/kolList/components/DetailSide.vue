<!-- detail.vue 中左侧详情  -->
<template>
  <div>
    <!-- DetailSide. -->
    <div class="panel default-panel kol-infobox">
      <div class="panel-body">
        <h5 class="title">{{$t('lang.kolList.detail.infoTit')}}</h5>
        <div class="media kol-dec">
          <div class="media-left media-middle">
            <div class="media-imgbox">
              <img :src="infoList.avatar_url" alt>
            </div>
          </div>
          <div class="media-body">
            <p>
              {{infoList.profile_name}}
            </p>
            <p>
              <i
                class="iconfont icon-male"
                v-if="infoList.gender == 'm' || infoList.gender == 'M'"
              ></i>
              <i
                class="iconfont icon-female"
                v-if="infoList.gender == 'f' || infoList.gender == 'F'"
              ></i>
              {{infoList.age}}
            </p>
            <p>
              <i class="iconfont icon-location"></i>
              {{infoList.region}}
            </p>
          </div>
        </div>
        <p class="kol-link-box">
          <a
            v-if="!!kolProfileLink && kolProfileLink != ''"
            :href="kolProfileLink"
            target="_blank"
            class="btn btn-xs btn-cyan btn-outline"
          >
            <span class="iconfont icon-user"></span>
            <!-- KOL Profile -->
            {{$t('lang.kolList.detail.kolProfile')}}
          </a>
          <button type="button" class="btn btn-xs btn-cyan" @click="doAddCart(infoList)">
            <span class="iconfont icon-cart"></span>
            <!-- Add to cart -->
            {{$t('lang.kolList.detail.addCart')}}
          </button>
        </p>
        <ul class="clearfix kol-sign">
          <li v-for="(item, index) in dec" :key="index">{{item}}</li>
        </ul>
        <div class="kol-brand" v-if="type === 0 || type === 1">
          <p class="clearfix">
            <span>{{$t('lang.kolList.detail.currentBrandName')}}</span>
            <b>{{currentName}}</b>
          </p>
          <p class="clearfix" v-if="type === 0 || type === 1">
            <span>
              <a-tooltip
                placement="topLeft"
                :title="$t('lang.kolList.detail.mentionsTip')"
              >{{$t('lang.kolList.detail.mentions')}}</a-tooltip>
            </span>
            <b>{{MentionsNum}}</b>
          </p>
          <p class="clearfix" v-if="type === 0 || type === 1">
            <span>
              <a-tooltip
                placement="topLeft"
                :title="$t('lang.kolList.detail.sentimentTip')"
              >{{$t('lang.kolList.detail.sentiment')}}</a-tooltip>
            </span>
            <b>{{Sentiment}}</b>
          </p>
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
  name: 'DetailSide',
  props: ['currentKeywords', 'currentName'],
  data() {
    return {
      type: 0,
      infoList: {
        avatar_url: "",
        profile_name: "-",
        profile_id: "",
        description_raw: "",
        age: "N/A",
        region: "N/A"
      },
      kolProfileLink: '',
      dec: [],
      decValue: [],
      decKey: [],
      Sentiment: 0,
      MentionsNum: 0,
      MentionsList: [],
      sentimentParams: {
        start_date: commonJs.cPastFourteenDays,
        end_date: commonJs.cPastOneday,
        brand_keywords: ""
      },
      trendParams: {
        start_date: commonJs.cPastFourteenDays,
        end_date: commonJs.cPastOneday,
        brand_keywords: "",
        type: "doc"
      },
      cartParams: {},
    }
  },
  created() {
    this.type = Number(this.$route.query.type)
  },
  watch: {
    currentKeywords: {
      handler() {
        // console.log(this.currentKeywords)
        // console.log(this.currentName)
        this.InitParams(this.currentKeywords, this.currentName)
      }
    }
  },
  methods: {
    // 返回给父组件
    backParentData(data) {
      // console.log('otherSocial', data)
      this.$emit('otherSocial', data)
    },
    // 初始化参数
    InitParams(currentKeywords, currentName) {
      let totalParams = {}
        // // 优先调用春明大佬给的kol info 当数据为空的时候调用fergus的接口
      // this.kolActivityUrl(totalParams)
      this.infoJoggle(totalParams)
      if (currentKeywords !== '') {
        let newKey = ""
        currentKeywords.split(",").forEach(item => {
          newKey += '"' + item + '" '
        })
        //
        this.trendParams.brand_keywords = newKey
        // 品牌情绪 计算参数
        this.sentimentParams.brand_keywords = newKey
      } else {
        this.trendParams.brand_keywords = ''
        this.sentimentParams.brand_keywords = ''
      }
      // 判断是哪个平台
      if (Number(this.$route.query.type) === 0) {
        // 微博相关接口
        totalParams.profile_id = Number(this.$route.params.id)
        // 计算sentiment
        this.sentimentWeibo(this.sentimentParams)
        // 计算Mentions
        this.trendsWeibo(this.trendParams)

      } else {
        if (Number(this.$route.query.type) === 1) {
          // 微信相关接口
          totalParams.profile_id = this.$route.params.id
          // 计算sentiment
          this.sentimentWeixin(this.sentimentParams)
          // 计算Mentions
          this.trendsWeixin(this.trendParams)
        } else {
          totalParams.profile_id = decodeURIComponent(
            decodeURIComponent(this.$route.params.id)
          )
        }
      }
    },
    // 初始化 fergus的info 接口
    infoJoggle(params) {
      const _that = this
      if (Number(_that.$route.query.type) === 0) {
        // 调用Fergus 微博info
        _that.kolWeiboInfo(params)
      }
      if (Number(_that.$route.query.type) === 1) {
        // 调用Fergus weixin info
        _that.kolWeiXinInfo(params)
      }
      if (Number(_that.$route.query.type) === 2) {
        // 调用Fergus xiaohongshu
        _that.kolXiaohongshuInfo(params)
      }
      if (Number(_that.$route.query.type) === 3) {
        // 调用Fergus kolKuaishouInfo
        _that.kolKuaishouInfo(params)
      }
      if (Number(_that.$route.query.type) === 4) {
        // 调用Fergus bilibili
        _that.kolBilibiliInfo(params)
      }
      if (Number(_that.$route.query.type) === 5) {
        // 调用Fergus douyin
        _that.kolDouyinInfo(params)
      }
      if (Number(_that.$route.query.type) === 6) {
        // 调用Fergus instagram
        _that.kolInstagramInfo(params)
      }
      if (Number(_that.$route.query.type) === 7) {
        // 调用Fergus Youtube
        _that.kolYoutubeInfo(params)
      }
      if (Number(_that.$route.query.type) === 8) {
        // 调用Fergus Facebook
        _that.kolFacebookInfo(params)
      }
    },
    // info 接口初始化
    infoDataInit(type, res) {
      // console.log(type, res)
      const _that = this
      // type = 0 微博
      // type = 1 微信
      // type = 2 xiaohongshu
      // type = 3 kuaishou
      // type = 4 bilibili
      // type = 5 douyin
      // type = 6 Instagram
      // type = 7 Youtube
      // type = 8 Facebook
      if (type === 1) {
        _that.infoList.avatar_url = res.data.avatar_url
        _that.infoList.profile_name = res.data.profile_name
        _that.infoList.profile_id = res.data.profile_id
        _that.infoList.description_raw = res.data.description_raw
        _that.infoList.gender = "-"

      } else {
        _that.infoList.avatar_url = res.data.avatar_url
        _that.infoList.profile_name = res.data.profile_name
        _that.infoList.profile_id = res.data.profile_id
        _that.infoList.description_raw = res.data.description_raw
        _that.infoList.gender = res.data.gender

        if (type !== 0) {
          this.backParentData(res)
        }
      }
      if (type === 1 || type === 0) {
        // 处理标签
        _that.decValue = Object.values(res.data.industries)
        _that.decKey = Object.keys(res.data.industries)
        _that.decValue.forEach((item, index) => {
          item.keyName = _that.decKey[index]
        })
        // console.log(_that.decValue)
        _that.decValue.forEach((item, index) => {
          if (item.n_posts >= 1) {
            _that.dec.push(item.keyName)
          }
        })
      }
    },
    // info 微博的接口
    kolWeiboInfo(params) {
      const _that = this
      axios
        .post(apiConfig.kolWeiboInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // 处理数据
            _that.infoDataInit(0, res)
            _that.kolProfileLink = 'https://weibo.com/u/'+ res.data.profile_id
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // info weixin的接口
    kolWeiXinInfo(params) {
      const _that = this
      axios
        .post(apiConfig.kolWeiXinInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // 处理数据
            _that.infoDataInit(1, res)
            _that.kolProfileLink = ''
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // info xiaohongshu的接口
    kolXiaohongshuInfo(params) {
      const _that = this
      axios
        .post(apiConfig.kolXiaohongshuInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // 处理数据
            _that.infoDataInit(2, res)
            // 操作social data 数据
            _that.otherSocialData.platform = "xiaohongshu"
            _that.kolProfileLink = 'https://www.xiaohongshu.com/user/profile/'+ res.data.profile_id
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // info kolKuaishouInfo的接口
    kolKuaishouInfo(params) {
      const _that = this
      axios
        .post(apiConfig.kolKuaishouInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          // console.log('kolKuaishouInfo', res)
          if (res.status === 200) {
            // 处理数据
            _that.infoDataInit(3, res)
            // 操作social data 数据
            _that.otherSocialData.platform = "kuaishou"
            _that.kolProfileLink = ''
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // info kolBilibiliInfo的接口
    kolBilibiliInfo(params) {
      const _that = this
      axios
        .post(apiConfig.kolBilibiliInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // 处理数据
            _that.infoDataInit(4, res)
            // 操作social data 数据
            _that.otherSocialData.platform = "bilibili"
            _that.kolProfileLink = 'https://space.bilibili.com/'+ res.data.profile_id
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // info kolDouyinInfo的接口
    kolDouyinInfo(params) {
      const _that = this
      axios
        .post(apiConfig.kolDouyinInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.infoDataInit(5, res)
            // 操作social data 数据
            _that.otherSocialData.platform = "douyin"
            _that.kolProfileLink = ''
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // info kolInstagramInfo的接口
    kolInstagramInfo(params) {
      const _that = this
      axios
        .post(apiConfig.kolInstagramInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.infoDataInit(6, res)
            // 操作social data 数据
            _that.otherSocialData.platform = "instagram"
            _that.kolProfileLink = 'https://www.instagram.com/'+ res.data.profile_id
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // info kolYoutubeInfo的接口
    kolYoutubeInfo(params) {
      const _that = this
      axios
        .post(apiConfig.kolYoutubeInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            console.log(res)
            _that.infoDataInit(7, res)
            // 操作social data 数据
            _that.otherSocialData.platform = "youtube"
            _that.kolProfileLink = 'https://www.youtube.com/'+ res.data.profile_id
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // info kolFacebookInfo的接口
    kolFacebookInfo(params) {
      const _that = this
      axios
        .post(apiConfig.kolFacebookInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.infoDataInit(8, res)
            // 操作social data 数据
            _that.otherSocialData.platform = "facebook"
            _that.kolProfileLink = 'https://www.facebook.com/'+ res.data.profile_id
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // sentiment 微博
    sentimentWeibo(params) {
      const _that = this
      axios
        .post(apiConfig.sentimentWeibo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          _that.Sentiment = res.data.data[0]
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // sentiment 微信
    sentimentWeixin(params) {
      const _that = this
      axios
        .post(apiConfig.sentimentWeixin, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          _that.Sentiment = res.data.data[0]
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // trend 微博
    trendsWeibo(params) {
      const _that = this
      axios
        .post(apiConfig.trendsWeibo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.MentionsList = res.data.data.slice(
              res.data.data.length - 8,
              res.data.data.length - 1
            )
            _that.MentionsList.forEach(item => {
              _that.MentionsNum += parseInt(item)
            })
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // trend 微信
    trendsWeixin(params) {
      const _that = this
      axios
        .post(apiConfig.trendsWeixin, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.MentionsList = res.data.data.slice(
              res.data.data.length - 8,
              res.data.data.length - 1
            )
            _that.MentionsList.forEach(item => {
              _that.MentionsNum += parseInt(item)
            })
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // 加入购物车
    doAddCart(data) {
      this.cartParams.profile_id = data.profile_id
      this.cartParams.profile_name = data.profile_name
      this.cartParams.avatar_url = data.avatar_url
      this.cartParams.description_raw = data.description_raw
      axios
        .post(apiConfig.kolCollectUrl, this.cartParams, {
          headers: {
            Authorization: this.authorization
          }
        })
        .then(this.handleDoAddCartSucc)
    },
    handleDoAddCartSucc(res) {
      let resData = res.data
      if (res.status == 201) {
        if (resData.error == 1) {
          alert(resData.detail)
          return false
        }
        alert(this.$t('lang.cartSuccess'))
      }
    },
    // activity analytics 还有info 假如没有info 调用 Fergus的info 接口 ---- 目前平台没有在这边，所以只用了 fergus初始化的接口
    kolActivityUrl(params) {
      const _that = this
      console
      axios
        .get(
          apiConfig.kolActivityUrl +
            "/" +
            this.$route.params.id.replace(/\./g, "\\/") +
            "/big_v_details",
          params,
          {
            headers: {
              Authorization: _that.authorization
            }
          }
        )
        .then(function(res) {
          if (res.status === 200) {
            if (res.data.data === null) {
              if (Number(_that.$route.query.type) === 0) {
                // 调用Fergus 微博info
                _that.kolWeiboInfo(params)
              }
              if (Number(_that.$route.query.type) === 1) {
                // 调用Fergus weixin info
                _that.kolWeiXinInfo(params)
              }
              if (Number(_that.$route.query.type) === 2) {
                // 调用Fergus xiaohongshu
                _that.kolXiaohongshuInfo(params)
              }
              if (Number(_that.$route.query.type) === 3) {
                // 调用Fergus kolKuaishouInfo
                _that.kolKuaishouInfo(params)
              }
              if (Number(_that.$route.query.type) === 4) {
                // 调用Fergus bilibili
                _that.kolBilibiliInfo(params)
              }
              if (Number(_that.$route.query.type) === 5) {
                // 调用Fergus douyin
                _that.kolDouyinInfo(params)
              }
              if (Number(_that.$route.query.type) === 6) {
                // 调用Fergus instagram
                _that.kolInstagramInfo(params)
              }
              if (Number(_that.$route.query.type) === 7) {
                // 调用Fergus Youtube
                _that.kolYoutubeInfo(params)
              }
              if (Number(_that.$route.query.type) === 8) {
                // 调用Fergus Facebook
                _that.kolFacebookInfo(params)
              }
            } else {
              _that.infoList.img = res.data.data.avatar_url
              _that.infoList.name = res.data.data.profile_name
              _that.infoList.gender = "-"
              _that.dec = res.data.data.industries
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
<style>
</style>
