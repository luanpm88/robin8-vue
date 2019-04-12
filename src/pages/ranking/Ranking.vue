<template>
  <div class="page">
    <page-header></page-header>

    <div class="container mt50">
      <router-view></router-view>
    </div>

    <page-footer></page-footer>
  </div>
</template>

<script>
import PageHeader from '@components/PageHeader'
import PageFooter from '@components/PageFooter'
import MainNav from '@components/MainNav'

export default {
  name: 'Ranking',
  components: {
    PageHeader,
    PageFooter,
    MainNav,
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
