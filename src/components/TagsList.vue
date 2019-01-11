<template>
  <ul class="tags-list">
    <li class="item">潮流时装博主</li>
  </ul>
</template>

<script>
export default {
  name: 'TagsList',
  props: {
    renderData: Object
  }
}
</script>

<style lang="scss" scoped>
.tags-list {
  font-size: 0;
  & > .item {
    display: inline-block;
    height: 28px;
    line-height: 26px;
    padding: 0 16px;
    margin: 10px;
    border-radius: 20px;
    border: 1px solid nth($blue, 1);
    font-size: $font-sm;
    font-weight: 500;
    color: nth($blue, 1);
    cursor: pointer;
    &.active.current {
      color: nth($blue, 1);
      background-color: nth($blue, 1);
    }
  }
}
</style>
