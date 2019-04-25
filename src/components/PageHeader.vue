<template>
  <div class="page-header">
    <div v-if="!!company && company != ''" class="container clearfix">
      <h1 class="partner-logo pull-left">
        <img :src="companyLogo" :alt="company" class="logo-img" />
      </h1>
      <div v-if="!!authorization && authorization !=''" class="user-info pull-right">
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
          <div class="media-body media-middle">
            <h5 class="name">
              <router-link to="/settings/company_info">{{nickname}}</router-link>
            </h5>
            <p class="logout-btn">
              <span @click="logOut">{{$t('lang.logout')}}</span>
            </p>
          </div>
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
        >Vi</span>
      </div>
      <div class="sub-logo pull-right">
        <span class="text">Powered by</span>
        <router-link to="/">
          <img src="@images/logo.png" alt="Robin8" class="logo-img" />
        </router-link>
      </div>
    </div>
    <div v-else class="container clearfix">
      <h1 class="logo pull-left">
        <router-link to="/">
          <img src="@images/logo.png" alt="Robin8" class="logo-img" />
        </router-link>
      </h1>
      <div v-if="!!authorization && authorization !=''" class="user-info pull-right">
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
          <div class="media-body media-middle">
            <h5 class="name">
              <router-link to="/settings/company_info">{{nickname}}</router-link>
            </h5>
            <p class="logout-btn">
              <span @click="logOut">{{$t('lang.logout')}}</span>
            </p>
          </div>
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
        >Vi</span>
      </div>
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
    ...mapState(['authorization', 'avatarImgUrl', 'nickname', 'company', 'companyLogo', 'messages']),
  },
  data () {
    return {
      lang: ''
    }
  },
  methods: {
    ...mapMutations(['removeAuthorization', 'removeNickname', 'removeMobile', 'removeAccount', 'removeEmail', 'removeAvatarImgUrl', 'removeCompany', 'removeCompanyName', 'removeCompanyLogo', 'setLanguage', 'setMsgCount', 'removeMsgCount']),
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
    if (!!this.authorization && this.authorization !='') {
      this.getMsgCount()
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  background-color: #3e3b4f;
  .container {
    padding: 20px;
    background-color: #3e3b4f;
    .logo, .partner-logo {
      height: 40px;
      padding: 5px 0;
      .logo-img {
        vertical-align: top;
        height: 100%;
      }
    }
    .sub-logo {
      height: 40px;
      padding: 8px 0;
      .text {
        padding-right: 10px;
      }
      .logo-img {
        vertical-align: top;
        height: 100%;
      }
    }
    .languages-ctrl {
      @include display-flex;
      height: 40px;
      padding: 0 40px;
      align-items: center;
      & > .item {
        margin: 0 5px;
        cursor: pointer;
        &.active {
          color: #fff;
        }
      }
    }
    .message {
      @include display-flex;
      position: relative;
      height: 40px;
      margin-right: 40px;
      align-items: center;
      a {
        text-decoration: none;
        color: #fff;
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
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      display: inline-block;
      .avatar-img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      a {
        color: #fff;
      }
    }
    .logout-btn {
      font-size: $font-xs;
      color: #fafafa;
      span {
        border-bottom: 1px solid #eaeaea;
        cursor: pointer;
      }
    }
  }
}
</style>
