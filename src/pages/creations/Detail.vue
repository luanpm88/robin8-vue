<template>
  <div class="campaign-detail-container">
    <create-process
      :renderData="processStatus"
      class="mt20"
    ></create-process>

    <div class="panel default-panel mt20">
      <div class="panel-body">
        <status-area :statusData="detailData.status"></status-area>

        <div class="line-title">{{$t('lang.information')}}</div>
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.name.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.name}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.description.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.description}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.brandName.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.trademark_name}}</p>
            </div>
          </div>
        </div>

        <div class="line-title">{{$t('lang.creations.campaignInfo')}}</div>
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.platform.title')}}:</div>
            <div class="col-sm-8">
              <div class="row">
                <div
                  v-for="item in detailData.terraces"
                  :key="item.terrace_id"
                  class="col-sm-6"
                >
                  <div class="col-sm-3 text-center">
                    <div class="check-icon checked">
                      <div :class="'iconfont ' + item.iconClass"></div>
                    </div>
                  </div>
                  <div class="col-sm-8">
                    <p class="form-control-static">{{item.name}}曝光值:{{item.exposure_value}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.picture.title')}}:</div>
            <div class="col-sm-8">
              <div class="upload-imgs-list">
                <div class="upload-img-item">
                  <img :src="detailData.img_url" alt="" class="upload-img" />
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.time.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.time_range}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.kolNumber.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.pre_kols_count}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.budget.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.pre_amount}}</p>
            </div>
          </div>
          <div v-if="detailData.notice" class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.precaution.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.notice}}</p>
            </div>
          </div>
        </div>

        <div class="line-title">{{$t('lang.creations.bigVRequirement')}}</div>
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.tags.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.industries}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.price.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.price_range}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.followerAge.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">18～40</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.followerGender.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">女</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.followerDistrict.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">北京 / 上海 / 深圳</p>
            </div>
          </div>
        </div>

        <div v-if="kolsList.length > 0">
          <div class="line-title">已选择的大V</div>
          <div class="kols-list">
            <kols-list-item
              v-for="(item, index) in kolsList"
              :key="index"
              :renderStatus="kolRenderStatus"
              :renderData="item"
              @detail="toKolDetail(item)"
            ></kols-list-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import KolsListItem from '@components/KolsListItem'
import CreateProcess from './components/CreateProcess'
import StatusArea from './components/StatusArea'
import { mapState } from 'vuex'

export default {
  name: 'CreationDetail',
  components: {
    CreateProcess,
    StatusArea,
    KolsListItem
  },
  data () {
    return {
      processStatus: {
        current: 1,
        index: 0
      },
      detailData: {},
      kolRenderStatus: {
        hasLiked: false,
        hasMsg: false,
        hasChecked: false,
        hasInflunce: false,
        hasCart: false,
        hasDelete: false
      },
      kolsList: [],
      kolTypeId: '',
      brandKeyword: ''
    }
  },
  methods: {
    getDetailData () {
      axios.get(apiConfig.creationsUrl + '/' + this.$route.params.id, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleGetDetailDataSucc)
    },
    handleGetDetailDataSucc (res) {
      console.log(res)
      let resData = res.data
      if (res.status == 200 && resData) {
        console.log(resData)
        this.detailData = resData
        if (resData.status == 'ended' || resData.status == 'finished' || resData.status == 'closed') {
          this.processStatus.current = 4
          this.processStatus.index = 3
        }

        this.brandKeyword = resData.trademark_keywords

        let _kolsList = this.kolsList
        let _kolItem
        resData.selected_kols.forEach(item => {
          _kolItem = commonJs.buildObjData('avatar_url', item.avatar_url)
          _kolItem.profile_id = item.profile_id
          _kolItem.profile_name = item.profile_name
          _kolItem.description_raw = item.description_raw
          _kolItem.checked = false
          _kolsList.push(_kolItem)
        })
        console.log(_kolsList)

        let _terraces = resData.terraces
        _terraces.forEach(item => {
          console.log(item)
          switch (item.short_name) {
            case 'public_wechat_account':
              item.iconClass = 'icon-wechat-circle'
              this.kolTypeId = '1'
              break
            case 'weibo':
              item.iconClass = 'icon-weibo-circle'
              this.kolTypeId = '0'
              break
            default:
              item.iconClass = ''
              this.kolTypeId = '1'
          }
        })
      }
    },
    toKolDetail (item) {
      // console.log(item)
      this.$router.push({
        path: '/kol/',
        name: 'KolDetail',
        params: {
          id: item.profile_id
        },
        query: {
          type: this.kolTypeId,
          brand_keywords: this.brandKeyword
        }
      })
    }
  },
  mounted () {
    this.getDetailData()
  },
  computed: {
    ...mapState(['authorization'])
  }
}
</script>

<style lang="scss" scoped>
.kols-list {
  padding: 24px 60px;
  font-size: 0;
  & > .kols-list-item {
    display: inline-block;
    width: 33.33333%;
    padding: 0 10px;
  }
}
</style>
