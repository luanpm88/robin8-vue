<template>
  <div class="main-nav">
    <ul class="nav-list">
      <li
        v-for="(item, index) of navData"
        :key="index"
        class="item"
      >
        <router-link
          v-if="!item.subNav || item.subNav.length < 0"
          class="title-bar"
          :to="item.href"
          tag="div"
        >
          <div :class="'iconfont ' + item.icon"></div>
          <div class="title">{{$t('lang.' + item.title)}}</div>
        </router-link>

        <div
          v-else
          class="title-bar"
          :class="[
            !!item.subNav && item.subNav.length > 0 ? 'with-arr' : '',
            (active && activeIndex == index) || (item.href == currentPath || (item.href == '/creations' && currentPath == '/campaigns')) ? 'open' : ''
          ]"
          @click="toggleActive(index)"
        >
          <div :class="'iconfont ' + item.icon"></div>
          <div class="title">{{$t('lang.' + item.title)}}</div>
        </div>
        <div
          v-if="!!item.subNav && item.subNav.length > 0"
          class="sub-nav"
          :class="[(active && activeIndex == index) || (item.href == currentPath || (item.href == '/creations' && currentPath == '/campaigns')) ? 'active' : '']"
        >
          <router-link
            v-for="(subItem, index) in item.subNav"
            :key="index"
            :to="subItem.href"
            class="item"
          >
            {{subItem.title}}
          </router-link>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MainNav',
  data () {
    return {
      navData: [
        {
          title: 'home',
          icon: 'icon-home',
          href: '/home'
        },
        {
          title: 'campaignsData',
          icon: 'icon-data',
          href: '/creations',
          subNav: [
            {
              title: 'Custom Content',
              href: '/creations'
            },
            {
              title: 'Share-Only',
              href: '/campaigns'
            }
          ]
        },
        {
          title: 'myKols',
          icon: 'icon-user',
          href: '/kol/list'
        },
        {
          title: 'myWallet',
          icon: 'icon-wallet',
          href: '/wallet',
          subNav: [
            {
              title: 'Top up',
              href: '/wallet/recharge'
            },
            {
              title: 'Transactions',
              href: '/wallet/summary'
            },
            {
              title: 'Invoices',
              href: '/wallet/invoice'
            }
          ]
        },
        {
          title: 'settings',
          icon: 'icon-setting',
          href: '/settings',
          subNav: [
            {
              title: 'Basic Information',
              href: '/settings/company_info'
            },
            {
              title: 'My Brands',
              href: '/settings/my_brands'
            },
            {
              title: 'My Competitors',
              href: '/settings/my_competition_brands'
            }
          ]
        },
        {
          title: 'ranking',
          icon: 'icon-setting',
          href: '/ranking',
          subNav: [
            {
              title: 'WechatRanking',
              href: '/ranking/WechatRanking'
            }
          ]
        },
        {
          title: 'socialListening',
          icon: 'icon-setting',
          href: '/social/SocialListening'
        }
      ],
      active: false,
      activeIndex: '',
      currentPath: ''
    }
  },
  methods: {
    getPath () {
      // console.log(this.$route.matched)
      this.currentPath = this.$route.matched[0].path
      // console.log(this.currentPath)
    },
    toggleActive (index) {
      console.log(index)
      this.activeIndex = index
      this.active = !this.active
    }
  },
  created () {
    this.getPath()
  },
  watch: {
    $route () {
      this.getPath()
    }
  }
}
</script>

<style lang="scss" scoped>
.main-nav {
  $item-height: 40px;
  width: 280px;
  padding: $item-height 0;
  box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, .08);
  background-color: #fff;
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
        }
        &.with-arr:after {
          right: 20px;
          @include transition(.4s);
        }
        &.active, &.router-link-active, &.open {
          .title {
            font-weight: 500;
            color: nth($blue, 1);
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
          padding-left: 40px;
          border-left: 2px solid transparent;
          &:hover, &.active, &.router-link-active {
            border-left-color: nth($blue, 1);
            font-weight: bold;
            color: nth($blue, 1);
            background-color: #fbfaff;
          }
        }
      }
    }
  }
}
</style>
