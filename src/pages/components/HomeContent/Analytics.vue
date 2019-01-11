<!--  -->
<template>
    <div class="home-analytic">
      <h5 class="h-analytic-title">Analytics</h5>
      <div class="h-analytic-top">
        <el-tabs v-model="topActiveName" type="card" @tab-click="handleClick">
          <el-tab-pane label="Trends" name="first">
            <el-row :gutter="70" class="h-analytic-con">
              <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <line-charts :childData="oneParentsData"></line-charts>
                <p class="h-analytic-type">微博</p>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <line-charts :childData="oneParentsData"></line-charts>
                <p class="h-analytic-type">微信</p>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="Concept" name="second">
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
              <tag-charts :tags="parentTags"></tag-charts>
              <p class="h-analytic-type">微博</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
              <tag-charts :tags="parentTagsTwo"></tag-charts>
              <p class="h-analytic-type">微信</p>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="Competitors" name="third">
            <el-row :gutter="70" class="h-analytic-con">
              <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <bar-charts :childData="threeParentsData"></bar-charts>
                <p class="h-analytic-type">微博</p>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <bar-charts :childData="threeParentsData"></bar-charts>
                <p class="h-analytic-type">微信</p>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="Sentiments" name="fourth">
            <el-row :gutter="70" class="h-analytic-con">
              <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <pie-charts :childData="fourParentsData"></pie-charts>
                <p class="h-analytic-type">微博</p>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <pie-charts :childData="fourParentsData"></pie-charts>
                <p class="h-analytic-type">微信</p>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
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
    }
  }
};
</script>
<style>
/* @import "../../../assets/styles/default.scss"; */
/* @import "../../../assets/styles/home.scss"; */
</style>