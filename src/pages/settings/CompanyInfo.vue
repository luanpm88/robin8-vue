<template>
  <div class="profile-container">
    <div class="panel default-panel profile-panel">
      <div class="panel-head">
        <div class="title-bar">
          <h5 class="title">{{$t('lang.companyInfo.title')}}</h5>
        </div>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-sm-3">
            <div class="upload-avatar-area">
              <div class="avatar">
                <img
                  :src="submitData.avatar_url"
                  alt=""
                  class="avatar-img"
                />
              </div>
              <vue-core-image-upload
                :class="['btn', 'btn-cyan']"
                crop="local"
                crop-ratio="1:1"
                @imageuploaded="imageuploaded"
                @imageuploading="imageuploading"
                inputOfFile="image"
                :text="$t('lang.companyInfo.avatar_url.title')"
                :max-file-size="5242880"
                :compress="80"
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
          </div>
          <div class="col-sm-9">
            <div class="form-horizontal profile-form">
              <div class="form-group">
                <div class="col-sm-3 control-label">{{$t('lang.companyInfo.name.title')}}:</div>
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
                <div class="col-sm-3 control-label">{{$t('lang.companyInfo.real_name.title')}}:</div>
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
                <div class="col-sm-3 control-label">{{$t('lang.companyInfo.campany_name.title')}}:</div>
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
                <div class="col-sm-3 control-label">{{$t('lang.companyInfo.url.title')}}:</div>
                <div class="col-sm-8">
                  <input
                    type="text"
                    name="url"
                    class="form-control"
                    :class="[errors.has('url') ? 'danger' : '']"
                    v-model="submitData.url"
                    :placeholder="$t('lang.companyInfo.url.placeholder')"
                  >
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-3 control-label">{{$t('lang.companyInfo.description.title')}}:</div>
                <div class="col-sm-8">
                  <textarea
                    name="description"
                    class="form-control"
                    rows="6"
                    v-model="submitData.description"
                    :placeholder="$t('lang.companyInfo.description.placeholder')"
                  ></textarea>
                </div>
              </div>
              <!-- <div class="form-group">
                <div class="col-sm-3 control-label">{{$t('lang.companyInfo.keywords.title')}}:</div>
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
              </div> -->

            </div>
          </div>
        </div>

      </div>
      <div class="panel-foot text-center">
        <button
          type="button"
          class="btn btn-cyan submit-btn"
          @click="doConfirm"
          :disabled="canSubmit ? false : true"
        >{{$t('lang.submitBtn')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import VueCoreImageUpload from 'vue-core-image-upload'
import { mapState, mapMutations } from 'vuex'

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
        // keywords: '',
        avatar_url: ''
      },
      canSubmit: true
    }
  },
  methods: {
    ...mapMutations(['setEmail', 'setAuthorization', 'setNickname', 'setMobile', 'setAvatarImgUrl', 'setCompanyName']),
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
        this.submitData.real_name = resData.real_name
        this.submitData.campany_name = resData.campany_name
        this.submitData.url = resData.url
        this.submitData.description = resData.description
        // this.submitData.keywords = resData.keywords
        this.submitData.avatar_url = resData.avatar_url
      }
    },
    imageuploaded (res) {
      console.log(res)
      this.submitData.avatar_url = res
    },
    imageuploading (res) {
      this.loading = true
    },
    doSubmit () {
      let _self = this
      if (!_self.canSubmit) {
        return false
      }
      _self.canSubmit = false

      axios.post(apiConfig.usersUrl, this.submitData, {
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
        this.setEmail(resData.email)
        this.setNickname(resData.name)
        this.setMobile(resData.mobile_number)
        this.setAvatarImgUrl(resData.avatar_url)
        this.setCompanyName(resData.campany_name)
        alert('编辑成功')
        // this.$router.push('/')
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
.profile-container {
  padding: 0 100px 30px;
}
.profile-panel {
  .panel-body {
    padding: 40px;
  }
}
.profile-form {
  .form-group {
    margin-bottom: 20px;
  }
}
.upload-avatar-area {
  text-align: center;
  .avatar {
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    margin-bottom: 20px;
    border: 1px solid $bg-color;
    border-radius: 50%;
    overflow: hidden;
    .avatar-img {
      position: absolute;
      top: 0;
      @include center(x);
      height: 100%;
    }
  }
}
.submit-btn {
  width: 150px;
}
</style>
