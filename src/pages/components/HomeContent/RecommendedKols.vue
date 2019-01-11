<!--  -->
<template>
  <div class="home-kol">
    <h5 class="h-analytic-title">Recommended Kols</h5>
    <div class="home-kol-con">
      <el-tabs v-model="kolActiveName" type="card" @tab-click="handleClick">
        <el-tab-pane label="微博" name="first">
          <div class="home-kol-clomn-box">
            <el-row
              :gutter="0"
              class="home-kol-clomn"
              v-for="(item, index) in weiboList"
              :key="index"
            >
              <el-col :xs="24" :sm="24" :md="4" :lg="4">
                <img src alt class="home-kol-img">
              </el-col>
              <el-col :xs="24" :sm="24" :md="16" :lg="16" class="home-kol-txt">
                <strong>{{item.name}}</strong>
                <p>{{item.describe}}</p>
              </el-col>
              <el-col :xs="3" :sm="3" :md="2" :lg="2">
                <span class="home-kol-star"></span>
              </el-col>
              <el-col :xs="3" :sm="3" :md="2" :lg="2">
                <span class="home-kol-message"></span>
              </el-col>
            </el-row>
          </div>
          <div class="home-kol-clomn-btnbox">
            <span class="home-kol-clomn-btn">查看更多</span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="微信" name="second">微信</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import homeDataJs from "../HomeContent/homeglobal.js";
export default {
  data() {
    return {
      kolActiveName: "first",
      weiboList: homeDataJs.weiboList
    };
  },
  methods: {
    handleClick(tab, event) {}
  }
};
</script>
<style>
</style>