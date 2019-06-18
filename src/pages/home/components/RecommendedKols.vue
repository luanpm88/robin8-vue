<template>
  <div class="panel default-panel home-top-post">
    <div class="panel-head">
      <h5 class="title">{{$t('lang.homePage.recommend.title')}}</h5>
    </div>

    <default-tabs
      :tabList="tabList"
      :tabIndex="tabIndex"
      @changeTab="changeTab"
    >
      <div class="panel-body list-content">
        <div class="list-content-inner">
          <table v-if="isKol" class="default-table">
            <thead>
              <tr>
                <th width="60%"></th>
                <th width="20%" class="text-center small">
                  <p>Influence</p>
                  <p>Score</p>
                </th>
                <th width="20%" class="text-center small">
                  <p>Trust</p>
                  <p>Index</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in currentList">
                <td>
                  <kols-list-item
                    :key="item.profile_id"
                    :renderStatus="kolRenderStatus"
                    :renderData="item"
                    :routerData="kolRouterData"
                  ></kols-list-item>
                </td>
                <td class="text-center small">
                  <p v-if="kolRenderStatus.type === 0">{{item.avg_post_influences}}</p>
                  <p v-else>Coming<br/>Soon</p>
                </td>
                <td class="text-center small">Coming<br/>Soon</td>
              </tr>
            </tbody>
          </table>
          <div class="nonetip" v-if="isBrandShow">
            <span>{{$t('lang.homePage.noBrand')}}</span>
          </div>
          <div class="nonetip" v-if="isShow">
            <span>{{$t('lang.totalNoDataTip')}}</span>
          </div>
          <div class="r8-loading" v-if="isLoading">
            <a-spin tip="Loading..."/>
          </div>
        </div>
      </div>

      <div class="panel-foot">
        <button
          type="button"
          class="btn btn-sm btn-block btn-cyan"
          @click="toKolDetailMore"
        >
          {{$t('lang.more')}}
        </button>
      </div>
    </default-tabs>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import DefaultTabs from '@components/DefaultTabs'
import KolsListItem from '@components/KolsListItem'
import { mapState } from 'vuex'

export default {
  props: ['childKeyList', 'isSelectBrand'],
  components: {
    DefaultTabs,
    KolsListItem
  },
  data() {
    return {
      isBrandShow: false,
      kolRenderStatus: {
        hasLiked: false,
        hasMsg: false,
        hasChecked: false,
        hasInflunce: true,
        hasCart: false,
        hasDelete: false,
        type: 0,
      },
      kolRouterData: {
        type: '',
        keywords: ''
      },
      tabIndex: 0,
      isShow: false,
      isLoading: true,
      isKol: false,
      params: {
        start_date: commonJs.cPastYears,
        end_date: commonJs.cPastOneday,
        brand_keywords: '',
        order_by: 'influence'
      },
      currentList: [],
      tabList: [
        {
          index: 0,
          name: ('weibo'),
          iconClass: 'weibo'
        },
        {
          index: 1,
          name: ('wechat'),
          iconClass: 'wechat'
        }
      ]
    }
  },
  computed: {
    ...mapState(['authorization'])
  },
  watch: {
    childKeyList: {
      handler() {
        if (this.isSelectBrand) {
          // console.log('woshiyou watch 有品牌')
          // console.log(this.childKeyList.brand_keywords)
          this.isBrandShow = false
          this.isShow = false
          this.isLoading = true
          this.isKol = false
          if (this.childKeyList.brand_keywords !== '') {
            let newKey = ''
            this.childKeyList.brand_keywords.split(',').forEach(item => {
              newKey += '"' + item.replace(/^\s+|\s+$/g, '') + '" '
            })
            this.params.brand_keywords = newKey
            // 传给当前列 kolsListItem.vue 的值 传原始的 this.childKeyList.brand_keywords 因为在 kolsListItem.vue中会再次传给detail detail 再做截取的判断
            this.kolRouterData.keywords = this.childKeyList.brand_keywords
            if (Number(this.tabIndex) === 0) {
              // weibo
              this.weiboKol(this.params)
            }
            if (Number(this.tabIndex) === 1) {
              // 微信接口
              this.weixinKol(this.params)
            }
          }
        } else {
          // console.log('woshiyou watch无品牌')
          this.tabIndex = 0
          this.isBrandShow = true
          this.isLoading = false
          this.isShow = false
          this.isKol = false
        }
      },
      immediate:true,
      deep: true
    }
  },
  created() {},
  methods: {
    changeTab(tab) {
      this.tabIndex = tab.index
      this.kolRenderStatus.type = tab.index
      this.currentList = []
      this.isShow = false
      this.isLoading = true
      this.isBrandShow = false
      if (this.isSelectBrand) {
        if (tab.index === 0) {
          // 微博接口
          this.weiboKol(this.params)
        }
        if (tab.index === 1) {
          // 微信接口
          this.weixinKol(this.params)
        }
      } else {
        this.isBrandShow = true
        this.isLoading = false
        this.isKol = false
      }
      this.kolRouterData.type = tab.index
    },
    // 跳转kol list
    toKolDetailMore() {
      this.$router.push({
        path: '/kol/list',
        name: 'KolList',
        query: {
          brand_keywords: this.childKeyList.brand_keywords,
          type: this.tabIndex
        }
      })
    },
    // 微博的接口
    weiboKol(params) {
      const _that = this
      axios
        .post(apiConfig.kolsWeibo, params, {
          headers: {
            'Authorization': _that.authorization
          }
        })
        .then(function(res) {
          _that.isLoading = false
          if (res.data.length === 0 || !res.data.length) {
            _that.isShow = true
            _that.isBrandShow = false
            _that.isKol = false
          } else {
            _that.isShow = false
            _that.isBrandShow = false
            _that.isKol = true
            _that.currentList = res.data.slice(0, 5)
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    },
    // 微信的接口
    weixinKol(params) {
      const _that = this
      axios
        .post(apiConfig.kolsWeixin, params, {
          headers: {
            'Authorization': _that.authorization
          }
        })
        .then(function(res) {
          _that.isLoading = false
          if (res.data.length === 0 || !res.data.length) {
            _that.isShow = true
            _that.isKol = false
          } else {
            _that.isShow = false
            _that.isKol = true
            _that.currentList = res.data.slice(0, 5)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  },
  mounted () {
    this.kolRouterData.type = this.tabIndex
  }
}
</script>

<style lang="scss" scoped>
.home-top-post /deep/ .tab-label {
  margin-bottom: 10px;
}
.list-content {
  padding: 10px 0;
  height: 400px;
  overflow: hidden;
  @include respond-to(mobile) {
    height: auto;
  }
  .kols-list-item {
    &:after {
      height: 2px;
      background-color: #e1e8ea;
    }
    &:last-child:after {
      background-color: transparent;
    }
  }
}
.list-content-inner {
  height: 380px;
  padding: 0 20px;
  overflow-y: auto;
  @include respond-to(mobile) {
    height: auto;
  }
  .default-table {
    th {
      padding: 0;
      font-weight: bold;
      background-color: transparent;
    }
    .small {
      font-size: 1.2rem;
    }
    td {
      padding: 0;
    }
  }
}
</style>
