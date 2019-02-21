<template>
  <div class="campaign-kols-container">
    <create-process
      :renderData="processStatus"
      class="mt20"
    ></create-process>

    <div class="panel default-panel mt20">
      <div class="panel-body">
        <status-area :statusData="detailData.status"></status-area>
      </div>
    </div>

    <div class="panel default-panel kols-select-panel mt20">
      <div class="panel-body">
        <default-tabs
          :tabList="tabList"
          :tabIndex="tabIndex"
          theme="blue"
          @changeTab="changeTab"
        >
          <div class="kols-list-container">
            <kol-item
              v-if="currentList.length > 0"
              v-for="item in currentList"
              :key="item.profile.creation_selected_kol_id"
              :renderData="item"
              :checkedIds="kolsCheckedIds"
              @selectKol="selectKol"
            ></kol-item>

            <div v-else class="empty-area text-center">暂无内容</div>
          </div>
        </default-tabs>
      </div>

      <div class="panel-foot clearfix">
        <div class="select-statistics pull-left">微博总曝光值：<span class="num">0</span> | 微信总曝光值：<span class="num">0</span> | 总报价：<span class="num">{{totalPrice}}</span></div>
        <button
          type="button"
          class="btn btn-cyan pull-right"
          :disabled="!kolsCheckedIds.length > 0"
          @click="doPay"
        >确认合作，立即支付</button>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import DefaultTabs from "@components/DefaultTabs"
import CreateProcess from './components/CreateProcess'
import StatusArea from './components/StatusArea'
import KolItem from './components/KolItem'
import { mapState } from 'vuex'

export default {
  name: 'ChooseKols',
  components: {
    DefaultTabs,
    CreateProcess,
    StatusArea,
    KolItem
  },
  data () {
    return {
      processStatus: {
        current: 2,
        index: 1
      },
      creationId: this.$route.params.id,
      totalPrice: 0,
      detailData: {},
      tabIndex: 0,
      tabList: [
        {
          index: 0,
          name: '待合作'
        },
        {
          index: 1,
          name: '合作中'
        },
        {
          index: 2,
          name: '已完成'
        }
      ],
      currentList: [],
      kolsCheckedIds: [],
      canSubmit: true
    }
  },
  methods: {
    getDetailData () {
      axios.get(apiConfig.creationsUrl + '/' + this.creationId, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleGetDetailDataSucc)
    },
    handleGetDetailDataSucc (res) {
      console.log(res)
      let resData = res.data
      if (res.status == 200 && resData) {
        console.log(resData)
        this.detailData = resData
      }
    },
    getTendersData (postUrl) {
      axios.get(postUrl, {
        params: {
          'creation_id': this.creationId
        },
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleGetTendersDataSucc)
    },
    handleGetTendersDataSucc (res) {
      let resData = res.data
      console.log(resData.items)
      this.currentList = resData.items
    },
    changeTab(tab) {
      this.tabIndex = tab.index
      if (tab.index === 0) {
        this.getTendersData(apiConfig.pendingTendersUrl)
        console.log(this.currentList)
      } else if (tab.index === 1) {
        this.getTendersData(apiConfig.cooperationTendersUrl)
        console.log(this.currentList)
      } else {
        this.getTendersData(apiConfig.finishedTendersUrl)
        console.log(this.currentList)
      }
    },
    selectKol (data) {
      console.log(data)
      let _price = parseFloat(data.price)
      let _id = parseInt(data.id)
      let _kolsCheckedIds = this.kolsCheckedIds
      let _index = _kolsCheckedIds.indexOf(_id)
      if (_index == -1) {
        _kolsCheckedIds.push(_id)
        this.totalPrice += _price
      } else {
        _kolsCheckedIds.splice(_index, 1)
        this.totalPrice -= _price
      }
      console.log(_kolsCheckedIds)
    },
    doPay () {
      if (!this.canSubmit) {
        return false
      }
      this.canSubmit = false
      axios.post(apiConfig.payTendersUrl, {
        'creation_id': this.creationId,
        'csk_ary': this.kolsCheckedIds
      }, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleDoPaySucc)
    },
    handleDoPaySucc (res) {
      let resData = res.data
      console.log(res)
      this.canSubmit = true
      if (res.status == 201) {
        let tenderId = resData.id
        this.$router.push('/creations/'+ this.creationId +'/pay/'+ tenderId)
      }
    }
  },
  mounted () {
    this.getDetailData()
    this.getTendersData(apiConfig.pendingTendersUrl)
  },
  computed: {
    ...mapState(['authorization'])
  }
}
</script>

<style lang="scss" scoped>
.kols-select-panel {
  .panel-foot {
    padding: 30px;
    .select-statistics {
      height: 32px;
      line-height: 32px;
      .num {
        color: nth($blue, 1);
      }
    }
  }
}
.kols-select-panel /deep/ .default-tabs {
  text-align: center;
  .btn-group.pills-btn {
    margin: 26px 0;
  }
  .tabs-content {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
}
.kols-list-container {
  text-align: left;
  .kol-item {
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
