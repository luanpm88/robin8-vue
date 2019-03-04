<template>
  <div class="page">
    <page-header></page-header>

    <div class="container mt50 clearfix">
      <main-nav class="pull-left"></main-nav>

      <div class="wallet-container pull-right">
        <wallet-header></wallet-header>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@components/PageHeader'
import MainNav from '@components/MainNav'
import WalletHeader from './components/WalletHeader'

export default {
  name: 'Wallet',
  components: {
    PageHeader,
    MainNav,
    WalletHeader
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.wallet-container {
  width: 980px;
}
</style>
