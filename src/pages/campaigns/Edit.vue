<template>
  <div class="page">
    <page-header></page-header>

    <div class="container mt50 clearfix">
      <main-nav class="pull-left"></main-nav>

      <div class="home-container pull-right">

      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@components/PageHeader'
import MainNav from '@components/MainNav'

export default {
  name: 'CampaignEdit',
  components: {
    PageHeader,
    MainNav
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
