<template>
  <div class="container clearfix">
    <div class="kol-detail clearfix">
      <div class="kol-detail-left col-xs-4">
        <!-- info -->
        <!-- kol 详情 -->
        <detail-side :currentKeywords="currentBrandKeywords" :currentName="currentBrandName" @otherSocial="giveOtherProp"></detail-side>
        <!-- industries 行业图表  暂时隐藏-->
        <industries v-if="type === 0"></industries>
      </div>
      <div class="kol-detail-right col-xs-8" v-if="type === 0 || type === 1">
        <!-- tab 平台切换 -->
        <default-tabs
          :tabList="tabList"
          :tabIndex="tabIndex"
          @changeTab="changeTab"
          class="panel-tab"
        ></default-tabs>
        <!-- summary 模块  -->
        <div class="mt20" v-show="tabIndex === 0">
          <summaries :currentKeywords="currentBrandKeywords" :currentName='currentBrandName'></summaries>
        </div>

        <!-- analytic 模块 -->
        <div class="mt20" v-if="tabIndex === 1">
          <analytics></analytics>
        </div>
        <!-- post 模块 目前已经隐藏-->
        <div class="mt20" v-if="tabIndex === 2">
          <posts></posts>
        </div>
      </div>
      <!-- 除了微信和微博  其他平台只展示 socialData 并且 展示的文案不一样 -->
      <div class="kol-detail-right col-xs-8" v-else>
        <!-- social data -->
        <other-socical :socialData="otherSocialDataList"></other-socical>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import store from '@/store'
import DefaultTabs from '@components/DefaultTabs'
import commonJs from '@javascripts/common.js'
import { mapState, mapMutations } from 'vuex'
// 左侧的 详情
import DetailSide from '@/pages/kolList/components/DetailSide'
// summary
import Summaries from '@/pages/kolList/sum/Index'
// analytics
import Analytics from '@/pages/kolList/analytic/Index'
// posts
import Posts from '@/pages/kolList/posts/Index'
// 左侧的 Industries 图表
import Industries from '@/pages/kolList/components/Industries'
// OtherPlatformSocical 除微信和微博 其他平台要展示的social data
import OtherSocical from '@/pages/kolList/components/OtherPlatformSocical'

export default {
  name: 'KolDetail',
  components: {
    DefaultTabs,
    Summaries,
    Analytics,
    Posts,
    Industries,
    DetailSide,
    OtherSocical
  },
  data() {
    return {
      tabIndex: 0,
      tabList: [
        {
          index: 0,
          name: 'kolList.detail.summary'
        }
        // ,
        // {
        //   index: 1,
        //   name: 'kolList.detail.analytics'
        // }
        // ,
        // {
        //   index: 2,
        //   name: 'kolList.detail.post'
        // }
      ],
      currentBrandName: 'N/A',
      currentBrandKeywords: '',
      otherSocialDataList: {}
    };
  },
  created () {
    this.type = Number(this.$route.query.type)
    // 获取brandName 和 key
    this.getBaseData()
  },
  computed: {
    ...mapState(['authorization'])
  },
  methods: {
    changeTab(tab) {
      this.tabIndex = tab.index
    },
    // 获取keyword brand name
    getBaseData() {
      const _that = this
      axios
        .get(apiConfig.baseInfosUrl, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            if (!res.data.competitors.length == 0) {
              res.data.trademarks_list.forEach(element => {
                if (element.status === 1) {
                  // console.log(element)
                  _that.currentBrandName = element.name
                  _that.currentBrandKeywords = element.keywords
                }
              })
            }
          }
        })
    },
    // 将detailSide 返回的其他平台数据传给 OtherPlatformSocical.vue 文件
    giveOtherProp(data) {
      // console.log(data)
      this.otherSocialDataList = data
    }
  },
  beforeRouteEnter (to, from, next) {
    axios.post(apiConfig.userLevelUrl, {}, {
      headers: {
        'Authorization': store.state.authorization
      }
    }).then(function (res) {
      let resData = res.data
      // console.log(resData)
      next(vm => {
        // console.log(to)
        // console.log(from)
        // console.log(vm)
        if (!resData.kol_detail) {
          alert(vm.$i18n.t('lang.kolDetailAlert'))
          vm.$router.push(from.fullPath)
        } else {
          vm.$router.push(to.fullPath)
        }
      })
    })
  }
}
</script>
<style lang="scss" scoped>

</style>
