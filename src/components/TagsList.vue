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
export default {
  name: 'TagsList',
  props: {
    renderData: Array
  },
  data () {
    return {
      tags: [],
      tagsName: []
    }
  },
  methods: {
    checkTag (id, name) {
      console.log(id)
      console.log(name)
      let _index = this.tags.indexOf(id)
      if (_index == -1) {
        this.tags.push(id)
        this.tagsName.push(name)
      } else {
        this.tags.splice(_index, 1)
        this.tagsName.splice(_index, 1)
      }
      let _tagsName = this.tagsName
      console.log(_tagsName)
      this.$emit('checkTag', {
        'checkedTags': _tagsName
      })
    },
    checkedTag (id) {
      return this.tags.indexOf(id) != -1
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
