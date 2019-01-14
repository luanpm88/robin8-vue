<!--  -->
<template>
  <div class="home-kol">
    <h5 class="h-analytic-title">Recommended Kols</h5>
    <div class="home-kol-con">
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
          <kols-list-item v-for="(item, index) in weiboList" :key="index" :dataList="item"></kols-list-item>
        </div>
        <div class="home-kol-clomn-btnbox">
          <span class="home-kol-clomn-btn">查看更多</span>
        </div>
      </div>
      <div v-else class>
         <!-- <div class="home-kol-clomn-box">
          <div class="home-kol-clomn clearfix" v-for="(item, index) in weiboList" :key="index">
            <div class="home-kol-img">
              <img src alt class>
            </div>
            <div class="home-kol-txt">
              <strong>{{item.name}}4</strong>
              <p>{{item.describe}}5</p>
            </div>
            <div class="home-kol-collection">
              <span class="home-kol-star"></span>
              <span class="home-kol-message"></span>
            </div>
          </div>
        </div> -->
        <div class="home-kol-clomn-btnbox">
          <span class="home-kol-clomn-btn">查看更多</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import homeDataJs from "../HomeContent/homeglobal.js";
import KolsListItem from '../../campaigns/components/KolsListItem.1'
export default {
  components: {
    KolsListItem
  },
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
<style lang="scss">
span{
  display: inline-block;
}
.home-kol{
  .h-analytic-title {
    color: nth($purple, 1);
    font-size: $font-lg-s;
    border-bottom: 1px solid #0000001a;
    line-height: 60px;
    padding: 0 $font-lg-ns;
  }
}
.h-analytic-tabcon {
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
    line-height: 28px;
    color: nth($purple, 1);
    border-right: 1px solid nth($purple, 1);
    padding: 0 20px;
    cursor: pointer;
    &.active {
      background: nth($purple, 1);
      color: $white;
    }
    &:last-child{
      border-right: 1px solid transparent;
    }
  }
}
.home-kol-con {
  margin: $font-lg $font-lg-ns;
  padding-bottom: $font-lg-b;
}
.home-kol-img {
  float: left;
  width: 14%;
  img {
    width: 56px;
    height: 56px;
    border: 1px solid #ddd;
    display: inline-block;
    border-radius: 50%;
  }
}
.home-kol-collection{
  width: 16%;
  float: right;
}
.home-kol-star {
  display: inline-block;
  width: 20px;
  height: 19px;
  background: #ffd666ff;
  margin-top: $font-nm-l;
}
.home-kol-message {
  display: inline-block;
  width: 21px;
  height: 21px;
  background: #b37febff;
  float: right;
  margin-top: $font-nm-l;
}
.home-kol-clomn {
  border-bottom: 1px solid #0000001a;
  padding: $font-nm 0px;
  &:last-child {
    border-bottom: 1px solid transparent;
  }
}
.home-kol-txt {
  float: left;
  width: 70%;
  padding-left: 15px;
  box-sizing: border-box;
  padding-top: 7px;
  color: #575962ff;
  strong {
    color: #575962ff;
    font-size: $font-nm-s;
    font-weight: normal;
  }
}
.home-kol-clomn-box {
  padding-bottom: 40px;
}
.home-kol-clomn-btnbox {
  text-align: center;
}
.home-kol-clomn-btn {
  padding: 0 $font-nm-b;
  line-height: $font-lg;
  color: rgba(179, 127, 235, 1);
  border-radius: $font-lg-s;
  border: 1px solid nth($purple, 1);
  cursor: pointer;
}
</style>