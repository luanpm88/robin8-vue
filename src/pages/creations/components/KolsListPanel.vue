<template>
  <div class="panel default-panel">
    <div class="panel-head">
      <h5 class="title text-center">{{title}}</h5>
    </div>
    <div class="panel-body">
      <div class="kols-list clearfix">
        <kols-list-item
          v-if="kolsList.length > 0"
          v-for="item in kols"
          :key="item.id"
          :hasLiked="kolHasLiked"
          :hasMsg="kolHasMsg"
          :hasChecked="kolHasChecked"
          :hasCart="kolHasCart"
          :renderData="item"
          @handleCheck="handleCheck"
          @detail="toKolDetail(item)"
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
    keyword: String,
    kolTypeId: String
  },
  data () {
    return {
      kolHasLiked: false,
      kolHasMsg: false,
      kolHasChecked: true,
      kolHasCart: false,
      kols: [],
      checkedIds: [],
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
    },
    toKolDetail (item) {
      // console.log(this.keyword)
      this.$router.push({
        path: '/kol/',
        name: 'KolDetail',
        params: {
          id: item.id
        },
        query: {
          type: this.kolTypeId,
          brand_keywords: this.keyword
        }
      })
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
