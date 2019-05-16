<template>
  <div class="container mt50 clearfix">
    <main-nav class="pull-left"></main-nav>

    <div class="home-container pull-right">
      <!-- <home-banner></home-banner> -->
      <!-- <profile-panel></profile-panel> -->

      <div class="icon-grid-panel">
        <router-link to="/kol/list" tag="div" class="item">
          <div class="box">
            <div class="iconfont icon-search"></div>
            <h5 class="title">查找KOL</h5>
            <h6 class="sub-title">Search Engine</h6>
          </div>
        </router-link>
        <router-link to="/create" tag="div" class="item">
          <div class="box">
            <div class="iconfont icon-doc"></div>
            <h5 class="title">创建新活动</h5>
            <h6 class="sub-title">Create Campaign</h6>
          </div>
        </router-link>
        <router-link to="/campaigns" tag="div" class="item">
          <div class="box">
            <div class="iconfont icon-trophy"></div>
            <h5 class="title">活动列表</h5>
            <h6 class="sub-title">My Campaigns</h6>
          </div>
        </router-link>
      </div>
      <!-- 内容开始 -->
      <!-- 刚注册的用户 假如已经输入竞争者的品牌 渲染内容 -->
      <div v-if="isCompetitors">
        <!-- <div class="panel default-panel mt20"> -->
          <!-- <div class="panel-head">
            <h5 class="title text-center">{{$t('lang.homePage.brandTop')}}</h5>
          </div> -->
          <!-- <div class="panel-body p30 clearfix">
            <div class="form-horizontal default-form">
              <div class="form-group">
                <div class="col-sm-4 control-label">{{$t('lang.homePage.noBrandTip')}}:</div>
                <div class="col-sm-6">
                  <select
                    name="seletBrand"
                    class="form-control"
                    v-model="seletBrandId"
                    @change="changeBrand"
                  >
                    <option
                      v-for="(item, index) of allBrandList"
                      :key="index"
                      :value="item.id"
                    >
                      {{item.name}}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div> -->
        <!-- </div> -->

        <!-- <home-analytic class="mt20" :childKeyList='keyList' :isSelectBrand="isTotalBrand"></home-analytic> -->

        <div class="home-show row mt20">
          <div class="col-xs-6">
            <home-recommended-kols :childKeyList='keyList' :isSelectBrand="isTotalBrand"></home-recommended-kols>
          </div>
          <div  class="col-xs-6">
            <home-top-posts :childKeyList='keyList' :isSelectBrand="isTotalBrand"></home-top-posts>
          </div>
        </div>
      </div>
      <!-- 刚注册的用户 假如没有输入竞争者和品牌 展现表格让用户填  -->
      <div v-else>
        <update-base-info @updateStatus="changeHomStatus"></update-base-info>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import MainNav from '@components/MainNav'
