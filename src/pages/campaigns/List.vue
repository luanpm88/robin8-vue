<template>
  <div class="campaigns-list-container">
    <div class="panel default-panel mt20">
      <div class="panel-head clearfix">
        <router-link to="/campaigns/create" class="btn btn-cyan btn-sm pull-right">{{$t('lang.router.campaignCreate')}}</router-link>
      </div>
      <div class="panel-body">
        <div v-if="campaignsList.length > 0" class="campaigns-list">
          <div
            v-for="item in campaignsList"
            :key="item.id"
            class="list-item"
          >
            <div class="media">
              <div class="media-left">
                <div class="cover">
                  <img :src="item.img_url" alt="" class="cover-img" />
                  <div class="corner-mark tl">
                    <div class="text">{{item.status_zh}}</div>
                  </div>
                </div>
              </div>
              <div class="media-body content">
                <div class="campaign-info">
                  <h5 class="title">
                    <router-link
                      :to="'/campaigns/' + item.id"
                    >{{item.name}}</router-link>
                  </h5>
                  <div class="date">{{item.time_range}} 按照<span class="per-budget-type">{{item.per_budget_type_show}}</span>奖励</div>
                  <div class="desc">{{item.description}}</div>
                </div>
                <div class="campaign-status">
                  <div class="item">
                    <div class="title">{{$t('lang.campaigns.list.status.paid')}}</div>
                    <div class="text">
                      ￥<span class="num">{{item.take_budget}}</span>
                    </div>
                  </div>
                  <div class="item">
                    <div class="title">{{$t('lang.campaigns.list.status.participant')}}</div>
                    <div class="text">
                      <span class="num">{{item.join_count}}</span>
                    </div>
                  </div>
                  <div class="item">
                    <div class="title">{{$t('lang.campaigns.list.status.clicks')}}</div>
                    <div class="text">
                      <span class="num">{{item.total_click}}</span>
                    </div>
                  </div>
                  <div v-if="item.per_budget_type == 'cpa' || item.per_budget_type == 'click'" class="item">
                    <div class="title">{{$t('lang.campaigns.list.status.paidClicks')}}</div>
                    <div class="text">
                      <span class="num">{{item.avail_click}}</span>
                    </div>
                  </div>
                  <div v-if="item.per_budget_type == 'post'" class="item">
                    <div class="title">{{$t('lang.campaigns.list.status.repost')}}</div>
                    <div class="text">
                      <span class="num">{{item.post_count}}</span>
                    </div>
                  </div>
                  <div class="item">
                    <div class="title">{{$t('lang.campaigns.list.status.exposure')}}</div>
                    <div class="text">
                      <span class="num">{{item.exposures_count}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="media-right media-middle campaign-operation">
                <router-link
                  v-show="item.status == 'pending' || item.status == 'unpay' || item.status == 'rejected'"
                  :to="'/campaigns/'+ item.id +'/edit'"
                  class="btn btn-sm btn-cyan btn-outline"
                >{{$t('lang.campaigns.list.btns.edit')}}</router-link>
                <router-link
                  v-show="item.status == 'settled' && item.evaluation_status == 'evaluating'"
                  :to="'/campaigns/'+ item.id"
                  class="btn btn-sm btn-cyan btn-outline"
                >{{$t('lang.campaigns.list.btns.comments')}}</router-link>
                <router-link
                  v-show="item.status == 'unpay'"
                  :to="'/campaigns/'+ item.id +'/pay'"
                  class="btn btn-sm btn-cyan btn-outline"
                >{{$t('lang.campaigns.list.btns.pay')}}</router-link>
                <router-link
                  v-show="item.status != 'pending' && item.status != 'unpay' && item.status != 'rejected'"
                  :to="'/campaigns/create?copy_id='+ item.id"
                  class="btn btn-sm btn-cyan btn-outline"
                >{{$t('lang.campaigns.list.btns.repost')}}</router-link>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="p30 text-center">{{$t('lang.noData')}}...</div>
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
  name: 'CampaignsList',
  data () {
    return {
      params: {},
      campaignsList: [],
      page: 1,
      perPage: 4,
      total: 0
    }
  },
  methods: {
    getListData () {
      axios.get(apiConfig.campaignsUrl, {
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
        console.log(resData)
        this.campaignsList = resData.items
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
  .panel-body {
    padding: 30px;
  }
}
.campaigns-list {
  & > .list-item {
    margin-bottom: 20px;
    box-shadow: 0px 1px 15px 0px rgba(#000, .08);
    .content {
      padding: 20px;
    }
    .cover {
      position: relative;
      width: 300px;
      padding-bottom: 75%;
      overflow: hidden;
      .cover-img {
        position: absolute;
        top: 0;
        @include center(x);
        height: 100%;
      }
    }
    .campaign-info {
      .title {
        margin-bottom: 10px;
        font-size: $font-lg-s;
        font-weight: normal;
      }
      .per-budget-type {
        color: nth($cyan, 1);
      }
      .desc {
        @include limit-line(3);
      }
    }
    .campaign-status {
      @include display-flex;
      & > .item {
        @include flex(1);
        text-align: center;
        .num {
          font-size: $font-nm-l;
        }
      }
    }
    .campaign-operation {
      padding: 20px;
      & > .btn {
        margin: 0 5px;
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
