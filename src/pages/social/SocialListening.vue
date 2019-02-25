<template>
  <div class="page">
    <page-header></page-header>

    <div class="container mt50 clearfix">
      <main-nav class="pull-left"></main-nav>

      <div class="socail-container pull-right">
       woshi socialListening
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@components/PageHeader'
import MainNav from '@components/MainNav'
export default {
  name: 'socialListening',
  components: {
    PageHeader,
    MainNav
  },
  created() {

  },
  data () {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>
.socail-container {
  width: 980px;
  background: $white;
  min-height: 580px;
  padding: 30px;
  box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.08);
}
</style>
