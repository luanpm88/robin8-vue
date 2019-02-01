<template>
  <div class="panel default-panel home-top-post">
    <div class="panel-head">
      <h5 class="title purple">
        <span class="iconfont icon-calendar"></span>
        Top Posts
      </h5>
    </div>

    <div class="panel-body list-content">
      <default-tabs
        :tabList="tabList"
        :tabIndex="tabIndex"
        @changeTab="changeTab"
        class="panel-tab"
      >
        <div class="list-content-inner">
          <div class="home-post" v-for="(item, index) in postList" :key="index">
            <p v-if="postType === 0" class="home-post-title">{{item.title}}</p>
            <a :href="item.url" v-else><p class="home-post-title">{{item.title}}</p></a>
            <div class="home-post-detail">
              <img :src="item.avatar_url" alt class>
              <div>
                <strong>{{item.profile_name}}</strong>
                <p>{{item.post_time}}</p>
              </div>
            </div>
            <p class="home-post-content">{{item.content}}</p>
            <div class="home-post-form">
              <span>
                <i class="iconfont icon-like"></i>
                <b>{{item.post_influence.likes}}</b>
              </span>
              <span v-if="postType === 0">
                <i class="iconfont icon-share"></i>
                <b>{{item.post_influence.shares}}</b>
              </span>
              <span>
                <i class="iconfont icon-pinglun"></i>
                <b>{{item.post_influence.comments}}</b>
              </span>
            </div>
          </div>
        </div>
        <div class="text-center mt20">
          <button type="button" class="btn btn-sm btn-outline btn-circle btn-purple">查看更多</button>
        </div>
      </default-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import apiConfig from "@/config"
import DefaultTabs from "@components/DefaultTabs"
import KolsListItem from "@/pages/creations/components/KolsListItem"
import { mapState } from 'vuex'
export default {
  components: {
    DefaultTabs,
    KolsListItem
  },
  props: ['childKeyList'],
  data() {
    return {
      kolHasLiked: true,
      kolHasMsg: true,
      kolHasChecked: false,
      tabIndex: 0,
      topPostParams: {
        start_date: "2018-08-09",
        end_date: "2018-08-29",
        brand_keywords: "BMW",
        page_no: 0,
        page_size: 6
      },
      postList: [],
      postType: 0,
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
        this.topPostParams.brand_keywords = this.childKeyList.brand_keywords;
        // 微博
        this.topPostWeibo(this.topPostParams)
        // // 微信
        // this.topPostWeixin(this.topPostParams)
      },
      deep: true
    }
  },
  created() {
    this.topPostParams.brand_keywords = this.childKeyList.brand_keywords;
    // 微博
    this.topPostWeibo(this.topPostParams)
    // // 微信
    // this.topPostWeixin(this.topPostParams)
  },
  methods: {
    changeTab(tab) {
      this.tabIndex = tab.index
      // this.currentList = tab.data
      if (tab.index === 0) {
        // 微博
        this.topPostWeibo(this.topPostParams)
      } else {
        // 微信
        this.topPostWeixin(this.topPostParams)
      }
    },
    // 微博的接口
    topPostWeibo(params) {
      const _that = this
      axios
        .post(apiConfig.topPostWeibo, params, {
          headers: {
            'Authorization': _that.authorization
          }
        })
        .then(function(res) {
          // console.log("我是微博接口", res)
          _that.postType = 0
          _that.postList = res.data.data.slice(0, 2)
          // console.log(_that.postList)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    // 微信的接口
    topPostWeixin(params) {
      const _that = this
      axios
        .post(apiConfig.topPostWeixin, params, {
          headers: {
            'Authorization': _that.authorization
          }
        })
        .then(function(res) {
          // console.log("我是微信接口", res)
          _that.postType = 1
          _that.postList = res.data.data.slice(0, 2)
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
  padding: 0px 20px 20px;
  height: 450px;
  overflow: hidden;
}
.home-post {
  padding: 10px 0px 2px;
  border-bottom: 1px solid #ddd;
}
.home-post-detail {
  padding: 12px 0px;
  img {
    display: inline-block;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid #ddd;
    margin-right: 10px;
    vertical-align: middle;
  }
  div {
    display: inline-block;
    vertical-align: middle;
    strong {
      font-weight: normal;
      font-size: $font-nm-s;
      color: #575962FF;
    }
    p {
      font-size: 0.8rem;
    }
  }
}
.home-post-title {
  color: nth($purple, 1);
  @include limit-line(1);
  font-size: $font-nm-s;
}
.home-post-content {
  @include limit-line(3);
  font-size: $font-sm;
  line-height: 20px;
}

.home-post-form {
  padding: 10px 0px 0px;
  span {
    display: inline-block;
    width: 32%;
    text-align: center;
    &:nth-child(1) {
      text-align: center;
    }
  }
  i {
    vertical-align: middle;
    margin-right: 5px;
    color: #999;
  }
  .icon-pinglun{
    font-weight: 600;
  }
  b {
    font-weight: normal;
    vertical-align: middle;
    color: #b9b7b7;
  }
}
.list-content-inner {
  height: 380px;
  overflow-y: auto;
}
</style>
