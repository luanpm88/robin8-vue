<template>
  <div class="settings-container">
    <settings-header></settings-header>
    <router-view></router-view>
  </div>
</template>

<script>
import SettingsHeader from './components/SettingsHeader'

export default {
  name: 'Settings',
  components: {
    SettingsHeader
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
