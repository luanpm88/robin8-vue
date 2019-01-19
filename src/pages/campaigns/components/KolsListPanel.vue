<template>
  <div class="panel default-panel">
    <div class="panel-head">
      <h5 class="title text-center">{{title}}</h5>
    </div>
    <div class="panel-body">
      <div class="kols-list">
        <kols-list-item
          v-for="(item, index) in kolsList"
          :key="index"
          :hasLiked="kolHasLiked"
          :hasMsg="kolHasMsg"
          :hasChecked="kolHasChecked"
          :renderData="item"
        ></kols-list-item>
      </div>

      <div class="btn-area">
        <button type="button" class="btn btn-blue btn-outline btn-sm" @click="">下一页</button>
      </div>
    </div>
  </div>
</template>

<script>
import KolsListItem from './KolsListItem'

export default {
  name: 'KolsListPanel',
  components: {
    KolsListItem
  },
  props: {
    title: String
  },
  data () {
    return {
      kolHasLiked: true,
      kolHasMsg: true,
      kolHasChecked: true,
      kolsList: [
        {
          name: "Anna Strong",
          desc: "Visual Designer,Google Inc Visual Designer,Google Inc Visual Designer,Google Inc"
        },
        {
          name: "Milano Esco",
          desc: "Well-known car blogger"
        },
        {
          name: "Nick Bold",
          desc: "Web Developer, Facebook Inc"
        },
        {
          name: "Wiltor Delton",
          desc: "Project Manager"
        },
        {
          name: "Nick Stone",
          desc: "Visual Designer, Github Inc"
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.kols-list {
  padding: 0 16px;
}
.btn-area {
  padding: 30px;
  text-align: center;
}
</style>
