<template>
  <div class="panel default-panel">
    <div class="panel-body">
      <router-link :to="{path: '/settings/my_brands/create'}">新建我的品牌</router-link>
      <hr/>
      <table class="table table-striped">
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
          console.log(item)
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

</style>
