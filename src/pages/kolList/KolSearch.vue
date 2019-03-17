<template>
  <div>
    <div class="panel default-panel kols-list-panel">
      <div class="panel-head">
        <h5 class="title text-center">Enter a keyword, category or KOL name</h5>
      </div>
      <div class="panel-body">
        <div class="form-horizontal">
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-8">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  :placeholder="$t('lang.kolList.search.keyword')"
                  v-model="keyword"
                />
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
            >
              {{$t('lang.kolList.search.advancedSearch.btn')}}
            </span>
          </div>
        </div>

        <div v-if="advancedSearch" class="form-horizontal mt30">
          <div class="form-group">
            <div class="col-sm-2 control-label">{{$t('lang.kolList.search.advancedSearch.industry')}}</div>
            <div class="col-sm-4">
              <select class="form-control" v-model="industry" placeholder="N/A">
                <option value=""></option>
                <option value="airline">{{$t('lang.kolList.search.advancedSearch.industryType.Airline')}}</option>
                <option value="appliances">{{$t('lang.kolList.search.advancedSearch.industryType.Appliances')}}</option>
                <option value="auto">{{$t('lang.kolList.search.advancedSearch.industryType.Car')}}</option>
                <option value="babies">{{$t('lang.kolList.search.advancedSearch.industryType.Babies')}}</option>
                <option value="beauty">{{$t('lang.kolList.search.advancedSearch.industryType.Beauty')}}</option>
                <option value="books">{{$t('lang.kolList.search.advancedSearch.industryType.Books')}}</option>
                <option value="camera">{{$t('lang.kolList.search.advancedSearch.industryType.Camera')}}</option>
                <option value="ce">{{$t('lang.kolList.search.advancedSearch.industryType.Electronics')}}</option>
                <option value="digital">{{$t('lang.kolList.search.advancedSearch.industryType.Digital')}}</option>
                <option value="education">{{$t('lang.kolList.search.advancedSearch.industryType.Education')}}</option>
                <option value="entertainment">{{$t('lang.kolList.search.advancedSearch.industryType.Entertainment')}}</option>
                <option value="fashion">{{$t('lang.kolList.search.advancedSearch.industryType.Fashion')}}</option>
                <option value="finance">{{$t('lang.kolList.search.advancedSearch.industryType.Finance')}}</option>
                <option value="fitness">{{$t('lang.kolList.search.advancedSearch.industryType.Fitness')}}</option>
                <option value="food">{{$t('lang.kolList.search.advancedSearch.industryType.Food')}}</option>
                <option value="furniture">{{$t('lang.kolList.search.advancedSearch.industryType.Furniture')}}</option>
                <option value="games">{{$t('lang.kolList.search.advancedSearch.industryType.Games')}}</option>
                <option value="health">{{$t('lang.kolList.search.advancedSearch.industryType.Health')}}</option>
                <option value="hotel">{{$t('lang.kolList.search.advancedSearch.industryType.Hotel')}}</option>
                <option value="internet">{{$t('lang.kolList.search.advancedSearch.industryType.Internet')}}</option>
                <option value="mobile">{{$t('lang.kolList.search.advancedSearch.industryType.Mobile')}}</option>
                <option value="music">{{$t('lang.kolList.search.advancedSearch.industryType.Music')}}</option>
                <option value="realestate">{{$t('lang.kolList.search.advancedSearch.industryType.Realestate')}}</option>
                <option value="sports">{{$t('lang.kolList.search.advancedSearch.industryType.Sports')}}</option>
                <option value="travel">{{$t('lang.kolList.search.advancedSearch.industryType.Travel')}}</option>
              </select>
            </div>
            <div class="col-sm-2 control-label">{{$t('lang.kolList.search.advancedSearch.engagement')}}</div>
            <div class="col-sm-4">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="engagementFrom"
                  placeholder="N/A"
                />
                <div class="input-group-addon">-</div>
                <input
                  type="text"
                  class="form-control"
                  v-model="engagementTo"
                  placeholder="N/A"
                />
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">{{$t('lang.kolList.search.advancedSearch.followers')}}</div>
            <div class="col-sm-4">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="followerFrom"
                  placeholder="N/A"
                />
                <div class="input-group-addon">-</div>
                <input
                  type="text"
                  class="form-control"
                  v-model="followerTo"
                  placeholder="N/A"
                />
              </div>
            </div>
            <div class="col-sm-2 control-label">
              <a-tooltip placement="topLeft" :title="$t('lang.kolList.search.advancedSearch.influenceTip')">
                {{$t('lang.kolList.search.advancedSearch.influence')}}
              </a-tooltip>
            </div>
            <div class="col-sm-4">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="influenceFrom"
                  placeholder="N/A"
                />
                <div class="input-group-addon">-</div>
                <input
                  type="text"
                  class="form-control"
                  v-model="influenceTo"
                  placeholder="N/A"
                />
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
            >
              {{$t('lang.kolList.search.search')}}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="panel default-panel kols-list-panel mt20">
      <div class="panel-body">
        <div class="kols-list-statistics">
          <span v-if="tabIndex === 1" class="item">weixin - big data profile - 5,564,575</span>
          <span v-if="tabIndex === 0" class="item">weibo - big data profile - 65,860,968</span>
          <span v-if="tabIndex === 1" class="item">weixin - R8 managed - {{r8List.wechat_kols_count}}</span>
          <span v-if="tabIndex === 0" class="item">weibo - R8 managed - {{r8List.weibo_kols_count}}</span>
        </div>

        <default-tabs
          :tabList="tabList"
          :tabIndex="tabIndex"
          @changeTab="changeTab"
        >
          <table class="default-table mt20">
            <thead>
              <tr>
                <th width="40%">Profile</th>
                <th width="12%" class="text-center">Price</th>
                <th width="12%" class="text-center">R8 KOL</th>
                <th width="18%" class="text-center">
                  Influence
                  <span @click="influencerank(1)"  :class="{'kol-data-rank': true, fluenceactive: isFluenceActive}">
                    <i :class="{up: true, 'is-top-iactive': isFIactive}"></i>
                    <i :class="{down: true, 'is-bottom-iactive': !isFIactive}"></i>
                  </span>
                </th>
                <th width="18%" class="text-center">
                  Relevance
                  <span @click="influencerank(2)" :class="{'kol-data-rank': true, relevanceactive: isRelevanceActive}">
                    <i :class="{up: true, 'is-top-iactive': isRIactive}"></i>
                    <i :class="{down: true, 'is-bottom-iactive': !isRIactive}"></i>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody v-for="(key, twoIndex) in searchListBox" :key="twoIndex">
              <tr v-for="(item, index) in key" :key="index">
                <td>
                  <div class="media kol-profile">
                    <div class="media-left media-middle">
                      <div class="avatar">
                        <router-link
                          :to="'/kol/'+ item.profile_id + '?type=' + tabIndex + '&brand_keywords='+ totalKeywords"
                        >
                          <img :src="item.avatar_url" alt="" class="avatar-img" />
                        </router-link>
                      </div>
                    </div>
                    <div class="media-body media-middle">
                      <h5 class="title">
                        <router-link
                          :to="'/kol/'+ item.profile_id + '?type=' + tabIndex + '&brand_keywords='+ totalKeywords"
                        >
                          {{item.profile_name}}
                        </router-link>
                      </h5>
                      <p class="desc">{{item.description_raw}}</p>
                      <div class="status">
                        <a-tooltip
                          placement="topLeft"
                          :title="$t('lang.kolList.search.likeTip')"
                          class="item"
                        >
                          <i class="iconfont icon-user-heart"></i>
                          {{item.fans_number}}
                        </a-tooltip>
                        <a-tooltip
                          placement="topLeft"
                          :title="$t('lang.kolList.search.sumTip')"
                          class="item"
                        >
                          <i class="iconfont icon-app"></i>
                          {{item.stats.avg_sum_engagement}}
                        </a-tooltip>
                      </div>
                    </div>
                    <div class="media-right media-middle operation-area">
                      <span
                        class="iconfont icon-cart active"
                        @click="doAddCart(item)"
                      ></span>
                    </div>
                  </div>
                </td>
                <td class="text-center">{{item.pricing.direct_price}}</td>
                <td class="text-center">
                  <p v-if="item.kol_id">Yes</p>
                  <p v-else>No</p>
                </td>
                <td class="text-center">
                  <a-progress
                    type="circle"
                    :percent="item.influence / 10"
                    :width="100"
                    :strokeWidth="9"
                    strokeColor="#b37feb"
                    :format="() => item.influence"
                  />
                </td>
                <td class="text-center">
                  <a-progress
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
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div class="nonetip" v-if="isShow">
            <span>{{$t('lang.totalNoDataTip')}}</span>
          </div>
          <div class="r8-loading" v-if="isLoading">
            <a-spin tip="Loading..."/>
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
import { Progress, Tooltip } from "ant-design-vue";
import { mapState } from "vuex";
import commonJs from '@javascripts/common.js';

