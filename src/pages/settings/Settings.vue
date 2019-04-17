<template>
  <div class="container mt50 clearfix">
    <main-nav class="pull-left"></main-nav>

    <div class="settings-container pull-right">
      <settings-header></settings-header>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MainNav from '@components/MainNav'
import SettingsHeader from './components/SettingsHeader'

export default {
  name: 'Settings',
  components: {
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
