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
          <div v-for="(key, oneIndex) in postListBox" :key="oneIndex">
            <div class="home-post" v-for="(item, index) in key" :key="index">
              <p v-if="postType === 0" class="home-post-title">{{item.title}}</p>
              <a :href="item.url" v-else><p class="home-post-title">{{item.title}}</p></a>
              <div class="home-post-detail" @click="intoKolDetail(item)">
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
          <div class="nonetip" v-if="isShow">
            <span>暂无数据...</span>
          </div>
          <div class="r8-loading" v-if="isLoading">
            <a-spin tip="Loading..."/>
          </div>
        </div>
        <div class="text-center mt20">
          <button type="button" class="btn btn-sm btn-outline btn-circle btn-purple" @click="PostShowMore">查看更多</button>
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
import { Spin} from "ant-design-vue"
export default {
  components: {
    ASpin: Spin,
    DefaultTabs,
    KolsListItem
  },
  props: ['childKeyList'],
  data() {
    return {
      kolHasLiked: true,
      kolHasMsg: true,
      kolHasChecked: false,
      isShow: false,
      isLoading: true,
      postWeiboCurrentPage: 0,
      postWeixinCurrentPage: 0,
      tabIndex: 0,
      topPostParams: {
        start_date: commonJs.cPastFourteenDays,
        end_date: commonJs.cPastOneday,
        brand_keywords: "BMW",
        page_no: 0,
        page_size: 4
      },
      postListBox: [],
      postList: [],
      postType: 0,
      tabList: [
        {
          index: 0,
          name: this.$t('lang.weibo')
        },
        {
          index: 1,
          name: this.$t('lang.wechat')
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
        this.topPostParams.page_no = this.postWeiboCurrentPage;
        this.topPostParams.brand_keywords = this.childKeyList.brand_keywords;
        // 微博
        this.topPostWeibo(this.topPostParams)
      },
      deep: true
    }
  },
  created() {
    // this.topPostParams.brand_keywords = this.childKeyList.brand_keywords;
    // this.topPostParams.page_no = this.postWeiboCurrentPage;
    // // 微博
    // this.topPostWeibo(this.topPostParams)
  },
  methods: {
    changeTab(tab) {
      this.tabIndex = tab.index
      this.postListBox = [];
      this.isShow = false;
      this.isLoading = true;
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
          _that.isLoading = false;
          if (res.data.data.length === 0 || !res.data.data.length) {
            _that.isShow = true;
          } else {
            _that.isShow = false;
            _that.postType = 0
            _that.postListBox.push(res.data.data);
            _that.postWeiboCurrentPage ++;
          }
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
          _that.isLoading = false;
          if (res.data.data.length === 0 || !res.data.data.length) {
            _that.isShow = true;
          } else {
            _that.isShow = false;
            _that.postType = 1
            _that.postListBox.push(res.data.data);
            _that.postWeixinCurrentPage ++;
          }
        })
        .catch(function(error) {
          console.log(error)
        })
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
    PostShowMore() {
      this.isLoading = true;
      if (this.tabIndex === 0) {
        this.topPostParams.page_no = this.postWeiboCurrentPage;
        // 微博
        this.topPostWeibo(this.topPostParams)
      } else {
        this.topPostParams.page_no = this.postWeixinCurrentPage;
        // 微信
        this.topPostWeixin(this.topPostParams)
      }
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
.home-post {
  padding: 10px 0px 2px;
  border-bottom: 1px solid #ddd;
}
.home-post-detail {
  cursor: pointer;
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
