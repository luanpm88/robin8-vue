<template>
  <div class="panel default-panel mt20">
    <!-- <page></page> -->
    <div class="panel-body">
      <table class="com-brand-table">
        <tr>
          <th>Profile</th>
          <th>Active</th>
          <th>Price List</th>
          <th>Operation</th>
        </tr>
        <tr
          v-for="(item, index) in CreationsList"
          :key="index"
          class="item"
        >
          <td>
            <div class="campaign-info">
              <img :src="item.img_url" alt="" class="campaign-info-left">
              <div class="campaign-info-right">
                <p>预算：{{item.pre_amount}}</p>
                <p>预招人数：{{item.pre_kols_count}}</p>
                <p>价格：{{item.pre_amount}}</p>
              </div>
            </div>
          </td>
          <td>
            <p>活动时间：{{item.time_range}}</p>
            <p>状态：{{item.status_zh}}</p>
          </td>
          <td>
            <p>已消耗：{{item.quote_count}}</p>
            <p>已招募：{{item.actual_amount}}</p>
          </td>
          <td>
            <p class="campaign-info-detail">
              <span @click="detail(item.id)">详情</span>
              <span v-if="item.status === 'pending' || item.status === 'unpassed'" @click="edit(item.id)">编辑</span>
              <span v-else @click="kols(item.id)" >查看报价</span>
            </p>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import Page from '@components/Page'
import { mapState } from 'vuex'

export default {
  name: 'CreationsList',
  components: {
    Page
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
    detail(id) {
      this.$router.push('/creations/' + id);
    },
    edit(id) {
      this.$router.push('/creations/' + id + '/edit');
    },
    kols(id) {
      this.$router.push('/creations/' + id + '/kols');
    }
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
.default-panel {
  padding: 30px;
  background: $white;
}
.com-brand-table{
  width: 100%;
  color: #333;
  tr{
    border-bottom: 1px solid #ddd;
    th{
      font-size: $font-nm-b;
      text-align: center;
      padding: 5px 0px;
    }
  }
  td{
    text-align: center;
    padding: 16px 10px;
    p{
      line-height: 22px;
    }
  }
}
.campaign-info{
  text-align: left;
  img{
    display: inline-block;
    width: 80px;
    vertical-align: middle;
    margin-right: 15px;
  }
  .campaign-info-right{
    display: inline-block;
    vertical-align: middle;
  }
}
.campaign-info-detail{
  span{
    cursor: pointer;
    color: nth($purple, 1);
    &:hover{
      border-bottom: 1px solid nth($purple, 1);
    }
    &:nth-child(2) {
      margin-left: 8px;
      color: #6168e6;
      &:hover{
        border-bottom: 1px solid #6168e6;

      }
    }
  }
}
</style>
