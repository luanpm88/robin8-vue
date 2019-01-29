<template>
  <div class="campaign-detail-container">
    <create-process
      :renderData="processStatus"
      class="mt20"
    ></create-process>

    <div class="panel default-panel mt20">
      <div class="panel-head">
        <h5 class="title text-center">基础信息</h5>
      </div>
      <div class="panel-body">
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-2 control-label">活动名称：</div>
            <div class="col-sm-10">
              <input
                type="text"
                name="name"
                class="form-control"
                :class="[errors.has('name') ? 'danger' : '']"
                v-model="submitData.name"
                placeholder="请填写活动名称"
                v-validate="'required'"
              >
              <div class="form-tips">好的名称可以吸引更多优质KOL参加</div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">活动介绍：</div>
            <div class="col-sm-10">
              <input
                type="text"
                name="desc"
                class="form-control"
                :class="[errors.has('desc') ? 'danger' : '']"
                v-model="submitData.description"
                placeholder="请填写活动介绍"
                v-validate="'required'"
              >
              <div class="form-tips">请填写活动相关介绍</div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">品牌名称：</div>
            <div class="col-sm-10">
              <select
                name="brand"
                class="form-control"
                :class="[errors.has('brand') ? 'danger' : '']"
                v-model="submitData.trademark_id"
                v-validate="'required'"
              >
                <option value="">请选择品牌名称</option>
                <option
                  v-for="item in brandsList"
                  :key="item.id"
                  :value="item.id"
                >{{item.name}}</option>
              </select>
              <div class="form-tips">请选择准确的品牌名称</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel default-panel mt20">
      <div class="panel-head">
        <h5 class="title text-center">活动信息</h5>
      </div>
      <div class="panel-body">
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-2 control-label">活动平台：</div>
            <div class="col-sm-10">
              <div class="row">
                <div
                  v-for="item in terracesList"
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
                  <div class="col-sm-10">
                    <input
                      type="number"
                      class="form-control"
                      v-model="item.val"
                      :placeholder="'请填写'+ item.name +'期待曝光值'"
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
                    {{ errors.first('terrace') }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">活动图片：</div>
            <div class="col-sm-10">
              <div class="upload-imgs-list">
                <div class="upload-img-item">
                  <img src="" alt="" class="upload-img" />
                  <div class="iconfont icon-close close-btn"></div>
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
              <!-- <input
                type="hidden"
                name="img_url"
                v-model="submitData.img_url"
                v-validate="'required'"
              > -->

              <div
                class="form-tips text-right danger"
                v-show="errors.has('img_url')"
              >
                {{ errors.first('img_url') }}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">活动时间：</div>
            <div class="col-sm-10">
              <div class="input-group">
                <datepicker
                  name="start_at"
                  input-class="form-control"
                  format="yyyy-MM-dd"
                  placeholder="选择开始时间"
                  v-model="submitData.start_at"
                  v-validate="'required'"
                ></datepicker>
                <span class="input-group-addon">-</span>
                <datepicker
                  name="end_at"
                  input-class="form-control"
                  format="yyyy-MM-dd"
                  placeholder="选择结束时间"
                  v-model="submitData.end_at"
                  v-validate="'required'"
                ></datepicker>
              </div>
              <div
                class="form-tips text-right danger"
                v-show="errors.has('start_at') || errors.has('end_at')"
              >
                请选择您预期的活动时间
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">KOL数量：</div>
            <div class="col-sm-4">
              <input
                type="number"
                name="kols_count"
                class="form-control"
                :class="[errors.has('kols_count') ? 'danger' : '']"
                v-model.number="submitData.pre_kols_count"
                placeholder="请填写活动KOL数量"
                v-validate="'required'"
              >
              <div class="form-tips">请填写活动KOL数量</div>
            </div>
            <div class="col-sm-2 control-label">活动预算：</div>
            <div class="col-sm-4">
              <input
                type="number"
                name="pre_amount"
                class="form-control"
                :class="[errors.has('pre_amount') ? 'danger' : '']"
                v-model.number="submitData.pre_amount"
                placeholder="请填写活动预算"
                v-validate="'required'"
              >
              <div class="form-tips">请填写活动预算</div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">注意事项：</div>
            <div class="col-sm-10">
              <textarea
                name="notice"
                v-model="submitData.notice"
                class="form-control"
                rows="6"
                placeholder="请填写活动的注意事项，包括不要涵盖的内容，不可以提及的事项等特殊需要注意的地方"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel default-panel mt20">
      <div class="panel-head">
        <h5 class="title text-center">大V 相关要求</h5>
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
              情选择一个标签
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">价格要求：</div>
            <div class="col-sm-10">
              <div class="input-group">
                <input
                  type="number"
                  name="price_from"
                  class="form-control"
                  :class="[errors.has('price_from') ? 'danger' : '']"
                  v-model.number="submitData.target.price_from"
                  placeholder="最低价格"
                  v-validate="'required'"
                >
                <span class="input-group-addon">-</span>
                <input
                  type="number"
                  name="price_to"
                  class="form-control"
                  :class="[errors.has('price_to') ? 'danger' : '']"
                  v-model.number="submitData.target.price_to"
                  placeholder="最高价格"
                  v-validate="'required'"
                >
              </div>
              <div class="form-tips">请选择您期待的价格区间方便我们更精准的为您推荐KOL</div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">粉丝年龄：</div>
            <div class="col-sm-4">
              <select class="form-control">
                <option>请选择期望的粉丝年龄</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              <div class="form-tips">请选择期望的粉丝年龄</div>
            </div>
            <div class="col-sm-2 control-label">粉丝性别：</div>
            <div class="col-sm-4">
              <select class="form-control">
                <option>请选择粉丝性别</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              <div class="form-tips">请选择粉丝性别</div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">粉丝地域：</div>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="" placeholder="请选择/填写粉丝的地域要求">
              <div class="form-tips">请填写期望的粉丝地域描述</div>
            </div>
          </div>
          <div class="form-group text-center">
            <button
              type="button"
              class="btn btn-blue btn-outline"
              @click=""
            >搜索大V</button>
          </div>
        </div>
      </div>
    </div>

    <kols-list-panel
      class="mt20"
      title="为您推荐的大V"
    ></kols-list-panel>

    <div class="text-center create-btn-area">
      <button
        type="button"
        class="btn btn-cyan next-btn"
        @click="doConfirm"
        :disabled="canSubmit ? false : true"
      >提交</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import Datepicker from 'vuejs-datepicker'
import TagsList from '@components/TagsList'
import CreateProcess from './components/CreateProcess'
import KolsListPanel from './components/KolsListPanel'
import VueCoreImageUpload from 'vue-core-image-upload'

export default {
  name: 'CreationEdit',
  components: {
    Datepicker,
    TagsList,
    CreateProcess,
    KolsListPanel,
    VueCoreImageUpload
  },
  data () {
    return {
      processStatus: {
        current: 1,
        index: 0
      },
      brandsList: [],
      tagsList: [],
      checkedIds: [],
      terracesList: [],
      uploadImageUrl: apiConfig.uploadImageUrl,
      pictures: [],
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
        notice: ''
      },
      canSubmit: true
    }
  },
  methods: {
    getBaseData () {
      axios.get(apiConfig.baseInfosUrl)
        .then(this.handleGetBaseDataSucc)
    },
    handleGetBaseDataSucc (res) {
      console.log(res)
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
      axios.get(apiConfig.creationsUrl + '/' + this.$route.params.id)
        .then(this.handleGetDetailDataSucc)
    },
    handleGetDetailDataSucc (res) {
      console.log(res)
      let resData = res.data
      if (res.status == 200 && resData) {
        console.log(resData)
        this.submitData.name = resData.name
        this.submitData.description = resData.description
        this.submitData.trademark_id = resData.trademark_id
        this.submitData.start_at = resData.start_at
        this.submitData.end_at = resData.end_at
        this.submitData.pre_kols_count = resData.pre_kols_count
        this.submitData.pre_amount = resData.pre_amount
        this.submitData.notice = resData.notice
        this.submitData.target.industries = resData.targets_hash.industries
        this.submitData.target.price_from = resData.targets_hash.price_from
        this.submitData.target.price_to = resData.targets_hash.price_to
        this.submitData.terraces = resData.terraces

        let _terracesList = this.terracesList
        _terracesList.forEach(item => {
          resData.terraces.forEach(e => {
            if (item.id == e.terrace_id) {
              item.checked = true
              item.val = e.exposure_value
            }
          })
        })
        console.log(_terracesList)

        let _tagsList = this.tagsList
        let _checkedData = resData.targets_hash.industries
        let _checkedArr = _checkedData.split(',')
        let _checkedIds = []
        _tagsList.forEach(item => {
          _checkedArr.forEach(e => {
            if (item.name == e) {
              _checkedIds.push(item.id)
            }
          })
        })

        this.checkedIds = _checkedIds
        console.log(this.checkedIds)
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
      this.submitData.target.industries = _checkedTags.toString()
    },
    imageuploaded (res) {
      if (this.pictures.length >= 1) {
        alert('最多可上传1张图片')
        return false
      }
      console.log(res)
      if (res.code == 0) {
        this.pictures.push(res.data.base)
        this.loading = false
      } else {
        alert('上传失败')
        this.loading = false
      }
      this.submitData.img_url = this.pictures
      console.log(this.pictures)
    },
    imageuploading (res) {
      this.loading = true
    },
    delPhoto (e, url) {
      console.log(url)
      let index = this.pictures.indexOf(url)
      let delConfirm = confirm('确定要删除此图片？')
      if (delConfirm) {
        this.pictures.splice(index, 1)
      }
      console.log(this.pictures)
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
    doSubmit () {
      this.canSubmit = false
      axios.post(apiConfig.creationsUrl, {
        'id': this.$route.params.id,
        'creation': this.submitData
      }, {
        headers: {
          'Authorization': 'this.authorization'
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
    this.getDetailData()
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
