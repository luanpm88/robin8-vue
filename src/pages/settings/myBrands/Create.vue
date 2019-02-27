<template>
  <div class="panel default-panel mt20">
    <div class="panel-body brand-create-body">
      <div class="form-horizontal brand-create-form">
        <div class="form-group">
          <div class="col-sm-2 control-label">{{$t('lang.myBrandPage.addPage.name')}}</div>
          <div class="col-sm-9">
            <input
              type="text"
              name="name"
              class="form-control"
              :class="[errors.has('name') ? 'danger' : '']"
              v-model="submitData.name"
              :placeholder="$t('lang.myBrandPage.addPage.placeholderName')"
              v-validate="'required'"
            >
          </div>
        </div>

        <div class="form-group">
          <div class="col-sm-2 control-label">{{$t('lang.myBrandPage.addPage.keywords')}}</div>
          <div class="col-sm-9">
            <input
              type="text"
              name="keywords"
              class="form-control"
              :class="[errors.has('keywords') ? 'danger' : '']"
              v-model="submitData.keywords"
              :placeholder="$t('lang.myBrandPage.addPage.placeholderKeywords')"
              v-validate="'required'"
            >
            <p class="creat-text-tip">{{$t('lang.myBrandPage.addPage.keywordsTips')}}</p>
          </div>
        </div>

        <div class="form-group">
          <div class="col-sm-2 control-label">{{$t('lang.myBrandPage.addPage.dec')}}</div>
          <div class="col-sm-9">
            <textarea
              name="description"
              rows="8"
              class="form-control"
              :class="[errors.has('description') ? 'danger' : '']"
              v-model="submitData.description"
              :placeholder="$t('lang.myBrandPage.addPage.placeholderDec')"
              v-validate="'required'"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="text-center create-btn-area">
        <button
          type="button"
          class="btn btn-cyan submit-btn mr10" @click="backList">{{$t('lang.backBtn')}}</button>
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
import { mapState } from 'vuex'

export default {
  name: 'MyBrandsCreate',
  components: {
  },
  data () {
    return {
      submitData: {
        name: '',
        description: ''
      },
      canSubmit: true
    }
  },
  created() {
    if (this.$route.params.itemList) {
      this.submitData.name = this.$route.params.itemList.name
      this.submitData.keywords = this.$route.params.itemList.keywords
      this.submitData.description = this.$route.params.itemList.description
    }
  },
  methods: {
    doSubmit () {
      if (!this.canSubmit) {
        return false
      }
      this.canSubmit = false
      if (!this.$route.params.itemList) {
        axios.post(apiConfig.createBrandUrl, this.submitData, {
          headers: {
            'Authorization': this.authorization
          }
        }).then(this.handleDoSubmitSucc)
      } else {
        let params = {
          id: this.$route.params.itemList.id,
          name: this.submitData.name,
          keywords: this.submitData.keywords,
          description: this.submitData.description
        }
        // 编辑修改接口
        axios.post(apiConfig.createBrandUrl + '/' + this.$route.params.itemList.id, params, {
          headers: {
            'Authorization': this.authorization
          }
        }).then(this.handleDoSubmitSucc);
      }
      
    },
    handleDoSubmitSucc (res) {
      console.log(res)
      if (res.status == 201) {
        let resData = res.data
        console.log(resData)
        this.$router.push("/settings/my_brands")
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
    },
    backList() {
      this.$router.go(-1);
    }
  },
  computed: {
    ...mapState(['authorization'])
  }
}
</script>

<style lang="scss" scoped>
.brand-create-body {
  padding: 60px 0;
}
.create-btn-area {
  margin-top: 40px;
  .submit-btn {
    width: 160px;
  }
}
.creat-text-tip{
    color: #64e0d7;
    margin-top: 5px;
}
</style>
