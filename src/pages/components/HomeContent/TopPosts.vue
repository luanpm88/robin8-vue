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
          <kols-list-item v-for="(item, index) in weiboList" :key="index" :dataList="item"></kols-list-item>
        </div>
        <div class="home-kol-clomn-btnbox">
          <span class="home-kol-clomn-btn">查看更多</span>
        </div>
      </div>
      <div v-else class>
        <div class="home-kol-clomn-btnbox">
          <span class="home-kol-clomn-btn">查看更多</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KolsListItem from "../../campaigns/components/KolsListItem.1";
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
      weiboList: [
        {
          name: "Anna Strong",
          describe: "Visual Designer,Google Inc Visual Designer,Google Inc Visual Designer,Google Inc",
          isIcon: false,
          isMsg: true,
          isCheck: false
        },
        {
          name: "Milano Esco",
          describe: "Well-known car blogger",
          isIcon: false,
          isMsg: true,
          isCheck: false
        },
        {
          name: "Nick Bold",
          describe: "Web Developer, Facebook Inc",
          isIcon: false,
          isMsg: true,
          isCheck: false
        },
        {
          name: "Wiltor Delton",
          describe: "Project Manager",
          isIcon: false,
          isMsg: true,
          isCheck: false
        },
        {
          name: "Nick Stone",
          describe: "Visual Designer, Github Inc",
          isIcon: false,
          isMsg: true,
          isCheck: false
        }
      ]
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
.home-post-con {
  .home-kol-txt {
    width: 84%;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>