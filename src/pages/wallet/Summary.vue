<template>
  <div class="wallet-container">
    <div class="panel default-panel mt20">
      <div class="panel-body">
        <table class="default-table">
          <thead>
            <tr>
              <th class="text-center">{{$t('lang.wallet.summaryPage.tradeNo')}}</th>
              <th class="text-center">{{$t('lang.wallet.summaryPage.direct')}}</th>
              <th class="text-center">{{$t('lang.wallet.summaryPage.createdAt')}}</th>
              <th class="text-center">{{$t('lang.wallet.summaryPage.credits')}}</th>
              <th class="text-center">{{$t('lang.wallet.summaryPage.availAmount')}}</th>
              <th class="text-center">{{$t('lang.wallet.summaryPage.remark')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in dataList"
              :key="item.id"
            >
              <td class="text-center">{{item.trade_no}}</td>
              <td class="text-center">{{item.direct}}</td>
              <td class="text-center">{{item.created_at}}</td>
              <td class="text-center">{{item.credits}}</td>
              <td class="text-center">{{item.avail_amount}}</td>
              <td class="text-center" v-html="item.remark"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="p30 text-center">
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
import { mapState } from 'vuex'

export default {
  name: 'Summary',
  data () {
    return {
      params: {},
      dataList: [],
      page: 1,
      perPage: 10,
      total: 0
    }
  },
  methods: {
    getTransactionsData () {
      axios.get(apiConfig.transactionsUrl, {
        params: this.params,
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleGetTransactionsDataSucc)
    },
    handleGetTransactionsDataSucc (res) {
      let resData = res.data
      if (res.status == 200 && resData) {
        console.log(resData)
        this.dataList = resData.items
        this.total = parseInt(resData.paginate['X-Total'])
      }
    },
    onPageChange (page) {
      this.params.page = page
      console.log(this.params)
      this.getTransactionsData()
    }
  },
  mounted () {
    this.params.page = this.page
    this.params.per_page = this.perPage
    this.getTransactionsData()
  },
  computed: {
    ...mapState(['authorization'])
  }
}
</script>

<style lang="scss" scoped>

</style>
