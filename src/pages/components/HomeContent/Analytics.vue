<template>
  <div class="panel default-panel">
    <div class="panel-head">
      <h5 class="title purple">Analytics</h5>
    </div>
    <div class="panel-body list-content">
      <div class="btn-group source-tab">
        <div
          :class="{'btn btn-outline btn-purple': true, 'active':cur == item.cur}"
          @click="tabClick(item.cur)"
          v-for="(item, index) in tabList"
          :key="index"
        >{{item.name}}</div>
      </div>

      <div class="h-analytic-tabcon">
        <div v-if="cur === 0" class="h-analytic-tabbox">
          <line-charts :childData="oneParentsData"></line-charts>
        </div>
        <div v-if="cur === 1" class="h-analytic-tabbox">
          <tag-charts :tags="parentTagsTwo"></tag-charts>
        </div>
        <div v-if="cur === 2" class="h-analytic-tabbox">
          <bar-charts :childData="threeParentsData"></bar-charts>
        </div>
        <div v-if="cur === 3" class="h-analytic-tabbox">
          <pie-charts :childData="fourParentsData"></pie-charts>
        </div>
      </div>
      <p class="h-analytic-type">{{analyticsType}}</p>
    </div>
  </div>
  <!-- <div class="home-analytic">
    <h5 class="h-analytic-title">Analytics</h5>
    <div class="h-analytic-con">
      <ul class="h-analytic-tab">
        <li
          :class="{active:cur == item.cur}"
          @click="tabClick(item.cur)"
          v-for="(item, index) in tabList"
          :key="index"
        >
          {{item.name}}
          <div :attr="item.cur" class="h-analytic-childTab">
            <p @click="secondTab(item.cur, child)" v-for="(child, twoindex) in item.childList"
          :key="twoindex">{{child.type}}</p>
          </div>
        </li>
      </ul>
      <div class="h-analytic-tabcon">
        <div v-if="cur === 0" class="h-analytic-tabbox">
          <line-charts :childData="oneParentsData"></line-charts>
        </div>
        <div v-if="cur === 1" class="h-analytic-tabbox">
          <tag-charts :tags="parentTagsTwo"></tag-charts>
        </div>
        <div v-if="cur === 2" class="h-analytic-tabbox">
          <bar-charts :childData="threeParentsData"></bar-charts>
        </div>
        <div v-if="cur === 3" class="h-analytic-tabbox">
          <pie-charts :childData="fourParentsData"></pie-charts>
        </div>
      </div>
      <p class="h-analytic-type">{{analyticsType}}</p>
    </div>
  </div> -->
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
      analyticsType: '微博',
      cur: 0,
      tabList: [
        {
          cur: 0,
          name: "Trends",
          childList: [
            {
              value: 0,
              type: '微博'
            },
            {
              value: 1,
              type: '微信'
            }
          ]
        },
        {
          cur: 1,
          name: "Concept",
          childList: [
            {
              value: 0,
              type: '微博'
            },
            {
              value: 1,
              type: '微信'
            }
          ]
        },
        {
          cur: 2,
          name: "Competitors",
          childList: [
            {
              value: 0,
              type: '微博'
            },
            {
              value: 1,
              type: '微信'
            }
          ]
        },
        {
          cur: 3,
          name: "Sentiments",
          childList: [
            {
              value: 0,
              type: '微博'
            },
            {
              value: 1,
              type: '微信'
            }
          ]
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
      let parentNode = document.getElementsByClassName('h-analytic-childTab');
      for (let i = 0; i < parentNode.length; i++) {
        if (i=== num) {
          parentNode[i].style.display = 'block';
        } else {
          parentNode[i].style.display = 'none';
        }
      }
    },
    secondTab(cur, child, e) {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      } else {
        window.event.returnValue = false;
        window.event.cancelBubble = true;
      }
      let parentNode = document.getElementsByClassName('h-analytic-childTab')[cur];
      parentNode.style.display = 'none';
      this.analyticsType = child.type;
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
  // overflow: hidden;
}
.h-analytic-tabbox{
  width: 65%;
  margin: 0px auto;
}
.h-analytic-tab {
  display: inline-block;
  border: 1px solid nth($purple, 1);
  border-radius: 16px;
  // overflow: hidden;
  li {
    float: left;
    line-height: $font-lg-b;
    color: nth($purple, 1);
    border-right: 1px solid nth($purple, 1);
    padding:0 20px;
    cursor: pointer;
    position: relative;
    &.active{
      background: nth($purple, 1);
      color: $white;
    }
    &:first-child{
      border-top-left-radius: 16px;
      border-bottom-left-radius: 16px;
    }
    &:last-child{
      border-right: 1px solid transparent;
      border-top-right-radius: 16px;
      border-bottom-right-radius: 16px;
    }
    div{
      position: absolute;
      z-index: 3;
      background: $white;
      border:  1px solid nth($purple, 1);
      left: 0px;
      top: 2.8rem;
      width: 100%;
      border-radius: 5px;
      display: none;
      p{
        text-align: center;
        color: nth($purple, 1);
        &:hover{
          background: nth($purple, 1);
          color: $white;
        }
      }
    }
    // &:hover{
    //   div{
    //     display: block;
    //   }
    // }
  }
}
</style>
