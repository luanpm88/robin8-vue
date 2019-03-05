<template>
  <div class="creation-form">
    <div class="panel default-panel mt20">
      <div class="panel-head">
        <h5 class="title text-center">{{$t('lang.campaigns.promotionDesc')}}</h5>
      </div>
      <div class="panel-body">
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.link.title')}}：</div>
            <div class="col-sm-8">
              <input
                type="text"
                name="link"
                class="form-control"
                :class="[errors.has('link') ? 'danger' : '']"
                v-model="submitData.url"
                :placeholder="$t('lang.campaigns.link.placeholder')"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('link')"
              >
                {{$t('lang.campaigns.link.errorTips')}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.name.title')}}：</div>
            <div class="col-sm-8">
              <input
                type="text"
                name="name"
                class="form-control"
                :class="[errors.has('name') ? 'danger' : '']"
                v-model="submitData.name"
                :placeholder="$t('lang.campaigns.name.placeholder')"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('name')"
              >
                {{$t('lang.campaigns.name.errorTips')}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.description.title')}}：</div>
            <div class="col-sm-8">
              <input
                type="text"
                name="desc"
                class="form-control"
                :class="[errors.has('desc') ? 'danger' : '']"
                v-model="submitData.description"
                :placeholder="$t('lang.campaigns.description.placeholder')"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('desc')"
              >
                {{$t('lang.campaigns.description.errorTips')}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.picture.title')}}：</div>
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
                :headers="{'Authorization': authorization}"
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
                {{$t('lang.campaigns.picture.errorTips')}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel default-panel mt20">
      <div class="panel-head">
        <h5 class="title text-center">{{$t('lang.campaigns.promotionBudget')}}</h5>
      </div>
      <div class="panel-body">
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.allBudget.title')}}：</div>
            <div class="col-sm-3">
              <a-input-number
                name="allBudget"
                class="form-control text-center"
                :class="[errors.has('allBudget') || submitData.budget < budgetMin ? 'danger' : '']"
                :min="budgetMin"
                :step="1"
                v-model.number="submitData.budget"
                v-validate="'required'"
              />
              <div
                class="form-tips danger"
                v-show="errors.has('allBudget') || submitData.budget < budgetMin"
              >
                最低费用{{budgetMin}}元
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel default-panel mt20">
      <div class="panel-head">
        <h5 class="title text-center">{{$t('lang.campaigns.promotionDetail')}}</h5>
      </div>
      <div class="panel-body">
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.platform.title')}}：</div>
            <div class="col-sm-8">
              <div class="row">
                <div class="col-sm-4">
                  <label class="ctrl-label">
                    <input
                      name="platform"
                      type="radio"
                      value="wechat"
                      v-model="submitData.sub_type"
                      v-validate="'required'"
                      @change="subTypeChange"
                    />
                    <span>分享到朋友圈</span>
                  </label>
                </div>
                <div class="col-sm-4">
                  <label class="ctrl-label">
                    <input
                      name="platform"
                      type="radio"
                      value="weibo"
                      v-model="submitData.sub_type"
                      v-validate="'required'"
                      @change="subTypeChange"
                    />
                    <span>分享到微博</span>
                  </label>
                </div>
              </div>

              <div
                class="form-tips danger"
                v-show="errors.has('platform')"
              >
                {{$t('lang.campaigns.platform.errorTips')}}
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.mode.title')}}：</div>
            <div class="col-sm-8">
              <div class="row">
                <div v-if="submitData.sub_type == 'wechat'" class="col-sm-4">
                  <label class="ctrl-label">
                    <input
                      name="mode"
                      type="radio"
                      value="click"
                      v-model="submitData.per_budget_type"
                      v-validate="'required'"
                      @change="perBudgetChange"
                    />
                    <span>按照点击奖励KOL</span>
                  </label>
                </div>
                <div class="col-sm-4">
                  <label class="ctrl-label">
                    <input
                      name="mode"
                      type="radio"
                      value="post"
                      v-model="submitData.per_budget_type"
                      v-validate="'required'"
                      @change="perBudgetChange"
                    />
                    <span>按照转发奖励KOL</span>
                  </label>
                </div>
                <div class="col-sm-4">
                  <label class="ctrl-label">
                    <input
                      name="mode"
                      type="radio"
                      value="cpt"
                      v-model="submitData.per_budget_type"
                      v-validate="'required'"
                      @change="perBudgetChange"
                    />
                    <span>按照完成任务奖励KOL</span>
                  </label>
                </div>
              </div>

              <div
                class="form-tips danger"
                v-show="errors.has('mode')"
              >
                {{$t('lang.campaigns.mode.errorTips')}}
              </div>
            </div>
          </div>

          <div v-if="submitData.per_budget_type == 'cpt'" class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.pictureNumber.title')}}：</div>
            <div class="col-sm-8">
              <div class="row">
                <div class="col-sm-4">
                  <label class="ctrl-label">
                    <input
                      name="imgCount"
                      type="radio"
                      value="1"
                      v-model="submitData.example_screenshot_count"
                      v-validate="'required'"
                      @change="imgCountChange"
                    />
                    <span>需要用户上传1张图片</span>
                  </label>
                </div>
                <div class="col-sm-4">
                  <label class="ctrl-label">
                    <input
                      name="imgCount"
                      type="radio"
                      value="2"
                      v-model="submitData.example_screenshot_count"
                      v-validate="'required'"
                      @change="imgCountChange"
                    />
                    <span>需要用户上传2张图片</span>
                  </label>
                </div>
                <div class="col-sm-4">
                  <label class="ctrl-label">
                    <input
                      name="imgCount"
                      type="radio"
                      value="3"
                      v-model="submitData.example_screenshot_count"
                      v-validate="'required'"
                      @change="imgCountChange"
                    />
                    <span>需要用户上传3张图片</span>
                  </label>
                </div>
              </div>
              <div
                class="form-tips danger"
                v-show="errors.has('imgCount')"
              >
                {{$t('lang.campaigns.pictureNumber.errorTips')}}
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.budget.title')}}：</div>
            <div class="col-sm-3">
              <a-input-number
                name="budget"
                class="form-control text-center"
                :class="[errors.has('budget') ? 'danger' : '']"
                :min="perBudgetMin"
                :step="0.1"
                v-model.number="submitData.per_action_budget"
                v-validate="'required'"
              />
              <div
                class="form-tips danger"
                v-show="errors.has('budget')"
              >
                {{$t('lang.campaigns.budget.errorTips')}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel default-panel mt20">
      <div class="panel-head">
        <h5 class="title text-center">{{$t('lang.campaigns.promotionTime')}}</h5>
      </div>
      <div class="panel-body">
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.time.title')}}：</div>
            <div class="col-sm-8">
              <datepicker
                name="campaignTime"
                range
                type="datetime"
                lang="en"
                format="YYYY-MM-DD HH:mm:ss"
                input-class="form-control"
                :placeholder="$t('lang.campaigns.time.placeholder')"
                v-model="campaignTime"
                v-validate="'required'"
                :minute-step="10"
                confirm
              ></datepicker>
              <div
                class="form-tips text-right danger"
                v-show="errors.has('campaignTime')"
              >
                {{$t('lang.campaigns.time.errorTips')}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel default-panel mt20">
      <div class="panel-head">
        <h5 class="title text-center">{{$t('lang.campaigns.selectKols')}}</h5>
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
              v-model="submitData.target.tags"
              v-validate="'required'"
            >
            <div
              class="form-tips danger"
              v-show="errors.has('tags')"
            >
              {{$t('lang.campaigns.tags.errorTips')}}
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.kolDistrict.title')}}：</div>
            <div class="col-sm-8">
              <div class="row">
                <div class="col-sm-6">
                  <select
                    name="province"
                    class="form-control"
                    :class="[errors.has('region') ? 'danger' : '']"
                    v-model="province"
                    @change="changeProvince"
                  >
                    <option value="">{{$t('lang.campaigns.kolDistrict.provincePlaceholder')}}</option>
                    <option
                      v-for="(item, index) of provinceData"
                      :key="index"
                      :value="item.provinceName"
                    >
                      {{item.provinceName}}
                    </option>
                  </select>
                </div>
                <div class="col-sm-6">
                  <select
                    name="city"
                    class="form-control"
                    :class="[errors.has('region') ? 'danger' : '']"
                    v-model="city"
                    @change="changeCity"
                  >
                    <option value="">{{$t('lang.campaigns.kolDistrict.cityPlaceholder')}}</option>
                    <option
                      v-for="(item, index) of cityData"
                      :key="index"
                      :value="item.citysName"
                    >
                      {{item.citysName}}
                    </option>
                  </select>
                </div>
              </div>
              <input
                type="hidden"
                name="region"
                v-model="checkedCitys"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('region')"
              >
                {{$t('lang.campaigns.kolDistrict.errorTips')}}
              </div>
            </div>
          </div>
          <div v-if="checkedCitys.length > 0" class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.kolDistrict.title')}}：</div>
            <div class="col-sm-8">
              <ul class="city-list">
                <li
                  v-for="(item, index) in checkedCitys"
                  :key="index"
                  class="item"
                >
                  <span
                    class="iconfont icon-close"
                    @click="delCity(item)"
                  ></span>
                  {{item}}
                </li>
              </ul>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.kolAge.title')}}：</div>
            <div class="col-sm-3">
              <select
                name="age"
                class="form-control"
                :class="[errors.has('age') ? 'danger' : '']"
                v-model="submitData.target.age"
                v-validate="'required'"
              >
                <option value="全部">{{$t('lang.campaigns.kolAge.placeholder')}}</option>
                <option value="10,20">10-20 岁</option>
                <option value="20,30">20-30 岁</option>
                <option value="30,40">30-40 岁</option>
                <option value="40,50">40-50 岁</option>
                <option value="50,60">50-60 岁</option>
                <option value="60,100">60 岁以上</option>
              </select>
              <div
                class="form-tips danger"
                v-show="errors.has('age')"
              >
                {{$t('lang.campaigns.kolAge.errorTips')}}
              </div>
            </div>
            <div class="col-sm-2 control-label">{{$t('lang.campaigns.kolGender.title')}}：</div>
            <div class="col-sm-3">
              <select
                name="gender"
                class="form-control"
                :class="[errors.has('gender') ? 'danger' : '']"
                v-model="submitData.target.gender"
                v-validate="'required'"
              >
                <option value="全部">{{$t('lang.campaigns.kolGender.placeholder')}}</option>
                <option value="1">男</option>
                <option value="2">女</option>
              </select>
              <div
                class="form-tips danger"
                v-show="errors.has('gender')"
              >
                {{$t('lang.campaigns.kolGender.errorTips')}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.campaigns.kolPush.title')}}：</div>
            <div class="col-sm-3">
              <select
                name="push"
                class="form-control"
                :class="[errors.has('push') ? 'danger' : '']"
                v-model="submitData.enable_append_push"
                v-validate="'required'"
              >
                <option value="true">允许补推</option>
                <option value="false">禁止补推</option>
              </select>
              <div
                class="form-tips danger"
                v-show="errors.has('push')"
              >
                {{$t('lang.campaigns.kolPush.errorTips')}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center create-btn-area">
      <p class="tips">活动一旦通过审核将不能更改，我们将在2小时内审核当天18:00前提交的订单，其余时间段提交的订单次日审核</p>
      <button
        type="button"
        class="btn btn-cyan next-btn mt20"
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
import VueCoreImageUpload from 'vue-core-image-upload'
import { mapState } from 'vuex'

export default {
  name: 'CampaignForm',
  props: {
    formType: String
  },
  components: {
    Datepicker,
    TagsList,
    VueCoreImageUpload
  },
  data () {
    return {
      detailData: {},
      tagsList: [],
      checkedIds: [],
      checkedTags: [],
      uploadImageUrl: apiConfig.uploadImageUrl,
      loading: false,
      campaignTime: '',
      checkedCitys: [],
      provinceData: [],
      province: '',
      cityData: [],
      city: '',
      budgetMin: 500,
      perBudgetMin: 0.3,
      submitData: {
        url: '',
        name: '',
        description: '',
        img_url: '',
        budget: 500,
        sub_type: '',
        per_budget_type: '',
        example_screenshot_count: 1,
        per_action_budget: 0.3,
        start_time: '',
        deadline: '',
        target: {
          tags: '',
          region: '',
          age: '全部',
          gender: '全部',
        },
        enable_append_push: 'true'
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
      console.log(res)
      if (res.status == 200 && res.data) {
        const data = res.data
        console.log(data)
        this.tagsList = data.tags_list
        console.log(this.tagsList)
      }
    },
    getDetailData (id) {
      axios.get(apiConfig.campaignsUrl + '/' + id, {
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
        this.submitData.url = resData.url
        this.submitData.name = resData.name
        this.submitData.description = resData.description
        this.submitData.img_url = resData.img_url

        this.submitData.budget = resData.budget
        this.submitData.sub_type = resData.sub_type
        this.submitData.per_budget_type = resData.per_budget_type
        this.submitData.example_screenshot_count = resData.example_screenshot_count
        this.submitData.per_action_budget = resData.per_action_budget
        this.submitData.start_time = resData.start_time
        this.submitData.deadline = resData.deadline
        this.campaignTime = []
        this.campaignTime[0] = resData.start_time
        this.campaignTime[1] = resData.deadline
        this.submitData.target.tags = resData.tags.toString()
        this.submitData.target.region = resData.region
        this.submitData.target.age = resData.age
        this.submitData.target.gender = resData.gender
        this.submitData.enable_append_push = resData.enable_append_push

        let _tagsList = this.tagsList
        let _checkedData = resData.tags
        let _checkedIds = []
        let _checkedTags = []
        _tagsList.forEach(item => {
          _checkedData.forEach(e => {
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

        let _citys = resData.region
        _citys = _citys.split('/')
        _citys.forEach(item => {
          this.checkedCitys.push(item)
        })
        console.log(this.checkedCitys)
      }
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
      this.submitData.target.tags = _checkedTags.toString()
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
    changeCity (e) {
      const _self = this
      let selectedVal = e.target.value
      let citys = _self.checkedCitys
      console.log(selectedVal)
      if (selectedVal != '') {
        let _index = citys.indexOf(selectedVal)
        if (_index == -1) {
          citys.push(selectedVal)
          _self.city = ''
        }
      }
      console.log(_self.checkedCitys)
    },
    delCity (city) {
      let citys = this.checkedCitys
      let _index = citys.indexOf(city)
      if (_index != -1) {
        citys.splice(_index, 1)
      }
      console.log(this.checkedCitys)
    },
    subTypeChange () {
      console.log(this.submitData.sub_type)
      this.submitData.per_budget_type = ''
    },
    perBudgetChange () {
      let _perBudgetType = this.submitData.per_budget_type
      this.submitData.example_screenshot_count = 1
      switch (_perBudgetType) {
        case 'click':
          this.perBudgetMin = 0.3
          this.submitData.per_action_budget = 0.3
          break
        case 'post':
          this.perBudgetMin = 3
          this.submitData.per_action_budget = 3
          break
        case 'cpt':
          this.perBudgetMin = 3
          this.submitData.per_action_budget = 3
          break
        default:
          this.perBudgetMin = 0.3
          this.submitData.per_action_budget = 0.3
      }
    },
    imgCountChange () {
      let _imgCount = this.submitData.example_screenshot_count
      switch (_imgCount) {
        case '1':
          this.perBudgetMin = 3
          this.submitData.per_action_budget = 3
          break
        case '2':
          this.perBudgetMin = 5
          this.submitData.per_action_budget = 5
          break
        case '3':
          this.perBudgetMin = 8
          this.submitData.per_action_budget = 8
          break
        default:
          this.perBudgetMin = 0.3
          this.submitData.per_action_budget = 0.3
      }
    },
    doSubmit () {
      let _self = this
      if (!_self.canSubmit) {
        return false
      }
      _self.canSubmit = false
      let submitParams = {}
      if (_self.formType == 'create') {
        submitParams = _self.submitData
      }
      if (_self.formType == 'edit') {
        _self.submitData.id = _self.$route.params.id
        submitParams = _self.submitData
      }

      console.log(submitParams)
      axios.post(apiConfig.campaignsUrl, submitParams, {
        headers: {
          'Authorization': _self.authorization
        }
      })
      .then(_self.handleDoSubmitSucc)
      .catch(function(error) {
        console.log(error)
        alert('提交失败，请重新提交')
        _self.canSubmit = true
      })
    },
    handleDoSubmitSucc (res) {
      console.log(res)
      if (res.status == 201) {
        let resData = res.data
        console.log(resData)
        this.$router.push('/campaigns/' + resData.id)
      } else {
        alert('提交失败，请重新提交')
      }
      this.canSubmit = true
    },
    doConfirm () {
      let _startTime = new Date(this.campaignTime[0])
      let _endTime = new Date(this.campaignTime[1])
      _startTime.setHours(_startTime.getHours() + 8)
      _endTime.setHours(_endTime.getHours() + 8)
      this.submitData.start_time = _startTime
      this.submitData.deadline = _endTime
      this.submitData.target.region = this.checkedCitys.toString()

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
    console.log(this.$route.query.copy_id)
    let _self = this
    if (_self.formType == 'edit') {
      _self.getBaseData()
      setTimeout(function () {
        _self.getDetailData(_self.$route.params.id)
      }, 500)
    } else {
      if (!!_self.$route.query.copy_id && _self.$route.query.copy_id != '') {
        _self.getBaseData()
        setTimeout(function () {
          _self.getDetailData(_self.$route.query.copy_id)
        }, 500)
      } else {
        _self.getBaseData()
      }
    }

    _self.provinceData = cityJs.citiesData.provinces
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
