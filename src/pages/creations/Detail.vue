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
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.name.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.name}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.description.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.description}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.brandName.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.trademark_name}}</p>
            </div>
          </div>
        </div>

        <div class="line-title">{{$t('lang.campaigns.campaignInfo')}}</div>
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.platform.title')}}：</div>
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
                    <p class="form-control-static">{{item.name}}曝光值：{{item.exposure_value}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.picture.title')}}：</div>
            <div class="col-sm-8">
              <div class="upload-imgs-list">
                <div class="upload-img-item">
                  <img :src="detailData.img_url" alt="" class="upload-img" />
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.time.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.time_range}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.kolNumber.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.pre_kols_count}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.budget.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.pre_amount}}</p>
            </div>
          </div>
          <div v-if="detailData.notice" class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.precaution.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.notice}}</p>
            </div>
          </div>
        </div>

        <div class="line-title">{{$t('lang.campaigns.bigVRequirement')}}</div>
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.tags.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.industries}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.price.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.price_range}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.followerAge.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">18～40</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.followerGender.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">女</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.followerDistrict.title')}}：</div>
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
              :hasLiked="kolHasLiked"
              :hasMsg="kolHasMsg"
              :hasChecked="kolHasChecked"
              :renderData="item"
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
import CreateProcess from './components/CreateProcess'
import StatusArea from './components/StatusArea'
import KolsListItem from './components/KolsListItem'
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
      kolHasLiked: false,
      kolHasMsg: false,
      kolHasChecked: false,
      kolsList: []
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

        let _kolsList = this.kolsList
        let _kolItem
        resData.selected_kols.forEach(item => {
          _kolItem = commonJs.buildObjData('avatar', item.avatar_url)
          _kolItem.id = item.plateform_uuid
          _kolItem.name = item.name
          _kolItem.desc = item.desc
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
              break
            case 'weibo':
              item.iconClass = 'icon-weibo-circle'
              break
            default:
              item.iconClass = ''
          }
        })
      }
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
