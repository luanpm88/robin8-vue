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
              <option value="airline">airline</option>
              <option value="appliances">appliances</option>
              <option value="auto">auto</option>
              <option value="babies">babies</option>
              <option value="beauty">beauty</option>
              <option value="books">books</option>
              <option value="camera">camera</option>
              <option value="ce">Electronics</option>
              <option value="digital">digital</option>
              <option value="education">education</option>
              <option value="entertainment">entertainment</option>
              <option value="finance">finance</option>
              <option value="fitness">fitness</option>
              <option value="food">food</option>
              <option value="furniture">furniture</option>
              <option value="games">games</option>
              <option value="health">health</option>
              <option value="hotel">hotel</option>
              <option value="internet">internet</option>
              <option value="mobile">mobile</option>
              <option value="music">music</option>
              <option value="realestate">realestate</option>
              <option value="sports">sports</option>
              <option value="travel">travel</option>
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
                <span class="kol-data-rank" @click="rank">
                  <i :class="{active: isactive}"></i>
                  <i :class="{active: !isactive}"></i>
                </span>
              </li>
              <li>
                Relevance
                <span class="kol-data-rank" @click="rank">
                  <i :class="{active: isactive}"></i>
                  <i :class="{active: !isactive}"></i>
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
                    :percent="item.influence"
                    :width="100"
                    :strokeWidth="9"
                    strokeColor="#b37feb"
                    :format="() => item.stats.avg_post_influence"
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
          <div class="form-group text-center">
            <button type="button" class="btn btn-blue btn-outline" @click="showMore">Show more</button>
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
import { Table, Progress } from "ant-design-vue";
import { mapState } from "vuex";
export default {
  components: {
    ATable: Table,
    AProgress: Progress,
    DefaultTabs
  },
  props: ["keyWord"],
  data() {
    return {
      profileSort: 1,
      isactive: false,
      keyword: "",
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
      advancedSearch: false,
      topNumList: [
        "weixin - big data profile - 5,564,575",
        "weibo - big data profile - 65,860,968",
        "weixin - R8 managed - 3,189",
        "weibo - R8 managed - 1,026"
      ],
      tabList: [
        {
          index: 0,
          name: "微博"
        },
        {
          index: 1,
          name: "微信"
        }
      ],
      tabIndex: 0,
      searchListBox: [],
      searchList: {}
    };
  },
  created() {
    // 接口
    console.log(this.keyWord.brand_keywords);
    if (this.keyWord.brand_keywords) {
      // console.log(1)
      this.keyword = this.keyWord.brand_keywords;
      this.paramsInit(this.keyWord.type);
    } else {
      this.paramsInit(0);
    }
  },
  computed: {
    ...mapState(["authorization"])
  },
  methods: {
    // params chus
    paramsInit(type) {
      // type = 0 微博
      // type = 1 微信
      if (this.kolOnly) {
        this.kolOnlyText = "Y";
      } else {
        this.kolOnlyText = "N";
      }
      let params = {
        page_no: this.currentPage,
        page_size: 10,
        industry: this.industry,
        engagement_from: this.engagementFrom,
        engagement_to: this.engagementTo,
        influence_from: this.influenceFrom,
        influence_to: this.influenceTo,
        keywords: this.keyword,
        profile_sort_col: 0,
        profile_sort_dir: "desc",
        r8_registered_kol_only: this.kolOnlyText
      };
      if (type === 0) {
        params.folllower_from = this.followerFrom;
        params.follower_to = this.followerTo;
        params.profile_sort_col = this.profileSort;
        // 微博的接口
        this.kollistJoggle(type, params);
      } else {
        // weixin的接口
        this.kollistJoggle(type, params);
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
            console.log("我是weibo接口", res);
            if (res.status === 200) {
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
            _that.jogDataInit(res.data.data);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    // 处理数据函数
    jogDataInit(data) {
      const _that = this;
      data.forEach((element, index) => {
        element.influence = element.stats.avg_post_influence;
        element.correlation = parseInt(element.correlation * 100);
        if (!element.pricing) {
          (element.pricing = {}), (element.pricing.direct_price = "N/A");
        }
      });
      _that.searchList = data;

      // console.log('woshidata', data);
      // console.log('woshidata', data.pricing);
      // // console.log(data.r8_id);
      _that.searchListBox.push(_that.searchList);
      _that.currentPage = _that.currentPage + 1;
    },
    showMoreSearch() {
      this.advancedSearch = !this.advancedSearch;
    },
    changeTab(tab) {
      this.tabIndex = tab.index;
      this.currentPage = 0;
      this.searchListBox = [];
      // 接口
      this.paramsInit(tab.index);
    },
    showMore() {
      // 接口
      this.paramsInit(this.tabIndex);
    },
    totalSearch() {
      this.currentPage = 0;
      this.searchListBox = [];
      // 接口
      this.paramsInit(this.tabIndex);
    },
    intoKolDetail(item) {
      // console.log(item)
      // this.$router.push("/kol/" + item.profile_id)
      this.$router.push({
        path: "/kol/",
        name: "KolDetail",
        params: {
          id: item.profile_id,
          type: this.tabIndex,
          brand_keywords: this.keyWord.brand_keywords
          
        }
      });
    },
    // rank
    rank(){
      this.searchListBox = [];
      this.isactive = !this.isactive;
      if (this.isactive) {
        this.profileSort = 0;
        this.paramsInit(this.tabIndex);
      } else {
        this.profileSort = 1;
        this.paramsInit(this.tabIndex);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
span {
  display: inline-block;
}
.oneinput,
.oneselect {
  height: 34px;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ebedf2;
  border-radius: 4px;
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
    padding: 0px 10px;
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
    line-height: 55px;
    color: #333;
    font-size: 14px;
  }
}
.kol-data-content {
  li {
    text-align: center;
    padding: 16px 0;
    height: 131px;
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
    line-height: 25px;
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
  vertical-align: 17px;
  line-height: 20px;
  cursor: pointer;
  i {
    width: 0;
    height: 0;
    border-style: solid;
    &:nth-child(1) {
      border-width: 0 8px 8px;
      border-color: transparent transparent #a7a5a5;
    }
    &:nth-child(2) {
      display: block;
      border-width: 8px 8px 0;
      border-color: #a7a5a5 transparent transparent;
      margin: 7px auto 0;
    }
  }
  .active {
    &:nth-child(1) {
      border-color: transparent transparent #b180ef ;
    }
    &:nth-child(2) {
      border-color: #b180ef  transparent transparent; 
    }
  }

}
</style>