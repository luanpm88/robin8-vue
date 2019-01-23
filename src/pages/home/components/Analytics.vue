<template>
  <div class="panel default-panel">
    <div class="panel-head">
      <h5 class="title purple">Analytics</h5>
    </div>

    <div class="panel-body list-content">
      <tab :tabList="tabList" :tabIndex="cur" @changeTab="tabClick"></tab>
      <div class="mt30">
        <div v-if="cur === 0" class="analytic-box">
          <div class="col-xs-6">
            <line-charts :childData="trendsWeiboList"></line-charts>
            <p class="h-analytic-type">微博</p>
          </div>
          <div class="col-xs-6">
            <line-charts :childData="trendsWeixinList"></line-charts>
            <p class="h-analytic-type">微信</p>
          </div>
        </div>
        <div v-if="cur === 1" class="analytic-box">
          <div class="col-xs-6">
            <tag-charts :tags="parentTags"></tag-charts>
            <p class="h-analytic-type">微博</p>
          </div>
          <div class="col-xs-6">
            <tag-charts :tags="parentTagsTwo"></tag-charts>
            <p class="h-analytic-type">微信</p>
          </div>
        </div>
        <div v-if="cur === 2" class="analytic-box">
          <div class="col-xs-6">
            <bar-charts :childData="competiteWeiboList"></bar-charts>
            <p class="h-analytic-type">微博</p>
          </div>
          <div class="col-xs-6">
            <bar-charts :childData="competiteWeixinList"></bar-charts>
            <p class="h-analytic-type">微信</p>
          </div>
        </div>
        <div v-if="cur === 3" class="analytic-box">
          <div class="col-xs-6">
            <pie-charts :childData="sentimentWeiboList"></pie-charts>
            <p class="h-analytic-type">微博</p>
          </div>
          <div class="col-xs-6">
            <pie-charts :childData="sentimentWeixinList"></pie-charts>
            <p class="h-analytic-type">微信</p>
          </div>
        </div>
      </div>
      <p class="analytic-type">&nbsp;</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import apiConfig from "@/config";
