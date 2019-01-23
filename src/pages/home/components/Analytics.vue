<template>
  <div class="panel default-panel">
    <div class="panel-head">
      <h5 class="title purple">
        <span class="iconfont icon-101"></span>
        Analytics <tab :tabList="topTab" :tabIndex="topTabCur" @changeTab="topTabClick" class="panel-tab"></tab></h5>
    </div>

    <div class="panel-body list-content">
      
      <div class="mt30">
        <div class="analytic-box">
          <div class="analytic-chart">
              <line-charts :childData="trendsWeiboList" v-if="cur === 0" ></line-charts>
              <tag-charts :tags="parentTags" v-if="cur === 1"></tag-charts>
              <bar-charts :childData="competiteWeiboList" v-if="cur === 2"></bar-charts>
              <pie-charts :childData="sentimentWeiboList" v-if="cur === 3"></pie-charts>
          </div>
        </div>
      </div>
      <tab :tabList="tabList" :tabIndex="cur" @changeTab="tabClick" class="analytic-bottom-tab"></tab>
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
      topTabCur: 0,
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
      topTab:[
        {
          index: 0,
          name: "微博"
        },
        {
          index: 1,
          name: "微信"
        }
      ],
      tabList: [
        {
          index: 0,
          name: "Trends",
        },
        {
          index: 1,
          name: "Concept",
        },
        {
          index: 2,
          name: "Competitors",
        },
        {
          index: 3,
          name: "Sentiments",
        }
      ],
      trendsWeiboList: {
        labels: [],
        dataList: []
      },
      competiteWeiboList: {
        labels: [],
        dataList: []
      },
      sentimentWeiboList: {
        data: [],
        labels: []
      },
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
    topTabClick(topTab) {
      this.topTabCur = topTab.index;
      if (this.cur === 0 && topTab.index === 0) {
        // trend 微博
        this.trendsWeibo(this.trendParams);
      }
      if (this.cur === 0 && topTab.index === 1) {
        // trend 微信
        this.trendsWeixin(this.trendParams);
      }
      this.topTabCur = topTab.index;
      if (this.cur === 2 && topTab.index === 0) {
        // competitor 微博
        this.competitorWeibo(this.competitorParams);
      }
      if (this.cur === 2 && topTab.index === 1) {
        // competitor 微信
        this.competitorWeixin(this.competitorParams);
      }
    },
    tabClick(tab) {
      this.cur = tab.index;
      this.topTabCur = 0;
      // console.log(999999);
      if (tab.index === 0) {
        // console.log(7777);
        // trend 微博
        this.trendsWeibo(this.trendParams);
        // trend 微信
        // this.trendsWeixin(this.trendParams);
      }
      if (tab.index === 2) {
        // competitor 微博
        this.competitorWeibo(this.competitorParams);
        // // competitor 微信
        // this.competitorWeixin(this.competitorParams);
      }
      if (tab.index === 3) {
        // sentiment 微博
        this.sentimentWeibo(this.sentimentParams);
        // sentiment 微信
        // this.sentimentWeixin(this.sentimentParams);
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
          _that.trendsWeiboList.dataList = [{ data: res.data.data }];
          _that.trendsWeiboList.labels = res.data.labels;
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
          // console.log("我是微博", res);
          _that.competiteWeiboList.dataList = [{ data: res.data.data }];
          _that.competiteWeiboList.labels = res.data.labels;
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
          _that.sentimentWeiboList.labels = res.data.labels;
          _that.sentimentWeiboList.data = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss">
.analytic-chart{
  #line-chart {
    height: 400px !important;
  }
}
</style>
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
.analytic-chart{
   width: 70%;
  margin: 0px auto;
}
.h-analytic-type {
  text-align: center;
  color: nth($purple, 1);
}
.panel-head{
  position: relative;
}
.panel-tab{
  position: absolute;
  right: 30px;
  top: 15px;
}
.analytic-bottom-tab{
  text-align: center;
}
</style>
