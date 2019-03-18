<template>
  <div class="page">
    <page-header></page-header>

    <div class="container mt50 clearfix">
      <main-nav class="pull-left"></main-nav>

      <div class="socail-container pull-right">
        <div class="panel default-panel social-search">
          <div class="panel-body">
            <div class="form-horizontal">
              <div class="form-group">
                <div class="col-sm-2 control-label">{{$t('lang.socialPage.topic')}}</div>
                <div class="col-sm-4">
                  <input
                    type="text"
                    class="form-control"
                    v-model="topic"
                  />
                </div>
                <div class="col-sm-2 control-label">{{$t('lang.socialPage.source')}}</div>
                <div class="col-sm-4">
                  <select class="form-control" v-model="source">
                    <option value="0">{{$t('lang.weibo')}}</option>
                    <option value="1">{{$t('lang.wechat')}}</option>
                  </select>
                </div>
                <div class="col-sm-2 control-label mt20">{{$t('lang.socialPage.kolId')}}</div>
                <div class="col-sm-4 mt20">
                  <input
                    type="text"
                    class="form-control"
                    v-model="profileId"
                  />
                </div>
              </div>

              <div class="text-center mt30">
                <button
                  type="button"
                  class="btn btn-blue btn-outline"
                  @click="totalSearch"
                >
                  {{$t('lang.search')}}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="panel default-panel social-search mt20">
          <div class="panel-body">
            <div class="nonetip" v-if="isShow">
              <span>{{$t('lang.totalNoDataTip')}}</span>
            </div>
            <div class="r8-loading" v-if="isLoading">
              <a-spin tip="Loading..."/>
            </div>
            <div v-if="isContent">
              <div class="home-post"  v-for="(item, index) in itemList" :key='index'>
                <p v-if="Number(source) === 0" class="home-post-title">{{item.title}}</p>
                <a :href="item.url" target="_blank" v-else><p class="home-post-title">{{item.title}}</p></a>
                <div class="media social-detail">
                  <div class="media-left media-middle"  @click="intoKolDetail(item)">
                    <img :src="item.imgUrl" alt class>
                  </div>
                  <div class="media-body media-middle"  @click="intoKolDetail(item)">
                    <strong>{{item.name}}</strong>
                    <p>{{item.time}}</p>
                  </div>
                  <div class="media-right media-middle operation-area">
                      <span
                        class="iconfont icon-cart active"
                        @click="doAddCart(item)"
                      ></span>
                  </div>
                </div>
                <p class="home-post-content">'{{item.content}}'</p>
              </div>
              <div class="text-center mt20">
                <a-pagination
                  :defaultCurrent="currentPage"
                  v-model="currentPageAdd"
                  :defaultPageSize="kolsPerPage"
                  :total="kolsTotal"
                  @change="onPageChange"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import apiConfig from "@/config";
