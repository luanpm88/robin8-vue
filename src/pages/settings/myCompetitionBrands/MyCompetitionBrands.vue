<template>
  <div class="com-brand">
    <div class="com-add">
      <span><router-link :to="{path: '/settings/my_competition_brands/create'}">新建我的竞争品牌</router-link></span>
    </div>
    <table class="com-brand-table">
      <tr>
        <th>Check</th>
        <th>Id</th>
        <th>Name</th>
        <th>Short Name</th>
        <th>Operation</th>
      </tr>
      <tr v-for="(key, index) in dataListBox" :key="index">
        <td>
          <input type="checkbox" v-model="key.isCheck" @click="checkItem(key)">
        </td>
        <td>{{key.id}}</td>
        <td>{{key.name}}</td>
        <td>{{key.short_name}}</td>
        <td>
        <p class="campaign-info-detail">
          <span @click="toDetail(key)">编辑</span>
          <span @click="toDelete(key)">删除</span>
        </p>
      </td>
      </tr>
    </table>
    <div class="com-add mt20">
      <span @click="checkInsight">Selected view</span>
    </div>
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
      currentCheckList: [],
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
          _that.dataListBox.forEach((item, index) => {
            if (item.status === 0) {
              item.isCheck = false
            } else {
              item.isCheck = true
            }
          })
          // console.log(_that.dataListBox);
        }
      })
    },
    // 编辑和修改的接口
    totalJoggle(item, params) {
      const _that = this
      axios.post(apiConfig.submitCreatedCompetitor + '/' + item.id, params, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(function(res) {
        // console.log(res);
        if (res.status === 201) {
          _that.brandsList = []
          _that.getBaseData()
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
        path: "/settings/my_competition_brands/create",
        name: "MyCompetitionBrandsCreate",
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
      this.currentCheckList = [];
      this.dataListBox.forEach(key => {
        // console.log(key);
        if (key.status === 1) {
          this.currentCheckList.push(key.short_name);
        }
      });
      if (this.currentCheckList.length > 0) {
        // 把当前选的竞争者 带到home页面
        this.$router.push({
          path: "/",
          name: "Home",
          params: {
            curentCompittor: this.currentCheckList
          }
        });
      } else {
        alert('您没有选择对比的品牌');
      }
      
    }
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
