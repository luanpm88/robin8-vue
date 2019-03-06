<template>
  <div class="profile-container">
    <div class="panel default-panel profile-panel mt20">
      <div class="panel-head">
        <div class="title-bar">
          <h5 class="title">{{$t('lang.companyInfo.title')}}</h5>
        </div>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-sm-3">
            <div class="thumbnail">
              <img src="" alt="" />
              <div class="caption"></div>
            </div>
            <div v-if="submitData.avatar_url != ''" class="upload-imgs-list">
              <div class="upload-img-item">
                <img :src="submitData.avatar_url" alt="" class="upload-img" />
                <div class="iconfont icon-close close-btn" @click="delPhoto"></div>
              </div>
            </div>
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
              name="avatar_url"
              v-model="submitData.avatar_url"
              v-validate="'required'"
            >
            <div
              class="form-tips danger"
              v-show="errors.has('avatar_url')"
            >
              {{$t('lang.companyInfo.avatar_url.errorTips')}}
            </div>
          </div>
          <div class="col-sm-9">
            <div class="form-horizontal profile-form">
              <div class="form-group">
                <div class="col-sm-3 control-label">{{$t('lang.companyInfo.name.title')}}：</div>
                <div class="col-sm-8">
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    :class="[errors.has('name') ? 'danger' : '']"
                    v-model="submitData.name"
                    :placeholder="$t('lang.companyInfo.name.placeholder')"
                    v-validate="'required'"
                  >
                  <div
                    class="form-tips danger"
                    v-show="errors.has('name')"
                  >
                    {{$t('lang.companyInfo.name.errorTips')}}
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-3 control-label">{{$t('lang.companyInfo.real_name.title')}}：</div>
                <div class="col-sm-8">
                  <input
                    type="text"
                    name="real_name"
                    class="form-control"
                    :class="[errors.has('real_name') ? 'danger' : '']"
                    v-model="submitData.real_name"
                    :placeholder="$t('lang.companyInfo.real_name.placeholder')"
                    v-validate="'required'"
                  >
                  <div
                    class="form-tips danger"
                    v-show="errors.has('real_name')"
                  >
                    {{$t('lang.companyInfo.real_name.errorTips')}}
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-3 control-label">{{$t('lang.companyInfo.campany_name.title')}}：</div>
                <div class="col-sm-8">
                  <input
                    type="text"
                    name="campany_name"
                    class="form-control"
                    :class="[errors.has('campany_name') ? 'danger' : '']"
                    v-model="submitData.campany_name"
                    :placeholder="$t('lang.companyInfo.campany_name.placeholder')"
                    v-validate="'required'"
                  >
                  <div
                    class="form-tips danger"
                    v-show="errors.has('campany_name')"
                  >
                    {{$t('lang.companyInfo.campany_name.errorTips')}}
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-3 control-label">{{$t('lang.companyInfo.url.title')}}：</div>
                <div class="col-sm-8">
                  <input
                    type="text"
                    name="url"
                    class="form-control"
                    :class="[errors.has('url') ? 'danger' : '']"
                    v-model="submitData.url"
                    :placeholder="$t('lang.companyInfo.url.placeholder')"
                    v-validate="'required'"
                  >
                  <div
                    class="form-tips danger"
                    v-show="errors.has('url')"
                  >
                    {{$t('lang.companyInfo.url.errorTips')}}
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-3 control-label">{{$t('lang.companyInfo.description.title')}}：</div>
                <div class="col-sm-8">
                  <input
                    type="text"
                    name="description"
                    class="form-control"
                    :class="[errors.has('description') ? 'danger' : '']"
                    v-model="submitData.description"
                    :placeholder="$t('lang.companyInfo.description.placeholder')"
                    v-validate="'required'"
                  >
                  <div
                    class="form-tips danger"
                    v-show="errors.has('description')"
                  >
                    {{$t('lang.companyInfo.description.errorTips')}}
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-3 control-label">{{$t('lang.companyInfo.keywords.title')}}：</div>
                <div class="col-sm-8">
                  <input
                    type="text"
                    name="keywords"
                    class="form-control"
                    :class="[errors.has('keywords') ? 'danger' : '']"
                    v-model="submitData.keywords"
                    :placeholder="$t('lang.companyInfo.keywords.placeholder')"
                    v-validate="'required'"
                  >
                  <div
                    class="form-tips danger"
                    v-show="errors.has('keywords')"
                  >
                    {{$t('lang.companyInfo.keywords.errorTips')}}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="text-center p30">
      <button
        type="button"
        class="btn btn-cyan submit-btn"
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
import VueCoreImageUpload from 'vue-core-image-upload'
import { mapState } from 'vuex'

export default {
  name: 'CompanyInfo',
  components: {
    VueCoreImageUpload
  },
  data () {
    return {
      uploadImageUrl: apiConfig.uploadImageUrl,
      loading: false,
      submitData: {
        name: '',
        real_name: '',
        campany_name: '',
        url: '',
        description: '',
        keywords: '',
        avatar_url: ''
      },
      canSubmit: true
    }
  },
  methods: {
    getProfileData () {
      axios.get(apiConfig.profileUrl, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleGetProfileDataSucc)
    },
    handleGetProfileDataSucc (res) {
      let resData = res.data
      if (res.status == 200 && resData) {
        console.log(resData)
        this.submitData.name = resData.name
      }
    },
    imageuploaded (res) {
      console.log(res)
      this.submitData.avatar_url = res
    },
    imageuploading (res) {
      this.loading = true
    },
    delPhoto () {
      let delConfirm = confirm('确定要删除此图片？')
      if (delConfirm) {
        this.submitData.avatar_url = ''
      }
    },
    doSubmit () {
      let _self = this
      if (!_self.canSubmit) {
        return false
      }
      _self.canSubmit = false

      axios.post(apiConfig.invoiceReceiverUrl, this.submitData, {
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
        this.$router.push('/')

      } else {
        alert('提交失败，请重新提交')
      }
      this.canSubmit = true
    },
    doConfirm () {
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
    this.getProfileData()
  },
  computed: {
    ...mapState(['authorization'])
  }
}
</script>

<style lang="scss" scoped>
.profile-form {
  padding: 20px 60px;
  .form-group {
    margin-bottom: 20px;
  }
}
.submit-btn {
  width: 150px;
}
</style>
