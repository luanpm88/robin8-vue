<template>
  <div class="campaign-detail-container">
    <div class="panel default-panel campaign-detail-panel mt20">
      <div class="panel-body">
        <div class="media">
          <div class="media-left">
            <div class="cover">
              <img :src="detailData.img_url" alt="" class="cover-img" />
              <div class="corner-mark tl">
                <div class="text">{{detailData.status_zh}}</div>
              </div>
            </div>
          </div>
          <div class="media-body content">
            <div class="campaign-info">
              <h5 class="title">
                <router-link
                  :to="'/campaigns/' + detailData.id"
                >{{detailData.name}}</router-link>
              </h5>
              <div class="date">最后更新:{{detailData.updated_at}} 按照<span class="per-budget-type">{{detailData.per_budget_type_show}}</span>奖励</div>
              <div class="desc">{{detailData.description}}</div>
              <div class="desc">活动网址:<a :href="detailData.url" target="_blank">{{detailData.url}}</a></div>
            </div>
            <div class="campaign-status">
              <div class="item">
                <div class="title">起止时间</div>
                <div class="text">{{detailData.time_range}}</div>
              </div>
              <div class="item">
                <div class="title">总预算</div>
                <div class="text">
                  ￥<span class="num">{{detailData.budget}}</span>
                </div>
              </div>
              <div class="item">
                <div class="title">一次点击</div>
                <div class="text">
                  ￥<span class="num">{{detailData.per_action_budget}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel default-panel mt20">
      <div class="panel-head">
        <div class="title-bar">
          <h5 class="title">{{$t('lang.campaigns.selectKols')}}</h5>
          <div class="tail-area">预计推送KOL人数 {{detailData.per_push_kols_count}} 人</div>
        </div>
      </div>
      <div class="panel-body">
        <div class="statistics-panel">
          <div class="item">
            <div class="title">{{$t('lang.campaigns.kolDistrict.title')}}</div>
            <div class="text">{{detailData.region}}</div>
          </div>
          <div class="item">
            <div class="title">{{$t('lang.campaigns.tags.title')}}</div>
            <div class="text">{{detailData.tag_labels}}</div>
          </div>
          <div class="item">
            <div class="title">{{$t('lang.campaigns.kolAge.title')}}</div>
            <div class="text">{{detailData.age_zh}}</div>
          </div>
          <div class="item">
            <div class="title">{{$t('lang.campaigns.kolGender.title')}}</div>
            <div class="text">{{detailData.gender_zh}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel default-panel mt20">
      <div class="panel-head">
        <div class="title-bar">
          <h5 class="title">总览</h5>
        </div>
      </div>
      <div class="panel-body">
        <div class="statistics-panel">
          <div class="item">
            <div class="title">已花费</div>
            <div class="text">
              <span class="num">{{detailData.take_budget}}</span>
            </div>
          </div>
          <div class="item">
            <div class="title">参与人数</div>
            <div class="text">
              <span class="num">{{detailData.total_invite_kols_count}}</span>
            </div>
          </div>
          <div class="item">
            <div class="title">点击数</div>
            <div class="text">
              <span class="num">{{detailData.total_click}}</span>
            </div>
          </div>
          <div class="item">
            <div class="title">计费点击</div>
            <div class="text">
              <span class="num">{{detailData.avail_click}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel default-panel kols-list-panel mt20">
      <div class="panel-body">
        <default-tabs
          :tabList="tabList"
          :tabIndex="tabIndex"
          theme="blue"
          @changeTab="changeTab"
        >
          <div v-show="tabIndex == 0">
            <table class="default-table kol-list">
              <thead>
                <tr>
                  <th class="text-center">头像</th>
                  <th class="text-center">昵称</th>
                  <th class="text-center">总点击</th>
                  <th class="text-center">奖励</th>
                  <th class="text-center">截图</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in kolsList"
                  :key="item.id"
                >
                  <td class="text-center">
                    <div class="avatar">
                      <img :src="item.kol.avatar_url" alt="" class="avatar-img" />
                    </div>
                  </td>
                  <td class="text-center">{{item.kol.name}}</td>
                  <td class="text-center">{{item.get_total_click}}</td>
                  <td class="text-center">{{item.total_rewards}}</td>
                  <td class="text-center">
                    <div class="screenshot">
                      <img :src="item.screenshot" alt="" class="screenshot-img" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="p30 text-center">
              <a-pagination
                :defaultCurrent="kolsPage"
                :defaultPageSize="kolsPerPage"
                :total="kolsTotal"
                @change="onKolsPageChange"
              />
            </div>
          </div>
          <div v-show="tabIndex == 1"></div>
        </default-tabs>
      </div>
    </div>

    <div class="panel default-panel mt20">
      <div class="panel-head">
        <div class="title-bar">
          <h5 class="title">参与情况</h5>
        </div>
      </div>
      <div class="panel-body">
        <div class="p30">
          <Echarts
            :options="option"
            :chartsStyle="chartsStyle"
          ></Echarts>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import Echarts from '@components/Chart/GlobalEcharts'
import DefaultTabs from "@components/DefaultTabs"
import { mapState } from 'vuex'

export default {
  name: 'CampaignDetail',
  components: {
    Echarts,
    DefaultTabs
  },
  data () {
    return {
      detailData: {},
      kolsParams: {
        'campaign_id': this.$route.params.id
      },
      kolsList: [],
      kolsPage: 1,
      kolsPerPage: 4,
      kolsTotal: 0,
      tabIndex: 0,
      tabList: [
        {
          index: 0,
          name: 'KOL列表'
        },
        {
          index: 1,
          name: 'KOL分析'
        }
      ],
      chartsStyle: {
        height: '400px'
      },
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          areaStyle: {
            normal: {}
          },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: {
            normal: {}
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }]
      }
    }
  },
  methods: {
    getDetailData () {
      axios.get(apiConfig.campaignsUrl + '/' + this.$route.params.id, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleGetDetailDataSucc)
    },
    handleGetDetailDataSucc (res) {
      let resData = res.data
      if (res.status == 200 && resData) {
        console.log(resData)
        this.detailData = resData
      }
    },
    getKolsData () {
      axios.get(apiConfig.campaignInvitesUrl, {
        params: this.kolsParams,
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleGetKolsDataSucc)
    },
    handleGetKolsDataSucc (res) {
      let resData = res.data
      if (res.status == 200 && resData) {
        console.log(resData)
        this.kolsList = resData.items
        this.kolsTotal = parseInt(resData.paginate['X-Total'])
      }
    },
    getStatisticsData () {
      axios.get(apiConfig.campaignStatisticsUrl, {
        params: {
          'campaign_id': this.$route.params.id
        },
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleGetStatisticsDataSucc)
    },
    handleGetStatisticsDataSucc (res) {
      let resData = res.data
      if (res.status == 200 && resData) {
        console.log(resData)
      }
    },
    changeTab(tab) {
      this.tabIndex = tab.index
      console.log(this.tabIndex)
    },
    onKolsPageChange (page) {
      this.kolsParams.page = page
      console.log(this.params)
      this.getKolsData()
    }
  },
  mounted () {
    this.kolsParams.page = this.kolsPage
    this.kolsParams.per_page = this.kolsPerPage
    this.getDetailData()
    this.getKolsData()
    this.getStatisticsData()
  },
  computed: {
    ...mapState(['authorization'])
  }
}
</script>

<style lang="scss" scoped>
.campaign-detail-panel {
  .content {
    padding: 20px;
  }
  .cover {
    position: relative;
    width: 300px;
    padding-bottom: 75%;
    overflow: hidden;
    .cover-img {
      position: absolute;
      top: 0;
      @include center(x);
      height: 100%;
    }
  }
  .campaign-info {
    .title {
      margin-bottom: 10px;
      font-size: $font-lg-s;
      font-weight: normal;
    }
    .per-budget-type {
      color: nth($cyan, 1);
    }
    .desc {
      @include limit-line(3);
    }
  }
  .campaign-status {
    @include display-flex;
    & > .item {
      @include flex(1);
      text-align: center;
      .num {
        font-size: $font-nm-l;
      }
    }
  }
}
.kols-list-panel {
  .panel-body {
    padding: 30px;
  }
}
.kols-list-panel /deep/ .default-tabs {
  text-align: center;
  .btn-group.pills-btn {
    margin-bottom: 30px;
  }
}
.kol-list {
  td {
    vertical-align: middle;
  }
  .avatar {
    display: inline-block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    .avatar-img {
      width: 100%;
      height: 100%;
    }
  }
  .screenshot {
    display: inline-block;
    width: 100px;
    .screenshot-img {
      width: 100%;
    }
  }
}
.statistics-panel {
  @include display-flex;
  padding: 20px;
  & > .item {
    @include flex(1);
    padding: 20px 0;
    text-align: center;
    .title {
      margin-bottom: 10px;
    }
    .num {
      font-size: $font-nm-l;
    }
  }
}
</style>
