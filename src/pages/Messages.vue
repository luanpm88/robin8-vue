<template>
  <div class="container mt50 clearfix">
    <main-nav class="pull-left"></main-nav>

    <div class="messages-container pull-right">
      <div class="panel default-panel messages-panel">
        <div class="panel-head">
          <h5 class="title">{{$t('lang.router.messages')}}</h5>
        </div>
        <div class="panel-body">
          <ul v-if="messagesList.length > 0" class="msg-list">
            <!-- <li
              v-for="(item, index) in messagesList"
              :key="item.id"
              class="item"
              :class="[item.is_read ? 'is-read' : '']"
              @click="toggleOpen(item.id)"
            >
              <div
                class="title-bar with-arr"
                :class="[activeId == item.id ? 'open' : '']"
              >
                <div class="title">
                  <span v-if="!item.is_read" class="dot"></span>
                  {{item.name}}
                </div>
              </div>
              <div v-show="activeId == item.id" class="msg-content">
                <h5>{{$t('lang.messages.sender')}}: {{item.sender}}</h5>
                <div class="desc" v-html="item.title"></div>
              </div>
            </li> -->

            <li
              v-for="(item, index) in messagesList"
              :key="item.id"
              class="item"
              :class="[item.is_read ? 'is-read' : '']"
              @click="toggleOpen(item.id)"
            >
              <div
                class="title-bar with-arr"
                :class="[item.open ? 'open' : '']"
              >
                <div class="title">
                  <span v-if="!item.is_read" class="dot"></span>
                  {{item.name}}
                </div>
              </div>
              <div v-show="item.open" class="msg-content">
                <h5>{{$t('lang.messages.sender')}}: {{item.sender}}</h5>
                <div class="desc" v-html="item.title"></div>
              </div>
            </li>
          </ul>
          <div v-else class="p30 text-center">{{$t('lang.messages.noData')}}</div>
        </div>

        <div v-if="messagesList.length > 0" class="panel-foot">
          <div class="text-center">
            <a-pagination
              :defaultCurrent="page"
              :defaultPageSize="perPage"
              :total="total"
              @change="onPageChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import MainNav from '@components/MainNav'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Messages',
  components: {
    MainNav
  },
  data () {
    return {
      params: {},
      messagesList: [],
      page: 1,
      perPage: 20,
      total: 0,
      active: false,
      activeId: ''
    }
  },
  methods: {
    ...mapMutations(['setMsgCount']),
    getListData () {
      axios.get(apiConfig.messagesUrl, {
        params: this.params,
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleGetListDataSucc)
    },
    handleGetListDataSucc (res) {
      let resData = res.data
      // console.log(resData)
      if (res.status == 200 && resData) {
        this.messagesList = resData.items
        this.total = parseInt(resData.paginate['X-Total'])
      }
    },
    readMsg (id) {
      axios.post(apiConfig.messageIsReadUrl, {
        'id': id
      }, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleReadMsgSucc)
    },
    handleReadMsgSucc (res) {
      let resData = res.data
      if (res.status == 201 && resData) {
        this.setMsgCount(resData.new_message_count)
      }
    },
    onPageChange (page) {
      this.params.page = page
      this.getListData()
    },
    toggleOpen (id) {
      // this.activeId = id
      // this.active = !this.active

      // if (this.activeId == id && this.active) {
      //   this.readMsg(id)
      //   this.messagesList.forEach(item => {
      //     if (item.id == id) {
      //       item.is_read = true
      //     }
      //   })
      // }

      // this.messagesList.forEach(item => {
      //   if (item.id == id) {
      //     this.activeId = id
      //     this.readMsg(id)
      //     item.is_read = true
      //   }
      // })

      this.messagesList.forEach(item => {
        if (item.id == id) {
          if (item.open) {
            this.$set(item, 'open', false)
          } else {
            this.$set(item, 'open', true)
          }
          this.readMsg(id)
          item.is_read = true
        } else {
          this.$set(item, 'open', false)
        }
      })

      // console.log(this.activeId)
      // console.log(this.active)
      // console.log(id)
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
.messages-container {
  width: 980px;
}
.messages-panel {
  .panel-body {
    padding: 20px;
  }
}
.msg-list {
  .item {
    border-bottom: 1px solid $bg-color;
    .title-bar {
      cursor: pointer;
      .title {
        font-weight: bold;
        .dot {
          display: inline-block;
          width: 4px;
          height: 4px;
          margin-right: 8px;
          border-radius: 50%;
          vertical-align: middle;
          background-color: nth($red, 1);
        }
      }
      &.with-arr:after {
        right: 10px;
        @include transition(.4s);
      }
    }
    .msg-content {
      line-height: 2;
      padding: 10px;
    }
    &.is-read {
      .title {
        font-weight: normal;
      }
    }
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
