<template>
  <div class="container mt50 clearfix">
    <main-nav class="pull-left"></main-nav>

    <div class="campaign-container pull-right">
      <container-header></container-header>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MainNav from '@components/MainNav'
import ContainerHeader from './components/ContainerHeader'

export default {
  name: 'Campaigns',
  components: {
    MainNav,
    ContainerHeader
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.campaign-container {
  width: 980px;
}
</style>
