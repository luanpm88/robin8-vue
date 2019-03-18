<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    const name = this.$route.meta.title || 'home'
    const title = this.$i18n.t(`lang.router.${name}`)
    window.document.title = title
  }
}
</script>

<style>
</style>
