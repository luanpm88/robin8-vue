<template>
  <div class="default-tabs">
    <div
      class="item"
      :class="[tabIndex == tab.index ? 'active' : '', !!theme && theme != '' ? theme : '']"
      v-for="(tab, index) in tabList"
      :key="index"
      @click="changeTab(tab)"
    >
      {{$t(`lang.${tab.name}`)}}
    </div>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultTabs',
  props: {
    tabList: Array,
    tabIndex: Number,
    theme: String
  },
  data() {
    return {}
  },
  methods: {
    changeTab(tab) {
      this.$emit('changeTab', tab)
    }
  }
}
</script>

<style scoped lang="scss">
.default-tabs {
  & > .item {
    display: inline-block;
    color: #a9b1b3;
    &.active {
      color: #262625;
    }
  }
}
</style>
