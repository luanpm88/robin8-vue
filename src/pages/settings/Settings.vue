<template>
  <div class="page">
    <page-header></page-header>

    <div class="container mt50 clearfix">
      <main-nav class="pull-left"></main-nav>

      <div class="settings-container pull-right">
        <settings-header></settings-header>
        <router-view></router-view>
      </div>
    </div>

    <page-footer></page-footer>
  </div>
</template>

<script>
import PageHeader from '@components/PageHeader'
import PageFooter from '@components/PageFooter'
import MainNav from '@components/MainNav'
import SettingsHeader from './components/SettingsHeader'

export default {
  name: 'Settings',
  components: {
    PageHeader,
    PageFooter,
    MainNav,
    SettingsHeader
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.settings-container {
  width: 980px;
}
</style>
