<template>
<div class="com-brand">
  <div class="com-add">
    <span><router-link :to="{path: '/settings/my_brands/create'}">新建我的品牌</router-link></span>
  </div>
  <table class="com-brand-table">
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Description</th>
    </tr>
    <tr
      v-for="(item, index) in brandsList"
      :key="index"
      class="item"
    >
      <td>{{item.id}}</td>
      <td>{{item.name}}</td>
      <td>{{item.description}}</td>
    </tr>
  </table>
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
      brandsList: []
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
      if (res.status == 200 && resData){
        let _brandsList = this.brandsList
        let _brandItem
        resData.trademarks_list.forEach(item => {
          // console.log(item)
          _brandItem = commonJs.buildObjData('id', item.id)
          _brandItem.name = item.name
          _brandItem.description = item.description

          _brandsList.push(_brandItem)
        })
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
  tr{
    border-bottom: 1px solid #ddd;
    th{
      color: #333;
      font-size: $font-nm-b;
      &:nth-child(1){
        width: 8%;
      }
      &:nth-child(2){
        width: 20%;
      }
    }
  }
  th,td{
    text-align: center;
    padding: 16px 0px;
  }
}
</style>
