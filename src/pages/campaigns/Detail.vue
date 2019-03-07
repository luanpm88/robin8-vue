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
              <span class="num">{{detailData.join_count}}</span>
            </div>
          </div>
          <div class="item">
            <div class="title">点击数</div>
            <div class="text">
              <span class="num">{{detailData.total_click}}</span>
            </div>
          </div>
          <div v-if="detailData.per_budget_type == 'cpa' || detailData.per_budget_type == 'click'" class="item">
            <div class="title">计费点击</div>
            <div class="text">
              <span class="num">{{detailData.avail_click}}</span>
            </div>
          </div>
          <div v-if="detailData.per_budget_type == 'post'" class="item">
            <div class="title">转发量</div>
            <div class="text">
              <span class="num">{{detailData.post_count}}</span>
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
            <div v-if="kolsList.length > 0">
              <table class="default-table kol-list">
                <thead>
                  <tr>
                    <th class="text-center">头像</th>
                    <th class="text-center">昵称</th>
                    <th v-if="detailData.per_budget_type != 'post' && detailData.per_budget_type != 'simple_cpi' && detailData.per_budget_type != 'cpt'" class="text-center">计费点击</th>
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
                    <td v-if="detailData.per_budget_type != 'post' && detailData.per_budget_type != 'simple_cpi' && detailData.per_budget_type != 'cpt'" class="text-center">{{item.get_avail_click}}</td>
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
            <div v-else class="empty-area text-center">暂时还没有KOL转发活动!</div>
          </div>
          <div v-if="tabIndex == 1">
            <div class="chart-list clearfix">
              <div class="chart-item">
                <Echarts
                  :options="ageOption"
                  :chartsStyle="chartsStyle"
                  ref="ageChart"
                ></Echarts>
              </div>
              <div class="chart-item">
                <Echarts
                  :options="genderOption"
                  :chartsStyle="chartsStyle"
                  ref="genderChart"
                ></Echarts>
              </div>
              <div class="chart-item">
                <Echarts
                  :options="tagOption"
                  :chartsStyle="chartsStyle"
                  ref="tagChart"
                ></Echarts>
              </div>
              <div class="chart-item">
                <Echarts
                  :options="regionOption"
                  :chartsStyle="chartsStyle"
                  ref="regionChart"
                ></Echarts>
              </div>
            </div>
          </div>
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
            :options="participateOptions"
            :chartsStyle="chartsStyle"
            ref="participateChart"
          ></Echarts>
        </div>
      </div>
    </div>

    <div v-if="detailData.status == 'settled'" class="panel default-panel mt20">
      <div class="panel-head">
        <div class="title-bar">
          <h5 class="title">评价详情</h5>
        </div>
      </div>
      <div class="panel-body">
        <div v-if="evaluationStatus == 'evaluating'" class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.evaluatePoint.title')}}：</div>
            <div class="col-sm-8">
              <a-rate v-model="commentSubmit.effect_score" />
              <input
                type="hidden"
                name="points"
                :value="commentSubmit.effect_score"
              />
              {{commentSubmit.effect_score}} 分
              <div
                class="form-tips danger"
                v-show="errors.has('points') || commentSubmit.effect_score == '0'"
              >
                {{$t('lang.campaigns.evaluatePoint.errorTips')}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.evaluateComment.title')}}：</div>
            <div class="col-sm-8">
              <textarea
                name="comment"
                class="form-control"
                :class="[errors.has('comment') ? 'danger' : '']"
                :placeholder="$t('lang.campaigns.evaluateComment.placeholder')"
                rows="4"
                v-model="commentSubmit.review_content"
                v-validate="'required'"
              ></textarea>
              <div
                class="form-tips danger"
                v-show="errors.has('comment')"
              >
                {{$t('lang.campaigns.evaluateComment.errorTips')}}
              </div>
            </div>
          </div>

          <div class="text-center comment-submit-area">
            <p class="tips">活动一旦评价将不能修改</p>
            <button
              type="button"
              class="btn btn-cyan submit-btn mt20"
              @click="doCommentSubmit"
              :disabled="commentCanSubmit ? false : true"
            >{{$t('lang.submitBtn')}}</button>
          </div>
        </div>

        <div v-else-if="evaluationStatus == 'evaluated'" class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.evaluatePoint.title')}}：</div>
            <div class="col-sm-8">
              <a-rate :value="detailData.effect_score" disabled />
              {{detailData.effect_score}} 分
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.evaluateComment.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.review_content}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center p30">
      <router-link
        v-if="detailData.status == 'unpay' || detailData.status == 'pending' || detailData.status == 'rejected'"
        class="btn btn-cyan btn-outline edit-btn"
        :to="'/campaigns/'+ $route.params.id +'/edit'"
      >编辑活动</router-link>
      <button
        v-if="detailData.status == 'unpay' || detailData.status == 'pending' || detailData.status == 'rejected' || detailData.status == 'unexecute'"
        type="button"
        class="btn btn-cyan cancel-btn"
        @click="doCancel"
        :disabled="canCancel ? false : true"
      >撤销活动</button>
      <router-link
        v-if="detailData.status == 'unpay'"
        :to="'/campaigns/'+ $route.params.id +'/pay'"
        class="btn btn-cyan btn-outline pay-btn"
      >支付</router-link>
      <router-link
        v-show="detailData.status != 'pending' && detailData.status != 'unpay' && detailData.status != 'rejected'"
        :to="'/campaigns/create?copy_id='+ detailData.id"
        class="btn btn-cyan edit-btn"
      >再次发布</router-link>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import { Rate } from 'ant-design-vue'
