<template>
  <div class="campaigns-list-container">
    <div class="panel default-panel campaigns-list-panel mt20">
      <div class="panel-head clearfix">
        <router-link to="/creations/create" class="btn btn-cyan btn-sm pull-right">{{$t('lang.router.creationCreate')}}</router-link>
      </div>
      <div class="panel-body">
        <table v-if="creationsList.length > 0" class="default-table">
          <thead>
            <tr>
              <th width="40%">{{$t('lang.creations.list.profile')}}</th>
              <th width="28%">{{$t('lang.creations.list.active')}}</th>
              <th width="20%">{{$t('lang.creations.list.price')}}</th>
              <th width="12%" class="text-center">{{$t('lang.creations.list.operation')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in creationsList"
              :key="item.id"
            >
              <td>
                <div class="media campaign-profile">
                  <div class="media-left media-top">
                    <div class="cover">
                      <img :src="item.img_url" alt="" class="cover-img">
                    </div>
                  </div>
                  <div class="media-body media-middle">
                    <h5 class="title">{{item.name}}</h5>
                    <p>{{$t('lang.creations.list.budget')}}: {{item.pre_amount}}</p>
                    <p>{{$t('lang.creations.list.kolsCount')}}: {{item.pre_kols_count}}</p>
                    <p>{{$t('lang.creations.list.price')}}: {{item.price_range}}</p>
                  </div>
                </div>
              </td>
              <td>
                <p>{{$t('lang.creations.list.timeline')}}: {{item.time_range}}</p>
                <p>{{$t('lang.creations.list.status')}}: {{item.status_zh}}</p>
              </td>
              <td>
                <p>{{$t('lang.creations.list.actualAmount')}}: {{item.actual_amount}}</p>
                <p>{{$t('lang.creations.list.quoteCount')}}: {{item.quote_count}}</p>
              </td>
              <td class="text-center operation-area">
                <router-link
                  :to="'/creations/'+ item.id"
                  class="btn btn-cyan btn-sm"
                >
                  {{$t('lang.detail')}}
                </router-link>
                <router-link
                  v-if="item.status === 'pending' || item.status === 'unpassed'"
                  :to="'/creations/'+ item.id + '/edit'"
                  class="btn btn-blue btn-sm"
                >
                  {{$t('lang.edit')}}
                </router-link>
                <router-link
                  v-else
                  :to="'/creations/'+ item.id + '/kols'"
                  class="btn btn-cyan btn-outline btn-sm"
                >
                  {{$t('lang.quotations')}}
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="p30 text-center">{{$t('lang.noData')}}...</div>
      </div>
      <div v-if="creationsList.length > 1" class="panel-foot text-center">
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
  padding: 0 100px 30px;
  .panel-body {
    padding: 20px;
    @include respond-to(mobile) {
      padding: 0;
      overflow-x: auto;
      .default-table {
        max-width: none;
        min-width: 200%;
      }
    }
  }
  @include respond-to(mobile) {
    padding: 0 12px 30px;
  }
}
.campaign-profile {
  .cover {
    position: relative;
    width: 100px;
    padding-bottom: 75%;
    overflow: hidden;
    .cover-img {
      position: absolute;
      @include center(y);
      left: 0;
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
