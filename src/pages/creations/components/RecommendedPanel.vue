<template>
  <div class="panel default-panel">
    <div class="panel-head clearfix">
      <h5 class="title pull-left">{{title}}</h5>
      <div class="tail-area pull-right">
        <select
          class="platform-select form-control"
          @change="onPlatformChange($event)"
        >
          <option
            v-for="item in terracesList"
            :key="item.id"
            :value="item.short_name"
            v-model="platformName"
          >
            {{item.name}}
          </option>
        </select>
      </div>
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
import DefaultTabs from "@components/DefaultTabs"

export default {
  name: 'CreationRecommendedPanel',
  components: {
    KolsListItem,
    DefaultTabs
  },
  props: {
    title: String,
    kolsList: Array,
    kolsPage: Number,
    kolsPerPage: Number,
    kolsTotal: Number,
    routerData: Object,
    terracesList: Array
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
      currentPage: 0,
      platformName: ''
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
    },
    onPlatformChange (event) {
      let platformName = event.target.value
      console.log(platformName)
      this.$emit('changePlatform', {
        'platformName': platformName
      })
    }
  },
  created () {
    this.renderData(this.kolsList)
    this.currentPage = this.kolsPage + 1
    this.platformName = this.terracesList[0].short_name
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
.platform-select {
  margin-top: -7px;
  margin-bottom: -7px;
}
</style>
