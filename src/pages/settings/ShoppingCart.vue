<template>
  <div class="cart-list-container">
    <div v-if="cartList.length > 0" class="row">
      <div
        v-for="item in cartList"
        class="col-sm-6 col-xs-12"
      >
        <div class="panel default-panel cart-list-panel">
          <div class="panel-body">
            <kols-list-item
              :key="item.profile_id"
              :renderStatus="kolRenderStatus"
              :renderData="item"
              :routerData="kolRouterData"
              @handleDelete="delCheckedKol"
            ></kols-list-item>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-area text-center">{{$t('lang.noData')}}...</div>

    <div v-if="cartList.length > 1" class="p30 text-center">
      <a-pagination
        :defaultCurrent="page"
        :defaultPageSize="perPage"
        :total="total"
        :hideOnSinglePage="true"
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
.cart-list-container {
  padding: 30px 100px;
  @include respond-to(mobile) {
    padding: 16px;
  }
}
.cart-list-panel {
  margin: 10px 0;
  .panel-body {
    padding: 8px;
  }
  .kols-list-item {
    padding: 0 10px;
    &:last-child:after {
      background-color: transparent;
    }
  }
}
</style>
