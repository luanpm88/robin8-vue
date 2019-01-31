<template>
  <div class="com-brand">
    <div class="com-add">
      <span><router-link :to="{path: '/settings/my_competition_brands/create'}">新建我的品牌</router-link></span>
    </div>
    <table class="com-brand-table">
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Short Name</th>
      </tr>
      <tr v-for="(key, index) in dataListBox" :key="index">
        <td>{{key.id}}</td>
        <td>{{key.name}}</td>
        <td>{{key.short_name}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import { mapState } from 'vuex'
export default {
  name: 'MyCompetitionBrands',
  components: {
  },
  computed: {
    ...mapState(['authorization'])
  },
  data () {
    return {
      dataList: {},
      dataListBox: [],
    }
  },
  created() {
    this.getBaseData();
  },
  methods: {
    getBaseData () {
      const _that = this
      axios.get(apiConfig.baseInfosUrl, {
        headers: {
          'Authorization': _that.authorization
        }
      }).then(function(res) {
        // console.log('我是competition', res);
        if (res.status === 200) {
          _that.dataListBox = res.data.competitors;
        }
      })
    }
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
  color: #333;
  width: 100%;
  tr{
    border-bottom: 1px solid #ddd;
    th{
      color: #333;
      font-size: $font-nm-b;
       text-align: center;
      padding: 5px 0px;
      &:nth-child(1){
        width: 8%;
      }
      &:nth-child(2){
        width: 20%;
      }
    }
  }
  td{
    text-align: center;
    padding: 16px 0px;
    &:nth-child(1){
      width: 8%;
    }
    &:nth-child(2){
      width: 20%;
    }
  }
}
</style>
