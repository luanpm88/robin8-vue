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
          _creationItem.description = item.description

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
