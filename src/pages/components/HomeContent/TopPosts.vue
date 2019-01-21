<template>
  <div class="panel default-panel">
    <div class="panel-head">
      <h5 class="title purple">
        <span class="iconfont icon-calendar"></span>
        Top Posts
      </h5>
    </div>

    <div class="panel-body list-content">
      <default-tabs :tabList="tabList" :tabIndex="tabIndex" @changeTab="changeTab">
        <keep-alive>
          <div class="mt20">
            <kols-list-item
              v-for="(item, index) in currentList"
              :key="index"
              :hasLiked="kolHasLiked"
              :hasMsg="kolHasMsg"
              :hasChecked="kolHasChecked"
              :renderData="item"
            ></kols-list-item>

            <div class="text-center mt20">
              <button type="button" class="btn btn-sm btn-outline btn-circle btn-purple">查看更多</button>
            </div>
          </div>
        </keep-alive>
      </default-tabs>
    </div>
  </div>
</template>

<script>
import DefaultTabs from "@components/DefaultTabs"
import KolsListItem from "../../campaigns/components/KolsListItem"

export default {
  components: {
    DefaultTabs,
    KolsListItem
  },
  data () {
    return {
      kolHasLiked: true,
      kolHasMsg: true,
      kolHasChecked: false,
      tabIndex: 0,
      currentList: [
        {
          name: "Anna Strong",
          desc: "Visual Designer,Google Inc Visual Designer,Google Inc Visual Designer,Google Inc"
        },
        {
          name: "Milano Esco",
          desc: "Well-known car blogger"
        },
        {
          name: "Nick Bold",
          desc: "Web Developer, Facebook Inc"
        },
        {
          name: "Wiltor Delton",
          desc: "Project Manager"
        },
        {
          name: "Nick Stone",
          desc: "Visual Designer, Github Inc"
        }
      ],
      tabList: [
        {
          index: 0,
          name: '微博',
          data: [
            {
              name: "Anna Strong",
              desc: "Visual Designer,Google Inc Visual Designer,Google Inc Visual Designer,Google Inc"
            },
            {
              name: "Milano Esco",
              desc: "Well-known car blogger"
            },
            {
              name: "Nick Bold",
              desc: "Web Developer, Facebook Inc"
            },
            {
              name: "Wiltor Delton",
              desc: "Project Manager"
            },
            {
              name: "Nick Stone",
              desc: "Visual Designer, Github Inc"
            }
          ]
        },
        {
          index: 1,
          name: '微信',
          data: [
            {
              name: "1 Strong",
              desc: "Visual Designer,Google Inc Visual Designer,Google Inc Visual Designer,Google Inc"
            },
            {
              name: "2 Esco",
              desc: "Well-known car blogger"
            },
            {
              name: "3 Bold",
              desc: "Web Developer, Facebook Inc"
            },
            {
              name: "4 Delton",
              desc: "Project Manager"
            },
            {
              name: "5 Stone",
              desc: "Visual Designer, Github Inc"
            }
          ]
        }
      ]
    }
  },
  methods: {
    changeTab (tab) {
      this.tabIndex = tab.index
      this.currentList = tab.data
    }
  }
}
</script>

<style lang="scss" scoped>
.list-content {
  padding: 20px;
}
</style>
