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
            <!-- <kols-list-item
              v-for="(item, index) in currentList"
              :key="index"
              :hasLiked="kolHasLiked"
              :hasMsg="kolHasMsg"
              :hasChecked="kolHasChecked"
              :renderData="item"
            ></kols-list-item> -->
            <!-- <ul>
              <li v-for="(item, index) in postList" :key="index">
                <img :src="item.avatar_url" alt="">
                <img :src="item.title" alt="">
                <p>{{item.avatar_url}}</p>
              </li>
            </ul> -->
            <div class="home-post">
              
            </div>

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
import axios from "axios";
import apiConfig from "@/config";
import DefaultTabs from "@components/DefaultTabs";
import KolsListItem from "../../campaigns/components/KolsListItem";

export default {
  components: {
    DefaultTabs,
    KolsListItem
  },
  data() {
    return {
      kolHasLiked: true,
      kolHasMsg: true,
      kolHasChecked: false,
      tabIndex: 0,
      topPostParams: {
        start_date: "2018-08-09",
        end_date: "2018-08-29",
        brand_keywords: "BMW",
        page_no: 0,
        page_size: 6
      },
      postList: [],
      currentList: [
        {
          name: "Anna Strong",
          desc:
            "Visual Designer,Google Inc Visual Designer,Google Inc Visual Designer,Google Inc"
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
          name: "微博",
          data: [
            {
              name: "Anna Strong",
              desc:
                "Visual Designer,Google Inc Visual Designer,Google Inc Visual Designer,Google Inc"
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
          name: "微信",
          data: [
            {
              name: "1 Strong",
              desc:
                "Visual Designer,Google Inc Visual Designer,Google Inc Visual Designer,Google Inc"
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
    };
  },
  created() {
    // 微博
    this.topPostWeibo(this.topPostParams);
    // 微信
    this.topPostWeixin(this.topPostParams);
  },
  methods: {
    changeTab(tab) {
      this.tabIndex = tab.index;
      this.currentList = tab.data;
    },
    // 微博的接口
    topPostWeibo(params) {
      const _that = this;
      axios
        .post(apiConfig.topPostWeibo, params)
        .then(function(res) {
          console.log("我是微博接口", res);
          _that.postList = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 微信的接口
    topPostWeixin(params) {
      const _that = this;
      axios
        .post(apiConfig.topPostWeixin, params)
        .then(function(res) {
          console.log("我是微信接口", res);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.list-content {
  padding: 20px;
}
</style>
