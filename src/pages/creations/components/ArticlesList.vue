<template>
  <ul class="articles-list">
    <li
      v-for="item in articles"
      :key="item.id"
      v-if="!!item.title && item.title != ''"
      class="item"
    >
      <span
        class="iconfont "
        :class="[item.from_terrace == '公众号' ? 'icon-wechat' : 'icon-weibo']"
      ></span>
      <span class="iconfont icon-book"></span>
      <div class="article-title">
        <router-link :to="item.link">文章标题：{{item.title}}</router-link>
      </div>
      <button type="button" class="btn btn-xs btn-outline btn-blue link-btn">查看报告</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ArticlesList',
  props: {
    articles: Array
  },
  data () {
    return {
      iconClass: ''
    }
  },
  mounted () {
    // from_terrace
  }
}
</script>

<style lang="scss" scoped>
.articles-list {
  font-size: 0;
  & > .item {
    margin: 5px 0;
    .iconfont {
      display: inline-block;
      margin-right: 10px;
      vertical-align: middle;
    }
    .article-title {
      display: inline-block;
      vertical-align: middle;
      font-size: $font-nm-s;
      a:hover {
        text-decoration: underline;
      }
    }
    .link-btn {
      display: inline-block;
      margin-left: 10px;
      vertical-align: middle;
    }
  }
}
</style>
