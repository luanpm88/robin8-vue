<template>
  <div class="page-header">
    <div class="container clearfix">
      <h1 class="logo pull-left">
        <router-link to="/">
          <img src="@images/logo.png" alt="ROBIN8" class="logo-img" />
        </router-link>
      </h1>
      <div class="user-info pull-right">
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
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'PageHeader',
  computed: {
    ...mapState(['avatarImgUrl', 'nickname']),
  },
  data () {
    return {
      lang: this.$i18n.locale
    }
  },
  methods: {
    ...mapMutations(['removeAuthorization', 'removeNickname', 'removeMobile', 'removeAccount', 'removeAvatarImgUrl', 'removeCompanyName']),
    logOut () {
      // window.localStorage.clear()
      this.removeAuthorization()
      this.removeNickname()
      this.removeMobile()
      this.removeAccount()
      this.removeAvatarImgUrl()
      this.removeCompanyName()
      this.$router.replace('/login')
    },
    toggleLang (lang) {
      this.$i18n.locale = lang
      this.lang = lang
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
    .logo {
      height: 40px;
      .logo-img {
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
