<template>
  <div class="page-header">
    <div
      v-if="hasNav"
      class="nav-ctrl-btn"
      :class="navOpen ? 'active' : ''"
      @click="toggleNav"
    >
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <h1 class="logo">
      <router-link to="/">
        <img src="@images/logo.png" alt="Robin8" class="logo-img" />
      </router-link>
    </h1>

    <div v-if="!!authorization && authorization !=''" class="message">
      <router-link to="/messages">
        <span class="iconfont icon-bell"></span>
        <span v-if="messages != '0'" class="msg-num">{{messages}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'PageHeaderMobile',
  props: {
    hasNav: Boolean
  },
  methods: {
    ...mapMutations(['setNavOpen', 'setMsgCount']),
    toggleNav () {
      // console.log(this.navOpen)
      this.setNavOpen(!this.navOpen)
      this.$emit('openNavCtrl', this.navOpen)
    },
    getMsgCount () {
      axios.get(apiConfig.messagesCountUrl, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleGetMsgCountSucc)
    },
    handleGetMsgCountSucc (res) {
      let resData = res.data
      if (res.status == 200 && resData) {
        this.setMsgCount(resData.new_message_count)
      }
    }
  },
  mounted () {
    if (!!this.authorization && this.authorization != '') {
      this.getMsgCount()
    }
  },
  computed: {
    ...mapState(['authorization', 'navOpen', 'messages'])
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  position: fixed;
  z-index: 11;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 0;
  text-align: center;
  background: #413f40;
  box-shadow: 0px 18px 36px 0px rgba(5, 133, 162, .06);
  .logo {
    height: 30px;
    .logo-img {
      height: 100%;
      vertical-align: top;
    }
  }
  .message {
    @include display-flex;
    position: absolute;
    @include center(y);
    right: 20px;
    cursor: pointer;
    flex-wrap: wrap;
    align-content: space-between;
    a {
      text-decoration: none;
    }
    .msg-num {
      display: inline-block;
      height: 20px;
      line-height: 20px;
      padding: 0 8px;
      border-radius: 10px;
      color: #fff;
      background-color: nth($red, 1);
    }
    .icon-bell {
      font-weight: bold;
    }
  }
  .nav-ctrl-btn {
    @include display-flex;
    position: absolute;
    @include center(y);
    left: 20px;
    width: 24px;
    height: 20px;
    cursor: pointer;
    flex-wrap: wrap;
    align-content: space-between;
    .line {
      width: 100%;
      height: 2px;
      border-radius: 2px;
      background-color: #fff;
      -webkit-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
    }
    &.active {
      .line:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
      }
      .line:nth-child(2) {
        opacity: 0;
      }
      .line:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
      }
    }
  }
}
</style>
