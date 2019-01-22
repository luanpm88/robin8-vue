<template>
  <ul class="tags-list">
    <li
      class="item"
      :class="[item.checked ? 'active' : '']"
      v-for="(item, index) in renderData"
      :key="item.id"
      :data-val="item.name"
      @click="checkTag(item.id)"
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
      tagsData: this.renderData
    }
  },
  methods: {
    checkTag (id) {
      console.log(id)
      this.$emit('checkTag', {
        'id': id
      })
    },
    addTags (e, id, index) {
      console.log(id)
      let _index = this.tags.indexOf(id)
      let _tagsData = this.renderData

      if (_index == -1) {
        this.tags.push(id)
        _tagsData[index].checked = true
      } else {
        this.tags.splice(_index, 1)
        _tagsData[index].checked = false
      }
      this.tagsData = _tagsData
      this.tags.sort()
      console.log(this.tags)
    },
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
