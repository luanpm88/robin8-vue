<template>
  <div class="campaign-create-container">
    <div class="panel default-panel mt20">
      <div class="panel-body">
        <div class="line-title">{{$t('lang.updateBaseInfo.base_info.title')}}</div>
        <div class="form-horizontal base-info-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.updateBaseInfo.base_info.name.title')}}:</div>
            <div class="col-sm-7">
              <input
                type="text"
                name="name"
                class="form-control"
                :class="[errors.has('name') ? 'danger' : '']"
                v-model="submitData.base_info.name"
                :placeholder="$t('lang.updateBaseInfo.base_info.name.placeholder')"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('name')"
              >
                {{$t('lang.updateBaseInfo.base_info.name.errorTips')}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.updateBaseInfo.base_info.campany_name.title')}}:</div>
            <div class="col-sm-7">
              <input
                type="text"
                name="campany"
                class="form-control"
                :class="[errors.has('campany') ? 'danger' : '']"
                v-model="submitData.base_info.campany_name"
                :placeholder="$t('lang.updateBaseInfo.base_info.campany_name.placeholder')"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('campany')"
              >
                {{$t('lang.updateBaseInfo.base_info.campany_name.errorTips')}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.updateBaseInfo.base_info.email.title')}}:</div>
            <div v-if="!!submitData.base_info.email && submitData.base_info.email != ''" class="col-sm-7">
              <p class="form-control-static">{{submitData.base_info.email}}</p>
            </div>
            <div v-else class="col-sm-7">
              <input
                type="email"
                name="email"
                class="form-control"
                v-model="submitData.base_info.email"
                :placeholder="$t('lang.updateBaseInfo.base_info.email.placeholder')"
                v-validate="'email'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('email')"
              >
                {{$t('lang.updateBaseInfo.base_info.email.errorTips')}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.updateBaseInfo.base_info.mobile_number.title')}}:</div>
            <div v-if="!!submitData.base_info.mobile_number && submitData.base_info.mobile_number != ''" class="col-sm-7">
              <p class="form-control-static">{{submitData.base_info.mobile_number}}</p>
            </div>
            <div v-else class="col-sm-7">
              <input
                type="tel"
                name="mobile"
                class="form-control"
                v-model="submitData.base_info.mobile_number"
                :placeholder="$t('lang.updateBaseInfo.base_info.mobile_number.placeholder')"
                v-validate="'phone'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('mobile')"
              >
                {{$t('lang.updateBaseInfo.base_info.mobile_number.errorTips')}}
              </div>
            </div>
          </div>
        </div>

        <div class="line-title">{{$t('lang.updateBaseInfo.my_brand.title')}}</div>
        <div class="form-horizontal base-info-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.updateBaseInfo.my_brand.name.title')}}:</div>
            <div class="col-sm-7">
              <input
                type="text"
                name="brand_name"
                class="form-control"
                :class="[errors.has('brand_name') ? 'danger' : '']"
                v-model="submitData.my_brand.name"
                :placeholder="$t('lang.updateBaseInfo.my_brand.name.placeholder')"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('brand_name')"
              >
                {{$t('lang.updateBaseInfo.my_brand.name.errorTips')}}
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.updateBaseInfo.my_brand.keywords.title')}}:</div>
            <div class="col-sm-7">
              <input
                type="text"
                name="brand_keywords"
                class="form-control"
                :class="[errors.has('brand_keywords') ? 'danger' : '']"
                v-model="submitData.my_brand.keywords"
                :placeholder="$t('lang.updateBaseInfo.my_brand.keywords.placeholder')"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('brand_keywords')"
              >
                {{$t('lang.updateBaseInfo.my_brand.keywords.errorTips')}}
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.updateBaseInfo.my_brand.description.title')}}:</div>
            <div class="col-sm-7">
              <textarea
                name="brand_description"
                rows="4"
                class="form-control"
                v-model="submitData.my_brand.description"
                :placeholder="$t('lang.updateBaseInfo.my_brand.description.placeholder')"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="line-title">{{$t('lang.updateBaseInfo.competitors.title')}}</div>
        <div class="form-horizontal base-info-form">
          <div
            v-for="(item, index) of submitData.competitors"
            :key="index"
            class="form-group"
          >
            <div class="col-sm-2 control-label">{{$t('lang.updateBaseInfo.competitors.name.title')}}:</div>
            <div class="col-sm-3">
              <input
                type="text"
                :name="'competitor_name_' + index"
                class="form-control"
                :class="[errors.has('competitor_name_' + index) ? 'danger' : '']"
                v-model="item.name"
                :placeholder="$t('lang.updateBaseInfo.competitors.name.placeholder')"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('competitor_name_' + index)"
              >
                {{$t('lang.updateBaseInfo.competitors.name.errorTips')}}
              </div>
            </div>

            <div class="col-sm-2 control-label">{{$t('lang.updateBaseInfo.competitors.short_name.title')}}:</div>
            <div class="col-sm-3">
              <input
                type="text"
                :name="'competitor_shortname_' + index"
                class="form-control"
                :class="[errors.has('competitor_shortname_' + index) ? 'danger' : '']"
                v-model="item.short_name"
                :placeholder="$t('lang.updateBaseInfo.competitors.short_name.placeholder')"
                v-validate="'required'"
              >
              <div
                class="form-tips danger"
                v-show="errors.has('competitor_shortname_' + index)"
              >
                {{$t('lang.updateBaseInfo.competitors.short_name.errorTips')}}
              </div>
            </div>
            <div class="col-sm-1">
              <p class="form-control-static">
                <span class="iconfont icon-delete delete-btn" @click="delCompetitor(index)"></span>
              </p>
            </div>
          </div>

          <div class="form-group">
            <div class="col-xs-offset-7 col-sm-3">
              <div class="add-brand-btn text-right" @click="addCompetitor">
                <span class="iconfont icon-pencil"></span>Add Brand
              </div>
            </div>
          </div>
        </div>

        <div class="text-center create-btn-area">
          <button
            type="button"
            class="btn btn-cyan next-btn"
            @click="doConfirm"
            :disabled="canSubmit ? false : true"
          >{{$t('lang.submitBtn')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import { mapState } from 'vuex'

export default {
  name: 'UpdateBaseInfo',
  data () {
    return {
      submitData: {
        base_info: {
          name: '',
          campany_name: '',
          email: '',
          mobile_number: ''
        },
        my_brand: {
          name: '',
          description: ''
        },
        competitors: [
          {
            name: '',
            short_name: ''
          }
        ]
      },
      canSubmit: true
    }
  },
  methods: {
    addCompetitor () {
      let competitorObj = {
        name: '',
        short_name: ''
      }
      // if (this.submitData.competitors.length >= 3) {
      //   alert('最多可添加3条')
      //   return false
      // }
      console.log(competitorObj)
      this.submitData.competitors.push(competitorObj)
      console.log(this.submitData.competitors)
    },
    delCompetitor (index) {
      this.submitData.competitors.splice(index, 1)
      console.log(this.submitData.competitors)
    },
    doSubmit () {
      if (!this.canSubmit) {
        return false
      }
      this.canSubmit = false
      axios.post(apiConfig.updateBaseInfo, this.submitData, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleDoSubmitSucc)
    },
    handleDoSubmitSucc (res) {
      console.log(res)
      if (res.status == 201) {
        this.$emit('updateStatus', true)
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
    this.submitData.base_info.name = this.nickname
    this.submitData.base_info.campany_name = this.companyName
    this.submitData.base_info.email = this.email
    this.submitData.base_info.mobile_number = this.mobile
  },
  computed: {
    ...mapState(['authorization', 'nickname', 'mobile', 'email', 'companyName'])
  }
}
</script>

<style lang="scss" scoped>
.base-info-form {
  padding: 20px;
  .form-group {
    padding: 20px 0;
  }
}
.create-btn-area {
  padding: 30px;
  .next-btn {
    width: 150px;
  }
}
.add-brand-btn {
  color: nth($purple, 1);
  cursor: pointer;
  .iconfont {
    display: inline-block;
    margin: 0 4px 0 0;
    vertical-align: middle;
  }
}
.delete-btn {
  cursor: pointer;
}
</style>
