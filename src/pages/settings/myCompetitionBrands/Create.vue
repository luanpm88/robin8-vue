<template>
  <div class="create-brand-container">
    <div class="panel default-panel">
      <div class="panel-body brand-create-body">
        <div class="create-tips ">{{$t('lang.myCompetitionBrands.topTit')}}</div>
        <div class="form-horizontal brand-create-form mt30">
          <div class="form-group"
            v-for="(item, index) in brandList"
            :key="index"
          >
            <div class="col-sm-2 control-label">
              {{$t('lang.myCompetitionBrands.addPage.name')}}
            </div>
            <div class="col-sm-4">
              <input
                type="text"
                name="name"
                class="form-control"
                :placeholder="$t('lang.myCompetitionBrands.addPage.placeholderName')"
                v-model="item.name"
              >
            </div>
            <div class="col-sm-5">
              <input
                type="text"
                name="name"
                class="form-control"
                :placeholder="$t('lang.myCompetitionBrands.addPage.placeholderDec')"
                v-model="item.short_name"
              >
            </div>
            <div class="col-sm-1" v-if="isAdd">
              <span class="iconfont icon-delete" @click="delBrand(index)"></span>
            </div>
          </div>
          <div class="text-center mt20" v-if="isAdd">
            <button
              type="button"
              class="btn btn-link"
              @click="addBrand"
            >
              <span class="iconfont icon-add"></span>
              {{$t('lang.myCompetitionBrands.addPage.addTip')}}
            </button>
          </div>
        </div>
      </div>
      <div class="panel-foot text-center">
        <button
          type="button"
          class="btn btn-cyan btn-outline mr10"
          @click="backList"
        >
          {{$t('lang.backBtn')}}
        </button>
        <button
          type="button"
          class="btn btn-cyan submit-btn"
          @click="submit"
        >
          {{$t('lang.submitBtn')}}
        </button>
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
  name: 'MyCompetitionBrandsCreate',
  props: ['status'],
  data () {
    return {
      chageHomeShow: true,
      isAdd: true,
      brandList: [
        {
          name: '',
          short_name: ''
        }
      ]
    }
  },
  created() {
    // console.log(this.$route.params.itemList);
    if (this.$route.params.itemList) {
      this.isAdd = false
      this.brandList[0].name = this.$route.params.itemList.name
      this.brandList[0].short_name = this.$route.params.itemList.short_name
    } else {
      this.isAdd = true
    }
  },
  methods: {
    addBrand () {
      let params = {
        name: '',
        short_name: ''
      }
      this.brandList.push(params);
    },
    delBrand(index) {
      // console.log(index);
      this.brandList.splice(index, 1);
    },
    // 我的竞争品牌 增加品牌 提交接口
    submitCreatedCompetitor(params) {
      const _that = this
      axios
        .post(apiConfig.submitCreatedCompetitor, params, {
          headers: {
            'Authorization': _that.authorization
          }
        })
        .then(function(res) {
          // console.log(res);
          if (res.status === 201) {
            if (_that.status) {
              // _that.$router.push("/");
              _that.$emit('childStatus', _that.chageHomeShow)
            } else {
              _that.$router.push("/settings/my_competition_brands");
            }
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    // 编辑提交的接口
    editSubmit(params, item) {
      const _that = this
      axios
        .post(apiConfig.submitCreatedCompetitor + '/' + item.id, params, {
          headers: {
            'Authorization': _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 201) {
            if (_that.status) {
              _that.$emit('childStatus', _that.chageHomeShow)
            } else {
              _that.$router.push("/settings/my_competition_brands");
            }
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    submit() {
      if (!this.$route.params.itemList) {
        let params = {
          competitors: this.brandList
        }
        this.submitCreatedCompetitor(params);
      } else {
        let params = {
          id: this.$route.params.itemList.id,
          name: this.brandList[0].name,
          short_name: this.brandList[0].short_name
        }
        this.editSubmit(params, this.$route.params.itemList);
      }
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
.create-brand-container {
  padding: 30px 100px;
  .create-tips {
    text-align: center;
  }
  .icon-delete {
    line-height: 34px;
    cursor: pointer;
  }
  .form-add {
    text-align: right;
    padding-right: 30%;
    span{
      color: #40c1b8;
      cursor: pointer;
    }
  }
  .submit-btn {
    width: 160px;
  }
}
.brand-create-body {
  padding: 30px 0;
}
</style>
