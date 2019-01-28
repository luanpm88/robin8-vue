<template>
  <ul class="tags-list">
    <li
      class="item"
      :class="[checkedTag(item.id) ? 'active' : '']"
      v-for="(item, index) in renderData"
      :key="item.id"
      :data-val="item.name"
      @click="checkTag(item.id, item.name)"
    >{{item.label}}</li>
  </ul>
</template>

<script>
import commonJs from '@javascripts/common.js'

export default {
  name: 'TagsList',
  props: {
    renderData: Array,
    checkedIds: Array
  },
  data () {
    return {
      tags: []
    }
  },
  methods: {
    renderCheckedData (checkedIds) {
      if (!!checkedIds && checkedIds.length > 0) {
        this.tags = this.checkedIds
      }
    },
    checkTag (id, name) {
      console.log(this.checkedIds)
      let _tags = this.tags
      let _index = _tags.indexOf(id)
      if (_index == -1) {
        _tags.push(id)
      } else {
        _tags.splice(_index, 1)
      }
      console.log(_tags)
      this.$emit('checkTag', {
        'ids': _tags
      })
    },
    checkedTag (id) {
      return this.tags.indexOf(id) != -1
    }
  },
  mounted () {
    this.tags = this.checkedIds
  },
  watch: {
    checkedIds (newVal, oldVal) {
      this.renderCheckedData(newVal)
    }
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
    margin: 5px;
    border-radius: 20px;
    border: 1px solid nth($blue, 1);
    font-size: $font-sm;
    font-weight: 500;
    color: nth($blue, 1);
    cursor: pointer;
    &.active, &.current {
      color: #fff;
      background-color: nth($blue, 1);
    }
  }
}
</style>
