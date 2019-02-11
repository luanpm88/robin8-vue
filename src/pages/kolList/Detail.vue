<template>
  <div class="kol-detail-wrap">
    <p class="kol-detail-title">{{infoList.name}}</p>
    <div class="kol-detail clearfix">
      <div class="kol-detail-side">
        <!-- info -->
        <div class="kol-infobox mb10">
          <p class="kol-info-topbg"></p>
          <img :src="infoList.img" alt>
          <div class="kol-info">
            <p>
              {{infoList.name}}
              <i class="iconfont icon-nvxing" v-if="infoList.gender == 'm'"></i>
              <i class="iconfont icon-nanxing" v-if="infoList.gender == 'f'"></i>
            </p>
            <p>{{infoList.age}}</p>
            <p>
              <i class="iconfont icon-weizhi"></i>
              {{infoList.region}}
            </p>
          </div>
          <ul class="clearfix">
            <li v-for="(item, index) in dec" :key="index">{{item}}</li>
          </ul>
        </div>
        <div class="kol-card kol-brand mb10">
          <p class="clearfix">
            <span>Brand Mentions</span>
            <b>{{MentionsNum}}</b>
          </p>
          <p class="clearfix">
            <span>Brand Sentiment</span>
            <b>{{Sentiment}}</b>
          </p>
        </div>
        <div class="kol-card mb10">
          <p class="kol-cloumn">Top Industries</p>
          <bar-charts class="kol-bar-chart" :childData="competiteWeiboList"
          :display='false' :labelSize='12' ref="competiteChart"></bar-charts>
        </div>
        <div class="kol-card mb10">
          <p class="kol-cloumn">Keywords</p>
          <tag-charts :width="150" :height="180" :taglist="parentTags"></tag-charts>
        </div>
      </div>
      <div class="kol-detail-con">
        <div class="kol-card mb10">
          <p class="kol-cloumn mb10">Activity</p>
          <!-- <p class="activity-color">AI expert has not taken any campaigns for your brand so far.</p>
          <p class="activity-color">AI expert has taken the following campaigns for your brands.</p>-->
          <div class="activity-table">
            <table class="com-brand-table">
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Date</th>
                <th>Performance</th>
              </tr>
              <tr v-for="(key, index) in activeList.creations_list" :key="index">
                <td>{{key.id}}</td>
                <td>{{key.title}}</td>
                <td>{{key.date}}</td>
                <td>{{key.amount}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="kol-card mb10">
          <p class="kol-cloumn">Analytics</p>
          <div class="activity-contable">
            <table class="com-brand-table">
              <tr>
                <th></th>
                <th>No. of Campaigns</th>
                <th>Performance (CPC)</th>
                <th>No. of Clients</th>
              </tr>
              <tr>
                <td>Total</td>
                <td v-for="(item, index) in activeList.total_info" :key="index">
                  <p class="activity-border">{{item}}</p>
                </td>
              </tr>
              <tr>
                <td>Last 30 days</td>
                <td v-for="(item, index) in activeList.last_30_days_info" :key="index">
                  <p class="activity-border">{{item}}</p>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="kol-card mb10">
          <p class="kol-cloumn">Social Data</p>
          <div class="activity-table">
            <table class="com-brand-table">
              <tr>
                <th>Platform</th>
                <th>Price</th>
                <th>Followers</th>
                <th>Likes</th>
                <th>Shares</th>
                <th>Comments</th>
                <th>Post-last 21 days</th>
                <th>Influence Score</th>
              </tr>
              <tr>
                <td>{{dataListBox.platform}}</td>
                <td>{{dataListBox.pricing.direct_price}}</td>
                <td>{{dataListBox.fans_number}}</td>
                <td>{{dataListBox.stats.avg_likes}}</td>
                <td>{{dataListBox.stats.avg_shares}}</td>
                <td>{{dataListBox.stats.avg_comments}}</td>
                <td>{{dataListBox.stats.avg_daily_posts}}</td>
                <td>{{dataListBox.stats.avg_post_influences}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import apiConfig from "@/config";
import commonJs from '@javascripts/common.js';
import { Table } from "ant-design-vue";
import BarCharts from "@components/Chart/chartHorizontalBar";
import TagCharts from "@components/Chart/chartTagsTwo";
import { mapState } from "vuex";
export default {
  name: "KolDetail",
  components: { ATable: Table, BarCharts, TagCharts },
  data() {
    return {
      Sentiment: 0,
      competiteWeiboList: {
        labels: [],
        dataList: []
      },
      infoList: {
        img:
          "https://tva4.sinaimg.cn/crop.0.0.512.512.50/7d9dcce2jw8fbdpbjg039j20e80e874h.jpg",
        name: "-",
        age: "N/A",
        region: "N/A"
      },
      dec: ["-"],
      parentTags: [],
      dataListBox: {
        fans_number: 'N/A',
        stats: {
          avg_shares: 'N/A',
          avg_likes: 'N/A',
          avg_reads: 'N/A',
          avg_daily_posts: 'N/A',
          avg_post_influences: 'N/A',
          avg_comments: 'N/A'
        },
        pricing: {
          direct_price: 'N/A'
        }
      },
      activeList: {},
      sentimentParams: {
        start_date: commonJs.commonStartDate,
        end_date: commonJs.commonEndDate,
        brand_keywords: "BMW"
      },
      trendParams: {
        start_date: commonJs.commonStartDate,
        end_date: commonJs.commonEndDate,
        brand_keywords: "BMW",
        type: "doc"
      },
      MentionsList: [],
      MentionsNum: 0
    };
  },
  created() {
    // console.log(this.$route.params.id);
    this.trendParams.brand_keywords = this.$route.params.brand_keywords;
    this.sentimentParams.brand_keywords = this.$route.params.brand_keywords;
    let totalParams = {};
    if (Number(this.$route.params.type) === 0) {
      // 微博相关接口
      totalParams.profile_id = Number(this.$route.params.id);
      totalParams.language = "en";
      this.kolWeiboIndustry(totalParams);
      this.kolWeiboKeyword(totalParams);
      this.kolWeiboSocial(totalParams);
      // 获取sentiment
      this.sentimentWeibo(this.sentimentParams);
      // trend 微博
      this.trendsWeibo(this.trendParams);
    } else {
      // weixin
      // 微博相关接口
      totalParams.profile_id = this.$route.params.id;
      totalParams.language = "en";
      this.kolWeiXinIndustry(totalParams);
      this.kolWeiXinKeyword(totalParams);
      this.kolWeixinSocial(totalParams);
      // 获取sentiment
      this.sentimentWeibo(this.sentimentParams);
    }
    this.kolActivityUrl(totalParams);
  },
  computed: {
    ...mapState(["authorization"])
  },
  methods: {
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
          // console.log('我是furgsInfo weibo', res);
          if (res.status === 200) {
            _that.infoList.img = res.data.avatar_url;
            _that.infoList.name = res.data.profile_name;
            _that.infoList.gender = res.data.gender;
            _that.dec = Object.keys(res.data.industries).slice(0, 3);
            // _that.infoList.age = res.data.gender;
            // _that.infoList.region = res.data.profile_name;
          }
        })
        .catch(function(error) {
          // console.log(error);
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
          // console.log('我是furgsInfo weixin ', res);
          if (res.status === 200) {
            _that.infoList.img = res.data.avatar_url;
            _that.infoList.name = res.data.profile_name;
            _that.infoList.gender = "-";
            // _that.infoList.age = res.data.profile_name;
            // _that.infoList.region = res.data.profile_name;
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // industry weibo
    kolWeiboIndustry(params) {
      const _that = this;
      axios
        .post(apiConfig.kolWeiboIndustry, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          // console.log('weibo kolWeiboIndustry', res);
          if (res.status === 200) {
            _that.competiteWeiboList.dataList = [{ data: res.data.data }];
            _that.competiteWeiboList.labels = res.data.labels;
            _that.$refs.competiteChart.fillData();
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    kolWeiXinIndustry(params) {
      const _that = this;
      axios
        .post(apiConfig.kolWeiXinIndustry, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          // console.log('kolWeiXinIndustry ', res);
          if (res.status === 200) {
            _that.competiteWeiboList.dataList = [{ data: res.data.data }];
            _that.competiteWeiboList.labels = res.data.labels;
            _that.$refs.competiteChart.fillData();
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // Keyword weibo
    kolWeiboKeyword(params) {
      const _that = this;
      axios
        .post(apiConfig.kolWeiboKeyword, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('kolWeiboKeyword weibo ', res);
            _that.parentTags = [];
            _that.parentTags = res.data.slice(0, 25);
            // _that.parentTags = [];
            // _that.parentTags = res.data;
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    kolWeiXinKeyword(params) {
      const _that = this;
      axios
        .post(apiConfig.kolWeiXinKeyword, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          // console.log('weixin ', res);
          if (res.status === 200) {
            _that.parentTags = [];
            _that.parentTags = res.data.slice(0, 25);
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // kolWeixinSocial weibo
    kolWeiboSocial(params) {
      const _that = this;
      axios
        .post(apiConfig.kolWeiboSocial, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            _that.dataListBox = res.data;
            if (!_that.dataListBox.pricing) {
              _that.dataListBox.pricing = {};
              _that.dataListBox.pricing.direct_price = "N/A";
            }
            if (_that.dataListBox.fans_number === '') {
              _that.dataListBox.fans_number = 'N/A'
            }
            if (_that.dataListBox.stats.avg_shares === '') {
              _that.dataListBox.stats.avg_shares = 'N/A'
            }
            if (_that.dataListBox.stats.avg_likes === '') {
              _that.dataListBox.stats.avg_likes = 'N/A'
            }
            if (_that.dataListBox.stats.avg_comments === '') {
              _that.dataListBox.stats.avg_comments = 'N/A'
            }
            if (_that.dataListBox.stats.avg_daily_posts === '') {
              _that.dataListBox.stats.avg_daily_posts = 'N/A'
            }
            if (_that.dataListBox.stats.avg_post_influences === '') {
              _that.dataListBox.stats.avg_post_influences = 'N/A'
            }
            _that.dataListBox.platform = "weibo";
            _that.dataListBox.pricing.direct_price = commonJs.threeFormatter(_that.dataListBox.pricing.direct_price, 2);
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // kolWeixinSocial
    kolWeixinSocial(params) {
      const _that = this;
      axios
        .post(apiConfig.kolWeixinSocial, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('wishiweixn', res)
            _that.dataListBox = res.data;
            if (!_that.dataListBox.pricing) {
              _that.dataListBox.pricing = {};
              _that.dataListBox.pricing.direct_price = "N/A";
            }
            if (_that.dataListBox.status === 'error') {
              _that.dataListBox.stats = {}
              _that.dataListBox.stats.avg_shares = 'N/A'
              _that.dataListBox.stats.avg_likes = 'N/A'
              _that.dataListBox.stats.avg_reads = 'N/A'
              _that.dataListBox.stats.avg_daily_posts = 'N/A'
              _that.dataListBox.stats.avg_post_influences = 'N/A'
              _that.dataListBox.stats.avg_comments = 'N/A'
            }
            if (_that.dataListBox.fans_number === '') {
              _that.dataListBox.fans_number = 'N/A'
            }
            if (!_that.dataListBox.stats.avg_shares) {
              _that.dataListBox.stats.avg_shares = 'N/A'
            }
            if (_that.dataListBox.stats.avg_likes === '') {
              _that.dataListBox.stats.avg_likes = 'N/A'
            }
            if (!_that.dataListBox.stats.avg_comments) {
              _that.dataListBox.stats.avg_comments = 'N/A'
            }
            if (_that.dataListBox.stats.avg_daily_posts === '') {
              _that.dataListBox.stats.avg_daily_posts = 'N/A'
            }
            if (_that.dataListBox.stats.avg_post_influences === '') {
              _that.dataListBox.stats.avg_post_influences = 'N/A'
            }
            _that.dataListBox.platform = "weixin";
            _that.dataListBox.pricing.direct_price = commonJs.threeFormatter(_that.dataListBox.pricing.direct_price, 2);
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // activity analytics 还有info 假如没有info 调用 Fergus的info 接口
    kolActivityUrl(params) {
      const _that = this;
      axios
        .get(
          apiConfig.kolActivityUrl +
            "/" +
            this.$route.params.id +
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
              if (Number(_that.$route.params.type) === 0) {
                // 调用Fergus 微博info
                _that.kolWeiboInfo(params);
              } else {
                // 调用Fergus weixin info
                _that.kolWeiXinInfo(params);
              }
            } else {
              _that.infoList.img = res.data.data.avatar_url;
              _that.infoList.name = res.data.data.profile_name;
              _that.infoList.gender = "-";
              _that.dec = res.data.data.industries;
            }
          }
        })
        .catch(function(error) {
          // console.log(error);
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
          // console.log(error);
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
          // console.log(error);
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
          _that.MentionsList.push(
            res.data.data.slice(
              res.data.data.length - 8,
              res.data.data.length - 1
            )
          );
          _that.MentionsList.forEach(item => {
            _that.MentionsNum += parseInt(item);
          });
        })
        .catch(function(error) {
          // console.log(error);
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
          _that.MentionsList.push(
            res.data.data.slice(
              res.data.data.length - 8,
              res.data.data.length - 1
            )
          );
          _that.MentionsList.forEach(item => {
            _that.MentionsNum += parseInt(item);
          });
        })
        .catch(function(error) {
          // console.log(error);
        });
    }
  }
};
</script>
<style  lang="scss" scoped>
.kol-detail-wrap {
  width: 900px;
  margin: 0px auto;
  color: #333;
}
.kol-detail-title {
  font-weight: 600;
  font-size: $font-sm;
  color: #4a4a4aff;
  margin: 13px 0px;
}
.kol-detail-side {
  width: 200px;
  margin-right: 10px;
  float: left;
}
.kol-detail-con {
  width: 690px;
  float: left;
}
.kol-infobox {
  position: relative;
  background: $white;
  img {
    position: absolute;
    width: 43px;
    height: 43px;
    border-radius: 50%;
    left: 50%;
    top: 13px;
    transform: translate(-50%);
  }
  ul {
    padding: 15px 10px 10px;
    li {
      float: left;
      line-height: 20px;
      border-radius: 13px;
      border: 1px solid #716acaff;
      color: #716acaff;
      padding: 0px 10px;
      margin-right: 5px;
      margin-bottom: 10px;
    }
  }
}
.kol-info-topbg {
  height: 36px;
  background: nth($purple, 1);
}
.kol-info {
  padding-top: 30px;
  p {
    text-align: center;
    color: #575962ff;
  }
}
.kol-card {
  background: $white;
  padding: 10px 20px;
}
.kol-brand {
  p {
    span {
      float: left;
      line-height: 25px;
    }
    b {
      float: right;
      color: #948de1ff;
      font-weight: normal;
      line-height: 25px;
      font-size: $font-nm-s;
    }
  }
}
.kol-cloumn {
  border-left: 3px solid nth($purple, 2);
  padding-left: 10px;
  font-size: $font-nm;
}
.activity-color {
  line-height: 30px;
  color: nth($purple, 1);
}
.activity-table {
  margin: 16px 0px 20px;
}
.activity-border {
  border: 1px solid #a347c9ff;
  color: #a347c9ff;
  line-height: 32px;
  font-size: $font-nm-b;
}
.com-brand-table {
  color: #333;
  width: 100%;
  tr {
    border-bottom: 1px solid #ddd;
    th {
      color: #333;
      font-size: 14px;
      text-align: center;
      padding: 5px 0px;
      &:nth-child(1) {
        width: 8%;
      }
      &:nth-child(2) {
        width: 20%;
      }
    }
  }
  td {
    text-align: center;
    padding: 5px 10px;
    &:nth-child(1) {
      width: 8%;
    }
    &:nth-child(2) {
      width: 20%;
    }
  }
}
.activity-contable {
  table {
    th {
      &:nth-child(1) {
        width: 20%;
      }
    }
    td {
      padding: 10px;
    }
  }
}
.kol-bar-chart {
  margin-top: 20px;
}
</style>