<template>
  <div class="panel default-panel">
    <div class="panel-head">
      <h5 class="title purple">
        <span class="iconfont icon-calendar"></span>
        Top Posts
      </h5>
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

      <div class="mt20" v-if="cur === 0">
        <div class="home-kol-clomn-box">
          <kols-list-item
            v-for="(item, index) in weiboList"
            :key="index"
            :dataList="item"
          ></kols-list-item>
        </div>
        <div class="text-center mt20">
          <button type="button" class="btn btn-sm btn-outline btn-circle btn-purple">查看更多</button>
        </div>
      </div>
      <div class="mt20" v-else>
        <div class="text-center mt20">
          <button type="button" class="btn btn-sm btn-outline btn-circle btn-purple">查看更多</button>
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
</style>
