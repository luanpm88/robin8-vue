<template>
  <div class="default-tabs">
    <div class="btn-group pills-btn">
      <div
        class="btn btn-outline "
        :class="[tabIndex == tab.index ? 'active' : '', !!theme && theme != '' ? 'btn-' + theme : 'btn-purple']"
        v-for="(tab, index) in tabList"
        :key="index"
        @click="changeTab(tab)"
      >{{tab.name()}}</div>
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
.pills-btn {
  overflow: hidden;

  &>.btn {
    padding: 4px 12px;
  }

  &>.btn:first-child {
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
  }

  &>.btn:last-child {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
  }
}
</style>