export default {
  name: 'kolsearch',
  components: {
    AProgress: Progress,
    ATooltip: Tooltip,
    DefaultTabs
  },
  props: ["keyWord"],
  data() {
    return {
      listSortType: 1,
      listSortDir: 'desc',
      isLoading: true,
      isShow: false,
      isFIactive: false,
      isFluenceActive: true,
      isFluenceSort: 'asc',
      isRIactive: false,
      isRelevanceActive: false,
      isRelevanceSort: 'asc',
      // top 用户输入的key
      keyword: "",
      // 我的品牌用户选中的关键字， 目前detail页面用的是这个页面的 totalKeywords
      totalKeywords: '',
      industry: "",
      engagementFrom: "",
      engagementTo: "",
      followerFrom: "",
      followerTo: "",
      influenceFrom: "",
      influenceTo: "",
      kolOnly: false,
      kolOnlyText: "N",
      currentPage: 0,
      currentPageAdd: 1,
      selectPage: 0,
      kolsPerPage: 10,
      kolsTotal: 0,
      advancedSearch: false,
      tabList: [
        {
          index: 0,
          name: this.$t('lang.weibo')
        },
        {
          index: 1,
          name: this.$t('lang.wechat')
        }
      ],
      tabIndex: 0,
      searchListBox: [],
      searchList: {},
      r8List: [],
      totalParams: {},
      cartParams: {}
    };
  },
  created() {
    this.r8Kol();
    // 获取keywords
    this.getBaseData();
    if (this.keyWord.brand_keywords) {
      this.tabIndex = this.keyWord.type;
      this.keyword = this.keyWord.brand_keywords;
      // 初始化参数
      this.paramsInit();
      // 调用接口
      this.totalJoggle(this.tabIndex);
    } else {
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
      if (this.keyword === '') {
        this.totalParams.keywords = '';
      } else {
        let newKey = '';
        this.keyword.split(",").forEach(item => {
          newKey += '"' + item + '"'
        });
        this.totalParams.keywords = newKey;
      }
      this.totalParams.profile_sort_col = this.listSortType;
      this.totalParams.profile_sort_dir = this.listSortDir;
      this.totalParams.r8_registered_kol_only = this.kolOnlyText;;
    },
    // 调用接口
    totalJoggle(type) {
      // type = 0 微博
      // type = 1 微信
      if (type === 0) {
        this.totalParams.folllower_from = this.followerFrom;
        this.totalParams.follower_to = this.followerTo;
        // 微博的接口
        this.kollistJoggle(type, this.totalParams);
      } else {
        // weixin的接口
        this.kollistJoggle(type, this.totalParams);
      }
    },
    // 微博和微信的接口
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
              // console.log("我是weibo接口", res);
              _that.kolsTotal = res.data.total_page_count;
              _that.jogDataInit(res.data.data);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        // weixin
        axios
          .post(apiConfig.kollistWeixinTable, params, {
            headers: {
              Authorization: _that.authorization
            }
          })
          .then(function(res) {
            // console.log("我是weixin接口", res);
            _that.kolsTotal = res.data.total_page_count;
            _that.jogDataInit(res.data.data);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    // 处理接口数据函数
    jogDataInit(data) {
      if (data.length === 0 || !data.length) {
        this.isShow = true;
      }
      this.isLoading = false;
      const _that = this;
      data.forEach((element, index) => {
        // if (element.description_raw.length > 60) {
        //   element.description_raw = element.description_raw.substr(0, 30) + '...'
        // }
        element.influence = parseInt(element.influence * 1000);
        // element.correlation = parseInt(element.correlation * 100);
        if (this.keyword !== '') {
          element.colorStatus = 1;
          element.correlation = parseInt(element.correlation * 100);
        } else {
          element.colorStatus = 0;
          element.correlation = 'N/A';
        }
        if (!element.pricing) {
          (element.pricing = {}), (element.pricing.direct_price = "N/A");
        }
      });
      _that.searchList = data;
      _that.searchListBox.push(_that.searchList);
    },
    showMoreSearch() {
      this.advancedSearch = !this.advancedSearch;
    },
    changeTab(tab) {
      this.isLoading = true;
      this.tabIndex = tab.index;
      this.currentPage = 0;
      this.currentPageAdd = this.currentPage + 1;
      this.searchListBox = [];
      // 初始化参数
      this.paramsInit();
      // 调用接口
      this.totalJoggle(this.tabIndex);
    },
    totalSearch() {
      this.isShow = false;
      this.isLoading = true;
      this.currentPage = 0;
      this.currentPageAdd = this.currentPage + 1;
      this.searchListBox = [];
      // 初始化参数
      this.paramsInit();
      // 调用接口
      this.totalJoggle(this.tabIndex);
    },
    // intoKolDetail(item) {
    //   // console.log(this.keyword)
    //   this.$router.push({
    //     path: "/kol/",
    //     name: "KolDetail",
    //     params: {
    //       id: item.profile_id,
    //       type: this.tabIndex,
    //       brand_keywords: this.totalKeywords
    //     }
    //   });
    // },
    // 获取keyword
    getBaseData () {
      const _that = this
      axios.get(apiConfig.baseInfosUrl, {
        headers: {
          'Authorization': _that.authorization
        }
      }).then(function(res) {
        if (res.status === 200) {
          if (!res.data.competitors.length == 0) {
            res.data.trademarks_list.forEach(element => {
              if (element.status === 1) {
                // let newKey = '';
                // element.keywords.split(",").forEach(item => {
                //   newKey += '"' + item + '"'
                // })
                _that.totalKeywords = element.keywords;
              }
            });
          }
        }
      })
    },
    // influence 与 relevance 排序
    influencerank(value) {
      this.isShow = false;
      this.isLoading = true;
      this.currentPage = this.currentPage;
      this.currentPageAdd = this.currentPage + 1;
      this.searchListBox = [];
      // value 为1 influence表示排序， 为2relevance 排序
      if (value === 1) {
        this.isFluenceActive = true;
        this.isRelevanceActive = false;
        this.listSortType = 1;
        this.listSortDir = 'desc';
        // 目前influence去掉了升序的事件
        // this.isFIactive = !this.isFIactive;
        // if (this.isFIactive) {
        //   this.listSortDir = 'asc';
        // } else {
        //   this.listSortDir = 'desc';
        // }
        // 重置params
        this.paramsInit();
      } else {
        this.isFluenceActive = false;
        this.isRelevanceActive = true;
        this.listSortType = 0;
        this.listSortDir = 'desc';
        // 目前relevance去掉了升序的事件
        // this.isRIactive = !this.isRIactive;
        // if (this.isRIactive) {
        //   this.listSortDir = 'asc';
        // } else {
        //   this.listSortDir = 'desc';
        // }
        // 重置params
        this.paramsInit();
      }
      // 调用接口的函数
      this.totalJoggle(this.tabIndex);
    },
    // top头部微信的数字
    r8Kol() {
      const _that = this
      axios.get(apiConfig.r8_kols, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(function (res) {
        _that.r8List = res.data
        _that.r8List.wechat_kols_count = commonJs.threeFormatter(_that.r8List.wechat_kols_count, 2);
        _that.r8List.weibo_kols_count = commonJs.threeFormatter(_that.r8List.weibo_kols_count, 2);
      })
    },
    doAddCart (data) {
      this.cartParams.profile_id = data.profile_id
      this.cartParams.profile_name = data.profile_name
      this.cartParams.avatar_url = data.avatar_url
      this.cartParams.description_raw = data.description_raw
      // console.log(this.cartParams)
      axios.post(apiConfig.kolCollectUrl, this.cartParams, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleDoAddCartSucc)
    },
    handleDoAddCartSucc (res) {
      console.log(res)
      let resData = res.data
      console.log(resData)
      if (res.status == 201) {
        if (!!resData.error && resData.error == 1) {
          alert(resData.detail)
          return false
        }
        alert('您已成功添加至购物车')
      }
    },
    onPageChange (page) {
      this.isLoading = true;
      this.currentPage = page - 1;
      this.currentPageAdd = page;
      this.searchListBox = [];
      // 初始化参数
      this.paramsInit();
      // 调用接口
      this.totalJoggle(this.tabIndex);
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
.fluenceactive, .relevanceactive {
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
}
</style>
