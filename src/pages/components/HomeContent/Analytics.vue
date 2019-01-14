<!--  -->
<template>
  <div class="home-analytic">
    <h5 class="h-analytic-title">Analytics</h5>
    <div class="h-analytic-con">
      <ul class="h-analytic-tab clearfix">
        <li
          :class="{active:cur == item.cur}"
          @click="tabClick(item.cur)"
          v-for="(item, index) in tabList"
          :key="index"
        >{{item.name}}</li>
      </ul>
      <div class="h-analytic-tabcon">
        <div v-if="cur === 0">
          <div class="col-xs-6">
            <line-charts :childData="oneParentsData"></line-charts>
            <p class="h-analytic-type">微博</p>
          </div>
          <div class="col-xs-6">
            <line-charts :childData="oneParentsData"></line-charts>
            <p class="h-analytic-type">微信</p>
          </div>
        </div>
        <div v-if="cur === 1">
          <div class="col-xs-6">
            <tag-charts :tags="parentTags"></tag-charts>
            <p class="h-analytic-type">微博</p>
          </div>
          <div class="col-xs-6">
            <tag-charts :tags="parentTagsTwo"></tag-charts>
            <p class="h-analytic-type">微信</p>
          </div>
        </div>
        <div v-if="cur === 2">
          <div class="col-xs-6">
            <bar-charts :childData="threeParentsData"></bar-charts>
            <p class="h-analytic-type">微博</p>
          </div>
          <div class="col-xs-6">
            <bar-charts :childData="threeParentsData"></bar-charts>
            <p class="h-analytic-type">微信</p>
          </div>
        </div>
        <div v-if="cur === 3">
          <div class="col-xs-6">
            <pie-charts :childData="fourParentsData"></pie-charts>
            <p class="h-analytic-type">微博</p>
          </div>
          <div class="col-xs-6">
            <pie-charts :childData="fourParentsData"></pie-charts>
            <p class="h-analytic-type">微信</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import homeDataJs from "../HomeContent/homeglobal.js";
import LineCharts from "../../../components/Chart/chartLine";
import BarCharts from "../../../components/Chart/chartHorizontalBar";
import PieCharts from "../../../components/Chart/chartPie";
import TagCharts from "../../../components/Chart/chartTags";
export default {
  components: {
    LineCharts,
    BarCharts,
    PieCharts,
    TagCharts
  },
  data() {
    return {
      cur: 0,
      tabList: [
        {
          cur: 0,
          name: "Trends"
        },
        {
          cur: 1,
          name: "Concept"
        },
        {
          cur: 2,
          name: "Competitors"
        },
        {
          cur: 3,
          name: "Sentiments"
        }
      ],
      topActiveName: "first",
      oneParentsData: homeDataJs.linData,
      threeParentsData: homeDataJs.BarData,
      fourParentsData: homeDataJs.PieData,
      parentTagsTwo: homeDataJs.tagCloud.one,
      parentTags: ["Books", "Music", "Fitness", "Beauty", "Babies", "Food"],
      tagColor: "purple"
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(homeDataJs.linData);
      // console.log(tab.name, event);
      if (tab.name === "first") {
      }
      if (tab.name === "fourth") {
        (homeDataJs.PieData.data = [1, 30, 28, 27, 26.38, 24]),
          (homeDataJs.PieData.labels = [
            "Books",
            "Music",
            "Fitness",
            "Beauty",
            "Babies",
            "Food"
          ]);
        this.$set(this.fourParentsData, null, homeDataJs.PieData);
      }
    },
    tabClick(num) {
      this.cur = num;
    }
  }
};
</script>
<style lang="scss" scoped>
.h-analytic-title {
  color: nth($purple, 1);
  font-size: $font-lg-s;
}
.home-analytic {
  padding: $font-lg-ns;
  .h-analytic-title {
    margin-bottom: $font-lg-s;
  }
}
.h-analytic-type {
  text-align: center;
  color: nth($purple, 1);
}
.h-analytic-tabcon{
  padding: 30px 0px 0px;
  overflow: hidden;
}
.h-analytic-tab {
  display: inline-block;
  border: 1px solid #b37feb;
  border-radius: 16px;
  overflow: hidden;
  li {
    float: left;
    line-height: $font-lg-b;
    color: nth($purple, 1);
    padding:0 20px;
    cursor: pointer;
    &.active{
      background: nth($purple, 1);
      color: $white;
    }
  }
}
</style>