<template>
  <div class="panel default-panel">
    <div class="panel-head">
      <h5 class="title text-center">{{title}}</h5>
    </div>
    <div class="panel-body">
      <div class="kols-list clearfix">
        <kols-list-item
          v-if="kols.length > 0"
          v-for="item in kols"
          :key="item.profile_id"
          :renderStatus="kolRenderStatus"
          :renderData="item"
          :routerData="routerData"
          @handleCheck="handleCheck"
        ></kols-list-item>

        <div v-else class="empty-area text-center">暂无数据...</div>
      </div>

      <div class="btn-area">
        <a-pagination
          size="small"
          :defaultCurrent="currentPage"
          :defaultPageSize="kolsPerPage"
          :total="kolsTotal"
          @change="onPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import commonJs from '@javascripts/common.js'
import KolsListItem from '@components/KolsListItem'

export default {
  name: 'CreationKolsListPanel',
  components: {
    KolsListItem
  },
  props: {
    title: String,
    kolsList: Array,
    kolsPage: Number,
    kolsPerPage: Number,
    kolsTotal: Number,
    routerData: Object
  },
  data () {
    return {
      kolRenderStatus: {
        hasLiked: false,
        hasMsg: false,
        hasChecked: true,
        hasInflunce: false,
        hasCart: false,
        hasDelete: false
      },
      kols: [],
      currentPage: 0
    }
  },
  methods: {
    handleCheck (data) {
      let _id = data.id
      console.log(_id)
      this.$emit('checkedKols', {
        'id': _id
      })
    },
    renderData (kolsList) {
      console.log(kolsList)
      let _kolsList = kolsList
      let _kolItem
      this.kols = []
      _kolsList.forEach(item => {
        _kolItem = commonJs.buildObjData('avatar_url', item.avatar_url)
        _kolItem.profile_id = item.profile_id
        _kolItem.profile_name = item.profile_name
        _kolItem.description_raw = item.description_raw
        _kolItem.bigv_url = !!item.bigv_url && item.bigv_url != '' ? item.bigv_url : ''
        _kolItem.checked = item.checked
        this.kols.push(_kolItem)
      })
      console.log(this.kols)
    },
    onPageChange (page) {
      this.$emit('changeKolsPage', {
        'page': page
      })
    }
  },
  created () {
    this.renderData(this.kolsList)
    this.currentPage = this.kolsPage + 1
  },
  watch: {
    kolsList: {
      handler (newVal, oldVal) {
        this.renderData(newVal)
      },
      deep: true
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