import 'ant-design-vue/lib/rate/style/css'
import Echarts from '@components/Chart/GlobalEcharts'
import 'echarts/map/js/china.js'
import DefaultTabs from "@components/DefaultTabs"
import { mapState } from 'vuex'

export default {
  name: 'CampaignDetail',
  components: {
    ARate: Rate,
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
      evaluationStatus: '',
      commentSubmit: {
        effect_score: 0,
        review_content: ''
      },
      commentCanSubmit: true,
      chartsStyle: {
        height: '400px'
      },
      participateOptions: {
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
          data: ['计费点击', '总点击']
        },
        toolbox: {
          feature: {
            magicType: {
              show: true,
              type: ['stack', 'tiled']
            },
            saveAsImage: {
              show: true
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: '计费点击',
          type: 'line',
          smooth: true,
          areaStyle: {},
          data: []
        },
        {
          name: '总点击',
          type: 'line',
          smooth: true,
          areaStyle: {},
          data: []
        }]
      },
      genderOption: {},
      ageOption: {},
      tagOption: {},
      regionOption: {
        title: {
          text: 'KOL地域分析',
          left: 'left'
        },
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          min: 0,
          max: 100,
          left: 'left',
          top: 'bottom',
          calculable: true
        },
        series: [{
          name: 'KOL地域分析',
          type: 'map',
          mapType: 'china',
          roam: false,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          data: []
        }]
      },
      canCancel: true
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
        this.evaluationStatus = resData.evaluation_status

        let _ageData = resData.age_analysis
        let _ageArr = []
        let _ageTitles = []
        let _ageItem
        if (!!_ageData && _ageData.length > 0) {
          _ageData.forEach(item => {
            _ageItem = commonJs.buildObjData('name', item.name)
            _ageItem.value = item.count
            _ageTitles.push(item.name)
            _ageArr.push(_ageItem)
          })
          this.ageOption = this.setPieOptions('KOL年龄分析', _ageTitles, _ageArr)
        }

        let _genderData = resData.gender_analysis
        let _genderArr = []
        let _genderTitles = []
        let _genderItem
        if (!!_genderData && _genderData.length > 0) {
          _genderData.forEach(item => {
            _genderItem = commonJs.buildObjData('name', item.name)
            _genderItem.value = item.ratio * 100
            _genderTitles.push(item.name)
            _genderArr.push(_genderItem)
          })
          this.genderOption = this.setPieOptions('KOL性别分析', _genderTitles, _genderArr)
        }

        let _tagData = resData.tag_analysis
        let _tagArr = []
        let _tagTitles = []
        let _tagItem
        if (!!_tagData && _tagData.length > 0) {
          _tagData.forEach(item => {
            _tagItem = commonJs.buildObjData('name', item.name)
            _tagItem.value = item.count
            _tagTitles.push(item.name)
            _tagArr.push(_tagItem)
          })
          this.tagOption = this.setPieOptions('KOL个性分析', _tagTitles, _tagArr)
        }

        let _regionData = resData.region_analysis
        let _regionArr = []
        let _regionItem
        if (!!_regionData && _regionData.length > 0) {
          _regionData.forEach(item => {
            _regionItem = commonJs.buildObjData('name', item.province_short_name)
            _regionItem.value = item.province_kols_count
            _regionArr.push(_regionItem)
          })
          _regionArr = _regionArr.sort(commonJs.sortByProperty('value'))
          console.log(_regionArr)
          this.regionOption.visualMap.max = _regionArr[_regionArr.length - 1].value
          this.regionOption.series[0].data = _regionArr
          if (!!this.$refs.regionChart) {
            this.$refs.regionChart.updateOptions(this.regionOption)
          }
        }
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
        this.participateOptions.xAxis.data = resData.labels
        this.participateOptions.series[0].data = resData.avail_clicks
        this.participateOptions.series[1].data = resData.total_clicks
        this.$refs.participateChart.updateOptions(this.participateOptions)
      }
    },
    changeTab(tab) {
      this.tabIndex = tab.index
    },
    onKolsPageChange (page) {
      this.kolsParams.page = page
      // console.log(this.params)
      this.getKolsData()
    },
    setPieOptions (title, chartTitles, chartData) {
      let options = {
        title: {
          text: title,
          x: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          top: 'middle',
          right: 'right',
          data: chartTitles
        },
        series: [{
          name: title,
          type: 'pie',
          radius: '50%',
          data: chartData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
      return options
    },
    doCommentSubmitFn () {
      let _self = this
      if (!_self.commentCanSubmit) {
        return false
      }
      _self.commentCanSubmit = false
      let commentParams = _self.commentSubmit
      commentParams.campaign_id = _self.$route.params.id

      axios.post(apiConfig.campaignEvaluateUrl, commentParams, {
        headers: {
          'Authorization': _self.authorization
        }
      })
      .then(_self.handleDoCommentSubmitFnSucc)
      .catch(function(error) {
        console.log(error)
        alert('提交失败，请重新提交')
        _self.commentCanSubmit = true
      })
    },
    handleDoCommentSubmitFnSucc (res) {
      console.log(res)
      if (res.status == 201) {
        let resData = res.data
        console.log(resData)
        if (resData.error == 1) {
          alert(resData.detail)
        } else {
          this.getDetailData()
        }
      } else {
        alert('提交失败，请重新提交')
      }
      this.commentCanSubmit = true
    },
    doCommentSubmit () {
      this.$validator.validateAll().then((msg) => {
        console.log(msg)
        if (msg) {
          console.log('验证通过')
          this.doCommentSubmitFn()
        }
      })
    },
    doCancel () {
      let _self = this
      if (!_self.canCancel) {
        return false
      }
      _self.canCancel = false
      axios.post(apiConfig.campaignCancelUrl, {
          'campaign_id': _self.$route.params.id
        }, {
        headers: {
          'Authorization': _self.authorization
        }
      })
      .then(_self.handleDoCancelSucc)
      .catch(function(error) {
        console.log(error)
        alert('提交失败，请重新提交')
        _self.canCancel = true
      })
    },
    handleDoCancelSucc (res) {
      console.log(res)
      if (res.status == 201) {
        let _cancelConfirm = confirm('确定要撤销此活动？')
        if (_cancelConfirm) {
          this.$router.push('/campaigns')
        }
      } else {
        alert('提交失败，请重新提交')
      }
      this.canCancel = true
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
.chart-list {
  .chart-item {
    float: left;
    width: 50%;
    &:nth-child(odd) {
      padding-right: 20px;
    }
    &:nth-child(even) {
      padding-left: 20px;
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
.comment-submit-area {
  padding: 20px;
  .submit-btn {
    width: 150px;
  }
}
.cancel-btn, .edit-btn, .pay-btn {
  width: 150px;
}
</style>
