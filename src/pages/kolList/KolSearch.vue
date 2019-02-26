<template>
  <div>
    <div class="kol-list-wrap">
      <h5>Enter a keyword, category or KOL</h5>
      <div class="kol-search clearfix">
        <input type="text" placeholder="please input" v-model="keyword">
        <span class="kol-search-btn" @click="totalSearch">Search</span>
      </div>
      <div class="kol-advance">
        <div class="kol-advance-btn">
          <span @click="showMoreSearch">Advanced Search</span>
        </div>
        <div class="kol-advance-box clearfix" v-if="advancedSearch">
          <div class="kol-advance-line col-xs-6">
            <span class="kol-advance-left col-xs-4">KOL industries:</span>
            <select class="col-xs-7 oneselect" v-model="industry">
              <option value=""></option>
              <option value="airline">Airline</option>
              <option value="appliances">Appliances</option>
              <option value="auto">Car</option>
              <option value="babies">Babies</option>
              <option value="beauty">Beauty</option>
              <option value="books">Books</option>
              <option value="camera">Camera</option>
              <option value="ce">Electronics</option>
              <option value="digital">Digital</option>
              <option value="education">Education</option>
              <option value="entertainment">Entertainment</option>
              <option value="fashion">Fashion</option>
              <option value="finance">Finance</option>
              <option value="fitness">Fitness</option>
              <option value="food">Food</option>
              <option value="furniture">Furniture</option>
              <option value="games">Games</option>
              <option value="health">Gealth</option>
              <option value="hotel">Hotel</option>
              <option value="internet">Hnternet</option>
              <option value="mobile">Mobile</option>
              <option value="music">Music</option>
              <option value="realestate">Realestate</option>
              <option value="sports">Sports</option>
              <option value="travel">Travel</option>
            </select>
          </div>
          <div class="kol-advance-line col-xs-6">
            <span class="kol-advance-left col-xs-4">Engagement:</span>
            <input class="col-xs-3 oneinput" v-model="engagementFrom">
            <b class="col-xs-1">-</b>
            <input class="col-xs-3 oneinput" v-model="engagementTo">
          </div>
          <div class="kol-advance-line col-xs-6">
            <span class="kol-advance-left col-xs-4">Followers:</span>
            <input class="col-xs-3 oneinput" v-model="followerFrom">
            <b class="col-xs-1">-</b>
            <input class="col-xs-3 oneinput" v-model="followerTo">
          </div>
          <div class="kol-advance-line col-xs-6">
            <span class="kol-advance-left col-xs-4">Influence:</span>
            <input class="col-xs-3 oneinput" v-model="influenceFrom">
            <b class="col-xs-1">-</b>
            <input class="col-xs-3 oneinput" v-model="influenceTo">
          </div>
          <div class="kol-advance-line kol-advance-bottom">
            <div class="kol-type">
              <label>
                <input type="checkbox" v-model="kolOnly">
                <span>Only display KOLs that have prices at Robin8</span>
              </label>
            </div>
          </div>
          <div class="form-group text-center">
            <button type="button" class="btn btn-blue btn-outline" @click="totalSearch">Search</button>
          </div>
        </div>
      </div>
    </div>
    <div class="kol-data-wrap mt20">
      <p class="kol-list-topnum">
        <span v-for="(item, index) in topNumList" :key="index
        ">{{item}}</span>
        <span>weixin - R8 managed - {{r8List.wechat_kols_count}}</span>
        <span>weibo - R8 managed - {{r8List.weibo_kols_count}}</span>
      </p>
      <div class>
        <default-tabs
          :tabList="tabList"
          :tabIndex="tabIndex"
          @changeTab="changeTab"
          class="panel-tab"
        >
          <div class="kol-data">
            <ul class="kol-data-tab clearfix">
              <li>Profile</li>
              <li>Price</li>
              <li>R8 KOL</li>
              <li>
                Influence
                <span @click="influencerank(1)"  :class="{'kol-data-rank': true, fluenceactive: isFluenceActive}">
                  <i :class="{one: true, 'is-top-iactive': isFIactive}"></i>
                  <i :class="{two: true, 'is-bottom-iactive': !isFIactive}"></i>
                </span>
              </li>
              <li>
                Relevance
                <span @click="influencerank(2)" :class="{'kol-data-rank': true, relevanceactive: isRelevanceActive}">
                  <i :class="{one: true, 'is-top-iactive': isRIactive}"></i>
                  <i :class="{two: true, 'is-bottom-iactive': !isRIactive}"></i>
                </span>
              </li>
            </ul>
            <div v-for="(key, twoIndex) in searchListBox" :key="twoIndex">
              <ul class="kol-data-content clearfix" v-for="(item, index) in key" :key="index">
                <li>
                  <div class="kol-profile clearfix" @click="intoKolDetail(item)">
                    <img :src="item.avatar_url" alt>
                    <div class="kol-show">
                      <p>
                        {{item.profile_name}}
                        <!-- <i
                        v-if="profile.sex === 0"
                        class="iconfont icon-nanxing"
                        style="color:#096dd9;"
                      ></i>
                        <i v-else class="iconfont icon-nvxing" style="color:#f36dbb"></i>-->
                      </p>
                      <div class="desc">{{item.description_raw}}</div>
                      <div>
                        <span>
                          <i class="iconfont icon-icon-test1"></i>
                          {{item.stats.avg_likes}}
                        </span>
                        <span>
                          <i class="iconfont icon-app"></i>
                          {{item.stats.total_sum_engagement}}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <p class="kol-data-r8">{{item.pricing.direct_price}}</p>
                </li>
                <li>
                  <p class="kol-data-r8" v-if="item.kol_id">Yes</p>
                  <p class="kol-data-r8" v-else>No</p>
                </li>
                <li>
                  <a-progress
                    type="circle"
                    :percent="item.influence / 10"
                    :width="100"
                    :strokeWidth="9"
                    strokeColor="#b37feb"
                    :format="() => item.influence"
                  />
                </li>
                <li>
                  <a-progress
                    type="circle"
                    :percent="item.correlation"
                    :width="100"
                    :strokeWidth="9"
                    strokeColor="#b37feb"
                    :format="() => item.correlation + '%'"
                  />
                </li>
              </ul>
            </div>
          </div>
          <div class="nonetip" v-if="isShow">
            <span>{{$t('lang.totalNoDataTip')}}</span>
          </div>
          <div class="r8-loading" v-if="isLoading">
            <a-spin tip="Loading..."/>
          </div>
          <div class="btn-area">
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
import commonJs from '@javascripts/common.js';
export default {
  name: 'kolsearch',
  components: {
    AProgress: Progress,
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
      keyword: "",
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
      topNumList: [
        "weixin - big data profile - 5,564,575",
        "weibo - big data profile - 65,860,968"
      ],
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
      totalParams: {}
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
      this.totalParams.keywords = this.keyword;
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
        if (element.description_raw.length > 60) {
          element.description_raw = element.description_raw.substr(0, 30) + '...'
        }
        element.influence = parseInt(element.influence * 1000);
        element.correlation = parseInt(element.correlation * 100);
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
    intoKolDetail(item) {
      this.$router.push({
        path: "/kol/",
        name: "KolDetail",
        params: {
          id: item.profile_id,
          type: this.tabIndex,
          brand_keywords: this.totalKeywords
        }
      });
    },
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
                _that.totalKeywords = element.name;
              }
            });
          }
        }
      })
    },
    // influencerank
    influencerank(value) {
      this.isShow = false;
      this.isLoading = true;
      this.currentPage = this.currentPage;
      this.currentPageAdd = this.currentPage + 1;
      this.searchListBox = [];
      if (value === 1) {
        this.isFluenceActive = true;
        this.isRelevanceActive = false;
        this.isFIactive = !this.isFIactive;
        this.listSortType = 1;
        if (this.isFIactive) {
          this.listSortDir = 'asc';
        } else {
          this.listSortDir = 'desc';
        }
        // 重置params
        this.paramsInit();
      } else {
        this.isFluenceActive = false;
        this.isRelevanceActive = true;
        this.isRIactive = !this.isRIactive;
        this.listSortType = 0;
        if (this.isRIactive) {
          this.listSortDir = 'asc';
        } else {
          this.listSortDir = 'desc';
        }
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
span {
  display: inline-block;
}
.kol-list-wrap {
  background: $white;
  box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.08);
  padding: 40px 0px 30px;
  h5 {
    line-height: 20px;
    font-size: 1.8rem;
    font-weight: 400;
    color: #575962;
    text-align: center;
  }
  .form-group {
    button {
      border-radius: 20px;
    }
  }
}
.kol-advance {
  width: 700px;
  margin: 0px auto;
}
.kol-advance-line {
  margin-bottom: 15px;
}
.kol-advance-left {
  line-height: 34px;
  text-align: right;
}
.kol-advance-btn {
  text-align: center;
  padding: 30px 0px 0px;
  span {
    color: nth($purple, 1);
    border-bottom: 1px solid nth($purple, 1);
    font-size: $font-nm;
    cursor: pointer;
  }
}
.kol-advance-box {
  padding-top: 30px;
  .col-xs-6,
  .col-xs-3,
  .col-xs-1 {
    padding: 0px;
  }
  .col-xs-1 {
    text-align: center;
    line-height: 34px;
    font-weight: normal;
  }
  .oneinput {
    padding: 0px 5px;
  }
}
.kol-type {
  span {
    line-height: 34px;
  }
}
.kol-advance-bottom {
  text-align: center;
  .kol-type {
    display: inline-block;
  }
}
.kol-search {
  position: relative;
  width: 642px;
  margin: 30px auto 0px;
  select {
    float: left;
    padding-left: 20px;
  }
  .oneselect {
    width: 13%;
    border-left: 0px;
    padding-top: 2px;
  }
  input {
    width: 88%;
    padding-left: 10px;
    float: left;
    margin-right: -3px;
    height: 34px;
    color: #555;
    background-color: #fff;
    border-left: 1px solid #ebedf2;
    border-top: 1px solid #ebedf2;
    border-bottom: 1px solid #ebedf2;
    border-right: 1px solid transparent;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
}
.kol-search-btn {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  margin-left: -2px;
  top: 0px;
  float: left;
  width: 12%;
  background: nth($purple, 1);
  color: $white;
  line-height: 34px;
  text-align: center;
  cursor: pointer;
}
.kol-data-wrap {
  background: $white;
  box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.08);
  padding: 20px 30px;
  .form-group {
    margin-top: 20px;
    button {
      border-radius: 20px;
    }
  }
}
.kol-data-tab,
.kol-data-content {
  li {
    float: left;
    border-bottom: 1px solid #ddd;
    &:nth-child(1) {
      width: 40%;
    }
    &:nth-child(2) {
      width: 11%;
    }
    &:nth-child(3) {
      width: 11%;
    }
    &:nth-child(4),
    &:nth-child(5) {
      width: 19%;
    }
  }
}
.kol-data-tab {
  li {
    text-align: center;
    line-height: 42px;
    color: #333;
    font-size: 14px;
  }
}
.kol-data-content {
  li {
    text-align: center;
    padding: 16px 0;
    height: 134px;
    .kol-data-r8 {
      line-height: 95px;
    }
  }
}

.kol-profile {
  img {
    display: inline-block;
    vertical-align: middle;
    border-radius: 50%;
    width: 20%;
    margin-right: 2%;
  }
}
.kol-show {
  text-align: left;
  display: inline-block;
  vertical-align: middle;
  width: 75%;
  height: 111px;
  p {
    line-height: 30px;
    color: #333;
    font-size: 16px;
    i {
      vertical-align: -1px;
    }
  }
  .desc {
    overflow: hidden;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  div {
    span {
      padding-right: 11px;
      display: inline-block;
      margin: 10px 0px 0px;
      i {
        vertical-align: -1px;
        font-size: 16px;
      }
    }
  }
}
.kol-list-topnum {
  height: 40px;
  margin-bottom: 10px;
  clear: both;
  span {
    float: left;
    border: 1px solid #ddd;
    margin-right: 10px;
    border-radius: 20px;
    padding: 5px 10px;
    color: #333;
  }
}
.kol-data-rank {
  padding: 0px;
  display: inline-block;
  line-height: 20px;
  cursor: pointer;
  i {
    width: 0;
    height: 0;
    border-style: solid;
  }
  .one {
    display: block;
    border-width: 0 5px 6px;
    border-color: transparent transparent #a7a5a5;
  }
  .two {
    display: block;
    border-width: 6px 5px 0;
    border-color: #a7a5a5 transparent transparent;
    margin: 1px auto 0;
  }
}
.fluenceactive, .relevanceactive {
  .is-top-iactive {
    border-color: transparent transparent #b180ef ;
  }
  .is-bottom-iactive {
    border-color: #b180ef  transparent transparent; 
  }
}
.btn-area{
  text-align: right;
  margin-top: 20px;
}
</style>