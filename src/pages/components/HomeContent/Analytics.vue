<!--  -->
<template>
  <div class="home-analytic">
    <h5 class="h-analytic-title">Analytics</h5>
    <div class="h-analytic-top">
      <el-tabs v-model="topActiveName" type="card" @tab-click="handleClick">
        <el-tab-pane label="Trends" name="first">
            <el-row :gutter="70" class="h-analytic-con">
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <line-charts :childData="onParentsData"></line-charts>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <line-charts :childData="onParentsData"></line-charts>
                </el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="Concept" name="second">Concept</el-tab-pane>
        <el-tab-pane label="Competitors" name="third">Competitors</el-tab-pane>
        <el-tab-pane label="Sentiments" name="fourth">Sentiments</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import homeDataJs from '../HomeContent/homeglobal.js';
import LineCharts from "../../../components/Chart/chartLine";
export default {
  components: {
    LineCharts
  },
  data() {
    return {
      topActiveName: "first",
      onParentsData: homeDataJs.linData
    };
  },
  methods: {
    handleClick(tab, event) {
        console.log(homeDataJs.linData);
      //   console.log(tab, event);
    }
  }
};
</script>
<style>
/* @import "../../../assets/styles/default.scss"; */
/* @import "../../../assets/styles/home.scss"; */
</style>