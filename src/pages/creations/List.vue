<template>
  <div class="panel default-panel">
    <div class="panel-body">
      <hr/>
      <table class="table table-striped">
        <tr
          v-for="(item, index) in CreationsList"
          :key="index"
          class="item"
        >
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.price_range}}</td>
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
  name: 'CreationsList',
  components: {
  },
  data () {
    return {
      CreationsList: []
    }
  },
  methods: {
    getListData () {
      axios.get(apiConfig.creationsUrl, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleGetListDataSucc)
    },
    handleGetListDataSucc (res) {
      let resData = res.data
      if (res.status == 200 && resData) {
        let _creationsList = this.CreationsList
        let _creationItem
        console.log(resData)
        resData.items.forEach(item => {
          _creationItem = commonJs.buildObjData('id', item.id)
          _creationItem.name = item.name
          _creationItem.img_url = item.img_url
          _creationItem.pre_amount = item.pre_amount
          _creationItem.pre_kols_count = item.pre_kols_count
          _creationItem.price_range = item.price_range
          _creationItem.time_range = item.time_range
          _creationItem.status = item.status
          _creationItem.status_zh = item.status_zh
          _creationItem.quote_count = item.quote_count
          _creationItem.actual_amount = item.actual_amount

          _creationsList.push(_creationItem)
        })
      }
    },
  },
  mounted () {
    this.getListData()
  },
  computed: {
    ...mapState(['authorization'])
  }
}
</script>

<style lang="scss" scoped>

</style>
