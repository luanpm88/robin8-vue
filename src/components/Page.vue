<template>
  <div class="page-bar">
    <ul>
      <li v-if="showFirst">上一页</li>
      <li v-for="(item, index) in indexList" :key="index">
        <a @click="btnClick">{{index}}</a>
      </li>
      <li v-if="showLast">下一页</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFirst: true,
      showLast: true,
      indexList: ['', '', '', '']
    };
  }
};
</script>
<style lang="scss" scoped>

</style>