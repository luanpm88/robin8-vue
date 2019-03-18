<template>
  <div class="panel default-panel home-top-post">
    <div class="panel-head">
      <h5 class="title purple">
        <span class="iconfont icon-rocket"></span>
        {{$t('lang.homePage.recommend.title')}}
      </h5>
    </div>

    <div class="panel-body list-content recommendkol">
      <div class="nonetip" v-if="isShow">
        <span>{{$t('lang.totalNoDataTip')}}</span>
      </div>
      <div class="r8-loading" v-if="isLoading">
        <a-spin tip="Loading..."/>
      </div>

      <default-tabs :tabList="tabList" :tabIndex="tabIndex" @changeTab="changeTab">
      </default-tabs>
        <div class="list-content-inner">
          <kols-list-item
            v-for="(item, index) in currentList"
            :key="item.profile_id"
            :renderStatus="kolRenderStatus"
            :renderData="item"
            :routerData="kolRouterData"
          ></kols-list-item>
        </div>
        <div class="text-center mt20">
          <button
            type="button"
            class="btn btn-sm btn-outline btn-circle btn-purple"
            @click="toKolDetailMore"
          >{{$t('lang.more')}}</button>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import apiConfig from "@/config"
import commonJs from '@javascripts/common.js'
import DefaultTabs from "@components/DefaultTabs"
import KolsListItem from '@components/KolsListItem'
import { mapState } from 'vuex'
export default {
  props: ['childKeyList'],
  components: {
    DefaultTabs,
    KolsListItem
  },
  data() {
    return {
      kolRenderStatus: {
        hasLiked: false,
        hasMsg: false,
        hasChecked: false,
        hasInflunce: true,
        hasCart: true,
        hasDelete: false
      },
      kolRouterData: {
        type: '',
        keywords: ''
      },
      tabIndex: 0,
      isShow: false,
      isLoading: true,
      params: {
        start_date: commonJs.cPastFourteenDays,
        end_date: commonJs.cPastOneday,
        brand_keywords: "BMW",
        order_by: "doc_count"
      },
      currentList: [],
      tabList: [
        {
          index: 0,
          name: () => this.$t('lang.weibo')
        },
        {
          index: 1,
          name: () => this.$t('lang.wechat')
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
        let newKey = '';
        this.childKeyList.brand_keywords.split(",").forEach(item => {
          newKey += '"' + item + '"'
        });
        this.params.brand_keywords = newKey
        this.weiboKol(this.params)
        this.kolRouterData.keywords = newKey
      },
      deep: true
    }
  },
  methods: {
    changeLangue() {
      // vuejs 监听本地localstrage变化

    },
    changeTab(tab) {
      this.tabIndex = tab.index
      this.currentList = [];
      this.isShow = false;
      this.isLoading = true;
      if (tab.index === 0) {
        // 微博接口
        this.weiboKol(this.params)
      } else {
        // 微信接口
        this.weixinKol(this.params)
      }
      this.kolRouterData.type = tab.index
    },
    // 跳转kol list
    toKolDetailMore() {
      this.$router.push({
        path: '/kol/list',
        name: 'KolList',
        params: {
          brand_keywords: this.childKeyList.brand_keywords,
          type: this.tabIndex
        }
      });
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
          } else {
            _that.isShow = false
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
          } else {
            _that.isShow = false
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
.home-top-post /deep/ .pills-btn {
  position: absolute;
  right: 30px;
  top: 16px;
}
.list-content {
  padding: 10px 20px 20px;
  height: 460px;
  overflow: hidden;
}
.list-content-inner {
  height: 380px;
  overflow-y: auto;
}
.kol-score{
  position: absolute;
  right: 30px;
  color: #333;
}
</style>
