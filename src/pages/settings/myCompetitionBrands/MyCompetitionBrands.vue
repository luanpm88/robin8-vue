<template>
  <div class="com-brand">
    <div class="com-add">
      <span>新建</span>
    </div>
    <table class="com-brand-table" v-for="(item, index) in dataListBox" :key="index">
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Description</th>
      </tr>
      <tr v-for="(key, twoindex) in item" :key="twoindex">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.short_name}}</td>
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
        // console.log(res);
        if (res.status === 200) {
          if (res.competitors) {
            _that.dataListBox = res.competitors;
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.com-add{
  text-align: right;
  span{
    cursor: pointer;
    color: rgba(97, 104, 230, 1);
    font-size: $font-nm-s;
    &:hover{
      color: rgba(97, 104, 230, 0.6);
    }
  }
}
.com-brand{
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
    }
  }
  th,td{
    text-align: center;
    padding: 16px 0px;
  }
}
</style>
