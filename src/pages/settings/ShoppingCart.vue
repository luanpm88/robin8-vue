<template>
  <div class="cart-list-container">
    <div class="panel default-panel cart-list-panel mt20">
      <div class="panel-body clearfix">
        <kols-list-item
          v-for="item in cartList"
          :key="item.profile_id"
          :renderStatus="kolRenderStatus"
          :renderData="item"
          :routerData="kolRouterData"
          @handleDelete="delCheckedKol"
        ></kols-list-item>
      </div>
    </div>

    <div class="p30 text-center">
      <a-pagination
        :defaultCurrent="page"
        :defaultPageSize="perPage"
        :total="total"
        @change="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import KolsListItem from '@components/KolsListItem'
import { mapState } from 'vuex'

export default {
  name: 'ShoppingCart',
  components: {
    KolsListItem
  },
  data () {
    return {
      params: {},
      cartList: [],
      page: 1,
      perPage: 10,
      total: 0,
      kolRenderStatus: {
        hasLiked: false,
        hasMsg: false,
        hasChecked: false,
        hasInflunce: false,
        hasCart: false,
        hasDelete: true
      },
      kolRouterData: {
        type: '',
        keywords: ''
      }
    }
  },
  methods: {
    getListData () {
      axios.get(apiConfig.kolCollectListUrl, {
        params: this.params,
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleGetListDataSucc)
    },
    handleGetListDataSucc (res) {
      let resData = res.data
      console.log(resData)
      if (res.status == 200 && resData) {
        this.cartList = resData.items
        this.total = parseInt(resData.paginate['X-Total'])
      }
    },
    onPageChange (page) {
      this.params.page = page
      console.log(this.params)
      this.getListData()
    },
    delCheckedKol (data) {
      let _id = data.id
      let _confirm = confirm('确认从购物车中删除？')
      if (_confirm) {
        axios.post(apiConfig.kolCollectCancelUrl, {
          'profile_id': _id
        }, {
          headers: {
            'Authorization': this.authorization
          }
        }).then(this.handleDelCheckedKolSucc)
      } else {
      }
    },
    handleDelCheckedKolSucc (res) {
      console.log(res)
      if (res.status == 201) {
        this.getListData()
      }
    }
  },
  mounted () {
    this.params.page = this.page
    this.params.per_page = this.perPage
    this.getListData()
  },
  computed: {
    ...mapState(['authorization'])
  }
}
</script>

<style lang="scss" scoped>
.cart-list-panel {
  .panel-body {
    padding: 30px;
  }
  .kols-list-item {
    float: left;
    width: 50%;
    padding: 0 10px;
  }
}
</style>
