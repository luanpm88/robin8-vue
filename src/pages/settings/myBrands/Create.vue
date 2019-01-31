<template>
  <div class="panel default-panel mt20">
    <div class="panel-body brand-create-body">
      <div class="form-horizontal brand-create-form">
        <div class="form-group">
          <div class="col-sm-2 control-label">品牌名称：</div>
          <div class="col-sm-9">
            <input
              type="text"
              name="name"
              class="form-control"
              :class="[errors.has('name') ? 'danger' : '']"
              v-model="submitData.name"
              placeholder="请填写品牌名称"
              v-validate="'required'"
            >
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-2 control-label">品牌介绍：</div>
          <div class="col-sm-9">
            <textarea
              name="description"
              rows="8"
              class="form-control"
              :class="[errors.has('description') ? 'danger' : '']"
              v-model="submitData.description"
              placeholder="请填写品牌介绍"
              v-validate="'required'"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="text-center create-btn-area">
        <button
          type="button"
          class="btn btn-cyan submit-btn"
          @click="doConfirm"
          :disabled="canSubmit ? false : true"
        >提交</button>
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
  methods: {
    doSubmit () {
      if (!this.canSubmit) {
        return false
      }
      this.canSubmit = false
      axios.post(apiConfig.createBrandUrl, this.submitData, {
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
</style>
