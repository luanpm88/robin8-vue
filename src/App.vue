<template>
  <div id="app" class="page">
    <div
      v-if="showNav && openNav"
      class="side-nav"
    >
      <main-nav></main-nav>
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
      openNav: false
    }
  },
  methods: {
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
    }
  },
  mounted () {
    this.isShowNav()
  },
  watch: {
    $route () {
      this.isShowNav()
    }
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
