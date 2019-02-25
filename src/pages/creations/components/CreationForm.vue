<template>
  <div class="creation-form">
    <div class="panel default-panel mt20">
      <div class="panel-head">
        <h5 class="title text-center">{{$t('lang.information')}}</h5>
      </div>
      <div class="panel-body">
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.name.title')}}：</div>
            <div class="col-sm-8">
              <input
                type="text"
                name="name"
                class="form-control"
                :class="[errors.has('name') ? 'danger' : '']"
                v-model="submitData.name"
                :placeholder="$t('lang.creations.name.placeholder')"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('name')"
              >
                {{$t('lang.creations.name.errorTips')}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.description.title')}}：</div>
            <div class="col-sm-8">
              <input
                type="text"
                name="desc"
                class="form-control"
                :class="[errors.has('desc') ? 'danger' : '']"
                v-model="submitData.description"
                :placeholder="$t('lang.creations.description.placeholder')"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('desc')"
              >
                {{$t('lang.creations.description.errorTips')}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.brandName.title')}}：</div>
            <div class="col-sm-8">
              <select
                name="brand"
                class="form-control"
                :class="[errors.has('brand') ? 'danger' : '']"
                v-model="submitData.trademark_id"
                v-validate="'required'"
              >
                <option value="">{{$t('lang.creations.brandName.placeholder')}}</option>
                <option
                  v-for="item in brandsList"
                  :key="item.id"
                  :value="item.id"
                >{{item.name}}</option>
              </select>
              <div
                class="form-tips danger"
                v-show="errors.has('brand')"
              >
                {{$t('lang.creations.brandName.errorTips')}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel default-panel mt20">
      <div class="panel-head">
        <h5 class="title text-center">{{$t('lang.creations.campaignInfo')}}</h5>
      </div>
      <div class="panel-body">
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.platform.title')}}：</div>
            <div class="col-sm-8">
              <div class="row">
                <div
                  v-for="(item, index) in terracesList"
                  :key="item.id"
                  class="col-sm-6"
                >
                  <div class="col-sm-2 text-center">
                    <div
                      class="check-icon"
                      :class="[item.checked ? 'checked' : '']"
                      @click="terraceCheck(item.id)"
                    >
                      <div
                        :class="'iconfont ' + item.iconClass"
                      ></div>
                      <div class="iconfont icon-check"></div>
                    </div>
                  </div>
                  <div class="col-sm-10 pr0">
                    <input
                      type="number"
                      class="form-control"
                      v-model="item.val"
                      :placeholder="$t('lang.creations.platform.placeholder')"
                    >
                  </div>
                </div>
                <input
                  type="hidden"
                  name="terrace"
                  v-model="submitData.terraces"
                  v-validate="'required'"
                >
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <div
                    class="form-tips text-right danger"
                    v-show="errors.has('terrace')"
                  >
                    {{$t('lang.creations.platform.errorTips')}}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.picture.title')}}：</div>
            <div class="col-sm-8">
              <div v-if="submitData.img_url != ''" class="upload-imgs-list">
                <div class="upload-img-item">
                  <img :src="submitData.img_url" alt="" class="upload-img" />
                  <div class="iconfont icon-close close-btn" @click="delPhoto"></div>
                </div>
              </div>
              <!-- <vue-core-image-upload
                :class="['upload-img-btn', 'iconfont', 'icon-image']"
                crop="local"
                crop-ratio="4:3"
                @imageuploaded="imageuploaded"
                @imageuploading="imageuploading"
                inputOfFile="image"
                text=""
                :max-file-size="5242880"
                :compress="30"
                :max-width="200"
                input-accept="image/*"
                :url="uploadImageUrl">
              </vue-core-image-upload> -->
              <vue-core-image-upload
                v-else
                :class="['upload-img-btn', 'iconfont', 'icon-image']"
                :crop="false"
                @imageuploaded="imageuploaded"
                @imageuploading="imageuploading"
                inputOfFile="image"
                text=""
                :max-file-size="5242880"
                :compress="30"
                :max-width="200"
                input-accept="image/*"
                :url="uploadImageUrl">
              </vue-core-image-upload>
              <input
                type="hidden"
                name="img_url"
                v-model="submitData.img_url"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('img_url')"
              >
                {{$t('lang.creations.picture.errorTips')}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.time.title')}}：</div>
            <div class="col-sm-8">
              <datepicker
                name="campaignTime"
                range
                type="datetime"
                lang="en"
                format="YYYY-MM-DD HH:mm:ss"
                input-class="form-control"
                :placeholder="$t('lang.creations.time.placeholder')"
                v-model="campaignTime"
                v-validate="'required'"
                :minute-step="10"
                confirm
              ></datepicker>
              <div
                class="form-tips text-right danger"
                v-show="errors.has('campaignTime')"
              >
                {{$t('lang.creations.time.errorTips')}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.kolNumber.title')}}：</div>
            <div class="col-sm-3">
              <input
                type="number"
                name="kols_count"
                class="form-control"
                :class="[errors.has('kols_count') ? 'danger' : '']"
                v-model.number="submitData.pre_kols_count"
                :placeholder="$t('lang.creations.kolNumber.placeholder')"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('kols_count')"
              >
                {{$t('lang.creations.kolNumber.errorTips')}}
              </div>
            </div>
            <div class="col-sm-2 control-label">{{$t('lang.creations.budget.title')}}：</div>
            <div class="col-sm-3">
              <input
                type="number"
                name="pre_amount"
                class="form-control"
                :class="[errors.has('pre_amount') ? 'danger' : '']"
                v-model.number="submitData.pre_amount"
                :placeholder="$t('lang.creations.budget.placeholder')"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('pre_amount')"
              >
                {{$t('lang.creations.budget.errorTips')}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.precaution.title')}}：</div>
            <div class="col-sm-8">
              <textarea
                name="notice"
                v-model="submitData.notice"
                class="form-control"
                rows="6"
                :placeholder="$t('lang.creations.precaution.placeholder')"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel default-panel mt20">
      <div class="panel-head">
        <h5 class="title text-center">{{$t('lang.creations.bigVRequirement')}}</h5>
      </div>
      <div class="panel-body">
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <tags-list
              :renderData="tagsList"
              :checkedIds="checkedIds"
              @checkTag="checkTag"
            ></tags-list>
            <input
              type="hidden"
              name="tags"
              v-model="submitData.target.industries"
              v-validate="'required'"
            >
            <div
              class="form-tips danger"
              v-show="errors.has('tags')"
            >
              {{$t('lang.creations.tags.errorTips')}}
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.price.title')}}：</div>
            <div class="col-sm-3">
              <select
                name="price"
                class="form-control"
                :class="[errors.has('price') ? 'danger' : '']"
                @change="changePrice"
                v-model="price"
              >
                <option value="0,1000000">{{$t('lang.creations.price.placeholder')}}</option>
                <option value="0,5000">0 - 5,000</option>
                <option value="5000,10000">5,000 - 10,000</option>
                <option value="10000,50000">10,000 - 50,000</option>
                <option value="50000,100000">50,000 - 100,000</option>
                <option value="100000,200000">100,000 - 200,000</option>
                <option value="200000,1000000">200,000 +</option>
              </select>
              <div class="form-tips">
                {{$t('lang.creations.price.errorTips')}}
              </div>
            </div>
            <!-- <div class="col-sm-8">
              <div class="input-group">
                <input
                  type="number"
                  name="price_from"
                  class="form-control"
                  :class="[errors.has('price_from') ? 'danger' : '']"
                  v-model.number="submitData.target.price_from"
                  :placeholder="$t('lang.creations.price.lowestPlaceholder')"
                  v-validate="'required'"
                >
                <span class="input-group-addon">-</span>
                <input
                  type="number"
                  name="price_to"
                  class="form-control"
                  :class="[errors.has('price_to') ? 'danger' : '']"
                  v-model.number="submitData.target.price_to"
                  :placeholder="$t('lang.creations.price.highestPlaceholder')"
                  v-validate="'required'"
                >
              </div>
              <div
                class="form-tips danger"
                v-show="errors.has('price_from') || errors.has('price_to')"
              >
                {{$t('lang.creations.price.errorTips')}}
              </div>
            </div> -->
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.followerAge.title')}}：</div>
            <div class="col-sm-3">
              <select class="form-control">
                <option value="">{{$t('lang.creations.followerAge.placeholder')}}</option>
                <option value="1">10-20 岁</option>
                <option value="2">20-30 岁</option>
                <option value="3">30-40 岁</option>
                <option value="4">40-50 岁</option>
                <option value="5">50-60 岁</option>
                <option value="6">60 岁以上</option>
              </select>
              <div class="form-tips">{{$t('lang.creations.followerAge.errorTips')}}</div>
            </div>
            <div class="col-sm-2 control-label">{{$t('lang.creations.followerGender.title')}}：</div>
            <div class="col-sm-3">
              <select class="form-control">
                <option value="">{{$t('lang.creations.followerGender.placeholder')}}</option>
                <option value="1">男</option>
                <option value="0">女</option>
              </select>
              <div class="form-tips">{{$t('lang.creations.followerGender.errorTips')}}</div>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.followerDistrict.title')}}：</div>
            <div class="col-sm-4">
              <select
                name="province"
                class="form-control"
                v-model="province"
                @change="changeProvince"
              >
                <option value="">{{$t('lang.creations.followerDistrict.provincePlaceholder')}}</option>
                <option
                  v-for="(item, index) of provinceData"
                  :key="index"
                  :value="item.provinceName"
                >
                  {{item.provinceName}}
                </option>
              </select>
              <div class="form-tips">{{$t('lang.creations.followerDistrict.errorTips')}}</div>
            </div>
            <div class="col-sm-4">
              <select
                name="city"
                class="form-control"
                v-model="city"
              >
                <option value="">{{$t('lang.creations.followerDistrict.cityPlaceholder')}}</option>
                <option
                  v-for="(item, index) of cityData"
                  :key="index"
                  :value="item.citysName"
                >
                  {{item.citysName}}
                </option>
              </select>
              <div class="form-tips">{{$t('lang.creations.followerDistrict.errorTips')}}</div>
            </div>
          </div>
          <div class="form-group text-center">
            <button
              type="button"
              class="btn btn-blue btn-outline"
              @click="searchKolsCtrl"
            >{{$t('lang.creations.serchBtn')}}</button>
          </div>
        </div>
      </div>
    </div>

    <kols-list-panel
      v-if="kolsList.length > 0"
      class="mt20"
      title="为您推荐的大V"
      :kolsList="kolsList"
      :kolsPage="kolsPage"
      :kolsPerPage="kolsPerPage"
      :kolsTotal="kolsTotal"
      @checkedKols="checkedKols"
      @changeKolsPage="changeKolsPage"
    ></kols-list-panel>

    <!-- <div class="row mt20">
      <div class="col-sm-4">
        <kols-list-panel
          title="为您推荐的大V"
        ></kols-list-panel>
      </div>
      <div class="col-sm-4">
        <kols-list-panel
          title="您可能感兴趣的大V"
        ></kols-list-panel>
      </div>
      <div class="col-sm-4">
        <kols-list-panel
          title="您收藏的大V"
        ></kols-list-panel>
      </div>
    </div> -->

    <div class="text-center create-btn-area">
      <button
        type="button"
        class="btn btn-cyan next-btn"
        @click="doConfirm"
        :disabled="canSubmit ? false : true"
      >{{$t('lang.submitBtn')}}</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import cityJs from '@javascripts/cities.js'
import Datepicker from 'vue2-datepicker'
import TagsList from '@components/TagsList'
import KolsListPanel from './KolsListPanel'
import VueCoreImageUpload from 'vue-core-image-upload'
import { mapState } from 'vuex'

export default {
  name: 'CreationForm',
  props: {
    formType: String
  },
  components: {
    Datepicker,
    TagsList,
    KolsListPanel,
    VueCoreImageUpload
  },
  data () {
    return {
      detailData: {},
      brandsList: [],
      tagsList: [],
      checkedIds: [],
      checkedTags: [],
      terracesList: [],
      kolsParams: {},
      kolsList: [],
      priceList: [],
      plateformName: '',
      uploadImageUrl: apiConfig.uploadImageUrl,
      loading: false,
      campaignTime: '',
      provinceData: [],
      province: '',
      cityData: [],
      city: '',
      price: '',
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
      kolsPage: 0,
      kolsPerPage: 12,
      kolsTotal: 0,
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
      console.log(res)
      if (res.status == 200 && res.data) {
        const data = res.data
        this.brandsList = data.trademarks_list
        this.tagsList = data.tags_list
        // this.priceList = data.prices_range
        // console.log(this.priceList)

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
        console.log(resData)
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
        this.campaignTime = []
        this.campaignTime[0] = resData.start_at
        this.campaignTime[1] = resData.end_at
        this.price = resData.targets_hash.price_from + ',' + resData.targets_hash.price_to

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
      console.log(res)
      let resData = res.data
      console.log(resData)
      this.kolsList = []
      this.kolsList = resData.data
      this.kolsTotal = resData.total_record_count

      if (this.formType == 'create') {
        if (resData.data.length > 0) {
          this.kolsList.forEach(item => {
            item.checked = false
          })
        }
      }
      if (this.formType == 'edit') {
        let _selectedKols = this.submitData.selected_kols
        _selectedKols.forEach(item => {
          this.kolsList.forEach(e => {
            if (item.plateform_uuid == e.profile_id) {
              e.checked = true
            }
          })
        })
      }
    },
    searchKolsCtrl () {
      let _terraces = this.submitData.terraces
      console.log(_terraces)
      this.kolsParams = {
        // start_date: this.submitData.start_at,
        // end_date: this.submitData.start_end,
        start_date: this.campaignTime[0],
        end_date: this.campaignTime[1],
        industries: this.checkedTags,
        page_no: this.kolsPage,
        page_size: this.kolsPerPage,
        // price: this.submitData.target.price,
        price_from: this.submitData.target.price_from,
        price_to: this.submitData.target.price_to
      }

      this.kolsList = []
      this.$validator.validateAll().then((msg) => {
        console.log(msg)
        if (msg) {
          console.log('验证通过')
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
    changeKolsPage (data) {
      console.log(data.page)
      this.kolsPage = data.page - 1
      this.searchKolsCtrl()
    },
    checkedKols (data) {
      let _ids = data.ids
      console.log(_ids)
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
      console.log(_checkedKols)
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
      console.log(res)
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
      console.log(_terraceItem)
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
      console.log(this.submitData.terraces)
    },
    changePrice (e) {
      const _self = this
      let selectedVal = e.target.value

      if (selectedVal == '') {
        _self.submitData.target.price_from = ''
        _self.submitData.target.price_to = ''
      } else {
        selectedVal = selectedVal.split(',')
        console.log(selectedVal)
        _self.submitData.target.price_from = selectedVal[0]
        _self.submitData.target.price_to = selectedVal[1]
      }
    },
    changeProvince (e) {
      const _self = this
      let selectedVal = e.target.value
      console.log(selectedVal)
      if (selectedVal == '') {
        _self.cityData = []
        _self.city = ''
      }
      this.provinceData.forEach(function (item, index) {
        if (item.provinceName == selectedVal) {
          _self.cityData = item.citys
          console.log(_self.cityData)
          _self.city = ''
        }
      })
    },
    doSubmit () {
      if (!this.canSubmit) {
        return false
      }
      this.canSubmit = false
      let submitParams = {}
      if (this.formType == 'create') {
        submitParams = {
          'creation': this.submitData
        }
      }
      if (this.formType == 'edit') {
        submitParams = {
          'id': this.$route.params.id,
          'creation': this.submitData
        }
      }
      axios.post(apiConfig.creationsUrl, submitParams, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleDoSubmitSucc)
    },
    handleDoSubmitSucc (res) {
      console.log(res)
      if (res.status == 201) {
        let resData = res.data
        console.log(resData)
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
        console.log(item)
        _terracesList.forEach(originalItem => {
          if (!!item && item.terrace_id == originalItem.id) {
            item.exposure_value = originalItem.val
          }
        })
      })

      this.submitData.start_at = this.campaignTime[0]
      this.submitData.end_at = this.campaignTime[1]

      console.log(this.submitData)

      this.$validator.validateAll().then((msg) => {
        console.log(msg)
        if (msg) {
          console.log('验证通过')
          this.doSubmit()
        }
      })
    }
  },
  mounted () {
    this.getBaseData()
    if (this.formType == 'edit') {
      this.getDetailData()
    }

    this.provinceData = cityJs.citiesData.provinces
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
.creation-form /deep/ .kols-list {
  padding: 24px 60px;
  font-size: 0;
  & > .kols-list-item {
    display: inline-block;
    width: 33.33333%;
    padding: 0 10px;
  }
}
.pr0 {
  padding-right: 0;
}
</style>
