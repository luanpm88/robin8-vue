<template>
  <ul class="articles-list">
    <li class="item">
      <span class="iconfont icon-weibo"></span>
      <span class="iconfont icon-book"></span>
      <div class="article-title">
        <router-link to="/">文章标题：这就是KOL准备发出去的文章，测试文章</router-link>
      </div>
      <button type="button" class="btn btn-xs btn-outline btn-blue link-btn">查看报告</button>
    </li>
    <li class="item">
      <span class="iconfont icon-wechat"></span>
      <span class="iconfont icon-book"></span>
      <div class="article-title">
        <router-link to="/">文章标题：这就是KOL准备发出去的文章，测试文章</router-link>
      </div>
      <button type="button" class="btn btn-xs btn-outline btn-blue link-btn">查看报告</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ArticlesList',
  props: {
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
