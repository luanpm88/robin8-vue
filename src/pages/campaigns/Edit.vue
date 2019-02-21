<template>
  <div class="campaign-detail-container">
    <create-process
      :renderData="processStatus"
      class="mt20"
    ></create-process>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
// import Datepicker from 'vuejs-datepicker'
import TagsList from '@components/TagsList'
import CreateProcess from './components/CreateProcess'
import KolsListPanel from './components/KolsListPanel'
// import StatusArea from './components/StatusArea'
import VueCoreImageUpload from 'vue-core-image-upload'
import { mapState } from 'vuex'

export default {
  name: 'CampaignEdit',
  components: {
    // Datepicker,
    TagsList,
    CreateProcess,
    KolsListPanel,
    // StatusArea,
    VueCoreImageUpload
  },
  data () {
    return {
      processStatus: {
        current: 1,
        index: 0
      },
      detailData: {},
      brandsList: [],
      tagsList: [],
      checkedIds: [],
      checkedTags: [],
      terracesList: [],
      kolsParams: {},
      kolsList: [],
      uploadImageUrl: apiConfig.uploadImageUrl,
      loading: false,
      submitData: {
        name: '',
        description: '',
        trademark_id: '',
        start_at: '',
        end_at: '',
        pre_kols_count: '',
        pre_amount: '',
        img_url: '',
        target: {
          industries: '',
          price_from: '',
          price_to: ''
        },
        terraces: [],
        selected_kols: [],
        notice: ''
      },
      canSubmit: true
    }
  },
  methods: {
    getBaseData () {
      axios.get(apiConfig.baseInfosUrl, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleGetBaseDataSucc)
    },
    handleGetBaseDataSucc (res) {
      // console.log(res)
      if (res.status == 200 && res.data) {
        const data = res.data
        this.brandsList = data.trademarks_list
        this.tagsList = data.tags_list

        let _terracesList = data.terraces_list
        _terracesList.forEach(item => {
          let _shortName = item.short_name
          switch (_shortName) {
            case 'public_wechat_account':
              item.iconClass = 'icon-wechat-circle'
              break
            case 'weibo':
              item.iconClass = 'icon-weibo-circle'
              break
            default:
              item.iconClass = ''
          }
          item.checked = false
          item.val = ''
        })
        this.terracesList = _terracesList
      }
    },
    getDetailData () {
      axios.get(apiConfig.creationsUrl + '/' + this.$route.params.id, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleGetDetailDataSucc)
    },
    handleGetDetailDataSucc (res) {
      // console.log(res)
      let resData = res.data
      if (res.status == 200 && resData) {
        // console.log(resData)
        this.detailData = resData
        this.submitData.name = resData.name
        this.submitData.description = resData.description
        this.submitData.trademark_id = resData.trademark_id
        this.submitData.start_at = resData.start_at
        this.submitData.end_at = resData.end_at
        this.submitData.pre_kols_count = resData.pre_kols_count
        this.submitData.pre_amount = resData.pre_amount
        this.submitData.img_url = resData.img_url
        this.submitData.target.industries = resData.targets_hash.industries
        this.submitData.target.price_from = resData.targets_hash.price_from
        this.submitData.target.price_to = resData.targets_hash.price_to
        this.submitData.terraces = resData.terraces
        this.submitData.selected_kols = resData.selected_kols
        this.submitData.notice = resData.notice

        let _terracesList = this.terracesList
        _terracesList.forEach(item => {
          resData.terraces.forEach(e => {
            if (item.id == e.terrace_id) {
              item.checked = true
              item.val = e.exposure_value
            }
          })
        })
        // console.log(_terracesList)

        let _tagsList = this.tagsList
        let _checkedData = resData.targets_hash.industries
        let _checkedArr = _checkedData.split(',')
        let _checkedIds = []
        let _checkedTags = []
        _tagsList.forEach(item => {
          _checkedArr.forEach(e => {
            if (item.name == e) {
              _checkedIds.push(item.id)
              _checkedTags.push(item.name)
            }
          })
        })

        this.checkedTags = _checkedTags
        // console.log(this.checkedTags)
        this.checkedIds = _checkedIds
        // console.log(this.checkedIds)

        this.searchKolsCtrl()
        // console.log(this.kolsList)
      }
    },
    searchKols (postUrl) {
      axios.post(postUrl, this.kolsParams, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleSearchKolsSucc)
    },
    handleSearchKolsSucc (res) {
      // console.log(res)
      let resData = res.data
      // console.log(resData)
      this.kolsList = []
      this.kolsList = resData.data

      let _selectedKols = this.submitData.selected_kols
      // console.log(_selectedKols)
      _selectedKols.forEach(item => {
        this.kolsList.forEach(e => {
          if (item.plateform_uuid == e.profile_id) {
            e.checked = true
          }
        })
      })
      console.log(this.kolsList)
    },
    searchKolsCtrl () {
      let _terraces = this.submitData.terraces
      // console.log(_terraces)
      // console.log(this.checkedTags)
      this.kolsParams = {
        start_date: this.submitData.start_at,
        end_date: this.submitData.start_end,
        industries: this.checkedTags,
        page_no: 0,
        page_size: 12,
        price_from: this.submitData.target.price_from,
        price_to: this.submitData.target.price_to
      }

      this.$validator.validateAll().then((msg) => {
        // console.log(msg)
        if (msg) {
          // console.log('验证通过')
          if (_terraces.length > 0) {
            let hasWechat = _terraces.some(item => {
              if (item.short_name == 'public_wechat_account') {
                return true
              } else {
                return false
              }
            })
            if (hasWechat) {
              this.searchKols(apiConfig.kolWxSearchUrl)
              this.plateformName = 'public_wechat_account'
            } else {
              this.searchKols(apiConfig.kolWbSearchUrl)
              this.plateformName = 'weibo'
            }
          } else {
            this.searchKols(apiConfig.kolWxSearchUrl)
            this.plateformName = 'public_wechat_account'
          }
        }
      })
    },
    checkedKols (data) {
      let _ids = data.ids
      // console.log(_ids)
      let _kolsList = this.kolsList
      let _checkedKols = []
      let _kolItem
      _ids.forEach(item => {
        _kolsList.forEach(e => {
          if (e.profile_id == item) {
            _kolItem = commonJs.buildObjData('plateform_uuid', item)
            _kolItem.plateform_name = this.plateformName
            _kolItem.name = e.profile_name
            _kolItem.avatar_url = e.avatar_url
            _kolItem.desc = e.description_raw
            _checkedKols.push(_kolItem)
          }
        })
      })
      // console.log(_checkedKols)
      this.submitData.selected_kols = _checkedKols
    },
    checkTag (data) {
      let _ids = data.ids
      let _tagsList = this.tagsList
      let _checkedTags = []

      _ids.forEach(item => {
        _tagsList.forEach(e => {
          if (e.id == item) {
            _checkedTags.push(e.name)
          }
        })
      })
      console.log(_checkedTags)
      this.checkedTags = _checkedTags
      this.submitData.target.industries = _checkedTags.toString()
    },
    imageuploaded (res) {
      // console.log(res)
      this.submitData.img_url = res
    },
    imageuploading (res) {
      this.loading = true
    },
    delPhoto () {
      let delConfirm = confirm('确定要删除此图片？')
      if (delConfirm) {
        this.submitData.img_url = ''
      }
    },
    terraceCheck (id) {
      let _terraces = this.submitData.terraces
      let _terracesList = this.terracesList
      let _terraceItem = commonJs.buildObjData('terrace_id', id)
      // console.log(_terraceItem)
      let result = _terraces.some(item => {
        if (item.terrace_id == id) {
          return true
        }
      })

      _terracesList.forEach(item => {
        if (item.id == _terraceItem.terrace_id) {
          if (!result) {
            _terraceItem.short_name = item.short_name
            _terraces.push(_terraceItem)
            item.checked = true
          } else {
            let _index = _terraces.indexOf(item)
            _terraces.splice(_index, 1)
            item.checked = false
          }
        }
      })
      // console.log(this.submitData.terraces)
    },
    doSubmit () {
      if (!this.canSubmit) {
        return false
      }
      this.canSubmit = false
      axios.post(apiConfig.creationsUrl, {
        'id': this.$route.params.id,
        'creation': this.submitData
      }, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleDoSubmitSucc)
    },
    handleDoSubmitSucc (res) {
      // console.log(res)
      if (res.status == 201) {
        let resData = res.data
        // console.log(resData)
        this.$router.push('/creations/' + resData.id)
      } else {
        alert('提交失败，请重新提交')
      }
      this.canSubmit = true
    },
    doConfirm () {
      let _terraces = this.submitData.terraces
      let _terracesList = this.terracesList
      _terraces.forEach(item => {
        // console.log(item)
        _terracesList.forEach(originalItem => {
          if (!!item && item.terrace_id == originalItem.id) {
            item.exposure_value = originalItem.val
          }
        })
      })
      // console.log(this.submitData)

      this.$validator.validateAll().then((msg) => {
        // console.log(msg)
        if (msg) {
          // console.log('验证通过')
          this.doSubmit()
        }
      })
    }
  },
  mounted () {
    this.getBaseData()
    this.getDetailData()
  },
  computed: {
    ...mapState(['authorization'])
  }
}
</script>

<style lang="scss" scoped>
.campaign-create-form {
  .form-group {
    padding: 20px 60px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }
}
.create-btn-area {
  padding: 30px;
  .next-btn {
    width: 150px;
  }
}
.campaign-detail-container /deep/ .kols-list {
  padding: 24px 60px;
  font-size: 0;
  & > .kols-list-item {
    display: inline-block;
    width: 33.33333%;
    padding: 0 10px;
  }
}
</style>
