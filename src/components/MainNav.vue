<template>
  <div class="main-nav">
    <div class="logo-area">
      <h1 v-if="!!company && company != ''" class="logo">
        <img :src="companyLogo" :alt="company" class="logo-img" />
      </h1>
      <h1 v-else class="logo">
        <router-link to="/">
          <img src="@images/logo.png" alt="Robin8" class="logo-img" />
        </router-link>
      </h1>
    </div>
    <ul class="nav-list">
      <li
        v-for="(item, index) of navData"
        :key="index"
        class="item"
        @click="toggleOpen(index)"
      >
        <router-link
          v-if="!item.subNav || item.subNav.length < 0"
          class="title-bar"
          :to="item.href"
        >
          <div :class="'iconfont ' + item.icon"></div>
          <div class="title">{{$t(`lang.${item.title}`)}}</div>
        </router-link>

        <div v-else>
          <div
            class="title-bar with-arr"
            :class="item.is_open ? 'open' : ''"
          >
            <div :class="'iconfont ' + item.icon"></div>
            <div class="title">{{$t('lang.' + item.title)}}</div>
          </div>
          <div
            class="sub-nav"
            :class="item.is_open ? 'active' : ''"
          >
            <router-link
              v-for="(subItem, subIndex) in item.subNav"
              :key="subIndex"
              :to="subItem.href"
              class="item"
            >
              {{$t(`lang.${subItem.title}`)}}
            </router-link>
          </div>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import { mapState } from 'vuex'

export default {
  name: 'MainNav',
  computed: {
    ...mapState(['company', 'companyLogo']),
  },
  data () {
    return {
      navData: [
        {
          title: 'nav.home',
          icon: 'icon-home',
          href: '/home'
        },
        {
          title: 'nav.campaigns',
          icon: 'icon-document',
          href: '/creations',
          subNav: [
            {
              title: 'nav.create',
              href: '/create'
            },
            // {
            //   title: 'nav.customContent',
            //   href: '/creations'
            // },
            {
              title: 'nav.shareOnly',
              href: '/campaigns'
            }
          ]
        },
        {
          title: 'nav.kols',
          icon: 'icon-user',
          href: '/kol/list'
        },

        {
          title: 'nav.wallet',
          icon: 'icon-wallet',
          href: '/wallet',
          subNav: [
            {
              title: 'nav.topUp',
              href: '/wallet/recharge'
            },
            {
              title: 'nav.transactions',
              href: '/wallet/summary'
            },
            {
              title: 'nav.invoices',
              href: '/wallet/invoice'
            }
          ]
        },
        {
          title: 'nav.setting',
          icon: 'icon-setting',
          href: '/settings',
          subNav: [
            {
              title: 'nav.basicInfo',
              href: '/settings/company_info'
            },
            {
              title: 'nav.brands',
              href: '/settings/my_brands'
            },
            {
              title: 'nav.competitors',
              href: '/settings/my_competition_brands'
            },
            // {
            //   title: 'nav.cart',
            //   href: '/settings/shopping_cart'
            // },
            {
              title: 'nav.help',
              href: '/help'
            }
          ]
        },
        {
          title: 'nav.ranking',
          icon: 'icon-podium',
          href: '/ranking',
          subNav: [
            // {
            //   title: 'nav.wechatRanking',
            //   href: '/ranking/WechatRanking'
            // },
            {
              title: 'nav.weiboRanking',
              href: '/ranking/WeiboRanking'
            }
          ]
        },
        {
          title: 'nav.socialListening',
          icon: 'icon-connection',
          href: '/social/SocialListening'
        }
      ]
    }
  },
  methods: {
    getPath () {
      let matchPath = this.$route.matched[0].path
      let currentPath = this.$route.path
      let navList = this.navData

      navList.forEach(item => {
        if (!!item.subNav && item.subNav.length > 0) {
          item.subNav.forEach(el => {
            if (el.href == currentPath || el.href == matchPath) {
              this.$set(item, 'is_open', true)
            }
          })
        }
      })
      // console.log(navList)
    },
    toggleOpen (index) {
      this.navData.forEach((item, i) => {
        if (i == index) {
          if (item.is_open) {
            this.$set(item, 'is_open', false)
          } else {
            this.$set(item, 'is_open', true)
          }
        } else {
          this.$set(item, 'is_open', false)
        }
      })

      // console.log(this.navData)
    }
  },
  // created () {
  //   this.getPath()
  // },
  watch: {
    $route () {
      this.getPath()
    }
  }
}
</script>

<style lang="scss" scoped>
.main-nav {
  $item-height: 64px;
  .logo-area {
    @include display-flex;
    height: 130px;
    padding: 20px;
    align-items: center;
    justify-content: center;
    .logo {
      height: 40px;
      .logo-img {
        vertical-align: top;
        height: 100%;
      }
    }
    @include respond-to(mobile) {
      display: none;
    }
  }
  .nav-list {
    & > .item {
      .title-bar {
        height: $item-height;
        line-height: $item-height - 20;
        padding: 10px 20px;
        cursor: pointer;
        .iconfont {
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          font-size: $font-nm-b;
          color: #e1e8ea;
        }
        .title {
          margin-left: 20px;
          font-size: 1.4rem;
          color: #b1b1b1;
        }
        &.with-arr:after {
          right: 20px;
          @include transition(.4s);
        }
        &.active, &.router-link-active, &.open {
          background-color: #201f20;
          .iconfont {
            color: #fff;
          }
          .title {
            color: #f6f7f7;
          }
        }
      }
      .sub-nav {
        display: none;
        &.active {
          display: block;
        }
        & > .item {
          display: block;
          height: $item-height;
          line-height: $item-height;
          padding-left: 60px;
          .title {
            color: #b1b1b1;
          }
          &:hover, &.active, &.router-link-active {
            color: #b1b1b1;
            background-color: #201f20;
          }
        }
      }
    }
  }
}
</style>
