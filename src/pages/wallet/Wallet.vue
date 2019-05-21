<template>
  <div class="wallet-container">
    <wallet-header></wallet-header>
    <router-view></router-view>
  </div>
</template>

<script>
import WalletHeader from './components/WalletHeader'

export default {
  name: 'Wallet',
  components: {
    WalletHeader
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
