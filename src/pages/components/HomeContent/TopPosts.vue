<!--  -->
<template>
  <div class="home-kol">
    <h5 class="h-analytic-title">Top Posts</h5>
    <div class="home-kol-con home-post-con">
      <ul class="h-analytic-tab clearfix">
        <li
          :class="{active:cur == item.cur}"
          @click="tabClick(item.cur)"
          v-for="(item, index) in tabList"
          :key="index"
        >{{item.name}}</li>
      </ul>
      <div v-if="cur === 0" class>
        <div class="home-kol-clomn-box">
          <div class="home-kol-clomn clearfix" v-for="(item, index) in weiboList" :key="index">
            <div class="home-kol-img">
              <img src alt class>
            </div>
            <div class="home-kol-txt">
              <strong>{{item.name}}</strong>
              <p>{{item.describe}}</p>
            </div>
          </div>
        </div>
        <div class="home-kol-clomn-btnbox">
          <span class="home-kol-clomn-btn">查看更多</span>
        </div>
      </div>
      <div v-else class>
         <div class="home-kol-clomn-box">
          <div class="home-kol-clomn clearfix" v-for="(item, index) in weiboList" :key="index">
            <div class="home-kol-img">
              <img src alt class>
            </div>
            <div class="home-kol-txt">
              <strong>{{item.name}}4</strong>
              <p>{{item.describe}}5</p>
            </div>
          </div>
        </div>
        <div class="home-kol-clomn-btnbox">
          <span class="home-kol-clomn-btn">查看更多</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import homeDataJs from "../HomeContent/homeglobal.js";
export default {
  data() {
    return {
      cur: 0,
      tabList: [
        {
          cur: 0,
          name: "微博"
        },
        {
          cur: 1,
          name: "微信"
        }
      ],
      weiboList: homeDataJs.weiboList
    };
  },
  methods: {
    tabClick(num) {
      this.cur = num;
    }
  }
};
</script>
<style lang="scss" scoped>
.home-post-con{
  .home-kol-txt{
    width: 84%;
    p{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>