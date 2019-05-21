<template>
  <div id="app" class="page">
    <div class="side-nav">
      <main-nav></main-nav>
    </div>
    <div class="main-container">
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
  }
}
</script>

<style>
.side-nav {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 380px;
  background: #413f40 url('~@images/side_bg.png') no-repeat top center;
  overflow-y: auto;
}
.main-container {
  padding-left: 380px;
}
</style>
