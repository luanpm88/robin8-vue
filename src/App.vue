<template>
  <div id="app" class="page">
    <div v-if="showNav" class="side-nav">
      <main-nav></main-nav>
    </div>
    <div
      class="main-container"
      :class="showNav ? '' : 'no-nav'"
    >
      <page-header></page-header>

      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>

      <page-footer></page-footer>
    </div>
  </div>
</template>

<script>
import MainNav from '@components/MainNav'
import PageHeader from '@components/PageHeader'
import PageFooter from '@components/PageFooter'

export default {
  name: 'App',
  components: {
    MainNav,
    PageHeader,
    PageFooter
  },
  data () {
    return {
      showNav: true
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
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  background: #413f40 url('~@images/side_bg.png') no-repeat top center;
  overflow-y: auto;
}
.main-container {
  padding-left: 300px;
  overflow-x: hidden;
  &.no-nav {
    padding-left: 0;
  }
}
</style>
