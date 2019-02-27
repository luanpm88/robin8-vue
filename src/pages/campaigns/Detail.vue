<template>
  <div class="campaign-detail-container">
    <div class="panel default-panel mt20">
      <div class="panel-body">
        <div class="line-title">{{$t('lang.campaigns.promotionDesc')}}</div>
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.link.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">
                <a :href="detailData.url" target="_blank">{{detailData.url}}</a>
              </p>
            </div>
          </div>
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
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.picture.title')}}：</div>
            <div class="col-sm-8">
              <div class="upload-imgs-list">
                <div class="upload-img-item">
                  <img :src="detailData.img_url" alt="" class="upload-img" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="line-title">{{$t('lang.campaigns.promotionBudget')}}</div>
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.allBudget.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.budget}}</p>
            </div>
          </div>
        </div>

        <div class="line-title">{{$t('lang.campaigns.promotionDetail')}}</div>
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.platform.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.sub_type_zh}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.mode.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.per_budget_type_show}}</p>
            </div>
          </div>
          <div v-if="detailData.per_budget_type == 'cpt'" class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.pictureNumber.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.example_screenshot_count}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.budget.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.per_action_budget}}</p>
            </div>
          </div>
        </div>

        <div class="line-title">{{$t('lang.campaigns.promotionTime')}}</div>
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.time.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.time_range}}</p>
            </div>
          </div>
        </div>

        <div class="line-title">{{$t('lang.campaigns.selectKols')}}</div>
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.tags.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.tag_labels}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.kolDistrict.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.region}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.kolAge.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.age_zh}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.kolGender.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.gender_zh}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.kolPush.title')}}：</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.enable_append_push ? '允许补推' : '禁止补推'}}</p>
            </div>
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
import { mapState } from 'vuex'

export default {
  name: 'CampaignDetail',
  components: {
    KolsListItem
  },
  data () {
    return {
      detailData: {},
      kolHasLiked: false,
      kolHasMsg: false,
      kolHasChecked: false,
      kolsList: []
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
      console.log(res)
      let resData = res.data
      if (res.status == 200 && resData) {
        console.log(resData)
        this.detailData = resData

        // let _kolsList = this.kolsList
        // let _kolItem
        // resData.selected_kols.forEach(item => {
        //   _kolItem = commonJs.buildObjData('avatar', item.avatar_url)
        //   _kolItem.id = item.plateform_uuid
        //   _kolItem.name = item.name
        //   _kolItem.desc = item.desc
        //   _kolItem.checked = false
        //   _kolsList.push(_kolItem)
        // })
        // console.log(_kolsList)
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
