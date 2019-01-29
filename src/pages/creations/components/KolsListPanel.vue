<template>
  <div class="panel default-panel">
    <div class="panel-head">
      <h5 class="title text-center">{{title}}</h5>
    </div>
    <div class="panel-body">
      <div v-if="kolsList.length > 0" class="kols-list clearfix">
        <kols-list-item
          v-for="(item, index) in kols"
          :key="index"
          :hasLiked="kolHasLiked"
          :hasMsg="kolHasMsg"
          :hasChecked="kolHasChecked"
          :renderData="item"
          @handleCheck="handleCheck"
        ></kols-list-item>
      </div>

      <div v-else class="empty-area text-center">暂无搜索结果，换个条件再试试？</div>

      <div v-if="kolsList.length >= 12" class="btn-area">
        <button type="button" class="btn btn-blue btn-outline btn-sm" @click="">下一页</button>
      </div>
    </div>
  </div>
</template>

<script>
import commonJs from '@javascripts/common.js'
import KolsListItem from './KolsListItem'

export default {
  name: 'KolsListPanel',
  components: {
    KolsListItem
  },
  props: {
    title: String,
    kolsList: Array
  },
  data () {
    return {
      kolHasLiked: false,
      kolHasMsg: false,
      kolHasChecked: true,
      kols: [],
      checkedIds: []
    }
  },
  methods: {
    handleCheck (data) {
      let _id = data.id
      console.log(_id)
      let _kols = this.kols
      let _index = this.checkedIds.indexOf(_id)
      if (_index == -1) {
        this.checkedIds.push(_id)
      } else {
        this.checkedIds.splice(_index, 1)
      }
      let _checkedIds = this.checkedIds
      console.log(_checkedIds)
      this.$emit('checkedKols', {
        'ids': _checkedIds
      })
    },
    renderData (kolsList) {
      let _kolsList = kolsList
      let _kolItem
      this.kols = []
      _kolsList.forEach(item => {
        _kolItem = commonJs.buildObjData('avatar', item.avatar_url)
        _kolItem.id = item.profile_id
        _kolItem.name = item.profile_name
        _kolItem.desc = item.description_raw
        _kolItem.checked = item.checked
        if (item.checked) {
          this.checkedIds.push(item.profile_id)
        }
        this.kols.push(_kolItem)
      })
      console.log(this.kols)

      console.log(this.checkedIds)
    }
  },
  created () {
    this.renderData(this.kolsList)
  },
  watch: {
    kolsList (newVal, oldVal) {
      this.renderData(newVal)
    }
  }
}
</script>

<style lang="scss" scoped>
.kols-list {
  padding: 0 16px;
}
.empty-area {
  padding: 60px 0;
}
.btn-area {
  padding: 30px;
  text-align: center;
}
</style>
