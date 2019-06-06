<template>
  <div class="page-header clearfix">
    <div v-if="!!authorization && authorization !=''" class="user-info pull-left">
      <div class="user-box">
        <div class="media">
          <div class="media-left">
            <div v-if="!!avatarImgUrl && avatarImgUrl != 'null'" class="avatar">
              <router-link to="/settings/company_info">
                <img :src="avatarImgUrl" alt="" class="avatar-img" />
              </router-link>
            </div>
            <div v-else class="avatar">
              <router-link to="/settings/company_info">
                <img src="@images/user.png" alt="" class="avatar-img" />
              </router-link>
            </div>
          </div>
          <div class="media-body media-middle info">
            <h5 class="name">
              <router-link to="/settings/company_info">{{nickname}}</router-link>
            </h5>
          </div>
        </div>
      </div>
      <div class="logout-btn" @click="logOut">
        <span class="iconfont icon-logout"></span>
      </div>
    </div>
    <div v-if="!!authorization && authorization !=''" class="message pull-right">
      <router-link to="/messages">
        <span class="iconfont icon-bell"></span>
        <span v-if="messages != '0'" class="msg-num">{{messages}}</span>
      </router-link>
    </div>
    <div class="languages-ctrl pull-right">
      <span
        class="item"
        :class="[lang == 'zh-CN' ? 'active' : '']"
        @click="toggleLang('zh-CN')"
      >中文</span>
      <span
        class="item"
        :class="[lang == 'en-US' ? 'active' : '']"
        @click="toggleLang('en-US')"
      >En</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'PageHeader',
  computed: {
    ...mapState(['authorization', 'avatarImgUrl', 'nickname', 'messages']),
  },
  data () {
    return {
      lang: ''
    }
  },
  methods: {
    ...mapMutations(['removeAuthorization', 'removeNickname', 'removeMobile', 'removeAccount', 'removeEmail', 'removeAvatarImgUrl', 'removeCompany', 'removeCompanyName', 'removeCompanyLogo', 'setLanguage', 'setMsgCount', 'removeMsgCount', 'removeDetailShow', 'removeAdvancedSearchShow']),
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
    },
    logOut () {
      // window.localStorage.clear()
      this.removeAuthorization()
      this.removeNickname()
      this.removeMobile()
      this.removeAccount()
      this.removeEmail()
      this.removeAvatarImgUrl()
      this.removeCompany()
      this.removeCompanyName()
      this.removeCompanyLogo()
      this.removeMsgCount()
      this.removeDetailShow()
      this.removeAdvancedSearchShow()
      this.$router.replace('/login')
    },
    toggleLang (lang) {
      this.$i18n.locale = lang
      this.lang = lang
      this.setLanguage(lang)
    }
  },
  mounted () {
    this.lang = this.$i18n.locale
    if (!!this.authorization && this.authorization != '') {
      this.getMsgCount()
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  padding: 20px 100px;
  background-color: #fff;
  .user-info {
    border-radius: 5px;
    border: 1px solid #e1e8ea;
    .user-box {
      float: left;
      padding: 10px 20px;
      border-right: 1px solid #e1e8ea;
      .avatar {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        overflow: hidden;
        display: inline-block;
        .avatar-img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        padding-left: 20px;
        a {
          color: #262625;
        }
      }
    }
    .logout-btn {
      float: left;
      width: 64px;
      height: 64px;
      line-height: 64px;
      text-align: center;
      color: #a9b1b3;
      cursor: pointer;
      .iconfont {
        font-size: $font-lg;
      }
    }
  }
  .languages-ctrl {
    @include display-flex;
    height: 66px;
    padding: 0 40px;
    align-items: center;
    & > .item {
      margin: 0 5px;
      cursor: pointer;
      &.active {
        color: #262625;
      }
    }
  }
  .message {
    @include display-flex;
    position: relative;
    height: 66px;
    align-items: center;
    a {
      text-decoration: none;
      color: #262625;
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
}
</style>
