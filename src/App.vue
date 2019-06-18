<template>
  <div id="app" class="page">
    <div
      v-if="showNav && openNav"
      class="side-nav"
    >
      <main-nav></main-nav>

      <div v-if="!!authorization && authorization !=''" class="user-info clearfix">
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

      <div class="languages-ctrl clearfix">
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
    <div
      class="main-container"
      :class="showNav ? '' : 'no-nav'"
    >
      <page-header class="only-desktop"></page-header>
      <page-header-mobile
        class="only-mobile"
        :hasNav="showNav"
        @openNavCtrl="openNavCtrl"
      ></page-header-mobile>

      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>

      <page-footer></page-footer>
    </div>
  </div>
</template>

<script>
import commonJs from '@javascripts/common.js'
import MainNav from '@components/MainNav'
import PageHeader from '@components/PageHeader'
import PageHeaderMobile from '@components/PageHeaderMobile'
import PageFooter from '@components/PageFooter'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {
    MainNav,
    PageHeader,
    PageHeaderMobile,
    PageFooter
  },
  data () {
    return {
      showNav: true,
      openNav: false,
      lang: ''
    }
  },
  methods: {
    ...mapMutations(['removeAuthorization', 'removeNickname', 'removeMobile', 'removeAccount', 'removeEmail', 'removeAvatarImgUrl', 'removeCompany', 'removeCompanyName', 'removeCompanyLogo', 'setLanguage', 'removeMsgCount', 'removeDetailShow', 'removeAdvancedSearchShow']),
    isShowNav () {
      let _pathName = this.$route.name
      // console.log(_pathName)
      if (_pathName == 'Login' || _pathName == 'Reg' || _pathName == 'ForgetPassword') {
        this.showNav = false
      } else {
        this.showNav = true
      }
      if (commonJs.isMobile()) {
        this.openNav = false
      } else {
        this.openNav = true
      }
    },
    openNavCtrl (data) {
      // console.log(data)
      this.openNav = data
    },
    logOut () {
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
    this.isShowNav()
  },
  watch: {
    $route () {
      this.isShowNav()
    }
  },
  computed: {
    ...mapState(['authorization', 'avatarImgUrl', 'nickname']),
  }
}
</script>

<style lang="scss">
.side-nav {
  position: fixed;
  z-index: 11;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  background: #413f40 url('~@images/side_bg.png') no-repeat top center;
  background-size: 100% auto;
  overflow-y: auto;
  @include respond-to(mobile) {
    top: $header-height;
    width: 100%;
  }
  .user-info {
    position: relative;
    padding-right: 64px;
    margin: 20px 30px 0;
    border-radius: 5px;
    border: 1px solid #201f20;
    .user-box {
      padding: 10px 20px;
      border-right: 1px solid #201f20;
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
          color: #e7edef;
        }
      }
    }
    .logout-btn {
      position: absolute;
      top: 0;
      right: 0;
      width: 64px;
      height: 64px;
      line-height: 64px;
      text-align: center;
      color: #222221;
      cursor: pointer;
      .iconfont {
        font-size: $font-lg;
      }
    }
  }
  .languages-ctrl {
    width: 100px;
    margin: 20px auto;
    border-radius: 5px;
    border: 1px solid #201f20;
    & > .item {
      position: relative;
      float: left;
      width: 50%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      &.active {
        color: #fff;
      }
      & ~ .item:before {
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: 100%;
        background-color: #201f20;
        content: '';
        overflow: hidden;
      }
    }
  }
}
.main-container {
  padding-left: 300px;
  &.no-nav {
    padding-left: 0;
  }
  @include respond-to(mobile) {
    padding-top: $header-height;
    padding-left: 0;
  }
}
</style>
