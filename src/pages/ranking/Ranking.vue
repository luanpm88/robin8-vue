<template>
  <div class="container mt50">
    <router-view></router-view>
  </div>
</template>

<script>
import MainNav from '@components/MainNav'

export default {
  name: 'Ranking',
  components: {
    MainNav,
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