import ProfilePanel from '@components/ProfilePanel'
import HomeBanner from './components/HomeBanner'
import HomeAnalytic from './components/Analytics'
import HomeRecommendedKols from './components/RecommendedKols'
import HomeTopPosts from './components/TopPosts'
import UpdateBaseInfo from './components/UpdateBaseInfo'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    MainNav,
    ProfilePanel,
    HomeBanner,
    HomeAnalytic,
    HomeRecommendedKols,
    HomeTopPosts,
    // brandSubmit,
    UpdateBaseInfo
  },
  computed: {
     ...mapState(['authorization'])
  },
  data () {
    return {
      isCompetitors: true,
      isHomeStatus: 'Yes',
      parentSentiment: '',
      keyList: {
        name: '',
        brand_keywords: '',
        cb_keywords: [],
        cb_names: [],
        tabIndex: 0,
      },
      allBrandList: [],
      seletBrandId: '',
      isTotalBrand: false
    }
  },
  created() {
    this.getBaseData()
    if (!this.isTotalBrand) {
      this.keyList =  {
        name: '',
        brand_keywords: '',
        cb_keywords: [],
        cb_names: [],
        tabIndex: 0,
      }
    }
    if (this.$route.query.currentBrand) {
      this.keyList.tabIndex = 0
    }
    if (this.$route.query.curentCompittor) {
      this.keyList.tabIndex = 2
    }
  },
  methods: {
    // 获取my brand 页面
    getBaseData () {
      const _that = this
      axios.get(apiConfig.baseInfosUrl, {
        headers: {
          'Authorization': _that.authorization
        }
      }).then(function(res) {
        if (res.status === 200) {
          // 判断有没有竞争者，假如没有竞争者，要控制页面视图让用户输入竞争者
          if (res.data.competitors.length == 0 && res.data.trademarks_list.length == 0) {
            _that.isCompetitors = false
          } else {
            _that.isCompetitors = true
            // select 时候的判断
            _that.allBrandList = res.data.trademarks_list
            _that.allBrandList.forEach(element => {
              if (element.status === 1) {
                _that.seletBrandId = element.id
                _that.isTotalBrand = true
              }
            })
            // console.log(_that.allBrandList)
            // 假如假如_that.$route.params 为空，就将res.data.trademarks_list 中status 为1的name 赋值给brand_keywords 展示趋势（trends）图表。就将res.data.competitors 中status 为1的short_name 赋值给cb_keywords 展示在竞争者（competitors）图表。
            if (JSON.stringify(_that.$route.query) == '{}') {
              res.data.trademarks_list.forEach(element => {
                if (element.status === 1) {
                  _that.seletBrandId = element.id
                  _that.keyList.name = element.name
                  _that.keyList.brand_keywords = element.keywords
                }
              })

              res.data.competitors.forEach(element => {
                if (element.status === 1) {
                  _that.keyList.cb_names.push(element.name)
                  _that.keyList.cb_keywords.push(element.short_name)
                }
              })
            } else {
              // 假如_that.$route.params 不为空，代表路由是从my brands 的 View selected 或者 my comtitive brands 的 View selected 按钮进到首页的
              // _that.$route.params.currentBrand 不为空 表示从my brands 的 View selected按钮进到首页
              // _that.$route.params.curentCompittor 不为空 表示从my comtitive brands 的 View selected 按钮进到首页
              if (_that.$route.query.currentBrand) {
                // console.log(222)
                _that.keyList.name = _that.$route.query.currentBrandName
                _that.keyList.brand_keywords = _that.$route.query.currentBrand
                res.data.competitors.forEach(element => {
                  if (element.status === 1) {
                    _that.keyList.cb_names.push(element.name)
                    _that.keyList.cb_keywords.push(element.short_name)
                  }
                })
              }
              if (_that.$route.query.curentCompittor) {
                res.data.trademarks_list.forEach(element => {
                  if (element.status === 1) {
                    _that.seletBrandId = element.id
                    _that.keyList.name = element.name
                    _that.keyList.brand_keywords = element.keywords
                  }
                })
                // 赋值对比competitor
                _that.keyList.cb_names = _that.$route.query.curentName
                _that.keyList.cb_keywords = _that.$route.query.curentCompittor
              }
            }
          }
        }
      })
    },
    changeHomStatus(type) {
      if (type) {
        this.isCompetitors = true
      }
    },
    // 修改选中 brand
    totalJoggle(Id, params) {

    },
    changeBrand(value) {
      const _that = this
      let params = {
        id: this.seletBrandId,
        status: 1
      }
      axios.post(apiConfig.createBrandUrl + '/' + this.seletBrandId, params, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(function(res) {
        if (res.status = 201) {
          _that.keyList =  {
            name: '',
            brand_keywords: '',
            cb_keywords: [],
            cb_names: [],
            tabIndex: 0,
          }
          // 从新渲染内容
          _that.getBaseData()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  width: 980px;
  .icon-grid-panel {
    @include display-flex;
    $height: 200px;
    $gap: 10px;
    & > .item {
      @include display-flex;
      @include flex(1);
      height: $height;
      margin-right: $gap;
      align-items: center;
      justify-content: center;
      background-color: nth($cyan, 1);
      cursor: pointer;
      .box {
        text-align: center;
        color: #fff;
      }
      .iconfont {
        height: 100px;
        line-height: 100px;
        font-size: 6rem;
      }
      .title {
        font-size: 1.9rem;
        color: $white;
      }
      .sub-title {
        font-size: 1.4rem;
        color: $white;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
