<template>
  <div class="campaigns-list-container">
    <div class="panel default-panel campaigns-list-panel">
      <div class="panel-head clearfix">
        <router-link to="/creations/create" class="btn btn-cyan btn-sm pull-right">{{$t('lang.router.creationCreate')}}</router-link>
      </div>
      <div class="panel-body">
        <table v-if="creationsList.length > 0" class="default-table">
          <thead>
            <tr>
              <th width="40%">Profile</th>
              <th width="28%">Active</th>
              <th width="20%">Price List</th>
              <th width="12%" class="text-center">Operation</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in creationsList"
              :key="item.id"
            >
              <td>
                <div class="media campaign-profile">
                  <div class="media-left media-middle">
                    <div class="cover">
                      <img :src="item.img_url" alt="" class="cover-img">
                    </div>
                  </div>
                  <div class="media-body media-middle">
                    <h5 class="title">{{item.name}}</h5>
                    <p>Budget: {{item.pre_amount}}</p>
                    <p>estimated number of kols: {{item.pre_kols_count}}</p>
                    <p>price: {{item.price_range}}</p>
                  </div>
                </div>
              </td>
              <td>
                <p>timeline: {{item.time_range}}</p>
                <p>status: {{item.status_zh}}</p>
              </td>
              <td>
                <p>take budget: {{item.actual_amount}}</p>
                <p>real number of kols: {{item.quote_count}}</p>
              </td>
              <td class="text-center operation-area">
                <router-link
                  :to="'/creations/'+ item.id"
                  class="btn btn-cyan btn-sm"
                >
                  Detail
                </router-link>
                <router-link
                  v-if="item.status === 'pending' || item.status === 'unpassed'"
                  :to="'/creations/'+ item.id + '/edit'"
                  class="btn btn-blue btn-sm"
                >
                  Edit
                </router-link>
                <router-link
                  v-else
                  :to="'/creations/'+ item.id + '/kols'"
                  class="btn btn-cyan btn-outline btn-sm"
                >
                  Quotations
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="p30 text-center">{{$t('lang.noData')}}...</div>
      </div>
      <div class="panel-foot p20 text-center">
        <a-pagination
          :defaultCurrent="page"
          :defaultPageSize="perPage"
          :total="total"
          :hideOnSinglePage="true"
          @change="onPageChange"
        />
      </div>
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
  data () {
    return {
      params: {},
      creationsList: [],
      page: 1,
      perPage: 10,
      total: 0
    }
  },
  methods: {
    getListData () {
      axios.get(apiConfig.creationsUrl, {
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
        this.creationsList = resData.items
        this.total = parseInt(resData.paginate['X-Total'])
      }
    },
    onPageChange (page) {
      this.params.page = page
      console.log(this.params)
      this.getListData()
    }
  },
  mounted () {
    this.params.page = this.page
    this.params.per_page = this.perPage
    this.getListData()
  },
  computed: {
    ...mapState(['authorization'])
  },
  beforeRouteLeave (to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false // 让列表后的页面不缓存，即刷新
    next()
  }
}
</script>

<style lang="scss" scoped>
.campaigns-list-container {
  padding: 0 100px;
  .panel-body {
    padding: 20px;
  }
}
.campaign-profile {
  .cover {
    width: 100px;
    .cover-img {
      width: 100%;
    }
  }
}
.operation-area {
  .btn {
    display: inline-block;
    width: 100px;
    margin: 4px;
  }
}
</style>
