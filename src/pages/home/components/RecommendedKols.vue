<template>
  <div class="panel default-panel home-topPost">
    <div class="panel-head">
      <h5 class="title purple">
        <span class="iconfont icon-rocket"></span>
        Recommended Kols
      </h5>
    </div>

    <div class="panel-body list-content">
      <default-tabs :tabList="tabList" :tabIndex="tabIndex" @changeTab="changeTab">
        <div>
          <kols-list-item
            v-for="(item, index) in currentList"
            :key="index"
            :hasLiked="kolHasLiked"
            :hasMsg="kolHasMsg"
            :hasChecked="kolHasChecked"
            :renderData="item"
          ></kols-list-item>
          <div></div>
          <div class="text-center mt20">
            <button
              type="button"
              class="btn btn-sm btn-outline btn-circle btn-purple"
            >查看更多</button>
          </div>
        </div>
      </default-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import apiConfig from "@/config";
import DefaultTabs from "@components/DefaultTabs";
import KolsListItem from "@/pages/campaigns/components/KolsListItem";
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
      params: {
        start_date: "2018-08-09",
        end_date: "2018-08-29",
        brand_keywords: "BMW",
        order_by: "doc_count"
      },
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
          name: "微博"
        },
        {
          index: 1,
          name: "微信"
        }
      ]
    };
  },
  created() {
    this.weiboKol(this.params);
  },
  methods: {
    changeTab(tab) {
      this.tabIndex = tab.index;
      if (tab.index === 0) {
        // 微博接口
        this.weiboKol(this.params);
      } else {
        // 微信接口
        this.weixinKol(this.params);
      }
    },
    intoKolDetail(item) {
      console.log(item);
      this.$router.push("/kol/" + item.profile_id);
    },
    // 微博的接口
    weiboKol(params) {
      const _that = this;
      axios
        .post(apiConfig.kolsWeibo, params)
        .then(function(res) {
          res.data.forEach(element => {
            element.name = element.profile_name;
            element.desc = element.description_raw;
            element.avatar = element.avatar_url;
          });
          _that.currentList = res.data.slice(0, 5);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 微信的接口
    weixinKol(params) {
      const _that = this;
      axios
        .post(apiConfig.kolsWeixin, params)
        .then(function(res) {
          res.data.forEach(element => {
            element.name = element.profile_name;
            element.desc = element.description_raw;
            element.avatar = element.avatar_url;
          });
          _that.currentList = res.data.slice(0, 5);
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
  padding: 0px 20px 20px;
  height: 450px;
  overflow: hidden;
}
</style>
