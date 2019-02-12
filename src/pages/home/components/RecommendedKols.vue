<template>
  <div class="panel default-panel home-top-post">
    <div class="panel-head">
      <h5 class="title purple">
        <span class="iconfont icon-rocket"></span>
        Recommended KOLs
      </h5>
    </div>

    <div class="panel-body list-content">
      <span class="kol-score">Influence Score</span>
      <default-tabs :tabList="tabList" :tabIndex="tabIndex" @changeTab="changeTab">
        <div class="list-content-inner">
          <kols-list-item
            v-for="(item, index) in currentList"
            :key="index"
            :hasLiked="kolHasLiked"
            :hasInflunce="KolHasInflunce"
            :hasMsg="kolHasMsg"
            :hasChecked="kolHasChecked"
            :renderData="item"
            @detail="intoKolDetail"
          ></kols-list-item>
        </div>
        <div class="text-center mt20">
          <button
            type="button"
            class="btn btn-sm btn-outline btn-circle btn-purple"
            @click="intoKolDetailMore"
          >查看更多</button>
        </div>
      </default-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import apiConfig from "@/config"
import commonJs from '@javascripts/common.js'
import DefaultTabs from "@components/DefaultTabs"
import KolsListItem from "@/pages/creations/components/KolsListItem"
import { mapState } from 'vuex'
export default {
  props: ['childKeyList'],
  components: {
    DefaultTabs,
    KolsListItem
  },
  data() {
    return {
      kolHasLiked: false,
      KolHasInflunce: true,
      kolHasMsg: true,
      kolHasChecked: false,
      tabIndex: 0,
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
          name: "微博"
        },
        {
          index: 1,
          name: "微信"
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
        this.params.brand_keywords = this.childKeyList.brand_keywords
        this.weiboKol(this.params)
      },
      deep: true
    }
  },
  created() {
    this.params.brand_keywords = this.childKeyList.brand_keywords;
    this.weiboKol(this.params)
  },
  methods: {
    changeTab(tab) {
      this.tabIndex = tab.index
      this.currentList = [];
      if (tab.index === 0) {
        // 微博接口
        this.weiboKol(this.params)
      } else {
        // 微信接口
        this.weixinKol(this.params)
      }
    },
    // 跳转 kol detail
    intoKolDetail(item) {
      // console.log(item)
      // this.$router.push("/kol/" + item.profile_id)
      this.$router.push({
        path: '/kol/',
        name: 'KolDetail',
        params: {
          id: item.profile_id,
          type: this.tabIndex,
          brand_keywords: this.childKeyList.brand_keywords
        },
      });
    },
    // 跳转kol list
    intoKolDetailMore() {
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
          res.data.forEach(element => {
            element.name = element.profile_name
            element.desc = element.description_raw
            element.avatar = element.avatar_url
            element.influnce = element.avg_post_influences
          })
          _that.currentList = res.data.slice(0, 5)
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
          // console.log(res);
          res.data.forEach(element => {
            element.name = element.profile_name
            element.desc = element.description_raw
            element.avatar = element.avatar_url
            element.influnce = element.avg_post_influences
          })
          _that.currentList = res.data.slice(0, 5)
        })
        .catch(function(error) {
          console.log(error)
        })
    }
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
