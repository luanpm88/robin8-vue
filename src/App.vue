<template>
  <div id="app" class="page">
    <page-header></page-header>

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>

    <page-footer></page-footer>
  </div>
</template>

<script>
import PageHeader from '@components/PageHeader'
import PageFooter from '@components/PageFooter'

export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter
  }
}
</script>

<style>
</style>
