<template>
  <div class="panel default-panel">
    <div class="panel-head">
      <h5 class="title purple">Analytics</h5>
    </div>

    <div class="panel-body list-content">
      <tab :tabList="tabList" :tabIndex="cur"  @changeTab="tabClick"></tab>
      <div class="mt30">
        <div v-if="cur === 0" class="analytic-box">
          <div class="col-xs-6">
            <line-charts :childData="oneParentsData"></line-charts>
            <p class="h-analytic-type">微博</p>
          </div>
          <div class="col-xs-6">
            <line-charts :childData="oneParentsData"></line-charts>
            <p class="h-analytic-type">微信</p>
          </div>
        </div>
        <div v-if="cur === 1" class="analytic-box">
          <div class="col-xs-6">
            <tag-charts :tags="parentTags"></tag-charts>
            <p class="h-analytic-type">微博</p>
          </div>
          <div class="col-xs-6">
            <tag-charts :tags="parentTagsTwo"></tag-charts>
            <p class="h-analytic-type">微信</p>
          </div>
        </div>
        <div v-if="cur === 2" class="analytic-box">
          <div class="col-xs-6">
            <bar-charts :childData="threeParentsData"></bar-charts>
            <p class="h-analytic-type">微博</p>
          </div>
          <div class="col-xs-6">
            <bar-charts :childData="threeParentsData"></bar-charts>
            <p class="h-analytic-type">微信</p>
          </div>
        </div>
        <div v-if="cur === 3" class="analytic-box">
          <div class="col-xs-6">
            <pie-charts :childData="fourParentsData"></pie-charts>
            <p class="h-analytic-type">微博</p>
          </div>
          <div class="col-xs-6">
            <pie-charts :childData="fourParentsData"></pie-charts>
            <p class="h-analytic-type">微信</p>
          </div>
        </div>
      </div>
      <p class="analytic-type">&nbsp;</p>
    </div>
  </div>
</template>

<script>
import LineCharts from "@components/Chart/chartLine";
import BarCharts from "@components/Chart/chartHorizontalBar";
import PieCharts from "@components/Chart/chartPie";
import TagCharts from "@components/Chart/chartTags";
import Tab from "@components/DefaultTabs";
let key = '&application_id=local-001&application_key=vue-001';
export default {
  components: {
    LineCharts,
    BarCharts,
    PieCharts,
    TagCharts,
    Tab
  },
  data () {
    return {
      analyticsType: "微博",
      cur: 0,
      tabList: [
        {
          index: 0,
          name: "Trends",
          childList: [
            {
              value: 0,
              type: "微博"
            },
            {
              value: 1,
              type: "微信"
            }
          ]
        },
        {
          index: 1,
          name: "Concept",
          childList: [
            {
              value: 0,
              type: "微博"
            },
            {
              value: 1,
              type: "微信"
            }
          ]
        },
        {
          index: 2,
          name: "Competitors",
          childList: [
            {
              value: 0,
              type: "微博"
            },
            {
              value: 1,
              type: "微信"
            }
          ]
        },
        {
          index: 3,
          name: "Sentiments",
          childList: [
            {
              value: 0,
              type: "微博"
            },
            {
              value: 1,
              type: "微信"
            }
          ]
        }
      ],
      topActiveName: "first",
      oneParentsData: {
        data: [16, 3, 16, 61, 4, 6, 2],
        labels: ["07/12", "08/12", "09/12", "10/12", "11/12", "12/12", "13/12"]
      },
      threeParentsData: {
        data: [33.27, 30.55, 28.72, 27.82, 26.38, 24.95],
        labels: ["Books", "Music", "Fitness", "Beauty", "Babies", "Food"]
      },
      fourParentsData: {
        data: [33.27, 30.55, 28.72, 27.82, 26.38, 24.95],
        labels: ["Books", "Music", "Fitness", "Beauty", "Babies", "Food"]
      },
      parentTagsTwo: [
        "Boy",
        "TVDrama",
        "LyricWriting",
        "MusicArrangement",
        "TheLover",
        "Composition",
        "Environment",
        "FreshTexture",
        "Head",
        "World",
        "Daytime",
        "Night",
        "Evening",
        "Dusk",
        "Light",
        "Husband",
        "Advertising",
        "Book",
        "Dish",
        "MobilePhone",
        "WenZhang",
        "Color",
        "RawTexture"
      ],
      parentTags: ["Books", "Music", "Fitness", "Beauty", "Babies", "Food"],
      tagColor: "purple"
    };
  },
  //  mounted() {
  //   let params = {
  //     "start_date": "2018-08-09",
  //     "end_date": "2018-08-29",
  //     "industries": ["airline", "appliances"],
  //     "page_no": 0,
  //     "page_size": 5,
  //     "price_from": 0,
  //     "price_to": 1000
  //   }
  //   this.$axios.post('http://api_beta.robin8.net:8080/api/v1/r1/price/price/kol_search?'+ key,
  //   {
  //       start_date: "2018-08-09",
  //       end_date: "2018-08-29",
  //       industries: ["airline", "appliances"],
  //       page_no: 0,
  //       page_size: 5,
  //       price_from: 1000,
  //       price_to: 9000
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);

  //     });
  //   this.$axios({
  //     methods: "POST",
  //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
  //     data: {
  //       start_date: "2018-08-09",
  //       end_date: "2018-08-29",
  //       industries: ["airline", "appliances"],
  //       page_no: 0,
  //       page_size: 5,
  //       price_from: 1000,
  //       price_to: 9000
  //     },
  //     url: "http://api_beta.robin8.net:8080/api/v1/r1/price/price/kol_search?" + key,
  //   })
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(function(err) {
  //       console.log(err);
  //     });
  // },
  methods: {
    tabClick (tab) {
      this.cur = tab.index;
    },
    secondTab (cur, child, e) {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      } else {
        window.event.returnValue = false;
        window.event.cancelBubble = true;
      }
      let parentNode = document.getElementsByClassName("h-analytic-childTab")[
        cur
      ];
      parentNode.style.display = "none";
      this.analyticsType = child.type;
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
.analytic-box {
  // width: 65%;
  // margin: 0px auto;
}
.h-analytic-type {
  text-align: center;
  color: nth($purple, 1);
}
</style>
