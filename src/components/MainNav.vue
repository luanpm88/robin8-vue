<template>
  <div class="main-nav">
    <ul class="nav-list">
      <router-link
        v-for="(item, index) of navData"
        :key="index"
        :to="item.href"
        tag="li"
        class="item title-bar"
      >
        <div :class="'iconfont ' + item.icon"></div>
        <div class="title">{{item.title}}</div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MainNav',
  data () {
    return {
      navData: [
        {
          title: '首页',
          icon: 'icon-home',
          href: '/'
        },
        {
          title: '营销数据',
          icon: 'icon-home',
          href: '/'
        },
        {
          title: '我收藏的大V',
          icon: 'icon-home',
          href: '/'
        },
        {
          title: '我的钱包',
          icon: 'icon-home',
          href: '/'
        },
        {
          title: '企业设置',
          icon: 'icon-home',
          href: '/'
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.main-nav {
  $item-height: 40px;
  width: 280px;
  padding: $item-height 0;
  box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, .08);
  background-color: #fff;
  .nav-list {
    & > .item {
      height: $item-height;
      line-height: $item-height - 20;
      padding: 10px;
      cursor: pointer;
    }
  }
}
</style>
