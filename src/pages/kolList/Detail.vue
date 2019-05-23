<template>
  <div class="container mt50 clearfix">
    <div class="kol-detail clearfix">
      <div class="kol-detail-side">
        <!-- info -->
        <!-- kol 详情 -->
        <div class="panel default-panel kol-infobox">
          <div class="panel-head">
          </div>
          <div class="panel-body">
            <!-- <p class="kol-info-topbg"></p> -->
            <div class="kol-small-avatar">
              <img :src="infoList.avatar_url" alt>
            </div>
            <div class="kol-info">
              <p>
                {{infoList.profile_name}}
                <i
                  class="iconfont icon-female"
                  v-if="infoList.gender == 'm' || infoList.gender == 'M'"
                ></i>
                <i
                  class="iconfont icon-male"
                  v-if="infoList.gender == 'f' || infoList.gender == 'F'"
                ></i>
              </p>
              <p>{{infoList.age}}</p>
              <p>
                <i class="iconfont icon-location"></i>
                {{infoList.region}}
              </p>
              <p>
                <a
                  v-if="!!kolProfileLink && kolProfileLink != ''"
                  :href="kolProfileLink"
                  target="_blank"
                  class="btn btn-xs btn-purple btn-outline"
                >
                  <span class="iconfont icon-user"></span>
                  KOL Profile
                </a>
                <button type="button" class="btn btn-xs btn-purple" @click="doAddCart(infoList)">
                  <span class="iconfont icon-cart"></span>
                  Add to cart
                </button>
              </p>
            </div>
            <ul class="clearfix">
              <li v-for="(item, index) in dec" :key="index">{{item}}</li>
            </ul>
            <div class="kol-brand" v-if="type === 0 || type === 1">
              <p class="clearfix">
                <span>{{$t('lang.kolList.detail.currentBrandName')}}</span>
                <b>{{currentBrandName}}</b>
              </p>
              <p class="clearfix" v-if="type === 0 || type === 1">
                <span>
                  <a-tooltip
                    placement="topLeft"
                    :title="$t('lang.kolList.detail.mentionsTip')"
                  >{{$t('lang.kolList.detail.mentions')}}</a-tooltip>
                </span>
                <b>{{MentionsNum}}</b>
              </p>
              <p class="clearfix" v-if="type === 0 || type === 1">
                <span>
                  <a-tooltip
                    placement="topLeft"
                    :title="$t('lang.kolList.detail.sentimentTip')"
                  >{{$t('lang.kolList.detail.sentiment')}}</a-tooltip>
                </span>
                <b>{{Sentiment}}</b>
              </p>
            </div>
          </div>
        </div>
        <!-- industries 行业图表  暂时隐藏-->
        <industries v-if="false"></industries>
      </div>
      <div class="kol-detail-con" v-if="type === 0 || type === 1">
        <!-- 返回按钮 -->
        <div class="top-control-area">
          <button type="button" class="btn btn-purple" @click="goback">
            <span class="iconfont icon-arrow-left"></span>
            {{$t('lang.kolList.detail.btn')}}
          </button>
        </div>
        <!-- tab 平台切换 -->
        <default-tabs
          :tabList="tabList"
          :tabIndex="tabIndex"
          @changeTab="changeTab"
          class="panel-tab mt20"
        ></default-tabs>
        <!-- summary 模块  -->
        <div class="mt20" v-show="tabIndex === 0">
          <summaries :currentKeywords="currentBrandKeywords" :currentName='currentBrandName'></summaries>
        </div>

        <!-- analytic 模块 -->
        <div class="mt20" v-if="tabIndex === 1">
          <analytics></analytics>
        </div>
        <!-- post 模块 目前已经隐藏-->
        <div class="mt20" v-if="tabIndex === 2">
          <posts></posts>
        </div>
      </div>
      <!-- 除了微信和微博  其他平台只展示 socialData 并且 展示的文案不一样 -->
      <div class="kol-detail-con" v-else>
        <div class="top-control-area">
          <button type="button" class="btn btn-purple" @click="goback">
            <span class="iconfont icon-arrow-left"></span>
            {{$t('lang.kolList.detail.btn')}}
          </button>
        </div>
        <div class="panel default-panel mt20">
          <div class="panel-body prl30">
            <p class="kol-cloumn">{{$t('lang.kolList.detail.otherSocialData.title')}}</p>
            <div class="activity-table">
              <table class="com-brand-table">
                <tr>
                  <th>{{$t('lang.kolList.detail.otherSocialData.platform')}}</th>
                  <th>{{$t('lang.kolList.detail.otherSocialData.gender')}}</th>
                  <th>{{$t('lang.kolList.detail.otherSocialData.price')}}</th>
                  <th>{{$t('lang.kolList.detail.otherSocialData.followers')}}</th>
                  <th>{{$t('lang.kolList.detail.otherSocialData.tagsDescription')}}</th>
                </tr>
                <tr>
                  <td>{{otherSocialData.platform}}</td>
                  <td v-if="otherSocialData.gender">{{otherSocialData.gender}}</td>
                  <td v-else>N/A</td>
                  <td>{{otherSocialData.price}}</td>
                  <td>{{otherSocialData.followers}}</td>
                  <td>{{otherSocialData.tagsDescription}}</td>
                </tr>
              </table>
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
import store from '@/store'
import DefaultTabs from "@components/DefaultTabs";
import Echarts from "@components/Chart/GlobalEcharts";
import ChartOption from "@components/Chart/GlobalChartOption";
import commonJs from "@javascripts/common.js";
import { Tooltip } from "ant-design-vue";
import cloud from "@components/Chart/chatCloud";
import { mapState, mapMutations } from "vuex";
// summary
import Summaries from "@/pages/kolList/sum/Index";
// analytics
import Analytics from "@/pages/kolList/analytic/Index";
// posts
import Posts from "@/pages/kolList/posts/Index";
// 左侧的 Industries 图表
import Industries from '@/pages/kolList/components/Industries'
export default {
  name: "KolDetail",
  components: {
    Echarts,
    DefaultTabs,
    Summaries,
    Analytics,
    Posts,
    ATooltip: Tooltip,
    cloud,
    Industries
  },
  data() {
    return {
      Sentiment: 0,
      infoList: {
        avatar_url: "",
        profile_name: "-",
        profile_id: "",
        description_raw: "",
        age: "N/A",
        region: "N/A"
      },
      dec: [],
      decValue: [],
      decKey: [],
      parentTags: [],
      sentimentParams: {
        start_date: commonJs.cPastFourteenDays,
        end_date: commonJs.cPastOneday,
        brand_keywords: "BMW"
      },
      trendParams: {
        start_date: commonJs.cPastFourteenDays,
        end_date: commonJs.cPastOneday,
        brand_keywords: "BMW",
        type: "doc"
      },
      MentionsList: [],
      MentionsNum: 0,
      tabIndex: 0,
      tabList: [
        {
          index: 0,
          name: "kolList.detail.summary"
        },
        {
          index: 1,
          name: "kolList.detail.analytics"
        }
        // ,
        // {
        //   index: 2,
        //   name: "kolList.detail.post"
        // }
      ],
      cartParams: {},
      currentBrandName: "N/A",
      currentBrandKeywords: "",
      otherSocialData: {
        platform: "N/A",
        gender: "N/A",
        price: "N/A",
        followers: "N/A",
        tagsDescription: "N/A"
      },
      kolProfileLink: '',
      canRender: true,
      keywords: '',
      isRelevantBox: true
    };
  },
  created () {
    this.type = Number(this.$route.query.type);
    // 获取brandName 和 key
    this.getBaseData();
  },
  computed: {
    ...mapState(['authorization', 'language']),
    listenLangue() {
      return this.language;
    }
  },
  methods: {
    // summary
    tabIndexOneInit(getBrandName, getBrandKeywords) {
      let totalParams = {};
      // // 优先调用春明大佬给的kol info 当数据为空的时候调用fergus的接口
      // this.kolActivityUrl(totalParams)
      this.infoJoggle(totalParams);
      if (getBrandKeywords !== '') {
        let newKey = "";
        getBrandKeywords.split(",").forEach(item => {
          newKey += '"' + item + '" ';
        });
        // 
        this.trendParams.brand_keywords = newKey;
        // 品牌情绪 计算参数
        this.sentimentParams.brand_keywords = newKey;
      } else {
        this.trendParams.brand_keywords = '';
        this.sentimentParams.brand_keywords = '';
      }
      if (Number(this.$route.query.type) === 0) {
        // 微博相关接口
        totalParams.profile_id = Number(this.$route.params.id);
        // 计算sentiment
        this.sentimentWeibo(this.sentimentParams);
        // 计算Mentions
        this.trendsWeibo(this.trendParams);

      } else {
        if (Number(this.$route.query.type) === 1) {
          // 微信相关接口
          totalParams.profile_id = this.$route.params.id;
          // 计算sentiment
          this.sentimentWeixin(this.sentimentParams);
          // 计算Mentions
          this.trendsWeixin(this.trendParams);
        } else {
          totalParams.profile_id = decodeURIComponent(
            decodeURIComponent(this.$route.params.id)
          );
        }
      }
    },
    changeTab(tab) {
      this.tabIndex = tab.index;
    },
    // info 接口初始化
    infoDataInit(type, res) {
      // console.log(type, res)
      const _that = this;
      // type = 0 微博
      // type = 1 微信
      // type = 2 xiaohongshu
      // type = 3 kuaishou
      // type = 4 bilibili
      // type = 5 douyin
      // type = 6 Instagram
      // type = 7 Youtube
      // type = 8 Facebook
      if (type === 1) {
        _that.infoList.avatar_url = res.data.avatar_url;
        _that.infoList.profile_name = res.data.profile_name;
        _that.infoList.profile_id = res.data.profile_id;
        _that.infoList.description_raw = res.data.description_raw;
        _that.infoList.gender = "-";
      } else {
        _that.infoList.avatar_url = res.data.avatar_url;
        _that.infoList.profile_name = res.data.profile_name;
        _that.infoList.profile_id = res.data.profile_id;
        _that.infoList.description_raw = res.data.description_raw;
        _that.infoList.gender = res.data.gender;
        _that.decValue = Object.values(res.data.industries);
        _that.decKey = Object.keys(res.data.industries);
        _that.decValue.forEach((item, index) => {
          item.keyName = _that.decKey[index];
        });
        _that.decValue.forEach((item, index) => {
          if (item.n_posts === 1) {
            _that.dec.push(item.keyName);
          }
        });

        if (type !== 0) {
          // 其他平台与微信微博的social data的数据不一样
          _that.otherSocialData.gender = res.data.gender;
          if (res.data.pricing.ref_price) {
            _that.otherSocialData.price =
              "¥ " + commonJs.threeFormatter(res.data.pricing.ref_price, 2);
          }
          if (res.data.fans_number) {
            _that.otherSocialData.followers = res.data.fans_number;
          }
          if (res.data.tags_description) {
            _that.otherSocialData.tagsDescription = res.data.tags_description;
          }
        }
      }
    },
    // info 微博的接口
    kolWeiboInfo(params) {
      const _that = this;
      axios
        .post(apiConfig.kolWeiboInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // 处理数据
            _that.infoDataInit(0, res);
            _that.kolProfileLink = 'https://weibo.com/u/'+ res.data.profile_id
          }
        })
        .catch(function(error) {
          // console.log(error)
        });
    },
    // info weixin的接口
    kolWeiXinInfo(params) {
      const _that = this;
      axios
        .post(apiConfig.kolWeiXinInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // 处理数据
            _that.infoDataInit(1, res);
            _that.kolProfileLink = ''
          }
        })
        .catch(function(error) {
          // console.log(error)
        });
    },
    // info xiaohongshu的接口
    kolXiaohongshuInfo(params) {
      const _that = this;
      axios
        .post(apiConfig.kolXiaohongshuInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // 处理数据
            _that.infoDataInit(2, res);
            // 操作social data 数据
            _that.otherSocialData.platform = "xiaohongshu";
            _that.kolProfileLink = 'https://www.xiaohongshu.com/user/profile/'+ res.data.profile_id
          }
        })
        .catch(function(error) {
          // console.log(error)
        });
    },
    // info kolKuaishouInfo的接口
    kolKuaishouInfo(params) {
      const _that = this;
      axios
        .post(apiConfig.kolKuaishouInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          // console.log('kolKuaishouInfo', res)
          if (res.status === 200) {
            // 处理数据
            _that.infoDataInit(3, res);
            // 操作social data 数据
            _that.otherSocialData.platform = "kuaishou";
            _that.kolProfileLink = ''
          }
        })
        .catch(function(error) {
          // console.log(error)
        });
    },
    // info kolBilibiliInfo的接口
    kolBilibiliInfo(params) {
      const _that = this;
      axios
        .post(apiConfig.kolBilibiliInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // 处理数据
            _that.infoDataInit(4, res);
            // 操作social data 数据
            _that.otherSocialData.platform = "bilibili";
            _that.kolProfileLink = 'https://space.bilibili.com/'+ res.data.profile_id
          }
        })
        .catch(function(error) {
          // console.log(error)
        });
    },
    // info kolDouyinInfo的接口
    kolDouyinInfo(params) {
      const _that = this;
      axios
        .post(apiConfig.kolDouyinInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.infoDataInit(5, res);
            // 操作social data 数据
            _that.otherSocialData.platform = "douyin";
            _that.kolProfileLink = ''
          }
        })
        .catch(function(error) {
          // console.log(error)
        });
    },
    // info kolInstagramInfo的接口
    kolInstagramInfo(params) {
      const _that = this;
      axios
        .post(apiConfig.kolInstagramInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.infoDataInit(6, res);
            // 操作social data 数据
            _that.otherSocialData.platform = "instagram";
            _that.kolProfileLink = 'https://www.instagram.com/'+ res.data.profile_id
          }
        })
        .catch(function(error) {
          // console.log(error)
        });
    },
    // info kolYoutubeInfo的接口
    kolYoutubeInfo(params) {
      const _that = this;
      axios
        .post(apiConfig.kolYoutubeInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            console.log(res)
            _that.infoDataInit(7, res);
            // 操作social data 数据
            _that.otherSocialData.platform = "youtube";
            _that.kolProfileLink = 'https://www.youtube.com/'+ res.data.profile_id
          }
        })
        .catch(function(error) {
          // console.log(error)
        });
    },
    // info kolFacebookInfo的接口
    kolFacebookInfo(params) {
      const _that = this;
      axios
        .post(apiConfig.kolFacebookInfo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.infoDataInit(8, res);
            // 操作social data 数据
            _that.otherSocialData.platform = "facebook";
            _that.kolProfileLink = 'https://www.facebook.com/'+ res.data.profile_id
          }
        })
        .catch(function(error) {
          // console.log(error)
        });
    },
    // 初始化 fergus的info 接口
    infoJoggle(params) {
      const _that = this
      if (Number(_that.$route.query.type) === 0) {
        // 调用Fergus 微博info
        _that.kolWeiboInfo(params);
      }
      if (Number(_that.$route.query.type) === 1) {
        // 调用Fergus weixin info
        _that.kolWeiXinInfo(params);
      }
      if (Number(_that.$route.query.type) === 2) {
        // 调用Fergus xiaohongshu
        _that.kolXiaohongshuInfo(params);
      }
      if (Number(_that.$route.query.type) === 3) {
        // 调用Fergus kolKuaishouInfo
        _that.kolKuaishouInfo(params);
      }
      if (Number(_that.$route.query.type) === 4) {
        // 调用Fergus bilibili
        _that.kolBilibiliInfo(params);
      }
      if (Number(_that.$route.query.type) === 5) {
        // 调用Fergus douyin
        _that.kolDouyinInfo(params);
      }
      if (Number(_that.$route.query.type) === 6) {
        // 调用Fergus instagram
        _that.kolInstagramInfo(params);
      }
      if (Number(_that.$route.query.type) === 7) {
        // 调用Fergus Youtube
        _that.kolYoutubeInfo(params);
      }
      if (Number(_that.$route.query.type) === 8) {
        // 调用Fergus Facebook
        _that.kolFacebookInfo(params);
      }
    },
    // activity analytics 还有info 假如没有info 调用 Fergus的info 接口 ---- 目前平台没有在这边，所以只用了 fergus初始化的接口
    kolActivityUrl(params) {
      const _that = this;
      console;
      axios
        .get(
          apiConfig.kolActivityUrl +
            "/" +
            this.$route.params.id.replace(/\./g, "\\/") +
            "/big_v_details",
          params,
          {
            headers: {
              Authorization: _that.authorization
            }
          }
        )
        .then(function(res) {
          if (res.status === 200) {
            _that.activeList = res.data;
            if (_that.activeList.total_info.length === 0) {
              _that.activeList.total_info[0] = "N/A";
              _that.activeList.total_info[1] = "N/A";
              _that.activeList.total_info[2] = "N/A";
            }
            if (_that.activeList.creations_list.length === 0) {
              _that.activeList.creations_list[0] = {};
              _that.activeList.creations_list[0].id = "N/A";
              _that.activeList.creations_list[0].title = "N/A";
              _that.activeList.creations_list[0].date = "N/A";
              _that.activeList.creations_list[0].amount = "N/A";
            }
            if (res.data.data === null) {
              _that.isActivity = false;
              _that.isAnalytics = false;
              if (Number(_that.$route.query.type) === 0) {
                // 调用Fergus 微博info
                _that.kolWeiboInfo(params);
              }
              if (Number(_that.$route.query.type) === 1) {
                // 调用Fergus weixin info
                _that.kolWeiXinInfo(params);
              }
              if (Number(_that.$route.query.type) === 2) {
                // 调用Fergus xiaohongshu
                _that.kolXiaohongshuInfo(params);
              }
              if (Number(_that.$route.query.type) === 3) {
                // 调用Fergus kolKuaishouInfo
                _that.kolKuaishouInfo(params);
              }
              if (Number(_that.$route.query.type) === 4) {
                // 调用Fergus bilibili
                _that.kolBilibiliInfo(params);
              }
              if (Number(_that.$route.query.type) === 5) {
                // 调用Fergus douyin
                _that.kolDouyinInfo(params);
              }
              if (Number(_that.$route.query.type) === 6) {
                // 调用Fergus instagram
                _that.kolInstagramInfo(params);
              }
              if (Number(_that.$route.query.type) === 7) {
                // 调用Fergus Youtube
                _that.kolYoutubeInfo(params);
              }
              if (Number(_that.$route.query.type) === 8) {
                // 调用Fergus Facebook
                _that.kolFacebookInfo(params);
              }
            } else {
              _that.isActivity = true;
              _that.isAnalytics = true;
              _that.infoList.img = res.data.data.avatar_url;
              _that.infoList.name = res.data.data.profile_name;
              _that.infoList.gender = "-";
              _that.dec = res.data.data.industries;
            }
          }
        })
        .catch(function(error) {
          // console.log(error)
        });
    },
    // sentiment 微博
    sentimentWeibo(params) {
      const _that = this;
      axios
        .post(apiConfig.sentimentWeibo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          _that.Sentiment = res.data.data[0];
        })
        .catch(function(error) {
          // console.log(error)
        });
    },
    // sentiment 微信
    sentimentWeixin(params) {
      const _that = this;
      axios
        .post(apiConfig.sentimentWeixin, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          _that.Sentiment = res.data.data[0];
        })
        .catch(function(error) {
          // console.log(error)
        });
    },
    // trend 微博
    trendsWeibo(params) {
      const _that = this;
      axios
        .post(apiConfig.trendsWeibo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.MentionsList = res.data.data.slice(
              res.data.data.length - 8,
              res.data.data.length - 1
            );
            _that.MentionsList.forEach(item => {
              _that.MentionsNum += parseInt(item);
            });
          }
        })
        .catch(function(error) {
          // console.log(error)
        });
    },
    // trend 微信
    trendsWeixin(params) {
      const _that = this;
      axios
        .post(apiConfig.trendsWeixin, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.MentionsList = res.data.data.slice(
              res.data.data.length - 8,
              res.data.data.length - 1
            );
            _that.MentionsList.forEach(item => {
              _that.MentionsNum += parseInt(item);
            });
          }
        })
        .catch(function(error) {
          // console.log(error)
        });
    },
    // 返回上一级
    goback() {
      this.$router.go(-1);
    },
    // 加入购物车
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
        if (resData.error == 1) {
          alert(resData.detail);
          return false;
        }
        alert("您已成功添加至购物车");
      }
    },
    // 获取keyword brand name
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
                  // console.log(element)
                  _that.currentBrandName = element.name;
                  _that.currentBrandKeywords = element.keywords;
                }
              });
            }
            _that.tabIndexOneInit(_that.currentBrandName, _that.currentBrandKeywords)
          }
        });
    }
  },
  beforeRouteEnter (to, from, next) {
    axios.post(apiConfig.userLevelUrl, {}, {
      headers: {
        'Authorization': store.state.authorization
      }
    }).then(function (res) {
      let resData = res.data
      // console.log(resData)
      next(vm => {
        // console.log(to)
        // console.log(from)
        // console.log(vm)
        if (!resData.kol_detail) {
          alert(vm.$i18n.t('lang.kolDetailAlert'))
          vm.$router.push(from.fullPath)
        } else {
          vm.$router.push(to.fullPath)
        }
      })
    })
  }
};
</script>
<style lang="scss" scoped>

</style>
