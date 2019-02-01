<template>
  <div class="kol-detail-wrap">
    <p class="kol-detail-title">AI EXPECT DETAIL PAGE</p>
    <div class="kol-detail clearfix">
      <div class="kol-detail-side">
        <!-- info -->
        <div class="kol-infobox mb10">
          <p class="kol-info-topbg"></p>
          <img
            :src="infoList.img"
            alt
          >
          <div class="kol-info">
            <p>
              {{infoList.name}}
              <!-- <i class="iconfont icon-nvxing"></i> -->
            </p>
            <p>{{infoList.age}}</p>
            <p>
              <i class="iconfont icon-weizhi"></i>{{infoList.region}}
            </p>
          </div>
          <ul class="clearfix">
            <li v-for="(item, index) in dec" :key='index'>{{item.name}}</li>
          </ul>
        </div>
        <div class="kol-card kol-brand mb10">
          <p class="clearfix">
            <span>Brand mentions</span>
            <b>48</b>
          </p>
          <p class="clearfix">
            <span>Brand sesiment</span>
            <b>48</b>
          </p>
        </div>
        <div class="kol-card mb10">
          <p class="kol-cloumn">Top industry</p>
          <bar-charts :childData="competiteWeiboList" ref="competiteChart"></bar-charts>
        </div>
        <div class="kol-card mb10">
          <p class="kol-cloumn">Keywords
          </p>
          <tag-charts :width="100" :height="200" :taglist="parentTags"></tag-charts>
        </div>
      </div>
      <div class="kol-detail-con">
        <div class="kol-card mb10">
          <p class="kol-cloumn mb10">Activity</p>
          <p class="activity-color">AI expert has not taken any campaigns for your brand so far.</p>
          <p class="activity-color">AI expert has taken the following campaigns for your brands.</p>
          <div class="activity-table">
            <a-table :columns="activeColumns" :dataSource="activeData" :pagination="false"></a-table>
          </div>
        </div>
        <div class="kol-card mb10">
          <p class="kol-cloumn">Analytics</p>
          <div class="analytic-table">
            <a-table :columns="analyticColumns" :dataSource="analyticData" :pagination="false">
              <template slot="campaingns" slot-scope="campaingns">
                <p class="activity-border">{{campaingns.num}} ({{campaingns.camPercent}})</p>
              </template>
              <template slot="performance" slot-scope="performance">
                <p class="activity-border">{{performance.num}} ({{performance.perPercent}})</p>
              </template>
              <template slot="clients" slot-scope="text">
                <p class="activity-border">{{text}}</p>
              </template>
            </a-table>
          </div>
        </div>
        <div class="kol-card mb10">
          <p class="kol-cloumn">Social data</p>
          <div class="activity-table">
            <a-table :columns="socalColumns" :dataSource="socalData" :pagination="false"></a-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import apiConfig from "@/config"
