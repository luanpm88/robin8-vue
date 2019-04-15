<template>
  <div class="kol-search">
    <!-- 对比按钮 -->
    <transition name="fade">
      <div v-if="comparePop" class="panel default-panel compare-pop">
        <div class="panel-body">
          <span class="copmare-close" @click="closeCompare">X</span>
          <button type="button" class="btn btn-purple" @click="toComparePage">To compare</button>
        </div>
      </div>
    </transition>
    <!-- 搜索条件 -->
    <div class="panel default-panel kols-list-panel">
      <div class="panel-head">
        <h5 class="title text-center">{{$t('lang.kolList.search.topKey')}}</h5>
      </div>
      <div class="panel-body">
        <!-- 最头部input 条件 -->
        <div class="form-horizontal">
          <div class="form-group mt20">
            <div class="col-sm-offset-2 col-sm-8">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  :placeholder="$t('lang.kolList.search.keyword')"
                  v-model="keyword"
                >
                <div class="input-group-btn">
                  <button
                    type="button"
                    class="btn btn-purple"
                    @click="totalSearch"
                  >{{$t('lang.kolList.search.search')}}</button>
                </div>
              </div>
            </div>
          </div>
          <div class="kol-advance-btn">
            <span
              class="toggle"
              @click="showMoreSearch"
            >{{$t('lang.kolList.search.advancedSearch.btn')}}</span>
          </div>
        </div>
        <!-- 高级搜索 -->
        <div v-if="advancedSearch" class="form-horizontal mt30">
          <div class="form-group">
            <div
              class="col-sm-2 control-label"
            >{{$t('lang.kolList.search.advancedSearch.industry')}}</div>
            <div class="col-sm-4">
              <select class="form-control" v-model="industry" placeholder="N/A">
                <option value></option>
                <option
                  value="airline"
                >{{$t('lang.kolList.search.advancedSearch.industryType.Airline')}}</option>
                <option
                  value="appliances"
                >{{$t('lang.kolList.search.advancedSearch.industryType.Appliances')}}</option>
                <option value="auto">{{$t('lang.kolList.search.advancedSearch.industryType.Car')}}</option>
                <option
                  value="babies"
                >{{$t('lang.kolList.search.advancedSearch.industryType.Babies')}}</option>
                <option
                  value="beauty"
                >{{$t('lang.kolList.search.advancedSearch.industryType.Beauty')}}</option>
                <option
                  value="books"
                >{{$t('lang.kolList.search.advancedSearch.industryType.Books')}}</option>
                <option
                  value="camera"
                >{{$t('lang.kolList.search.advancedSearch.industryType.Camera')}}</option>
                <option
                  value="ce"
                >{{$t('lang.kolList.search.advancedSearch.industryType.Electronics')}}</option>
                <option
                  value="digital"
                >{{$t('lang.kolList.search.advancedSearch.industryType.Digital')}}</option>
                <option
                  value="education"
                >{{$t('lang.kolList.search.advancedSearch.industryType.Education')}}</option>
                <option
                  value="entertainment"
                >{{$t('lang.kolList.search.advancedSearch.industryType.Entertainment')}}</option>
                <option
                  value="fashion"
                >{{$t('lang.kolList.search.advancedSearch.industryType.Fashion')}}</option>
                <option
                  value="finance"
                >{{$t('lang.kolList.search.advancedSearch.industryType.Finance')}}</option>
                <option
                  value="fitness"
                >{{$t('lang.kolList.search.advancedSearch.industryType.Fitness')}}</option>
                <option value="food">{{$t('lang.kolList.search.advancedSearch.industryType.Food')}}</option>
                <option
                  value="furniture"
                >{{$t('lang.kolList.search.advancedSearch.industryType.Furniture')}}</option>
                <option
                  value="games"
                >{{$t('lang.kolList.search.advancedSearch.industryType.Games')}}</option>
                <option
                  value="health"
                >{{$t('lang.kolList.search.advancedSearch.industryType.Health')}}</option>
                <option
                  value="hotel"
                >{{$t('lang.kolList.search.advancedSearch.industryType.Hotel')}}</option>
                <option
                  value="internet"
                >{{$t('lang.kolList.search.advancedSearch.industryType.Internet')}}</option>
                <option
                  value="mobile"
                >{{$t('lang.kolList.search.advancedSearch.industryType.Mobile')}}</option>
                <option
                  value="music"
                >{{$t('lang.kolList.search.advancedSearch.industryType.Music')}}</option>
                <option
                  value="realestate"
                >{{$t('lang.kolList.search.advancedSearch.industryType.Realestate')}}</option>
                <option
                  value="sports"
                >{{$t('lang.kolList.search.advancedSearch.industryType.Sports')}}</option>
                <option
                  value="travel"
                >{{$t('lang.kolList.search.advancedSearch.industryType.Travel')}}</option>
              </select>
            </div>
            <div
              class="col-sm-2 control-label"
            >{{$t('lang.kolList.search.advancedSearch.engagement')}}</div>
            <div class="col-sm-4">
              <div class="input-group">
                <input type="text" class="form-control" v-model="engagementFrom" placeholder="N/A">
                <div class="input-group-addon">-</div>
                <input type="text" class="form-control" v-model="engagementTo" placeholder="N/A">
              </div>
            </div>
          </div>
          <div class="form-group">
            <div
              class="col-sm-2 control-label"
            >{{$t('lang.kolList.search.advancedSearch.followers')}}</div>
            <div class="col-sm-4">
              <div class="input-group">
                <input type="text" class="form-control" v-model="followerFrom" placeholder="N/A">
                <div class="input-group-addon">-</div>
                <input type="text" class="form-control" v-model="followerTo" placeholder="N/A">
              </div>
            </div>
            <div class="col-sm-2 control-label">
              <a-tooltip
                placement="topLeft"
                :title="$t('lang.kolList.search.advancedSearch.influenceTip')"
              >{{$t('lang.kolList.search.advancedSearch.influence')}}</a-tooltip>
            </div>
            <div class="col-sm-4">
              <div class="input-group">
                <input type="text" class="form-control" v-model="influenceFrom" placeholder="N/A">
                <div class="input-group-addon">-</div>
                <input type="text" class="form-control" v-model="influenceTo" placeholder="N/A">
              </div>
            </div>
          </div>
          <div class="text-center">
            <label>
              <input type="checkbox" v-model="kolOnly">
              {{$t('lang.kolList.search.advancedSearch.checkText')}}
            </label>
          </div>
          <div class="text-center p30">
            <button
              type="button"
              class="btn btn-blue btn-outline"
              @click="totalSearch"
            >{{$t('lang.kolList.search.search')}}</button>
          </div>

          <div class="search-tips text-center">
            <p>We are tuning our search engine. If you find a wrong search result, please take a picture and email us at info@robin8.com.</p>
            <p>Thank you for your support!</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 内容部分 -->
    <div class="panel default-panel kols-list-panel mt20">
      <div class="panel-body">
        <!-- <div class="kols-list-statistics">
          <span v-if="tabIndex === 1" class="item">{{$t('lang.kolList.search.tableTop.weixinBig')}} - 5,564,575</span>
          <span v-if="tabIndex === 0" class="item">{{$t('lang.kolList.search.tableTop.weiboBig')}} - 65,860,968</span>
          <span v-if="tabIndex === 1" class="item">{{$t('lang.kolList.search.tableTop.weixinR8')}} - {{r8List.wechat_kols_count}}</span>
          <span v-if="tabIndex === 0" class="item">{{$t('lang.kolList.search.tableTop.weiboR8')}} - {{r8List.weibo_kols_count}}</span>
        </div>-->

        <default-tabs :tabList="tabList" :tabIndex="tabIndex" @changeTab="changeTab">
          <div class="nonetip" v-if="isShow">
            <span>{{$t('lang.searchListNoDataTip')}}</span>
          </div>
          <div class="r8-loading" v-if="isLoading">
            <a-spin tip="Loading..."/>
          </div>
          <div v-if="isTable">
            <table class="default-table mt20">
              <thead>
                <tr>
                  <!-- <th v-if="tabIndex === 0 || tabIndex === 1" width="6%">{{$t('lang.kolList.search.table.check')}}</th> -->
                  <th width="40%">{{$t('lang.kolList.search.table.profile')}}</th>
                  <th width="12%" class="text-center">{{$t('lang.kolList.search.table.price')}}</th>
                  <th width="18%" class="text-center">
                    {{$t('lang.kolList.search.table.influence')}}
                    <span
                      @click="influencerank(1)"
                      :class="{'kol-data-rank': true, fluenceactive: isFluenceActive}"
                    >
                      <i :class="{down: true, 'is-bottom-iactive': !isFIactive}"></i>
                    </span>
                  </th>
                  <th width="18%" class="text-center">
                    {{$t('lang.kolList.search.table.relevance')}}
                    <span
                      @click="influencerank(2)"
                      :class="{'kol-data-rank': true, relevanceactive: isRelevanceActive}"
                    >
                      <i :class="{down: true, 'is-bottom-iactive': !isRIactive}"></i>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody v-for="(key, twoIndex) in searchListBox" :key="twoIndex">
                <tr v-for="(item, index) in key" :key="index">
                  <!-- <td v-if="tabIndex === 0 || tabIndex === 1">
                    <input type="checkbox" v-model="item.isCheck" @click="checkItem(item)">
                  </td> -->
                  <td>
                    <div class="media kol-profile">
                      <div class="media-left media-middle">
                        <div class="avatar" @click="intoKolDetail(item)">
                          <img :src="item.avatar_url" alt class="avatar-img">
                        </div>
                      </div>
                      <div class="media-body media-middle">
                        <h5 class="title">
                          <span
                            @click="intoKolDetail(item)"
                            class="kol-tit-span"
                          >{{item.profile_name}}</span>
                        </h5>
                        <p class="desc">{{item.description_raw}}</p>
                        <div class="status">
                          <a-tooltip
                            placement="topLeft"
                            :title="$t('lang.kolList.search.likeTip')"
                            class="item"
                            v-if="tabIndex === 0 || tabIndex === 1 || tabIndex === 2  || tabIndex === 3  || tabIndex === 4 || tabIndex === 5"
                          >
                            <i class="iconfont icon-user-heart"></i>
                            {{item.fans_number}}
                          </a-tooltip>
                          <a-tooltip
                            placement="topLeft"
                            :title="$t('lang.kolList.search.sumTip')"
                            class="item"
                            v-if="tabIndex === 0 || tabIndex === 1"
                          >
                            <i class="iconfont icon-app"></i>
                            {{item.stats.avg_sum_engagement}}
                          </a-tooltip>
                        </div>
                      </div>
                      <div class="media-right media-middle operation-area">
                        <span class="iconfont icon-cart active" @click="doAddCart(item)"></span>
                      </div>
                    </div>
                  </td>
                  <td
                    class="text-center"
                    v-if="tabIndex === 0 || tabIndex === 1"
                  >{{item.pricing.direct_price}}</td>
                  <td class="text-center" v-else>{{item.pricing.ref_price}}</td>
                  <td class="text-center">
                    <!-- <a-progress
                      type="circle"
                      :percent="item.influence / 10"
                      :width="100"
                      :strokeWidth="9"
                      strokeColor="#b37feb"
                      :format="() => item.influence"
                    />-->
                    <!-- {{$t('lang.kolList.search.influenceTip')}} -->
                    Coming Soon
                  </td>
                  <td class="text-center">
                    <!-- <a-progress
                      type="circle"
                      :percent="item.correlation"
                      :width="100"
                      :strokeWidth="9"
                      strokeColor="#b37feb"
                      :format="() => item.correlation + '%'"
                      v-if="item.colorStatus === 1"
                    />
                    <a-progress
                      type="circle"
                      :width="100"
                      :strokeWidth="9"
                      strokeColor="#ddd"
                      :format="() => item.correlation"
                      v-if="item.colorStatus === 0"
                    />-->
                    Coming Soon
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="text-center p30">
            <a-pagination
              :defaultCurrent="currentPage"
              :defaultPageSize="kolsPerPage"
              v-model="currentPageAdd"
              :total="kolsTotal"
              @change="onPageChange"
            />
          </div>
        </default-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import apiConfig from "@/config";
