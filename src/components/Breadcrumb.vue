<template>
  <ul class="breadcrumb">
    <li class="item">
      <router-link class="iconfont icon-home" to="/"></router-link>
      <span class="separator">{{separator}}</span>
    </li>
    <li
      v-for="(item, index) in brumblist"
      :key="index"
      class="item"
    >
      <router-link :to="item.path">{{item.meta.title}}</router-link>
      <span v-if="index !== brumblist.length - 1" class="separator">{{separator}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: ['separator'],
  data () {
    return {
      brumblist: ''
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      this.brumblist = this.$route.matched
      // this.$route.matched.forEach((item, index) => {
      //   // 判断父级路由是否为空字符串或者meta是否为首页,直接复写路径到根目录
      //   // 后面的就是判断路由和当前遍历的项目是否一致,是的话把标题的值给上
      //   item.meta.breadcrumbName === '首页' ? item.path = '/' : this.$route.path === item.path ? this.title = item.meta.breadcrumbName : ''
      // })
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  font-size: 0;
  & > .item {
    display: inline-block;
    margin-right: 4px;
    font-size: $font-nm;
    color: #4a4a4a;
    .icon-home {
      color: #000;
    }
    .separator {
      padding: 0 4px;
    }
  }
}
</style>