import { Table } from "ant-design-vue"
import BarCharts from "@components/Chart/chartHorizontalBar"
import TagCharts from "@components/Chart/chartTags"
export default {
  name: "KolDetail",
  components: { ATable: Table , BarCharts, TagCharts},
  data() {
    return {
      competiteWeiboList: {
        labels: [],
        dataList: []
      },
      infoList: {
        img: 'https://tva4.sinaimg.cn/crop.0.0.512.512.50/7d9dcce2jw8fbdpbjg039j20e80e874h.jpg',
        name: '-',
        age: 'N/A',
        region: 'N/A'
      },
      dec: [
        {
          name: '-'
        }
      ],
      parentTags: [],
      activeColumns: [
        {
          title: "#",
          align: "center",
          dataIndex: "kley"
        },
        {
          title: "Title",
          align: "center",
          dataIndex: "title"
        },
        {
          title: "Date",
          align: "center",
          dataIndex: "data"
        },
        {
          title: "Performance",
          align: "center",
          dataIndex: "performance"
        }
      ],
      activeData: [
        {
          kley: 1,
          title: "title-1",
          data: "2018-01-1",
          performance: "books"
        },
        {
          kley: 2,
          title: "title-2",
          data: "2018-01-2",
          performance: "books2"
        },
        {
          kley: 3,
          title: "title-3",
          data: "2018-01-3",
          performance: "books3"
        }
      ],
      socalColumns: [
        {
          title: "Platform",
          align: "center",
          dataIndex: "platform"
        },
        {
          title: "Followers",
          align: "center",
          dataIndex: "followers"
        },
        {
          title: "Likes",
          align: "center",
          dataIndex: "likes"
        },
        {
          title: "Shards",
          align: "center",
          dataIndex: "shards"
        },
        {
          title: "Comments",
          align: "center",
          dataIndex: "comment"
        },
        {
          title: "Post-last 30 days",
          align: "center",
          dataIndex: "post"
        },
        {
          title: "Impact score",
          align: "center",
          dataIndex: "impact"
        }
      ],
      socalData: [
        {
          platform: 'weixin',
          followers: 'IOK',
          likes: 20,
          shards: 8,
          comment: 234,
          post: 10,
          impact: 900
        },{
          platform: 'weibo',
          followers: 'None',
          likes: 30,
          shards: 89,
          comment: 534,
          post: 60,
          impact: 890
        }
      ],
      analyticColumns: [
        {
          title: "",
          align: "center",
          dataIndex: "name"
        },
        {
          title: "no.of camppaingns(CPc)",
          align: "center",
          dataIndex: "campaingns",
          scopedSlots: { customRender: 'campaingns' },
        },
        {
          title: "Performance(CPc)",
          align: "center",
          dataIndex: "performance",
          scopedSlots: { customRender: 'performance' }
        },
        {
          title: "Number of Clients",
          align: "center",
          dataIndex: "clients",
          scopedSlots: { customRender: 'clients' }
        }
      ],
      analyticData: [
        {
          name: 'Total',
          campaingns: {
            num: 20,
            camPercent: '',
          },
          performance: {
            num: 5,
            perPercent: '',
          },
          clients: 5
        },
        {
          name: 'Last 30 days',
          campaingns: {
            num: 20,
            camPercent: '30%',
          },
          performance: {
            num: 5,
            perPercent: '0.2%',
          },
          clients: 2
        }
      ],
    }
  },
  created() {
    // console.log(this.$route.params.id);
    // console.log(this.$route.params.type);
    let totalParams = {
      profile_id : this.$route.params.id,
      language: "en"
    }
    if (this.$route.params.type === '0') {
      // 微博相关接口
      this.kolWeiboInfo(totalParams)
      this.kolWeiboIndustry(totalParams)
      // this.kolWeiboKeyword(totalParams)
    } else {
      // weixin
      this.kolWeiXinInfo(totalParams)
      this.kolWeiXinIndustry(totalParams)
      this.kolWeiXinKeyword(totalParams)
      // this.kolWeixinSocial(totalParams)
    }
  },
  methods: {
    // info 微博的接口
    kolWeiboInfo(params) {
      const _that = this
      axios
        .post(apiConfig.kolWeiboInfo, params, {
          headers: {
            'Authorization': _that.authorization
          }
        })
        .then(function(res) {
          console.log(res);
          if (res.status === 200) {
            _that.infoList.img = res.data.avatar_url;
            _that.infoList.name = res.data.profile_name;
            // _that.infoList.age = res.data.gender;
            // _that.infoList.region = res.data.profile_name;
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    // info weixin的接口
    kolWeiXinInfo(params) {
      const _that = this
      axios
        .post(apiConfig.kolWeiXinInfo, params, {
          headers: {
            'Authorization': _that.authorization
          }
        })
        .then(function(res) {
          // console.log('weixin ', res);
          if (res.status === 200) {
            _that.infoList.img = res.data.avatar_url;
            _that.infoList.name = res.data.profile_name;
            // _that.infoList.age = res.data.profile_name;
            // _that.infoList.region = res.data.profile_name;
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    // industry weibo
    kolWeiboIndustry(params) {
      const _that = this
      axios
        .post(apiConfig.kolWeiboIndustry, params, {
          headers: {
            'Authorization': _that.authorization
          }
        })
        .then(function(res) {
          // console.log('weibo ', res);
          if (res.status === 200) {
            _that.competiteWeiboList.dataList = [{ data: res.data.data }];
            _that.competiteWeiboList.labels = res.data.labels;
            _that.$refs.competiteChart.fillData();
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    kolWeiXinIndustry(params) {
      const _that = this
      axios
        .post(apiConfig.kolWeiXinIndustry, params, {
          headers: {
            'Authorization': _that.authorization
          }
        })
        .then(function(res) {
          // console.log('weixin ', res);
          if (res.status === 200) {
            _that.competiteWeiboList.dataList = [{ data: res.data.data }];
            _that.competiteWeiboList.labels = res.data.labels;
            _that.$refs.competiteChart.fillData();
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    // Keyword weibo
    kolWeiboKeyword(params) {
      const _that = this
      axios
        .post(apiConfig.kolWeiboKeyword, params, {
          headers: {
            'Authorization': _that.authorization
          }
        })
        .then(function(res) {
          console.log('weibo ', res);
          if (res.status === 200) {
            console.log(res);
            // _that.parentTags = [];
            // _that.parentTags = res.data;
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    kolWeiXinKeyword(params) {
      const _that = this
      axios
        .post(apiConfig.kolWeiXinKeyword, params, {
          headers: {
            'Authorization': _that.authorization
          }
        })
        .then(function(res) {
          // console.log('weixin ', res);
          if (res.status === 200) {
            _that.parentTags = [];
            _that.parentTags = res.data;
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    // kolWeixinSocial weibo
    kolWeiboSocial(params) {
      const _that = this
      axios
        .post(apiConfig.kolWeiboSocial, params, {
          headers: {
            'Authorization': _that.authorization
          }
        })
        .then(function(res) {
          // console.log('weibo ', res);
          if (res.status === 200) {
            
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    // kolWeixinSocial
    kolWeixinSocial(params) {
      const _that = this
      axios
        .post(apiConfig.kolWeixinSocial, params, {
          headers: {
            'Authorization': _that.authorization
          }
        })
        .then(function(res) {
          console.log('weixin ', res);
          if (res.status === 200) {
            
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
  }
}
</script>
<style  lang="scss" scoped>
.kol-detail-wrap {
  width: 900px;
  margin: 0px auto;
  color: #333;
}
.kol-detail-title {
  font-weight: 600;
  font-size: $font-sm;
  color: #4a4a4aff;
  margin: 13px 0px;
}
.kol-detail-side {
  width: 200px;
  margin-right: 10px;
  float: left;
}
.kol-detail-con {
  width: 690px;
  float: left;
}
.kol-infobox {
  position: relative;
  background: $white;
  img {
    position: absolute;
    width: 43px;
    height: 43px;
    border-radius: 50%;
    left: 50%;
    top: 13px;
    transform: translate(-50%);
  }
  ul {
    padding: 15px 10px 10px;
    li {
      float: left;
      line-height: 20px;
      border-radius: 13px;
      border: 1px solid #716acaff;
      color: #716acaff;
      padding: 0px 10px;
      margin-right: 5px;
      margin-bottom: 10px;
    }
  }
}
.kol-info-topbg {
  height: 36px;
  background: nth($purple, 1);
}
.kol-info {
  padding-top: 30px;
  p {
    text-align: center;
    color: #575962ff;
  }
}
.kol-card {
  background: $white;
  padding: 10px 20px;
}
.kol-brand {
  p {
    span {
      float: left;
      line-height: 25px;
    }
    b {
      float: right;
      color: #948de1ff;
      font-weight: normal;
      line-height: 25px;
      font-size: $font-nm-s;
    }
  }
}
.kol-cloumn {
  border-left: 3px solid nth($purple, 2);
  padding-left: 10px;
  font-size: $font-nm;
}
.activity-color {
  line-height: 30px;
  color: nth($purple, 1);
}
.activity-table{
  margin: 16px 0px 20px;
}
.activity-border{
  border: 1px solid #A347C9FF;
  color: #A347C9FF;
  line-height: 32px;
  font-size: $font-nm-b
}
</style>