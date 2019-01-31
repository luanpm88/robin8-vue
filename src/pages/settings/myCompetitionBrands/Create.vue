<template>
  <div class="panel default-panel mt20">
    <div class="panel-body brand-create-body">
      <div class="creat-txt">添加您的竞争对手，我们会帮助您更清晰地了解您与竞争品牌的差异哦!</div>
      <div class="form-horizontal brand-create-form">
        <div class="form-group" v-for="(item, index) in brandList" :key="index">
          <div class="col-sm-2 control-label">品牌名称：</div>
          <div class="col-sm-2">
            <input
              type="text"
              name="name"
              class="form-control"
              placeholder="请填写品牌名称"
              v-model="item.name"
            >
          </div>
          <div class="col-sm-5">
            <input
              type="text"
              name="name"
              class="form-control"
              placeholder="请填写品牌简称"
              v-model="item.short_name"
            >
          </div>
          <div class="col-sm-1">
            <span class="iconfont icon-delete" @click="delBrand(index)"></span>
          </div>
        </div>
        <div class="form-add">
          <span class="iconfont icon-edit" @click="addBrand">&nbsp;添加我的竞争品牌</span>
        </div>
      </div>
      <div class="text-center create-btn-area">
        <button type="button" class="btn btn-cyan submit-btn" @click="submit">提交</button>
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
      brandList: [
        {
          name: '',
          short_name: ''
        }
      ]
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
    submit() {
      let params = {
        competitors: this.brandList
      }
      this.submitCreatedCompetitor(params);
    },
    parentHome() {
      
    }
  },
  computed: {
    ...mapState(['authorization'])
  }
}
</script>

<style lang="scss" scoped>
.brand-create-body{
    padding: 60px 0;
}
.creat-txt{
  color: #3c3939;
  text-align: center;
  margin-bottom: 30px;
  font-size: $font-nm-b;
}
.icon-delete{
  line-height: 34px;
  cursor: pointer;
}
.form-add{
  text-align: right;
  padding-right: 30%;
  span{
    color: #40c1b8;
    cursor: pointer;
  }
}
.create-btn-area{
  padding-top: 30px;
}
</style>
