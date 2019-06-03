<template>
  <div class="default-tabs">
    <div class="tab-label">
      <div
        class="item"
        :class="[tabIndex == tab.index ? 'active' : '', !!theme && theme != '' ? theme : '']"
        v-for="(tab, index) in tabList"
        :key="index"
        @click="changeTab(tab)"
      >
        <span
          v-if="!!tab.iconClass && tab.iconClass != ''"
          class="iconfont"
          :class="'icon-'+ tab.iconClass"
        ></span>
        <span class="text">{{$t(`lang.${tab.name}`)}}</span>
      </div>
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
  .tab-label {
    & > .item {
      display: inline-block;
      padding: 4px 16px;
      border-right: 1px solid #c7c7c7;
      .iconfont {
        display: inline-block;
        margin: 0 4px 0 0;
        vertical-align: middle;
        font-size: $font-nm;
      }
      .text {
        padding: 2px 4px;
        color: #a9b1b3;
        cursor: pointer;
      }
      &.active {
        color: #262625;
        .text {
          border-bottom: 2px solid nth($cyan, 1);
          color: #262625;
        }
      }
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