import DefaultTabs from "@components/DefaultTabs";
import { Progress } from "ant-design-vue";
import { mapState } from "vuex";
import commonJs from "@javascripts/common.js";

export default {
  name: "kolsearch",
  components: {
    AProgress: Progress,
    DefaultTabs
  },
  props: ["keyWord"],
  data() {
    return {
      comparePop: false,
      listSortType: 1,
      listSortDir: "desc",
      isLoading: true,
      isShow: false,
      isTable: false,
      isFIactive: false,
      isFluenceActive: true,
      isFluenceSort: "asc",
      isRIactive: false,
      isRelevanceActive: false,
      isRelevanceSort: "asc",
      // top 用户输入的key
      keyword: "",
      // 我的品牌用户选中的关键字， 目前detail页面用的是这个页面的 totalKeywords
      totalKeywords: "",
      industry: "",
      engagementFrom: "",
      engagementTo: "",
      followerFrom: "100000",
      followerTo: "",
      influenceFrom: "",
      influenceTo: "",
      kolOnly: true,
      kolOnlyText: "Y",
      currentPage: 0,
      currentPageAdd: 1,
      selectPage: 0,
      kolsPerPage: 10,
      kolsTotal: 0,
      advancedSearch: true,
      tabList: [
        {
          index: 0,
          name: "weibo"
        },
        {
          index: 1,
          name: "wechat"
        },
        {
          index: 2,
          name: "xiaohongshu"
        },
        {
          index: 3,
          name: "kuaishou"
        },
        {
          index: 4,
          name: "bilibili"
        },
        {
          index: 5,
          name: "douyin"
        }, {
          index: 6,
          name: ('instagram')
        }, {
          index: 7,
          name: ('youtube')
        }, {
          index: 8,
          name: ('facebook')
        }
      ],
      tabIndex: 0,
      searchListBox: [],
      searchList: {},
      r8List: [],
      totalParams: {},
      cartParams: {},
      compareList: []
    };
  },
  created() {
    this.tabIndex = 0;
    this.r8Kol();
    // 获取keywords
    this.getBaseData();
    if (this.$route.query.brand_keywords) {
      this.tabIndex = Number(this.$route.query.type);
      this.keyword = this.$route.query.brand_keywords;
      // 初始化参数
      this.paramsInit();
      // 调用接口
      this.totalJoggle(this.tabIndex);
    } else {
      this.tabIndex = 0;
      // 初始化参数
      this.paramsInit();
      // 调用接口
      this.totalJoggle(this.tabIndex);
    }
  },
  computed: {
    ...mapState(["authorization"])
  },
  methods: {
    // 初始化传参数
    paramsInit() {
      if (this.kolOnly) {
        this.kolOnlyText = "Y";
      } else {
        this.kolOnlyText = "N";
      }
      this.totalParams.page_no = this.currentPage;
      this.totalParams.page_size = 10;
      this.totalParams.industry = this.industry;
      this.totalParams.engagement_from = this.engagementFrom;
      this.totalParams.engagement_to = this.engagementTo;
      this.totalParams.influence_from = this.influenceFrom;
      this.totalParams.influence_to = this.influenceTo;
      if (this.keyword === "") {
        this.totalParams.keywords = "";
      } else {
        // this.keyword 转英文逗号
        this.keyword = this.keyword.replace(/，/gi, ",");
        let newKey = "";
        this.keyword.split(",").forEach(item => {
          newKey += '"' + item + '" ';
        });
        this.totalParams.keywords = newKey;
      }
      if (this.tabIndex === 0 || this.tabIndex === 1) {
        this.totalParams.profile_sort_col = this.listSortType;
      } else {
        // 小红书、快手、抖音,Instagram,Youtube,Facebook目前只支持关联度排序
        this.totalParams.profile_sort_col = 0;
      }
      this.totalParams.profile_sort_dir = this.listSortDir;
      this.totalParams.r8_registered_kol_only = this.kolOnlyText;
    },
    // 调用接口
    totalJoggle(type) {
      // type = 0 微博
      // type = 1 微信
      // type = 2 xiaohongshu
      // type = 3 kuaishou
      // type = 4 bilibili
      // type = 5 douyin
      // type = 6 Instagram
      // type = 7 Youtube
      // type = 8 Facebook
      this.totalParams.follower_from = this.followerFrom;
      this.totalParams.follower_to = this.followerTo;
      this.kollistJoggle(type, this.totalParams);
    },
    // 平台数据 接口
    kollistJoggle(type, params) {
      const _that = this;
      if (type === 0) {
        // weibo
        axios
          .post(apiConfig.kollistWeiboTable, params, {
            headers: {
              Authorization: _that.authorization
            }
          })
          .then(function(res) {
            if (res.status === 200) {
              // console.log('我是weibo接口', res)
              _that.jogDataInit(res.data);
            }
          })
          .catch(function(error) {
            // console.log(error)
          });
      }
      if (type === 1) {
        // weixin
        axios
          .post(apiConfig.kollistWeixinTable, params, {
            headers: {
              Authorization: _that.authorization
            }
          })
          .then(function(res) {
            if (res.status === 200) {
              // console.log('我是weixin接口', res)
              _that.jogDataInit(res.data);
            }
          })
          .catch(function(error) {
            // console.log(error)
          });
      }
      if (type === 2) {
        // xiaohongshu
        axios
          .post(apiConfig.kollistRedBookTable, params, {
            headers: {
              Authorization: _that.authorization
            }
          })
          .then(function(res) {
            if (res.status === 200) {
              // console.log('我是小红书接口', res)
              _that.jogDataInit(res.data);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      if (type === 3) {
        // kuaishou
        axios
          .post(apiConfig.kollistKuaishouTable, params, {
            headers: {
              Authorization: _that.authorization
            }
          })
          .then(function(res) {
            if (res.status === 200) {
              // console.log('kollistKuaishouTable', res)
              _that.jogDataInit(res.data);
            }
          })
          .catch(function(error) {
            // console.log(error)
          });
      }
      if (type === 4) {
        // bilibili
        axios
          .post(apiConfig.kollistBilibiliTable, params, {
            headers: {
              Authorization: _that.authorization
            }
          })
          .then(function(res) {
            if (res.status === 200) {
              // console.log('kollistBilibiliTable', res)
              _that.jogDataInit(res.data);
            }
          })
          .catch(function(error) {
            // console.log(error)
          });
      }
      if (type === 5) {
        // douyin
        axios
          .post(apiConfig.kollistDouyinTable, params, {
            headers: {
              Authorization: _that.authorization
            }
          })
          .then(function(res) {
            if (res.status === 200) {
              // console.log('kollistDouyinTable', res)
              _that.jogDataInit(res.data);
            }
          })
          .catch(function(error) {
            // console.log(error)
          });
      }
      if (type === 6) {
        // Instagram
        axios
          .post(apiConfig.kollistInstagramTable, params, {
            headers: {
              Authorization: _that.authorization
            }
          })
          .then(function(res) {
            if (res.status === 200) {
              // console.log('kollistInstagramTable', res)
              _that.jogDataInit(res.data);
            }
          })
          .catch(function(error) {
            // console.log(error)
          });
      }
      if (type === 7) {
        // Youtub
        axios
          .post(apiConfig.kollistYoutubeTable, params, {
            headers: {
              Authorization: _that.authorization
            }
          })
          .then(function(res) {
            if (res.status === 200) {
              // console.log('Youtub', res)
              _that.jogDataInit(res.data);
            }
          })
          .catch(function(error) {
            // console.log(error)
          });
      }
      if (type === 8) {
        // Facebook
        axios
          .post(apiConfig.kollistFacebookTable, params, {
            headers: {
              Authorization: _that.authorization
            }
          })
          .then(function(res) {
            if (res.status === 200) {
              // console.log('Facebook', res)
              _that.jogDataInit(res.data);
            }
          })
          .catch(function(error) {
            // console.log(error)
          });
      }
    },
    // 保存topInputKey
    kollistSaveKey(params) {
      const _that = this;
      axios
        .post(apiConfig.kollistSaveKey, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('保存key 成功', res)
          }
        })
        .catch(function(error) {
          // console.log(error)
        });
    },
    // 处理接口数据函数
    jogDataInit(data) {
      const _that = this;
      _that.isLoading = false;
      _that.kolsTotal = data.total_record_count;
      if (data.data.length > 0) {
        _that.isShow = false;
        _that.isTable = true;
        data.data.forEach((element, index) => {
          if (element.influence || element.influence === 0) {
            element.influence = parseInt(element.influence * 1000);
          } else {
            element.influence = "N/A";
          }
          element.isCheck = false;
          if (this.keyword !== "") {
            element.colorStatus = 1;
            element.correlation = parseInt(element.correlation * 100);
          } else {
            element.colorStatus = 0;
            element.correlation = "N/A";
          }
          if (_that.tabIndex === 0 || _that.tabIndex === 1) {
            if (!element.pricing) {
              element.pricing = {};
              element.pricing.direct_price = "N/A";
            } else {
              if (
                !!element.pricing.direct_price &&
                element.pricing.direct_price != ""
              ) {
                element.pricing.direct_price =
                  "¥ " +
                  commonJs.threeFormatter(element.pricing.direct_price, 2);
              } else {
                element.pricing.direct_price = "N/A";
              }
            }
          } else {
            if (!element.pricing) {
              element.pricing = {};
              element.pricing.ref_price = "N/A";
            } else {
              if (element.pricing.ref_price) {
                if (
                  !!element.pricing.ref_price &&
                  element.pricing.ref_price != ""
                ) {
                  element.pricing.ref_price =
                    "¥ " +
                    commonJs.threeFormatter(element.pricing.ref_price, 2);
                } else {
                  element.pricing.ref_price = "N/A";
                }
              } else {
                element.pricing.ref_price = "N/A";
              }
            }
          }
        });
        _that.searchList = data.data;
        _that.searchListBox.push(_that.searchList);
      } else {
        _that.isShow = true;
        _that.isTable = false;
      }
    },
    showMoreSearch() {
      this.advancedSearch = !this.advancedSearch;
    },
    // 跳转 kol detail
    intoKolDetail(item) {
      if (Number(this.tabIndex) === 0 || Number(this.tabIndex) === 1) {
        item.profile_id = item.profile_id;
      }
      if (
        Number(this.tabIndex) === 2 ||
        Number(this.tabIndex) === 3 ||
        Number(this.tabIndex) === 4 ||
        Number(this.tabIndex) === 5 ||
        Number(this.tabIndex) === 6 ||
        Number(this.tabIndex) === 7 ||
        Number(this.tabIndex) === 8
      ) {
        item.profile_id = encodeURIComponent(item.profile_id);
        // console.log(item.profile_id)
      }
      // item.profile_id = item.profile_id.replace(/\./g , '\\/')
      this.$router.push({
        path: "/kol/",
        name: "KolDetail",
        params: {
          id: item.profile_id
        },
        query: {
          type: Number(this.tabIndex),
          brand_keywords: this.totalKeywords
        }
      });
    },
    changeTab(tab) {
      this.kolsTotal = 0;
      this.isLoading = true;
      this.isShow = false;
      this.isTable = false;
      this.tabIndex = tab.index;
      if (tab.index == 0) {
        this.followerFrom = "100000";
      } else if (tab.index == 1) {
        this.followerFrom = "30000";
      } else {
        this.followerFrom = "";
      }
      this.currentPage = 0;
      this.currentPageAdd = this.currentPage + 1;
      this.searchListBox = [];
      // 初始化参数
      this.paramsInit();
      // 调用接口
      this.totalJoggle(this.tabIndex);
    },
    totalSearch() {
      this.kolsTotal = 0;
      this.isLoading = true;
      this.isShow = false;
      this.isTable = false;
      this.currentPage = 0;
      this.currentPageAdd = this.currentPage + 1;
      this.searchListBox = [];
      // 初始化参数
      this.paramsInit();
      // 调用接口
      this.totalJoggle(this.tabIndex);

      // 将头部的输入的key 传给Evan 后台
      // if (this.keyword !== '') {
      //   let saveKeyParams = {
      //     keywords: this.keyword
      //   }
      //   // 保存keyword 的接口
      //   this.kollistSaveKey(saveKeyParams)
      // }
    },
    // 获取keyword
    getBaseData() {
      const _that = this;
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
                  _that.totalKeywords = element.keywords;
                }
              });
            }
          }
        });
    },
    // influence 与 relevance 排序
    influencerank(value) {
      this.isShow = false;
      this.isLoading = true;
      this.isTable = false;
      this.currentPage = this.currentPage;
      this.currentPageAdd = this.currentPage + 1;
      this.searchListBox = [];
      // value 为1 influence表示排序， 为2relevance 排序
      if (value === 1) {
        this.isFluenceActive = true;
        this.isRelevanceActive = false;
        this.listSortType = 1;
        this.listSortDir = "desc";
        // 重置params
        this.paramsInit();
      } else {
        // 后面加上小红书直接走了
        this.isFluenceActive = false;
        this.isRelevanceActive = true;
        this.listSortType = 0;
        this.listSortDir = "desc";
        // 重置params
        this.paramsInit();
      }
      // 调用接口的函数
      this.totalJoggle(this.tabIndex);
    },
    // top头部微信的数字
    r8Kol() {
      const _that = this;
      axios
        .get(apiConfig.r8_kols, {
          headers: {
            Authorization: this.authorization
          }
        })
        .then(function(res) {
          _that.r8List = res.data;
          _that.r8List.wechat_kols_count = commonJs.threeFormatter(
            _that.r8List.wechat_kols_count,
            2
          );
          _that.r8List.weibo_kols_count = commonJs.threeFormatter(
            _that.r8List.weibo_kols_count,
            2
          );
        });
    },
    doAddCart(data) {
      this.cartParams.profile_id = data.profile_id;
      this.cartParams.profile_name = data.profile_name;
      this.cartParams.avatar_url = data.avatar_url;
      this.cartParams.description_raw = data.description_raw;
      axios
        .post(apiConfig.kolCollectUrl, this.cartParams, {
          headers: {
            Authorization: this.authorization
          }
        })
        .then(this.handleDoAddCartSucc);
    },
    handleDoAddCartSucc(res) {
      let resData = res.data;
      if (res.status == 201) {
        if (!!resData.error && resData.error == 1) {
          alert(resData.detail);
          return false;
        }
        alert("您已成功添加至购物车");
      }
    },
    onPageChange(page) {
      this.isLoading = true;
      this.isShow = false;
      this.isTable = false;
      this.currentPage = page - 1;
      this.currentPageAdd = page;
      this.searchListBox = [];
      // 初始化参数
      this.paramsInit();
      // 调用接口
      this.totalJoggle(this.tabIndex);
    },
    // 选中几条对比kol
    checkItem(item) {
      if (!item.isCheck) {
        this.compareList.push(item.profile_id);
      } else {
        this.compareList.forEach((ele, index) => {
          if (ele === item.profile_id) {
            this.compareList.splice(index, 1);
          }
        });
      }
      if (this.compareList.length > 1) {
        // 控制按钮出现
        this.comparePop = true;
      } else {
        // 控制按钮隐藏
        this.comparePop = false;
      }
    },
    // 关闭比一比的按钮
    closeCompare() {
      this.comparePop = false;
    },
    // 进入对比页面
    toComparePage() {
      this.$router.push({
        path: "/kolList/Compare/",
        name: "kolCompare",
        params: {
          type: this.tabIndex
        },
        query: {
          list: this.compareList
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.kols-list-panel {
  .panel-body {
    padding: 20px;
    .form-group {
      margin-bottom: 20px;
    }
  }
}
.kol-advance-btn {
  text-align: center;
  .toggle {
    color: nth($purple, 1);
    border-bottom: 1px solid nth($purple, 1);
    cursor: pointer;
  }
}
.kols-list-statistics {
  height: 40px;
  margin-bottom: 10px;
  .item {
    display: inline-block;
    margin-right: 10px;
    border: 1px solid #ddd;
    border-radius: 20px;
    padding: 5px 10px;
    color: #333;
  }
}
.kol-data-rank {
  display: inline-block;
  line-height: 20px;
  cursor: pointer;
  vertical-align: 2px;
  i {
    width: 0;
    height: 0;
    border-style: solid;
  }
  .up {
    display: block;
    border-width: 0 5px 6px;
    border-color: transparent transparent #a7a5a5;
  }
  .down {
    display: block;
    border-width: 6px 5px 0;
    border-color: #a7a5a5 transparent transparent;
    margin: 1px auto 0;
  }
}
.fluenceactive,
.relevanceactive {
  .is-top-iactive {
    border-color: transparent transparent #b180ef;
  }
  .is-bottom-iactive {
    border-color: #b180ef transparent transparent;
  }
}
.kol-profile {
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    .avatar-img {
      width: 100%;
      height: 100%;
    }
  }
  .desc {
    @include limit-line(2);
  }
  .status {
    .item {
      margin-right: 10px;
    }
  }
  .operation-area {
    .iconfont {
      margin-left: 10px;
      cursor: pointer;
      &.icon-cart.active {
        color: nth($purple, 1);
      }
    }
  }
  .title {
    .kol-tit-span {
      cursor: pointer;
      color: nth($text-color, 2);
    }
  }
}
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 2s;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: opacity 2s;
}
.compare-pop {
  position: fixed;
  right: 0px;
  bottom: 45%;
  .panel-body {
    padding: 30px;
  }
  .copmare-close {
    position: absolute;
    cursor: pointer;
    right: 10px;
    top: 10px;
    color: nth($font-color, 1);
  }
}
</style>
