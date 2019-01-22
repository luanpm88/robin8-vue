<template>
  <div class="campaign-create-container">
    <campaign-create-process
      :renderData="processStatus"
      class="mt20"
    ></campaign-create-process>

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
                class="form-control"
                v-model="submitData.name"
                placeholder="请填写活动名称"
              >
              <div class="form-tips">好的名称可以吸引更多优质KOL参加</div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">活动介绍：</div>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                v-model="submitData.description"
                placeholder="请填写活动介绍"
              >
              <div class="form-tips">请填写活动相关介绍</div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">品牌名称：</div>
            <div class="col-sm-10">
              <select
                class="form-control"
                v-model="submitData.trademark_id"
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
                <div class="col-sm-1 text-center">
                  <div
                    class="check-icon"
                    :class="[checkedWechat ? 'checked' : '']"
                    @click="terraceWechat"
                  >
                    <div class="iconfont icon-wechat-circle"></div>
                    <div class="iconfont icon-check"></div>
                  </div>
                </div>
                <div class="col-sm-5">
                  <input
                    type="number"
                    class="form-control"
                    v-model="exposureWechat"
                    placeholder="请填写微信期待曝光值"
                  >
                </div>
                <div class="col-sm-1 text-center">
                  <div
                    class="check-icon"
                    :class="[checkedWeibo ? 'checked' : '']"
                    @click="terraceWeibo"
                  >
                    <div class="iconfont icon-weibo-circle"></div>
                    <div class="iconfont icon-check"></div>
                  </div>
                </div>
                <div class="col-sm-5">
                  <input
                    type="number"
                    class="form-control"
                    v-model="exposureWeibo"
                    placeholder="请填写微博期待曝光值"
                  >
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
              <vue-core-image-upload
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
              </vue-core-image-upload>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">活动时间：</div>
            <div class="col-sm-10">
              <div class="input-group">
                <datepicker
                  input-class="form-control"
                  format="yyyy-MM-dd"
                  placeholder="选择开始时间"
                  v-model="submitData.start_at"
                ></datepicker>
                <span class="input-group-addon">-</span>
                <datepicker
                  input-class="form-control"
                  format="yyyy-MM-dd"
                  placeholder="选择结束时间"
                  v-model="submitData.end_at"
                ></datepicker>
              </div>
              <div class="form-tips">请选择您预期的活动时间</div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">KOL数量：</div>
            <div class="col-sm-4">
              <input
                type="number"
                class="form-control"
                v-model="submitData.pre_kols_count"
                placeholder="请填写活动KOL数量"
              >
              <div class="form-tips">请填写活动KOL数量</div>
            </div>
            <div class="col-sm-2 control-label">活动预算：</div>
            <div class="col-sm-4">
              <input
                type="number"
                class="form-control"
                v-model="submitData.pre_amount"
                placeholder="请填写活动预算"
              >
              <div class="form-tips">请填写活动预算</div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">注意事项：</div>
            <div class="col-sm-10">
              <textarea
                name=""
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
              @checkTag="checkTag"
            ></tags-list>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">价格要求：</div>
            <div class="col-sm-10">
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  v-model="submitData.price_from"
                  placeholder="最低价格"
                >
                <span class="input-group-addon">-</span>
                <input
                  type="number"
                  class="form-control"
                  v-model="submitData.price_to"
                  placeholder="最高价格"
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
            <button type="button" class="btn btn-blue btn-outline" @click="">搜索大V</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt20">
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
    </div>

    <div class="text-center create-btn-area">
      <button type="button" class="btn btn-cyan next-btn" @click="doSubmit">提交</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import Datepicker from 'vuejs-datepicker'
import TagsList from '@components/TagsList'
import CampaignCreateProcess from './components/CampaignCreateProcess'
import KolsListPanel from './components/KolsListPanel'
import VueCoreImageUpload from 'vue-core-image-upload'

export default {
  name: 'CampaignCreate',
  components: {
    Datepicker,
    TagsList,
    CampaignCreateProcess,
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
      uploadImageUrl: apiConfig.uploadImageUrl,
      pictures: [],
      loading: false,
      checkedWechat: false,
      checkedWeibo: false,
      exposureWechat: '',
      exposureWeibo: '',
      submitData: {
        name: '',
        description: '',
        trademark_id: '',
        start_at: '',
        end_at: '',
        pre_kols_count: '',
        pre_amount: '',
        img_url: '',
        terrace_id: '',
        exposure_value: '',
        industries: '',
        price_from: '',
        price_to: ''
      }
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
      }
    },
    checkTag (data) {
      let _checkedTags = data.checkedTags
      console.log(_checkedTags.toString())
      this.submitData.industries = _checkedTags.toString()
    },
    imageuploaded (res) {
      if (this.pictures.length >= 5) {
        alert('最多可上传5张图片')
        return false
      }
      if (res.code == 0) {
        this.pictures.push(res.data.base)
        this.loading = false
      } else {
        alert('上传失败')
        this.loading = false
      }
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
    terraceWechat () {
      this.checkedWechat = true
      this.checkedWeibo = false
      this.submitData.terrace_id = 1
    },
    terraceWeibo () {
      this.checkedWechat = false
      this.checkedWeibo = true
      this.submitData.terrace_id = 3
    },
    doSubmit () {
      if (this.checkedWechat) {
        this.submitData.exposure_value = this.exposureWechat
      } else if (this.checkedWeibo) {
        this.submitData.exposure_value = this.exposureWeibo
      }
      console.log(this.submitData)
      // this.$router.push('/campaigns/1')
    }
  },
  mounted () {
    this.getBaseData()
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
</style>
