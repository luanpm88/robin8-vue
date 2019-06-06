<template>
  <div class="campaign-container">
    <container-header></container-header>
    <router-view></router-view>
  </div>
</template>

<script>
import ContainerHeader from './components/ContainerHeader'

export default {
  name: 'Campaigns',
  components: {
    ContainerHeader
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