import LineCharts from "@components/Chart/chartLine";
import BarCharts from "@components/Chart/chartHorizontalBar";
import PieCharts from "@components/Chart/chartPie";
import TagCharts from "@components/Chart/chartTags";
import Tab from "@components/DefaultTabs";
let key = "&application_id=local-001&application_key=vue-001";
export default {
  components: {
    LineCharts,
    BarCharts,
    PieCharts,
    TagCharts,
    Tab
  },
  data() {
    return {
      cur: 0,
      trendParams: {
        start_date: "2018-08-09",
        end_date: "2018-08-29",
        brand_keywords: "BMW",
        type: "doc"
      },
      competitorParams: {
        start_date: "2018-08-09",
        end_date: "2018-08-29",
        cb_names: ["C1 BMW", "C2 Audi", "C3 Honda"],
        cb_keywords: ["BMW", "Audi", "Honda"]
      },
      sentimentParams: {
        start_date: "2018-08-09",
        end_date: "2018-08-29",
        brand_keywords: "BMW"
      },
      tabList: [
        {
          index: 0,
          name: "Trends",
          childList: [
            {
              value: 0,
              type: "微博"
            },
            {
              value: 1,
              type: "微信"
            }
          ]
        },
        {
          index: 1,
          name: "Concept",
          childList: [
            {
              value: 0,
              type: "微博"
            },
            {
              value: 1,
              type: "微信"
            }
          ]
        },
        {
          index: 2,
          name: "Competitors",
          childList: [
            {
              value: 0,
              type: "微博"
            },
            {
              value: 1,
              type: "微信"
            }
          ]
        },
        {
          index: 3,
          name: "Sentiments",
          childList: [
            {
              value: 0,
              type: "微博"
            },
            {
              value: 1,
              type: "微信"
            }
          ]
        }
      ],
      trendsWeiboList: {
        labels: [],
        dataList: []
      },
      trendsWeixinList: {
        labels: [],
        dataList: []
      },
      competiteWeiboList: {
        labels: [],
        dataList: []
      },
      competiteWeixinList: {
        labels: [],
        dataList: []
      },
      sentimentWeiboList: {
        data: [],
        labels: []
      },
      sentimentWeixinList: {
        data: [],
        labels: []
      },
      oneParentsData: {
        data: [16, 3, 16, 61, 4, 6, 2],
        labels: ["07/12", "08/12", "09/12", "10/12", "11/12", "12/12", "13/12"]
      },
      threeParentsData: {
        data: [33.27, 30.55, 28.72, 27.82, 26.38, 24.95],
        labels: ["Books", "Music", "Fitness", "Beauty", "Babies", "Food"]
      },
      fourParentsData: {
        data: [33.27, 30.55, 28.72, 27.82, 26.38, 24.95],
        labels: ["Books", "Music", "Fitness", "Beauty", "Babies", "Food"]
      },
      parentTagsTwo: [
        "Boy",
        "TVDrama",
        "LyricWriting",
        "MusicArrangement",
        "TheLover",
        "Composition",
        "Environment",
        "FreshTexture",
        "Head",
        "World",
        "Daytime",
        "Night",
        "Evening",
        "Dusk",
        "Light",
        "Husband",
        "Advertising",
        "Book",
        "Dish",
        "MobilePhone",
        "WenZhang",
        "Color",
        "RawTexture"
      ],
      parentTags: ["Books", "Music", "Fitness", "Beauty", "Babies", "Food"],
      tagColor: "purple"
    };
  },
  created() {
    // trend 微博
    this.trendsWeibo(this.trendParams);
    // trend 微信
    this.trendsWeixin(this.trendParams);
    // this.cur === 0;
    // competitor 微博
    this.competitorWeibo(this.competitorParams);
    // competitor 微信
    this.competitorWeixin(this.competitorParams);
    // sentiment 微博
    this.sentimentWeibo(this.sentimentParams);
    // sentiment 微信
    this.sentimentWeixin(this.sentimentParams);
  },
  methods: {
    tabClick(tab) {
      this.cur = tab.index;
      // console.log(999999);
      if (tab.index === 0) {
        // console.log(7777);
        // trend 微博
        this.trendsWeibo(this.trendParams);
        // trend 微信
        this.trendsWeixin(this.trendParams);
      }
      if (tab.index === 2) {
        // competitor 微博
        this.competitorWeibo(this.competitorParams);
        // competitor 微信
        this.competitorWeixin(this.competitorParams);
      }
      if (tab.index === 3) {
        // sentiment 微博
        this.sentimentWeibo(this.sentimentParams);
        // sentiment 微信
        this.sentimentWeixin(this.sentimentParams);
      }
    },
    // trend 微博
    trendsWeibo(params) {
      const _that = this;
      axios
        .post(apiConfig.trendsWeibo, params)
        .then(function(res) {
          // console.log("我是微博", res);
          _that.trendsWeiboList.dataList = [{ data: res.data.data }];
          _that.trendsWeiboList.labels = res.data.labels;
          // console.log(_that.trendsWeiboList);
          // console.log(66);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // trend 微信
    trendsWeixin(params) {
      const _that = this;
      axios
        .post(apiConfig.trendsWeixin, params)
        .then(function(res) {
          // console.log("我是微信", res);
          _that.trendsWeixinList.dataList = [{ data: res.data.data }];
          _that.trendsWeixinList.labels = res.data.labels;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // competitor 微博
    competitorWeibo(params) {
      const _that = this;
      axios
        .post(apiConfig.competitorWeibo, params)
        .then(function(res) {
          // console.log("我是微博", res);
          _that.competiteWeiboList.dataList = [{ data: res.data.data }];
          _that.competiteWeiboList.labels = res.data.labels;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // competitor 微信
    competitorWeixin(params) {
      const _that = this;
      axios
        .post(apiConfig.competitorWeixin, params)
        .then(function(res) {
          // console.log("我是微信", res);
          _that.competiteWeixinList.dataList = [{ data: res.data.data }];
          _that.competiteWeixinList.labels = res.data.labels;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // sentiment 微博
    sentimentWeibo(params) {
      const _that = this;
      axios
        .post(apiConfig.sentimentWeibo, params)
        .then(function(res) {
          // console.log("我是微博", res);
          _that.sentimentWeiboList.labels = res.data.labels;
          _that.sentimentWeiboList.data = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // sentiment 微信
    sentimentWeixin(params) {
      const _that = this;
      axios
        .post(apiConfig.sentimentWeixin, params)
        .then(function(res) {
          // console.log("我是微信", res);
          _that.sentimentWeixinList.labels = res.data.labels;
          _that.sentimentWeixinList.data = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.list-content {
  padding: 20px;
}
.source-tab {
  overflow: hidden;
  & > .btn {
    padding: 4px 12px;
  }
  & > .btn:first-child {
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
  }
  & > .btn:last-child {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
  }
}
.analytic-box {
  // width: 65%;
  // margin: 0px auto;
}
.h-analytic-type {
  text-align: center;
  color: nth($purple, 1);
}
</style>