import PageHeader from "@components/PageHeader";
import MainNav from "@components/MainNav";
import { mapState } from "vuex";
import commonJs from '@javascripts/common.js';
export default {
  name: "socialListening",
  components: {
    PageHeader,
    MainNav
  },
  created() {
    // weibo
    this.socialWeibo(this.totalParams);
    // weixin
    // this.socialWeixin(this.totalParams);
  },
  computed: {
    ...mapState(["authorization"])
  },
  data() {
    return {
      source: 0,
      topic: 'adidas',
      profileId: '',
      currentPage: 0,
      currentPageAdd: 1,
      kolsPerPage: 10,
      kolsTotal: 0,
      isShow: false,
      isContent: false,
      isLoading: true,
      totalParams: {
        page_no: 0,
        page_size: 10,
        start_date: commonJs.cPastSevenDays,
        end_date: commonJs.cPastOneday,
        OR_keywords: 'adidas',
        profile_ids: [],
      },
      itemList: [],
      cartParams: {}
    };
  },
  methods: {
    // weibo
    socialWeibo(params) {
      const _that = this;
      _that.itemList = [];
      axios
        .post(apiConfig.socialWeibo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('我是微博', res);
            _that.isLoading = false;
            _that.kolsTotal = res.data.total_page_count;
            if (res.data.data.length > 0) {
              _that.isContent = true;
              _that.isShow = false;
              res.data.data.forEach(element => {
                element.imgUrl = element.avatar_url;
                element.title = element.title;
                element.name = element.profile_name;
                element.url = element.url;
                element.time = element.index_time;
                element.content = element.content;
              });
              _that.itemList = res.data.data
            } else {
              _that.isContent = false;
              _that.isShow = true;
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // weixin
    socialWeixin(params) {
      const _that = this;
      _that.itemList = [];
      axios
        .post(apiConfig.socialWeixin, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.isLoading = false;
            _that.kolsTotal = res.data.total_page_count;
            if (res.data.data.length > 0) {
              _that.isContent = true;
              _that.isShow = false;
              res.data.data.forEach(element => {
                element.imgUrl = element.avatar_url;
                element.title = element.title;
                element.name = element.profile_name;
                element.url = element.url;
                element.time = element.index_time;
                element.content = element.content;
              });
              _that.itemList = res.data.data
            } else {
              _that.isContent = false;
              _that.isShow = true;
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    totalSearch() {
      this.isLoading = true;
      this.isContent = false;
      this.isShow = false;
      this.currentPage = 0;
      this.currentPageAdd = this.currentPage + 1;
      this.totalParams.OR_keywords = this.topic;
      this.totalParams.profile_ids = this.profileId.split(",");
      // console.log(this.profileId.split(","))
      this.totalParams.page_no = this.currentPage;
      if (Number(this.source) === 0) {
        // weibo
        this.socialWeibo(this.totalParams);
      } else {
        // weixin
        this.socialWeixin(this.totalParams);
      }
    },
    onPageChange (page) {
      this.isLoading = true;
      this.isContent = false;
      this.isShow = false;
      this.currentPageAdd = page;
      this.currentPage = page - 1;
      this.totalParams.OR_keywords = this.topic;
      this.totalParams.profile_ids = this.profileId.split(",");
      this.totalParams.page_no = this.currentPage;
      if (Number(this.source) === 0) {
        // weibo
        this.socialWeibo(this.totalParams);
      } else {
        // weixin
        this.socialWeixin(this.totalParams);
      }
    },
    // 跳转 kol detail
    intoKolDetail(item) {
      this.$router.push({
        path: '/kol/',
        name: 'KolDetail',
        params: {
          id: item.profile_id,
        },
        query: {
          type: Number(this.source),
          brand_keywords: this.topic
        }
      });
    },
    doAddCart (data) {
      this.cartParams.profile_id = data.profile_id
      this.cartParams.profile_name = data.profile_name
      this.cartParams.avatar_url = data.avatar_url
      this.cartParams.description_raw = ''
      axios.post(apiConfig.kolCollectUrl, this.cartParams, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleDoAddCartSucc)
    },
    handleDoAddCartSucc (res) {
      // console.log(res)
      let resData = res.data
      // console.log(resData)
      if (res.status == 201) {
        if (!!resData.error && resData.error == 1) {
          alert(resData.detail)
          return false
        }
        alert('您已成功添加至购物车')
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.socail-container {
  width: 980px;
  min-height: 580px;
  .form-group{
    padding-right: 10px;
  }
}
.social-search, .social-content {
  .panel-body {
    padding: 30px;
  }
}
.social-detail{
  cursor: pointer;
  img{
    border-radius: 50%;
    max-width: 50px;
  }
}
.home-post-title {
  color: nth($purple, 1);
  @include limit-line(1);
  font-size: $font-nm-s;
  margin:20px 0px 10px;
}
.home-post-detail{
  display: inline-block;
}
.home-post-content {
  @include limit-line(3);
  font-size: $font-sm;
  line-height: 20px;
}
.icon-cart{
  &.active{
    cursor: pointer;
    color: nth($purple, 1) !important;
  }
}
</style>
