<template>
<div>

  <div class="socail-container clearfix">
    <div class="social-search col-sm-4">
      <div class="panel default-panel">
        <div class="panel-body">
          <div class="search-top">
            <i class="iconfont icon-bell"></i>
            <i class="iconfont icon-share"></i>
            <i class="iconfont icon-download"></i>
            <i class="iconfont icon-setting"></i>
            <i class="iconfont icon-close"></i>
          </div>
          <div class="search-item-box">
            <div class="search-item">
              <div class="media">
                <div class="media-left media-middle">
                  <img class="media-object" src="https://tvax2.sinaimg.cn/crop.0.0.512.512.50/6210277cly8fupsmegycvj20e80e8gmc.jpg" alt="">
                </div>
                <div class="media-body">
                  <h4 class="media-heading">Middle aligned media</h4>
                </div>
              </div>
              <div class="search-item-icon clearfix">
                <span class="col-sm-6">
                  <i class="iconfont icon-heart"></i>
                  <b></b>
                </span>
                <span class="col-sm-6">
                  <i class="iconfont icon-share"></i>
                  <b></b>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="social-search col-sm-4">
      <div class="panel default-panel">
        <div class="panel-body">
          1
        </div>
      </div>
    </div>
    <div class="social-search col-sm-4">
      <div class="panel default-panel">
        <div class="panel-body">
          2
        </div>
      </div>
    </div>
  </div>
  <div class="socail-container">
    <div class="panel default-panel social-search">
      <div class="panel-body">
        <div class="form-horizontal">
          <div class="form-group">
            <!-- <div class="col-sm-2 control-label">{{$t('lang.socialPage.topic')}}</div>
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control"
                v-model="topic"
              />
            </div> -->
            <div class="col-sm-2 control-label">{{$t('lang.socialPage.source')}}</div>
            <div class="col-sm-4">
              <select class="form-control" v-model="source">
                <option value="0">{{$t('lang.weibo')}}</option>
                <option value="1">{{$t('lang.wechat')}}</option>
              </select>
            </div>
            <div class="col-sm-2 control-label">{{$t('lang.socialPage.kolId')}}</div>
            <div class="col-sm-4">
              <!-- <input
                type="text"
                class="form-control"
                v-model="profileId"
              /> -->
              <a-select
                showSearch
                :value="selectIdValue"
                placeholder
                style="width: 200px"
                :defaultActiveFirstOption="false"
                :showArrow="false"
                :filterOption="false"
                @search="handleSearch"
                @change="handleChange"
                :notFoundContent="null"
                :allowClear="true"
              >
                <a-select-option v-for="d in data" :key="d.value">{{d.text}}</a-select-option>
              </a-select>
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
            <p v-if="Number(source) === 0" class="home-post-title" v-html="item.title"></p>
            <a :href="item.url" target="_blank" v-else><p class="home-post-title" v-html="item.title"></p></a>
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
            <p class="home-post-content" v-html="item.content"></p>
          </div>
          <div class="text-center mt20">
            <a-pagination
              :defaultCurrent="currentPage"
              v-model="currentPageAdd"
              :defaultPageSize="kolsPerPage"
              :total="kolsTotal"
              :hideOnSinglePage="true"
              @change="onPageChange"
            />
          </div>
        </div>
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
let timeout;
let currentValue;
export default {
  name: 'socialListening',
  components: {
  },
  created() {
    this.getBaseData();
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
        start_date: commonJs.cPastYears,
        end_date: commonJs.cPastOneday,
        OR_keywords: '“”',
        profile_ids: [],
      },
      itemList: [],
      cartParams: {},
      data: [],
      selectIdValue: undefined
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
            _that.kolsTotal = res.data.total_record_count;
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
            _that.kolsTotal = res.data.total_record_count;
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
    // 头部搜索
    totalSearch() {
      this.isLoading = true;
      this.isContent = false;
      this.isShow = false;
      this.currentPage = 0;
      this.currentPageAdd = this.currentPage + 1;
      // this.topic 转英文逗号
      // this.topic = this.topic.replace(/，/ig,',')
      // let newKey = ''
      // this.topic.split(',').forEach(item => {
      //   newKey += '"' + item.replace(/^\s+|\s+$/g, '') + '" '
      // })
      // this.totalParams.OR_keywords = newKey;
      if (this.profileId) {
        this.totalParams.profile_ids = this.profileId.split(",");
      } else {
        this.totalParams.profile_ids = [];
      }
      this.totalParams.page_no = this.currentPage;
      if (Number(this.source) === 0) {
        // weibo
        this.socialWeibo(this.totalParams);
      } else {
        // weixin
        this.socialWeixin(this.totalParams);
      }
    },
    // 点击分页的时候
    onPageChange (page) {
      this.isLoading = true;
      this.isContent = false;
      this.isShow = false;
      this.currentPageAdd = page;
      this.currentPage = page - 1;
      // this.topic 转英文逗号
      // this.topic = this.topic.replace(/，/ig,',')
      // let newKey = ''
      // this.topic.split(',').forEach(item => {
      //   newKey += '"' + item.replace(/^\s+|\s+$/g, '') + '" '
      // })
      // this.totalParams.OR_keywords = newKey;
      if (this.profileId) {
        this.totalParams.profile_ids = this.profileId.split(",");
      } else {
        this.totalParams.profile_ids = [];
      }
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
    // 加入购入车
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
    // 加入购物车执行的函数
    handleDoAddCartSucc (res) {
      // console.log(res)
      let resData = res.data
      // console.log(resData)
      if (res.status == 201) {
        if (resData.error == 1) {
          alert(resData.detail)
          return false
        }
        alert(this.$t('lang.cartSuccess'))
      }
    },
    // 获取my brand 页面
    getBaseData () {
      const _that = this
      axios.get(apiConfig.baseInfosUrl, {
        headers: {
          'Authorization': _that.authorization
        }
      }).then(function(res) {
        if (res.status === 200) {
          res.data.trademarks_list.forEach(element => {
            if (element.status === 1) {
              _that.topic = element.name
            }
          })
          // _that.totalParams.OR_keywords = _that.topic
          // weibo
          _that.socialWeibo(_that.totalParams);
        }
      })
    },
    // kol ID 只要一变化就触发事件
    handleSearch(value) {
      if (value !== '') {
        this.selectIdInit(value, data => (this.data = data));
      }
    },
    // kol ID 选中事件
    handleChange(value) {
      // console.log(value);
      this.selectIdValue = value;
      this.selectIdInit(value, data => (this.data = data));
      this.profileId = value;
    },
    // 当kol id 改变或者 选中时候都会进行数据重置
    selectIdInit(value, callback) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      currentValue = value;
      let params = {
        profile_name: value,
        page_no: 0,
        page_size: 10
      };
      // 微博select
      if (Number(this.source) === 0) {
        const _that = this;
        axios
          .post(apiConfig.socialWeiboSelect, params, {
            headers: {
              Authorization: _that.authorization
            }
          })
          .then(function(res) {
            if (res.status === 200) {
              if ((currentValue = value)) {
                const result = res.data.data;
                const data = [];
                result.forEach(item => {
                  data.push({
                    value: item.profile_id,
                    text: item.profile_name
                  });
                });
                callback(data);
              }
            }
          })
          .catch(function(error) {
            // console.log(error);
          });
      }

      // 微信select
      if (Number(this.source) === 1) {
        const _that = this;
        axios
          .post(apiConfig.socialWeixinSelect, params, {
            headers: {
              Authorization: _that.authorization
            }
          })
          .then(function(res) {
            if (res.status === 200) {
              // console.log('0000000 微信', res);
              if ((currentValue = value)) {
                const result = res.data.data;
                const data = [];
                result.forEach(item => {
                  data.push({
                    value: item.profile_id,
                    text: item.profile_name
                  });
                });
                callback(data);
              }
            }
          })
          .catch(function(error) {
            // console.log(error);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home-post-title {
  color: nth($text-color, 1);
  @include limit-line(1);
  font-size: $font-nm-s;
  margin:20px 0px 10px;
}
.home-post-content {
  @include limit-line(3);
  font-size: $font-sm;
  line-height: 20px;
  i{
    color: nth($cyan, 1) !important;
  }
}
</style>
