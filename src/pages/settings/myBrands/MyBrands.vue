<template>
<div class="com-brand">
  <div class="com-add">
    <span><router-link :to="{path: '/settings/my_brands/create'}">{{$t('lang.myBrandPage.addBtn')}}</router-link></span>
  </div>
  <table class="com-brand-table">
    <tr>
      <th>{{$t('lang.myBrandPage.table.title.check')}}</th>
      <th>{{$t('lang.myBrandPage.table.title.id')}}</th>
      <th>{{$t('lang.myBrandPage.table.title.name')}}</th>
      <th>{{$t('lang.myBrandPage.table.title.keywords')}}</th>
      <th>{{$t('lang.myBrandPage.table.title.description')}}</th>
      <th>{{$t('lang.myBrandPage.table.title.operation')}}</th>
    </tr>
    <tr
      v-for="(item, index) in brandsList"
      :key="index"
      class="item"
    >
      <td>
        <input type="checkbox"  v-model="item.isCheck" @click="checkItem(item)">
      </td>
      <td>{{item.id}}</td>
      <td>{{item.name}}</td>
      <td>{{item.keywords}}</td>
      <td>{{item.description}}</td>
      <td>
        <p class="campaign-info-detail">
          <span @click="toDetail(item)">{{$t('lang.edit')}}</span>
          <span @click="toDelete(item)">{{$t('lang.delete')}}</span>
        </p>
      </td>
    </tr>
  </table>
  <div class="com-add mt20">
    <span @click="checkInsight">{{$t('lang.myBrandPage.contrastButton')}}</span>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import { mapState } from 'vuex'

export default {
  name: 'MyBrands',
  components: {
  },
  data () {
    return {
      brandsList: [],
      currentCheck: {}
    }
  },
  methods: {
    getMyBrandList(){
      axios.get(apiConfig.baseInfosUrl, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handelGetListDataSucc)
    },
    handelGetListDataSucc(res){
      let resData = res.data
      console.log(res);
      if (res.status == 200 && resData){
        let _brandsList = this.brandsList;
        let _brandItem
        resData.trademarks_list.forEach(item => {
          _brandItem = commonJs.buildObjData('id', item.id)
          if (item.status === 1 ) {
            _brandItem.isCheck = true
          } else {
            _brandItem.isCheck = false
          }
          _brandItem.status = item.status
          _brandItem.name = item.name
          _brandItem.keywords = item.keywords
          _brandItem.description = item.description
          this.brandsList.push(_brandItem)
        })
        console.log(this.brandsList)
      }
    },
    // 编辑和修改的接口
    totalJoggle(item, params) {
      const _that = this
      axios.post(apiConfig.createBrandUrl + '/' + item.id, params, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(function(res) {
        // console.log(res);
        if (res.status === 201) {
          _that.brandsList = []
          _that.getMyBrandList()
        }
      })
    },
    // 选中一条
    checkItem(item) {
      // console.log(item);
      let params = {
        id: item.id
      }
      if (item.isCheck) {
        params.status = 0
      } else {
        params.status = 1
      }
      this.totalJoggle(item, params)
    },
    toDetail(item) {
      this.$router.push({
        path: "/settings/my_brands/create",
        name: "MyBrandsCreate",
        params: {
          itemList: item
        }
      });
    },
    toDelete(item) {
      let params = {
        status: -1
      }
      this.totalJoggle(item, params);
    },
    checkInsight() {
      this.brandsList.forEach(element => {
        if (element.status === 1) {
          this.currentCheck = element
        }
      });
      if (!this.currentCheck.name) {
        alert(this.$t('lang.myBrandPage.tip'));
      } else {
        // 把当前选中brand 带到home页面
        this.$router.push({
          path: "/",
          name: "Home",
          params: {
            currentBrand: this.currentCheck.name
          }
        });
      }
    }
  },
  mounted(){
    this.getMyBrandList()
  },
  computed: {
     ...mapState(['authorization'])
  }
}
</script>

<style lang="scss" scoped>
.com-add {
  text-align: right;
  margin-bottom: 20px;
  span{
    cursor: pointer;
    &:hover{
      text-decoration: underline
    }
  }
}
.com-brand {
  min-height: 500px;
  background: $white;
  padding: 30px;
  margin-top: 20px;
  box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.08);
}
.com-brand-table{
  width: 100%;
  color: #333;
  tr{
    border-bottom: 1px solid #ddd;
    th{
      color: #333;
      font-size: $font-nm-b;
       text-align: center;
        padding: 5px 10px;
    }
  }
  td{
    text-align: center;
    padding: 16px 10px;
  }
}
.campaign-info-detail{
  line-height: 22px;
  span{
    cursor: pointer;
    color: #b37feb;
    &:hover{
      text-decoration: underline;
    }
    &:nth-child(2) {
        margin-left: 8px;
        color: #6168e6;
    }
  }

}
</style>
