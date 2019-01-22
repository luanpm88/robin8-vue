<template>
  <div class="panel default-panel">
    <div class="panel-head">
      <h5 class="title purple">
        <span class="iconfont icon-rocket"></span>
        Recommended Kols
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
import axios from 'axios';
import apiConfig from '@/config';
import DefaultTabs from "@components/DefaultTabs";
import KolsListItem from "../../campaigns/components/KolsListItem";
// let key = "&application_id=local-001&application_key=vue-001";
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
    this.weiboKol();
  },
  methods: {
    changeTab(tab) {
      // console.log(tab);
      this.tabIndex = tab.index;
      // this.currentList = tab.data;
    },
    weiboKol() {
      const _that = this;
      axios.post(apiConfig.kolsWeibo,{
        start_date: "2018-08-09",
        end_date: "2018-08-29",
        brand_keywords: "BMW",
        order_by: 'doc_count'
      }).then(function(res) {
          res.data.forEach(element => {
            element.name = element.profile_name;
            element.desc = element.description_raw;
            element.url = element.avatar_url;
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
  padding: 20px;
}
</style>
