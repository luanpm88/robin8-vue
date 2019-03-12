
<template>
  <div class="panel default-panel">
    <div class="panel-body">
      <div class="nonetip" v-if="isPostShow">
        <span>{{$t('lang.totalNoDataTip')}}</span>
      </div>
      <div class="r8-loading" v-if="isPostLoading">
        <a-spin tip="Loading..."/>
      </div>
      <div v-if="isPostList">
        <div class="d-postcontent clearfix" v-for="(item, index) in postList" :key="index">
          <div class="d-post-left">
            <div class="d-post-link">
              <p v-if='Number(type) === 0'>{{item.title}}</p>
              <a v-else target="view_window" :href="item.url">{{item.title}}</a>
              <span class="d-post-showMore" @click="showTextContent(item, index)">{{$t('lang.seeMore')}}</span>
            </div>
            <p class="d-post-digest">{{item.digest}}</p>
            <p class="d-post-discribe" v-if="item.showContent">{{item.content}}</p>
            <div class="d-post-show">
              <span class="d-post-show-icon" v-html="item.top_industry_display + ' |'"></span>
              <span class="d-post-show-tag">{{item.tags}}</span>
            </div>
            <p class="d-post-right-read" v-if='Number(type) === 0'>
              <span>
                <i class="iconfont icon-heart"></i>{{item.influence_likes}}
              </span>
              <span>
                <i class="iconfont icon-share"></i>{{item.influence_shares}}
              </span>
              <span>
                <i class="iconfont icon-comment"></i>{{item.influence_comments}}
              </span>
            </p>
            <p class="d-post-right-read" v-else>
              <span  v-html="'Read:' + item.influence_reads"></span>
              <span><i class="iconfont icon-heart"></i>{{item.influence_likes}}</span>
            </p>
            <p class="d-post-show-time">{{item.post_time_display}}</p>
          </div>
        </div>
        <div class="btn-area">
          <a-pagination
            :defaultCurrent="postPage"
            :defaultPageSize="postPageSize"
            v-model="postCurrentPage"
            :total="postTotalPage"
            @change="onPageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import apiConfig from "@/config";
import DefaultTabs from "@components/DefaultTabs";
import ChartOption from "@components/Chart/GlobalChartOption";
import commonJs from '@javascripts/common.js';
import { mapState } from "vuex";
export default {
  name: "detailAnalytic",
  components: {
    DefaultTabs
  },
  data() {
    return {
      type: 0,
      postList: [],
      isPostShow: false,
      isPostLoading: true,
      isPostList: false,
      postPage: 0,
      postCurrentPage: 1,
      postTotalPage: 0,
      postPageSize: 10,
      postParams: {
        start_date: commonJs.cPastTwentyOneDays,
        end_date: commonJs.cPastOneday,
        profile_id: "MzAwMDAyMzY3OA==",
        page_no: 0,
        page_size: 10,
        order_type: "post_time"
      },
    };
  },
  computed: {
    ...mapState(["authorization"])
  },
  created() {
    this.isPostLoading = true;
    this.isPostShow = false;
    this.isPostList = false;
    this.postList = [];
    this.type = Number(this.$route.query.type);
    this.tabIndexThreeInit();
  },
  methods: {
    // post
    tabIndexThreeInit() {
      this.postParams.profile_id = String(this.$route.params.id);
      if (Number(this.$route.query.type) === 0) {
        // 微博post接口
        this.detailPostWeibo(this.postParams);

      } else {
        // 微信post相关接口
        this.detailPostWeixin(this.postParams);
      }
    },
    // post中More 的展示事件
    showTextContent(item, two) {
      if (item.showContent === false) {
        item.showContent = true;
      } else {
        item.showContent = false;
      }
      this.$set(this.postList, two, item);
    },
    // post分页
    onPageChange (page) {
      this.isPostLoading = true;
      this.isPostShow = false;
      this.isPostList = false;
      this.postList = [];
      this.postPage = page - 1;
      this.postCurrentPage = page;
      this.postParams.page_no = this.postPage;
      this.tabIndexThreeInit();
    },
    // post 微信
    detailPostWeixin(params) {
      const _that = this;
      axios
        .post(apiConfig.detailPostWeixin, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          // console.log('woshipost list', res);
          if (res.status === 200) {
            _that.postTotalPage = res.data.total_page_count;
            _that.isPostShow = false;
            _that.isPostLoading = false;
            _that.isPostList = true;
            res.data.data.forEach((item, index) => {
              item.showContent = false;
            });
            _that.postList = res.data.data;
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // post 微博
    detailPostWeibo(params) {
      const _that = this;
      axios
        .post(apiConfig.detailPostWeibo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          // console.log('微博post list', res);
          if (res.status === 200) {
            _that.postTotalPage = res.data.total_page_count;
            _that.isPostShow = false;
            _that.isPostLoading = false;
            _that.isPostList = true;
            res.data.data.forEach((item, index) => {
              item.showContent = false;
            });
            _that.postList = res.data.data;
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
  }
};
</script>
<style>
</style>
