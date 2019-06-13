<template>
  <div class="kol-search-container">
    <kol-search :keyWord="keyList"></kol-search>
  </div>
</template>

<script>
import KolSearch from './KolSearch'

export default {
  name: 'KolList',
  components: {
    KolSearch
  },
  created() {
    this.$route.meta.keepAlive = false
  },
  data () {
    return {
      keyList: {
        brand_keywords: this.$route.params.brand_keywords,
        type: this.$route.params.type
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
